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
import { Search, Edit, Trash2, Download } from "lucide-react"
import { EditParticipantDialog } from "@/components/edit-participant-dialog"
import { AutoDrawDialog } from "@/components/auto-draw-dialog"

export default function ChallengePage() {
  const [selectedProgram, setSelectedProgram] = useState("All Programs")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAutoDrawDialog, setShowAutoDrawDialog] = useState(false)

  // Mock data for programs
  const programs = [
    { id: 1, name: "Mountain Challenge", code: "MT001" },
    { id: 2, name: "Hiking Adventure", code: "HK002" },
    { id: 3, name: "Trail Running", code: "TR003" },
    { id: 4, name: "Long Distance Trek", code: "LW004" },
  ]

  // Mock data for participants by program
  const participantsByProgram: { [key: string]: any[] } = {
    "Mountain Challenge": [
      {
        id: 1,
        userName: "John Doe",
        participationDate: "2024-01-15",
        status: "Completed",
        result: "Pass",
        rebootCount: 1,
        programName: "Mountain Challenge",
        distance: 15.5,
      },
      {
        id: 2,
        userName: "Jane Smith",
        participationDate: "2024-01-20",
        status: "In Progress",
        result: "-",
        rebootCount: 0,
        programName: "Mountain Challenge",
        distance: null,
      },
      {
        id: 3,
        userName: "Mike Johnson",
        participationDate: "2024-02-01",
        status: "Failed",
        result: "Fail",
        rebootCount: 2,
        programName: "Mountain Challenge",
        distance: 8.2,
      },
      {
        id: 4,
        userName: "Emma Thompson",
        participationDate: "2024-02-05",
        status: "Save",
        result: "-",
        rebootCount: 0,
        programName: "Mountain Challenge",
        distance: null,
      },
    ],
    "Hiking Adventure": [
      {
        id: 5,
        userName: "Alice Cooper",
        participationDate: "2024-01-25",
        status: "Completed",
        result: "Pass",
        rebootCount: 0,
        programName: "Hiking Adventure",
        distance: 12.3,
      },
      {
        id: 6,
        userName: "Bob Wilson",
        participationDate: "2024-02-15",
        status: "Pending",
        result: "-",
        rebootCount: 0,
        programName: "Hiking Adventure",
        distance: null,
      },
      {
        id: 7,
        userName: "David Lee",
        participationDate: "2024-02-20",
        status: "Save",
        result: "-",
        rebootCount: 1,
        programName: "Hiking Adventure",
        distance: null,
      },
    ],
    "Trail Running": [
      {
        id: 8,
        userName: "Charlie Davis",
        participationDate: "2024-01-30",
        status: "Completed",
        result: "Pass",
        rebootCount: 1,
        programName: "Trail Running",
        distance: 10.8,
      },
    ],
  }

  const handleSearch = () => {
    let results: any[] = []

    // Get participants based on program selection
    if (selectedProgram !== "All Programs") {
      results = participantsByProgram[selectedProgram] || []
    } else {
      results = Object.values(participantsByProgram).flat()
    }

    // Filter by status
    if (selectedStatus !== "All Status") {
      results = results.filter((participant) => participant.status === selectedStatus)
    }

    // Filter by user name if search query exists
    if (searchQuery) {
      results = results.filter((participant) => participant.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setSearchResults(results)
    setShowResults(true)
  }

  const handleEdit = (participant: any) => {
    setEditingParticipant(participant)
    setShowEditDialog(true)
  }

  const handleSaveEdit = (updatedParticipant: any) => {
    // Update the participant in the mock data
    console.log("Saving participant:", updatedParticipant)
    setShowEditDialog(false)
    setEditingParticipant(null)
    // Refresh search results
    handleSearch()
  }

  const handleDelete = (participantId: number) => {
    if (confirm("Are you sure you want to delete this participant?")) {
      console.log("Deleting participant:", participantId)
      // Remove from mock data and refresh
      handleSearch()
    }
  }

  const handleExcelDownload = () => {
    console.log("Downloading Excel file with challenge data...")
    alert("Excel file download started!")
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Pending":
        return "bg-gray-200 text-gray-800 border-gray-300"
      case "Failed":
        return "bg-red-100 text-red-800 border-red-300"
      case "Save":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getResultBadgeClass = (result: string) => {
    switch (result) {
      case "Pass":
        return "bg-green-100 text-green-800 border-green-300"
      case "Fail":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Challenge Management</h1>
            <p className="text-muted-foreground">Manage program participants and challenges</p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleExcelDownload}
              variant="outline"
              className="border-gray-300 hover:border-black bg-transparent"
              disabled={!showResults || searchResults.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Excel Download
            </Button>
            <AutoDrawDialog>
              <Button className="bg-black text-white hover:bg-gray-800">Auto Draw</Button>
            </AutoDrawDialog>
          </div>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Participants</CardTitle>
            <CardDescription>Search and filter program participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program-select">Program Name</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Programs">All Programs</SelectItem>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.name}>
                        {program.name} ({program.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-select">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Status">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Save">Save</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search-input">Search User</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input
                    id="search-input"
                    placeholder="Enter user name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSearch} className="bg-black text-white hover:bg-gray-800 px-8">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {searchResults.length > 0
                  ? `Found ${searchResults.length} participant${searchResults.length > 1 ? "s" : ""}`
                  : "No participants found"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searchResults.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">번호</TableHead>
                        <TableHead>유저명</TableHead>
                        <TableHead>프로그램명</TableHead>
                        <TableHead className="w-[120px]">참여일</TableHead>
                        <TableHead className="w-[100px]">상태</TableHead>
                        <TableHead className="w-[100px]">결과</TableHead>
                        <TableHead className="w-[100px]">Reboot</TableHead>
                        <TableHead className="w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((participant, index) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{participant.userName}</TableCell>
                          <TableCell className="text-sm text-gray-600">{participant.programName}</TableCell>
                          <TableCell>{participant.participationDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeClass(participant.status)}>
                              {participant.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getResultBadgeClass(participant.result)}>
                              {participant.result}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {participant.rebootCount > 0 ? (
                                <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                                  {participant.rebootCount}회
                                </Badge>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(participant)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(participant.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
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
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No participants found matching your search criteria.</p>
                  <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Edit Participant Dialog */}
        {showEditDialog && editingParticipant && (
          <EditParticipantDialog
            participant={editingParticipant}
            isOpen={showEditDialog}
            onClose={() => {
              setShowEditDialog(false)
              setEditingParticipant(null)
            }}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </AdminLayout>
  )
}
