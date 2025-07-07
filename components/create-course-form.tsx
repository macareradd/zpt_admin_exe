"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowLeft, Plus, Trash2 } from "lucide-react"

interface CreateCourseFormProps {
  programName: string
  onBack: () => void
  onSubmit: (data: any) => void
}

interface CheckPoint {
  id: string
  title: string
  image: File | null
  externalLink: string
  lat: string
  long: string
  alt: string
  radius: string
}

export function CreateCourseForm({ programName, onBack, onSubmit }: CreateCourseFormProps) {
  const [checkPoints, setCheckPoints] = useState<CheckPoint[]>([])
  const [estimateHours, setEstimateHours] = useState("")
  const [estimateMinutes, setEstimateMinutes] = useState("")
  const [cutoffHours, setCutoffHours] = useState("")
  const [cutoffMinutes, setCutoffMinutes] = useState("")

  const addCheckPoint = () => {
    const newCheckPoint: CheckPoint = {
      id: Date.now().toString(),
      title: "",
      image: null,
      externalLink: "",
      lat: "",
      long: "",
      alt: "",
      radius: "",
    }
    setCheckPoints([...checkPoints, newCheckPoint])
  }

  const removeCheckPoint = (id: string) => {
    setCheckPoints(checkPoints.filter((cp) => cp.id !== id))
  }

  const updateCheckPoint = (id: string, field: keyof CheckPoint, value: any) => {
    setCheckPoints(checkPoints.map((cp) => (cp.id === id ? { ...cp, [field]: value } : cp)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
    onSubmit({})
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 sticky top-0 bg-white z-10 pb-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        <div>
          <h3 className="text-xl font-bold">Create New Course</h3>
          <p className="text-sm text-muted-foreground">Program: {programName}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details of the course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-name">Course Name *</Label>
                <Input id="course-name" placeholder="Enter course name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-description">Course Description</Label>
              <Textarea id="course-description" placeholder="Enter course description" className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completion-condition">완주 조건</Label>
              <Textarea id="completion-condition" placeholder="Enter completion conditions" className="min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

        {/* Course Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Course Specifications</CardTitle>
            <CardDescription>Set distance and time requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="distance">Distance *</Label>
                <div className="relative">
                  <Input id="distance" type="number" placeholder="0" className="pr-8" required />
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500">m</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Estimate Time *</Label>
                <div className="flex space-x-2">
                  <Select onValueChange={setEstimateHours} required>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}h
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setEstimateMinutes} required>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}m
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cut off Time *</Label>
                <div className="flex space-x-2">
                  <Select onValueChange={setCutoffHours} required>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}h
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setCutoffMinutes} required>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}m
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpx-file">GPX File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <Button type="button" variant="outline" size="sm">
                  Select File
                </Button>
                <p className="text-xs text-gray-500 mt-1">Upload GPX file for the course route</p>
              </div>
              <input type="file" accept=".gpx" className="hidden" />
            </div>
          </CardContent>
        </Card>

        {/* Start Point */}
        <Card>
          <CardHeader>
            <CardTitle>Start Point *</CardTitle>
            <CardDescription>Configure the starting point of the course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-title">Title *</Label>
                <Input id="start-title" placeholder="Start point title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-external-link">External Link</Label>
                <Input id="start-external-link" type="url" placeholder="https://" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <Button type="button" variant="outline" size="sm">
                  Select Image
                </Button>
                <p className="text-xs text-gray-500 mt-1">Upload thumbnail image</p>
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-lat">Latitude *</Label>
                <Input id="start-lat" type="number" step="any" placeholder="0.000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-long">Longitude *</Label>
                <Input id="start-long" type="number" step="any" placeholder="0.000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-alt">Altitude</Label>
                <Input id="start-alt" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-radius">Radius *</Label>
                <div className="relative">
                  <Input id="start-radius" type="number" placeholder="0" className="pr-8" required />
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500">m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check Points */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Check Points</CardTitle>
                <CardDescription>Add intermediate checkpoints (optional)</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={addCheckPoint}>
                <Plus className="mr-2 h-4 w-4" />
                Add Check Point
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {checkPoints.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No check points added</p>
            ) : (
              checkPoints.map((checkPoint, index) => (
                <div key={checkPoint.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Check Point {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCheckPoint(checkPoint.id)}
                      className="border-red-300 hover:border-red-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="Check point title"
                        value={checkPoint.title}
                        onChange={(e) => updateCheckPoint(checkPoint.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>External Link</Label>
                      <Input
                        type="url"
                        placeholder="https://"
                        value={checkPoint.externalLink}
                        onChange={(e) => updateCheckPoint(checkPoint.id, "externalLink", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                      <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1" />
                      <Button type="button" variant="outline" size="sm">
                        Select Image
                      </Button>
                    </div>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Latitude</Label>
                      <Input
                        type="number"
                        step="any"
                        placeholder="0.000000"
                        value={checkPoint.lat}
                        onChange={(e) => updateCheckPoint(checkPoint.id, "lat", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Longitude</Label>
                      <Input
                        type="number"
                        step="any"
                        placeholder="0.000000"
                        value={checkPoint.long}
                        onChange={(e) => updateCheckPoint(checkPoint.id, "long", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Altitude</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={checkPoint.alt}
                        onChange={(e) => updateCheckPoint(checkPoint.id, "alt", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Radius</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          className="pr-8"
                          value={checkPoint.radius}
                          onChange={(e) => updateCheckPoint(checkPoint.id, "radius", e.target.value)}
                        />
                        <span className="absolute right-3 top-2.5 text-sm text-gray-500">m</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* End Point */}
        <Card>
          <CardHeader>
            <CardTitle>End Point *</CardTitle>
            <CardDescription>Configure the ending point of the course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="end-title">Title *</Label>
                <Input id="end-title" placeholder="End point title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-external-link">External Link</Label>
                <Input id="end-external-link" type="url" placeholder="https://" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <Button type="button" variant="outline" size="sm">
                  Select Image
                </Button>
                <p className="text-xs text-gray-500 mt-1">Upload thumbnail image</p>
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="end-lat">Latitude *</Label>
                <Input id="end-lat" type="number" step="any" placeholder="0.000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-long">Longitude *</Label>
                <Input id="end-long" type="number" step="any" placeholder="0.000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-alt">Altitude</Label>
                <Input id="end-alt" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-radius">Radius *</Label>
                <div className="relative">
                  <Input id="end-radius" type="number" placeholder="0" className="pr-8" required />
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500">m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2 sticky bottom-0 bg-white pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" className="bg-black text-white hover:bg-gray-800">
            Create Course
          </Button>
        </div>
      </form>
    </div>
  )
}
