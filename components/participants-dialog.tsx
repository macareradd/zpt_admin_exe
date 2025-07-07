"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Eye, Edit, Mail, Award } from "lucide-react"

interface ParticipantsDialogProps {
  programName: string
  programId: number
}

export function ParticipantsDialog({ programName, programId }: ParticipantsDialogProps) {
  // Mock data for participants - would come from API in real app
  const participantsByProgram: { [key: number]: any[] } = {
    1: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "010-1234-5678",
        enrollDate: "2024-01-15",
        status: "Active",
        progress: "75%",
        completedCourses: 2,
        totalCourses: 3,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "010-2345-6789",
        enrollDate: "2024-01-20",
        status: "Completed",
        progress: "100%",
        completedCourses: 3,
        totalCourses: 3,
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "010-3456-7890",
        enrollDate: "2024-02-01",
        status: "Pending",
        progress: "25%",
        completedCourses: 1,
        totalCourses: 3,
      },
    ],
    2: [
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "010-4567-8901",
        enrollDate: "2024-02-05",
        status: "Active",
        progress: "60%",
        completedCourses: 1,
        totalCourses: 2,
      },
    ],
    3: [
      {
        id: 5,
        name: "Tom Brown",
        email: "tom@example.com",
        phone: "010-5678-9012",
        enrollDate: "2024-01-10",
        status: "Completed",
        progress: "100%",
        completedCourses: 1,
        totalCourses: 1,
      },
    ],
  }

  const participants = participantsByProgram[programId] || []

  return (
    <div className="space-y-4">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
            <Input placeholder="Search by name or email..." className="pl-8" />
          </div>
        </div>
        <div className="w-full md:w-[180px]">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-gray-300 hover:border-black bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Export Excel
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-black">{participants.length}</div>
          <div className="text-sm text-gray-600">Total Participants</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-black">
            {participants.filter((p) => p.status === "Active").length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-black">
            {participants.filter((p) => p.status === "Completed").length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-black">
            {participants.filter((p) => p.status === "Pending").length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Participants List */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Enroll Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{participant.name}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>{participant.phone}</TableCell>
                <TableCell>{participant.enrollDate}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm">{participant.progress}</div>
                    <div className="text-xs text-gray-500">
                      ({participant.completedCourses}/{participant.totalCourses})
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      participant.status === "Active"
                        ? "bg-black text-white"
                        : participant.status === "Completed"
                          ? "bg-gray-200 text-black"
                          : "border-2 border-gray-400 text-gray-700"
                    }
                  >
                    {participant.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-black bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-black bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-black bg-transparent">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-black bg-transparent">
                      <Award className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {participants.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No participants found for this program
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
