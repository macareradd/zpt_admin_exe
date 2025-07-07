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
import { Search, UserPlus, Send, Eye, Edit, Clock, MapPin, Dice6 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { UserTrackingDetail } from "@/components/user-tracking-detail"
import { EditParticipantDialog } from "@/components/edit-participant-dialog"
import { AutoDrawDialog } from "@/components/auto-draw-dialog" // Import AutoDrawDialog

export default function ChallengePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("All Programs")
  const [selectedUser, setSelectedUser] = useState("all-users")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showTrackingDetail, setShowTrackingDetail] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<any>(null)
  const [showAutoDrawDialog, setShowAutoDrawDialog] = useState(false)

  // Mock data for programs
  const programs = [
    { id: 1, name: "Mountain Challenge", code: "MT001" },
    { id: 2, name: "Hiking Adventure", code: "HK002" },
    { id: 3, name: "Trail Running", code: "TR003" },
    { id: 4, name: "Long Distance Trek", code: "LW004" },
    { id: 5, name: "Peak Climbing", code: "MT006" },
  ]

  // Mock data for users (for autocomplete)
  const users = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "Tom Brown",
    "Alice Cooper",
    "Bob Wilson",
    "Charlie Davis",
    "Emma Thompson",
    "David Lee",
  ]

  // Mock data for challenge participants
  const challengeData: { [key: string]: any[] } = {
    "Mountain Challenge": [
      {
        id: 1,
        programName: "Mountain Challenge",
        userName: "John Doe",
        programCode: "MT001",
        completionDate: "2024-02-15",
        status: "completed",
        distance: "15.2 km",
        duration: "3h 45m",
        pace: "14.8 min/km",
      },
      {
        id: 2,
        programName: "Mountain Challenge",
        userName: "Jane Smith",
        programCode: "MT001",
        completionDate: null,
        status: "in progress",
        distance: "8.5 km",
        duration: "2h 10m",
        pace: "15.3 min/km",
      },
      {
        id: 3,
        programName: "Mountain Challenge",
        userName: "Mike Johnson",
        programCode: "MT001",
        completionDate: null,
        status: "pending",
        distance: "-",
        duration: "-",
        pace: "-",
      },
      {
        id: 4,
        programName: "Mountain Challenge",
        userName: "Sarah Wilson",
        programCode: "MT001",
        completionDate: null,
        status: "failed",
        distance: "12.1 km",
        duration: "4h 20m",
        pace: "21.5 min/km",
      },
    ],
    "Hiking Adventure": [
      {
        id: 5,
        programName: "Hiking Adventure",
        userName: "Tom Brown",
        programCode: "HK002",
        completionDate: "2024-02-20",
        status: "completed",
        distance: "8.7 km",
        duration: "2h 15m",
        pace: "15.5 min/km",
      },
      {
        id: 6,
        programName: "Hiking Adventure",
        userName: "Alice Cooper",
        programCode: "HK002",
        completionDate: null,
        status: "in progress",
        distance: "4.2 km",
        duration: "1h 05m",
        pace: "15.5 min/km",
      },
    ],
    "Trail Running": [
      {
        id: 7,
        programName: "Trail Running",
        userName: "Charlie Davis",
        programCode: "TR003",
        completionDate: "2024-02-18",
        status: "completed",
        distance: "5.8 km",
        duration: "28m 30s",
        pace: "4.9 min/km",
      },
    ],
  }

  const handleSearch = () => {
    let results: any[] = []

    if (selectedProgram !== "All Programs") {
      results = challengeData[selectedProgram] || []
    } else {
      results = Object.values(challengeData).flat()
    }

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (item) =>
          item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.programCode.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by user
    if (selectedUser && selectedUser !== "all-users") {
      results = results.filter((item) => item.userName.toLowerCase().includes(selectedUser.toLowerCase()))
    }

    // Filter by status
    if (selectedStatus !== "All Status") {
      results = results.filter((item) => item.status === selectedStatus.toLowerCase())
    }

    setSearchResults(results)
    setShowResults(true)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "pending":
        return "bg-gray-200 text-gray-800 border-gray-300"
      case "failed":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in progress":
        return "In Progress"
      case "pending":
        return "Pending"
      case "failed":
        return "Failed"
      default:
        return status
    }
  }

  const handleResendCertificate = (participant: any) => {
    console.log("Resending certificate to:", participant.userName)
    alert(`Certificate resent to ${participant.userName}`)
  }

  const handleViewDetail = (participant: any) => {
    if (participant.status === "in progress") {
      setSelectedParticipant(participant)
      setShowTrackingDetail(true)
    }
  }

  const handleEdit = (participant: any) => {
    setEditingParticipant(participant)
    setShowEditDialog(true)
  }

  const handleAddParticipant = () => {
    console.log("Adding new participant with details:", {
      startDate,
      endDate,
    })
    alert("Participant registered successfully!")
    setShowAddUser(false)
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Add User Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Challenge Management</h1>
            <p className="text-muted-foreground">Manage paid program participants and track their progress</p>
          </div>
          <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add User to Challenge</DialogTitle>
                <DialogDescription>
                  Add a new participant to a challenge program with purchase details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-program">Program Name *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.name}>
                            {program.name} ({program.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-user">User *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select-user">Select User</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user} value={user}>
                            {user}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-number">Purchase Invoice Number *</Label>
                  <Input
                    id="invoice-number"
                    placeholder="Enter invoice number (e.g., INV-2024-001234)"
                    className="font-mono"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Start Challenge Time *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date" className="text-sm">
                        Start Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date" className="text-sm">
                        Valid Until
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => (startDate ? date < startDate : false)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select the challenge start date and the validity period end date
                  </p>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800" onClick={handleAddParticipant}>
                    Register Participation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Challenges</CardTitle>
            <CardDescription>Search and filter challenge participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search-query">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input
                    id="search-query"
                    placeholder="Search by name, program..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="program-select">Program</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
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
                <Label htmlFor="user-select">User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-users">All Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Challenge Participants</CardTitle>
                  <CardDescription>
                    {searchResults.length > 0
                      ? `Found ${searchResults.length} participant${searchResults.length > 1 ? "s" : ""}`
                      : "No participants found"}
                  </CardDescription>
                </div>
                {searchResults.length > 0 && (
                  <Dialog open={showAutoDrawDialog} onOpenChange={setShowAutoDrawDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 text-white hover:bg-purple-700">
                        <Dice6 className="mr-2 h-4 w-4" />
                        Auto Draw
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Auto Draw Settings</DialogTitle>
                        <DialogDescription>
                          Configure automatic participant selection based on criteria
                        </DialogDescription>
                      </DialogHeader>
                      <AutoDrawDialog onClose={() => setShowAutoDrawDialog(false)} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {searchResults.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">No.</TableHead>
                        <TableHead>Program Name</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead className="w-[100px]">Code</TableHead>
                        <TableHead className="w-[120px]">Completion Date</TableHead>
                        <TableHead className="w-[100px]">Distance</TableHead>
                        <TableHead className="w-[100px]">Duration</TableHead>
                        <TableHead className="w-[100px]">Pace</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[200px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((participant, index) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{participant.programName}</TableCell>
                          <TableCell>{participant.userName}</TableCell>
                          <TableCell className="font-mono text-sm">{participant.programCode}</TableCell>
                          <TableCell>
                            {participant.status === "completed" && participant.completionDate ? (
                              <div className="flex items-center text-sm">
                                <Clock className="mr-1 h-3 w-3 text-green-600" />
                                {participant.completionDate}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              {participant.distance !== "-" && <MapPin className="mr-1 h-3 w-3 text-blue-600" />}
                              {participant.distance}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{participant.duration}</TableCell>
                          <TableCell className="text-sm">{participant.pace}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeClass(participant.status)}>
                              {getStatusDisplayName(participant.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {participant.status === "completed" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 hover:border-green-500 hover:text-green-600 bg-transparent"
                                  onClick={() => handleResendCertificate(participant)}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className={`border-gray-300 bg-transparent ${
                                  participant.status === "in progress"
                                    ? "hover:border-blue-500 hover:text-blue-600"
                                    : "opacity-50 cursor-not-allowed"
                                }`}
                                onClick={() => handleViewDetail(participant)}
                                disabled={participant.status !== "in progress"}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:border-black bg-transparent"
                                onClick={() => handleEdit(participant)}
                              >
                                <Edit className="h-4 w-4" />
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
                  <p>No challenge participants found matching your search criteria.</p>
                  <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* User Tracking Detail Dialog */}
        <Dialog open={showTrackingDetail} onOpenChange={setShowTrackingDetail}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Real-time Tracking - {selectedParticipant?.userName}</DialogTitle>
              <DialogDescription>
                Live tracking for {selectedParticipant?.programName} ({selectedParticipant?.programCode})
              </DialogDescription>
            </DialogHeader>
            {selectedParticipant && (
              <UserTrackingDetail participant={selectedParticipant} onClose={() => setShowTrackingDetail(false)} />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Participant Dialog */}
        <EditParticipantDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          participant={editingParticipant}
          onSave={(updatedData) => {
            console.log("Participant updated:", updatedData)
            // Here you would update the participant data
            setShowEditDialog(false)
            setEditingParticipant(null)
          }}
        />
      </div>
    </AdminLayout>
  )
}
