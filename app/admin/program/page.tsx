"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateCourseForm } from "@/components/create-course-form"
import { ParticipantsDialog } from "@/components/participants-dialog"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"

export default function ProgramPage() {
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<{ id: number; name: string } | null>(null)
  const [programs, setPrograms] = useState([
    {
      id: 1,
      code: "MT001",
      name: "Mountain Challenge",
      type: "one way",
      status: "Active",
    },
    {
      id: 2,
      code: "HK002",
      name: "Hiking Adventure",
      type: "multiple course",
      status: "Active",
    },
    {
      id: 3,
      code: "TR003",
      name: "Trail Running",
      type: "track course",
      status: "Deactive",
    },
    {
      id: 4,
      code: "LW004",
      name: "Long Distance Trek",
      type: "long way course",
      status: "Active",
    },
    {
      id: 5,
      code: "DP005",
      name: "Daily Morning Walk",
      type: "daily practice",
      status: "Active",
    },
    {
      id: 6,
      code: "MT006",
      name: "Peak Climbing",
      type: "one way",
      status: "Active",
    },
    {
      id: 7,
      code: "MC007",
      name: "Multi-Stage Adventure",
      type: "multiple course",
      status: "Deactive",
    },
    {
      id: 8,
      code: "TC008",
      name: "Speed Track Challenge",
      type: "track course",
      status: "Active",
    },
  ])

  const coursesByProgram: { [key: number]: any[] } = {
    1: [
      {
        id: 1,
        name: "Basic Mountain Safety",
        distance: "5000m",
        cutoffTime: "2h 30m",
        estimateTime: "2h 00m",
      },
      {
        id: 2,
        name: "Advanced Climbing",
        distance: "8000m",
        cutoffTime: "4h 00m",
        estimateTime: "3h 30m",
      },
    ],
    2: [
      {
        id: 3,
        name: "Trail Navigation",
        distance: "3000m",
        cutoffTime: "1h 30m",
        estimateTime: "1h 15m",
      },
    ],
    3: [
      {
        id: 4,
        name: "Speed Running",
        distance: "2000m",
        cutoffTime: "30m",
        estimateTime: "25m",
      },
    ],
  }

  const programTypes = [
    { value: "all", label: "All Types" },
    { value: "one way", label: "One Way" },
    { value: "multiple course", label: "Multiple Course" },
    { value: "long way course", label: "Long Way Course" },
    { value: "track course", label: "Track Course" },
    { value: "daily practice", label: "Daily Practice" },
  ]

  const getTypeDisplayName = (type: string) => {
    const typeMap: { [key: string]: string } = {
      "one way": "One Way",
      "multiple course": "Multiple Course",
      "long way course": "Long Way Course",
      "track course": "Track Course",
      "daily practice": "Daily Practice",
    }
    return typeMap[type] || type
  }

  const handleCreateCourse = (programId: number) => {
    setSelectedProgramId(programId)
    setShowCreateCourse(true)
  }

  const handleBackToCourses = () => {
    setShowCreateCourse(false)
    setSelectedProgramId(null)
  }

  const handleCourseSubmit = (data: any) => {
    console.log("Course created:", data)
    setShowCreateCourse(false)
    setSelectedProgramId(null)
  }

  const handleDeleteClick = (program: { id: number; name: string }) => {
    setProgramToDelete(program)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (programToDelete) {
      setPrograms(programs.filter((p) => p.id !== programToDelete.id))
      console.log(`Program "${programToDelete.name}" deleted`)
    }
    setDeleteDialogOpen(false)
    setProgramToDelete(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setProgramToDelete(null)
  }

  const selectedProgram = programs.find((p) => p.id === selectedProgramId)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Program Management</h1>
            <p className="text-muted-foreground">Manage all programs in the system</p>
          </div>
          <Link href="/admin/program/create">
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="mr-2 h-4 w-4" />
              Create Program
            </Button>
          </Link>
        </div>

        {/* Search and Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Programs</CardTitle>
            <CardDescription>Search and filter programs by name, code, or type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input placeholder="Search by program name or code..." className="pl-8" />
                </div>
              </div>
              <div className="w-full md:w-[200px]">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {programTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[200px]">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="deactive">Deactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Programs List */}
        <Card>
          <CardHeader>
            <CardTitle>Programs List</CardTitle>
            <CardDescription>Total {programs.length} programs found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Number</TableHead>
                    <TableHead className="w-[120px]">Code</TableHead>
                    <TableHead>Program Name</TableHead>
                    <TableHead className="w-[150px]">Program Type</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[200px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.id}</TableCell>
                      <TableCell className="font-mono text-sm">{program.code}</TableCell>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {getTypeDisplayName(program.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={program.status === "Active" ? "bg-black text-white" : "bg-gray-200 text-black"}
                        >
                          {program.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {/* Edit Button */}
                          <Link href={`/admin/program/edit/${program.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 hover:border-black bg-transparent"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>

                          {/* Delete Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                            onClick={() => handleDeleteClick({ id: program.id, name: program.name })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          {/* Courses Button */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:border-black bg-transparent"
                              >
                                <BookOpen className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>
                                  {showCreateCourse ? "Create Course" : `Courses - ${program.name}`}
                                </DialogTitle>
                                <DialogDescription>
                                  {showCreateCourse
                                    ? "Add a new course to the program"
                                    : "Manage courses for this program"}
                                </DialogDescription>
                              </DialogHeader>

                              {showCreateCourse && selectedProgram ? (
                                <CreateCourseForm
                                  programName={selectedProgram.name}
                                  onBack={handleBackToCourses}
                                  onSubmit={handleCourseSubmit}
                                />
                              ) : (
                                <div className="space-y-4">
                                  {/* Create Course Button */}
                                  <div className="flex justify-end">
                                    <Button
                                      className="bg-black text-white hover:bg-gray-800"
                                      onClick={() => handleCreateCourse(program.id)}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Create Course
                                    </Button>
                                  </div>

                                  {/* Courses List */}
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="w-[80px]">Number</TableHead>
                                          <TableHead>Course Name</TableHead>
                                          <TableHead className="w-[120px]">Distance</TableHead>
                                          <TableHead className="w-[130px]">Cut off Time</TableHead>
                                          <TableHead className="w-[130px]">Estimate Time</TableHead>
                                          <TableHead className="w-[120px]">Actions</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {(coursesByProgram[program.id] || []).map((course, index) => (
                                          <TableRow key={course.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium">{course.name}</TableCell>
                                            <TableCell>{course.distance}</TableCell>
                                            <TableCell>{course.cutoffTime}</TableCell>
                                            <TableCell>{course.estimateTime}</TableCell>
                                            <TableCell>
                                              <div className="flex items-center space-x-2">
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
                                        {(!coursesByProgram[program.id] ||
                                          coursesByProgram[program.id].length === 0) && (
                                          <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                              No courses found for this program
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {/* Participants Button */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:border-black bg-transparent"
                              >
                                <Users className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Participants - {program.name}</DialogTitle>
                                <DialogDescription>Manage participants for this program</DialogDescription>
                              </DialogHeader>
                              <ParticipantsDialog programName={program.name} programId={program.id} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing 1 to {programs.length} of {programs.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled className="border-gray-300 bg-transparent">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled className="border-gray-300 bg-transparent">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          programName={programToDelete?.name || ""}
        />
      </div>
    </AdminLayout>
  )
}
