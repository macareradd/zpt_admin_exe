import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Eye } from "lucide-react"

export default function SearchParticipants() {
  const participants = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      program: "Mountain Challenge",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      program: "Hiking Adventure",
      status: "Completed",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      program: "Trail Running",
      status: "Pending",
      joinDate: "2024-03-10",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Search Participants</h1>
          <p className="text-muted-foreground">Find and manage program participants</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>Use the filters below to find specific participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search-name">Name or Email</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input id="search-name" placeholder="Search..." className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="program-filter">Program</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All programs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="mountain">Mountain Challenge</SelectItem>
                    <SelectItem value="hiking">Hiking Adventure</SelectItem>
                    <SelectItem value="trail">Trail Running</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end space-x-2">
                <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" className="border-2 border-gray-300 hover:border-black bg-transparent">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participants ({participants.length})</CardTitle>
            <CardDescription>List of all participants matching your search criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.program}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          participant.status === "Active"
                            ? "default"
                            : participant.status === "Completed"
                              ? "secondary"
                              : "outline"
                        }
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
                    <TableCell>{participant.joinDate}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
