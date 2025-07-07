"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Edit, Trash2, Users, UserCheck, UserX, Crown } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: "active" | "inactive"
  joinDate: string
  lastLogin: string
  badgeCount: number
  totalDistance: number
  avatar?: string
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "john_doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+82-10-1234-5678",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
      badgeCount: 5,
      totalDistance: 125.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      username: "jane_smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+82-10-2345-6789",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19",
      badgeCount: 8,
      totalDistance: 203.2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      username: "mike_wilson",
      firstName: "Mike",
      lastName: "Wilson",
      email: "mike.wilson@example.com",
      phone: "+82-10-3456-7890",
      status: "inactive",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18",
      badgeCount: 3,
      totalDistance: 87.3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      username: "sarah_lee",
      firstName: "Sarah",
      lastName: "Lee",
      email: "sarah.lee@example.com",
      phone: "+82-10-4567-8901",
      status: "active",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-20",
      badgeCount: 12,
      totalDistance: 345.7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      username: "david_kim",
      firstName: "David",
      lastName: "Kim",
      email: "david.kim@example.com",
      phone: "+82-10-5678-9012",
      status: "active",
      joinDate: "2024-01-08",
      lastLogin: "2024-01-19",
      badgeCount: 7,
      totalDistance: 178.9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "active").length
  const inactiveUsers = users.filter((user) => user.status === "inactive").length
  const totalBadges = users.reduce((sum, user) => sum + user.badgeCount, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage and monitor user accounts</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserX className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                  <p className="text-2xl font-bold">{inactiveUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Crown className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Badges</p>
                  <p className="text-2xl font-bold">{totalBadges}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by name, username, or email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>A list of all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Badges</TableHead>
                  <TableHead>Distance (km)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link
                        href={`/admin/user/${user.id}`}
                        className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                          <AvatarFallback>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium hover:text-blue-600">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium hover:text-blue-600 cursor-pointer">
                          <Link href={`/admin/user/${user.id}`}>{user.email}</Link>
                        </p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.badgeCount}</Badge>
                    </TableCell>
                    <TableCell>{user.totalDistance.toFixed(1)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link href={`/admin/user/${user.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
