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
import { Search, Download } from "lucide-react"

export default function ParticipantsPage() {
  const [selectedProgram, setSelectedProgram] = useState("All Programs")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  // Mock data for programs (would come from API in real app)
  const programs = [
    { id: 1, name: "Mountain Challenge", code: "MT001" },
    { id: 2, name: "Hiking Adventure", code: "HK002" },
    { id: 3, name: "Trail Running", code: "TR003" },
    { id: 4, name: "Long Distance Trek", code: "LW004" },
    { id: 5, name: "Daily Morning Walk", code: "DP005" },
    { id: 6, name: "Peak Climbing", code: "MT006" },
    { id: 7, name: "Multi-Stage Adventure", code: "MC007" },
    { id: 8, name: "Speed Track Challenge", code: "TC008" },
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
      },
      {
        id: 2,
        userName: "Jane Smith",
        participationDate: "2024-01-20",
        status: "Pending",
        result: "-",
        rebootCount: 0,
      },
      {
        id: 3,
        userName: "Mike Johnson",
        participationDate: "2024-02-01",
        status: "Fail",
        result: "Fail",
        rebootCount: 2,
      },
      {
        id: 4,
        userName: "Sarah Wilson",
        participationDate: "2024-02-05",
        status: "Completed",
        result: "Pass",
        rebootCount: 0,
      },
      {
        id: 5,
        userName: "Tom Brown",
        participationDate: "2024-02-10",
        status: "Pending",
        result: "-",
        rebootCount: 1,
      },
    ],
    "Hiking Adventure": [
      {
        id: 6,
        userName: "Alice Cooper",
        participationDate: "2024-01-25",
        status: "Completed",
        result: "Pass",
        rebootCount: 0,
      },
      {
        id: 7,
        userName: "Bob Wilson",
        participationDate: "2024-02-15",
        status: "Fail",
        result: "Fail",
        rebootCount: 3,
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
      },
    ],
  }

  const handleSearch = () => {
    let results: any[] = []

    if (selectedProgram !== "All Programs") {
      results = participantsByProgram[selectedProgram] || []
    }

    if (searchQuery) {
      // Search across all programs if there's a search query
      const allParticipants = Object.values(participantsByProgram).flat()
      results = allParticipants.filter((participant) =>
        participant.userName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setSearchResults(results)
    setShowResults(true)
  }

  const handleExcelDownload = () => {
    // Mock Excel download functionality
    console.log("Downloading Excel file with participants data...")
    alert("Excel file download started!")
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-black text-white"
      case "Pending":
        return "bg-gray-200 text-black"
      case "Fail":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-200 text-black"
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
        {/* Header with Excel Download Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Participants Management</h1>
            <p className="text-muted-foreground">Search and manage program participants</p>
          </div>
          <Button
            onClick={handleExcelDownload}
            className="bg-black text-white hover:bg-gray-800"
            disabled={!showResults || searchResults.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Excel Download
          </Button>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Participants</CardTitle>
            <CardDescription>Search participants by program or user name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {selectedProgram !== "All Programs" && ` in "${selectedProgram}"`}
                {searchQuery && ` matching "${searchQuery}"`}
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
                        <TableHead className="w-[120px]">참여일</TableHead>
                        <TableHead className="w-[100px]">상태</TableHead>
                        <TableHead className="w-[100px]">결과</TableHead>
                        <TableHead className="w-[100px]">Reboot</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((participant, index) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{participant.userName}</TableCell>
                          <TableCell>{participant.participationDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClass(participant.status)}>{participant.status}</Badge>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No participants found matching your search criteria.</p>
                  <p className="text-sm mt-2">Try adjusting your search terms or selecting a different program.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
