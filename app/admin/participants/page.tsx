"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { EditParticipantDialog } from "@/components/edit-participant-dialog"
import { AutoDrawDialog } from "@/components/auto-draw-dialog"
import { Search, Filter, Download, Edit, Trash2, X, User, Zap } from "lucide-react"

export default function ParticipantsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showCompletedOnly, setShowCompletedOnly] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<any>(null)
  const [showAutoDrawDialog, setShowAutoDrawDialog] = useState(false)

  // Mock data for participants
  const participants = [
    {
      id: "1",
      userId: "user_001",
      name: "김민준",
      email: "minjun.kim@example.com",
      program: "Mountain Challenge",
      programId: "prog_001",
      status: "Completed",
      joinDate: "2024-01-15",
      completionDate: "2024-01-20",
      distance: 15.2,
      duration: "2h 30m",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      userId: "user_002",
      name: "이소영",
      email: "soyoung.lee@example.com",
      program: "City Walk",
      programId: "prog_002",
      status: "In Progress",
      joinDate: "2024-01-18",
      completionDate: null,
      distance: 8.5,
      duration: "1h 15m",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      userId: "user_003",
      name: "박지훈",
      email: "jihoon.park@example.com",
      program: "Trail Running",
      programId: "prog_003",
      status: "Pending",
      joinDate: "2024-01-20",
      completionDate: null,
      distance: 0,
      duration: "0m",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      userId: "user_004",
      name: "최혜진",
      email: "hyejin.choi@example.com",
      program: "Mountain Challenge",
      programId: "prog_001",
      status: "Failed",
      joinDate: "2024-01-12",
      completionDate: null,
      distance: 5.8,
      duration: "45m",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "5",
      userId: "user_005",
      name: "정우석",
      email: "wooseok.jung@example.com",
      program: "City Walk",
      programId: "prog_002",
      status: "Completed",
      joinDate: "2024-01-10",
      completionDate: "2024-01-14",
      distance: 12.3,
      duration: "1h 50m",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  // Mock data for programs
  const programs = [
    { id: "prog_001", name: "Mountain Challenge" },
    { id: "prog_002", name: "City Walk" },
    { id: "prog_003", name: "Trail Running" },
    { id: "prog_004", name: "Beach Walk" },
  ]

  const handleUserClick = (userId: string) => {
    router.push(`/admin/user/${userId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>
      case "Pending":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Pending</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = !selectedProgram || participant.programId === selectedProgram
    const matchesStatus = !selectedStatus || participant.status === selectedStatus
    const matchesDateRange =
      (!startDate || participant.joinDate >= startDate) && (!endDate || participant.joinDate <= endDate)
    const matchesCompleted = !showCompletedOnly || participant.status === "Completed"

    return matchesSearch && matchesProgram && matchesStatus && matchesDateRange && matchesCompleted
  })

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedProgram) count++
    if (selectedStatus) count++
    if (startDate || endDate) count++
    if (showCompletedOnly) count++
    return count
  }

  const clearAllFilters = () => {
    setSelectedProgram("")
    setSelectedStatus("")
    setStartDate("")
    setEndDate("")
    setShowCompletedOnly(false)
  }

  const hasActiveFilters = getActiveFiltersCount() > 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Participants Management</h1>
            <p className="text-muted-foreground">Manage program participants and their progress</p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowAutoDrawDialog(true)}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              Auto Draw
            </Button>
            <Button variant="outline" className="border-gray-300 hover:border-black bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <CardTitle>Filters</CardTitle>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
                <X className="mr-1 h-3 w-3" />
                Clear Filters
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search User</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program Name</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="All programs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All programs</SelectItem>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex space-x-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1"
                  />
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="completed-only" checked={showCompletedOnly} onCheckedChange={setShowCompletedOnly} />
              <Label htmlFor="completed-only">Show completed participants only</Label>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedProgram && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Program: {programs.find((p) => p.id === selectedProgram)?.name}
                  </Badge>
                )}
                {selectedStatus && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Status: {selectedStatus}
                  </Badge>
                )}
                {(startDate || endDate) && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Date: {startDate || "Start"} - {endDate || "End"}
                  </Badge>
                )}
                {showCompletedOnly && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    Completed Only
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Participants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Participants ({filteredParticipants.length})</CardTitle>
            <CardDescription>
              {hasActiveFilters
                ? `Showing ${filteredParticipants.length} participants matching your filters`
                : `Total ${participants.length} participants`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <button
                            onClick={() => handleUserClick(participant.userId)}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 flex items-center space-x-1"
                          >
                            <User className="h-3 w-3" />
                            <span>{participant.name}</span>
                          </button>
                          <p className="text-sm text-gray-500">{participant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{participant.program}</TableCell>
                    <TableCell>{getStatusBadge(participant.status)}</TableCell>
                    <TableCell>{participant.joinDate}</TableCell>
                    <TableCell>{participant.completionDate || "-"}</TableCell>
                    <TableCell>{participant.distance > 0 ? `${participant.distance} km` : "-"}</TableCell>
                    <TableCell>{participant.duration}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingParticipant(participant)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredParticipants.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No participants found matching your criteria.</p>
                {hasActiveFilters && (
                  <Button variant="link" onClick={clearAllFilters} className="mt-2">
                    Clear all filters to see all participants
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Participant Dialog */}
        {editingParticipant && (
          <EditParticipantDialog
            participant={editingParticipant}
            isOpen={!!editingParticipant}
            onClose={() => setEditingParticipant(null)}
            onSave={(updatedParticipant) => {
              console.log("Updated participant:", updatedParticipant)
              setEditingParticipant(null)
            }}
          />
        )}

        {/* Auto Draw Dialog */}
        {showAutoDrawDialog && (
          <AutoDrawDialog isOpen={showAutoDrawDialog} onClose={() => setShowAutoDrawDialog(false)} />
        )}
      </div>
    </AdminLayout>
  )
}
