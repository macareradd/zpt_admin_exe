"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, Crown, Trophy, Clock, Route } from "lucide-react"
import Link from "next/link"

interface UserDetailPageProps {
  params: {
    id: string
  }
}

interface UserBadge {
  id: string
  icon: string
  name: string
  completionDate: string
  distance: number
  duration: string
  acquisitionCount: number
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  // Mock user data - would fetch from API based on params.id
  const userData = {
    id: params.id,
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    englishName: "John Doe",
    email: "john.doe@example.com",
    phone: "+82-10-1234-5678",
    ageRange: "30-39",
    gender: "Male",
    birthDate: "1990-05-15",
    country: "South Korea",
    region: "Seoul",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20",
    avatar: "/placeholder.svg?height=120&width=120",
  }

  // Mock badge data
  const userBadges: UserBadge[] = [
    {
      id: "1",
      icon: "🏔️",
      name: "Mountain Explorer",
      completionDate: "2024-01-18",
      distance: 15.5,
      duration: "3h 45m",
      acquisitionCount: 3,
    },
    {
      id: "2",
      icon: "🏃",
      name: "Speed Runner",
      completionDate: "2024-01-16",
      distance: 10.2,
      duration: "1h 20m",
      acquisitionCount: 1,
    },
    {
      id: "3",
      icon: "🚶",
      name: "Trail Walker",
      completionDate: "2024-01-14",
      distance: 8.7,
      duration: "2h 15m",
      acquisitionCount: 5,
    },
    {
      id: "4",
      icon: "🎯",
      name: "Goal Achiever",
      completionDate: "2024-01-12",
      distance: 25.0,
      duration: "5h 30m",
      acquisitionCount: 2,
    },
    {
      id: "5",
      icon: "⭐",
      name: "Star Performer",
      completionDate: "2024-01-10",
      distance: 12.3,
      duration: "2h 45m",
      acquisitionCount: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getAcquisitionCountColor = (count: number) => {
    if (count >= 5) return "bg-purple-100 text-purple-800"
    if (count >= 3) return "bg-blue-100 text-blue-800"
    if (count >= 2) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const totalBadges = userBadges.length
  const totalDistance = userBadges.reduce((sum, badge) => sum + badge.distance, 0)
  const totalAcquisitions = userBadges.reduce((sum, badge) => sum + badge.acquisitionCount, 0)
  const maxAcquisitions = Math.max(...userBadges.map((badge) => badge.acquisitionCount))

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/admin/user">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">User Details</h1>
            <p className="text-muted-foreground">View user information and achievements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.username} />
                  <AvatarFallback className="text-2xl">
                    {userData.firstName[0]}
                    {userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <CardDescription>@{userData.username}</CardDescription>
                <Badge className={getStatusColor(userData.status)}>{userData.status}</Badge>
              </CardHeader>
            </Card>

            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Username</p>
                    <p className="text-sm">{userData.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-sm">
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">English Name</p>
                    <p className="text-sm">{userData.englishName}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="text-sm">{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phone</p>
                      <p className="text-sm">{userData.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Age Range</p>
                    <p className="text-sm">{userData.ageRange}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gender</p>
                    <p className="text-sm">{userData.gender}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Birth Date</p>
                      <p className="text-sm">{userData.birthDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Country</p>
                    <p className="text-sm">{userData.country}</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Region</p>
                      <p className="text-sm">{userData.region}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Badge Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badge Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{totalBadges}</p>
                  <p className="text-sm text-gray-600">Total Badges</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Route className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{totalDistance.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Total Distance (km)</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{totalAcquisitions}</p>
                  <p className="text-sm text-gray-600">Total Acquisitions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{maxAcquisitions}</p>
                  <p className="text-sm text-gray-600">Max Acquisitions</p>
                </CardContent>
              </Card>
            </div>

            {/* Badge List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="mr-2 h-5 w-5" />
                  User Badges
                </CardTitle>
                <CardDescription>Badges earned by the user with completion details</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Badge</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Distance (km)</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Acquisitions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userBadges.map((badge) => (
                      <TableRow key={badge.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{badge.icon}</span>
                            <span className="font-medium">{badge.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{badge.completionDate}</TableCell>
                        <TableCell>{badge.distance.toFixed(1)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-gray-400" />
                            {badge.duration}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getAcquisitionCountColor(badge.acquisitionCount)}>
                            {badge.acquisitionCount}x
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
