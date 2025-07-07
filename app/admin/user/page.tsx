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
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function UserPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "김철수",
      email: "kim@example.com",
      phone: "010-1234-5678",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-03-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "이영희",
      email: "lee@example.com",
      phone: "010-9876-5432",
      status: "inactive",
      joinDate: "2024-02-20",
      lastLogin: "2024-03-05",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "박민수",
      email: "park@example.com",
      phone: "010-5555-1234",
      status: "active",
      joinDate: "2024-03-01",
      lastLogin: "2024-03-12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleCreateUser = () => {
    console.log("Creating new user")
    setShowCreateDialog(false)
  }

  const handleUserClick = (userId: number) => {
    router.push(`/admin/user/${userId}`)
  }

  const handleEditClick = (userId: number) => {
    router.push(`/admin/user/${userId}`)
  }

  const handleDeleteClick = (userId: number) => {
    console.log("Deleting user:", userId)
    // Add delete confirmation dialog here
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage system users and their information</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>Add a new user to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Name *</Label>
                    <Input id="user-name" placeholder="Enter user name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email *</Label>
                    <Input id="user-email" type="email" placeholder="Enter email address" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-phone">Phone Number</Label>
                    <Input id="user-phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800" onClick={handleCreateUser}>
                    Create User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Search Users</CardTitle>
            <CardDescription>Search and filter users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input
                    placeholder="Search by name or email..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
            <CardDescription>List of all users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>
                        <div
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          onClick={() => handleUserClick(user.id)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium hover:text-blue-600">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className="cursor-pointer hover:text-blue-600 hover:underline"
                          onClick={() => handleUserClick(user.id)}
                        >
                          {user.email}
                        </span>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-black bg-transparent"
                            onClick={() => handleEditClick(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                            onClick={() => handleDeleteClick(user.id)}
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
