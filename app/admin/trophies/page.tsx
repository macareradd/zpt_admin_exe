"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Trash2, Eye, Upload, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TrophiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])
  const [trophies, setTrophies] = useState([
    {
      id: 1,
      title: "Mountain Explorer",
      description: "Complete 5 mountain programs",
      condition: "Complete 5 mountain programs within 6 months",
      programs: ["Mountain Challenge", "Peak Climbing"],
      status: "active",
      recipients: 25,
    },
    {
      id: 2,
      title: "Speed Runner",
      description: "Complete trail running under target time",
      condition: "Complete trail running program under estimated time",
      programs: ["Trail Running"],
      status: "active",
      recipients: 12,
    },
  ])

  // Mock programs data
  const programs = [
    { id: 1, name: "Mountain Challenge", code: "MT001" },
    { id: 2, name: "Hiking Adventure", code: "HK002" },
    { id: 3, name: "Trail Running", code: "TR003" },
    { id: 4, name: "Peak Climbing", code: "MT006" },
    { id: 5, name: "Long Distance Trek", code: "LW004" },
  ]

  const handleCreateTrophy = () => {
    console.log("Creating new trophy with programs:", selectedPrograms)
    setShowCreateDialog(false)
    setSelectedPrograms([])
  }

  const handleProgramToggle = (programName: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programName) ? prev.filter((p) => p !== programName) : [...prev, programName],
    )
  }

  const getStatusBadgeClass = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800 border-green-300" : "bg-gray-200 text-gray-800"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Trophies Management</h1>
            <p className="text-muted-foreground">Create and manage achievement trophies</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Create Trophy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Trophy</DialogTitle>
                <DialogDescription>Add a new achievement trophy to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trophy-title">Trophy Title *</Label>
                    <Input id="trophy-title" placeholder="Enter trophy title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trophy-status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trophy-description">Description</Label>
                  <Textarea id="trophy-description" placeholder="Enter trophy description" className="min-h-[80px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trophy-condition">Achievement Condition *</Label>
                  <Textarea
                    id="trophy-condition"
                    placeholder="Describe the conditions to earn this trophy"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Associated Programs *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                    {programs.map((program) => (
                      <div key={program.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`program-${program.id}`}
                          checked={selectedPrograms.includes(program.name)}
                          onCheckedChange={() => handleProgramToggle(program.name)}
                        />
                        <Label htmlFor={`program-${program.id}`} className="text-sm">
                          {program.name} ({program.code})
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedPrograms.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-600">Selected Programs:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrograms.map((program) => (
                          <Badge key={program} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                            {program}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => handleProgramToggle(program)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Trophy Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <Button variant="outline">Choose Image</Button>
                      <p className="text-sm text-gray-500">PNG, JPG files supported</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={handleCreateTrophy}
                    disabled={selectedPrograms.length === 0}
                  >
                    Create Trophy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Search Trophies</CardTitle>
            <CardDescription>Search and filter achievement trophies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input
                    placeholder="Search by trophy title or description..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[200px]">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trophies List */}
        <Card>
          <CardHeader>
            <CardTitle>Trophies ({trophies.length})</CardTitle>
            <CardDescription>List of all achievement trophies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Programs</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trophies.map((trophy) => (
                    <TableRow key={trophy.id}>
                      <TableCell className="font-medium">{trophy.id}</TableCell>
                      <TableCell className="font-medium">{trophy.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{trophy.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {trophy.programs.map((program) => (
                            <Badge key={program} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{trophy.recipients}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(trophy.status)}>
                          {trophy.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-black bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-black bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
