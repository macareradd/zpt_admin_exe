"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CreateProgramPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedLocalPlayer, setSelectedLocalPlayer] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isActive, setIsActive] = useState(true)

  // Mock data for regions
  const regions = [
    { id: "seoul", name: "Seoul" },
    { id: "busan", name: "Busan" },
    { id: "incheon", name: "Incheon" },
    { id: "daegu", name: "Daegu" },
    { id: "gwangju", name: "Gwangju" },
  ]

  // Mock data for local players
  const localPlayers = [
    { id: "1", name: "Seoul Mountain Guide", region: "seoul", description: "Professional mountain guiding service" },
    { id: "2", name: "Seoul Adventure Club", region: "seoul", description: "Adventure activities and tours" },
    { id: "3", name: "Busan Hiking Team", region: "busan", description: "Local hiking and trekking experts" },
    { id: "4", name: "Busan Outdoor Sports", region: "busan", description: "Outdoor sports and activities" },
    { id: "5", name: "Incheon Trail Guides", region: "incheon", description: "Trail guiding and nature tours" },
  ]

  // Filter local players based on selected location
  const filteredLocalPlayers = localPlayers.filter((player) => player.region === selectedLocation)

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value)
    setSelectedLocalPlayer("") // Reset local player selection when location changes
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setSelectedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log("Creating program with local player:", selectedLocalPlayer)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Create Program</h1>
          <p className="text-muted-foreground">Create a new program with detailed information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="program-name">Program Name *</Label>
                <Input id="program-name" placeholder="Enter program name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program-description">Description</Label>
                <Textarea id="program-description" placeholder="Enter program description" rows={3} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="program-type">Program Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hiking">Hiking</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="cycling">Cycling</SelectItem>
                      <SelectItem value="walking">Walking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select value={selectedLocation} onValueChange={handleLocationChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="local-player">Local Player</Label>
                  <Select
                    value={selectedLocalPlayer}
                    onValueChange={setSelectedLocalPlayer}
                    disabled={!selectedLocation}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !selectedLocation
                            ? "Select location first"
                            : filteredLocalPlayers.length === 0
                              ? "No local players available"
                              : "Select local player"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredLocalPlayers.map((player) => (
                        <SelectItem key={player.id} value={player.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{player.name}</span>
                            <span className="text-sm text-gray-500">{player.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="active-status" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="active-status">Active Program</Label>
              </div>
            </CardContent>
          </Card>

          {/* Program Details */}
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
              <CardDescription>Additional program specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input id="distance" type="number" placeholder="0" min="0" step="0.1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input id="duration" type="number" placeholder="0" min="0" step="0.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-participants">Max Participants</Label>
                  <Input id="max-participants" type="number" placeholder="0" min="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₩)</Label>
                  <Input id="price" type="number" placeholder="0" min="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" placeholder="Enter program requirements" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment Needed</Label>
                <Textarea id="equipment" placeholder="List required equipment" rows={2} />
              </div>

              <div className="space-y-2">
                <Label>Program Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">Upload program images</span>
                        <span className="mt-1 block text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="border-gray-300 hover:border-black bg-transparent">
            Cancel
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800" onClick={handleSubmit}>
            Create Program
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
