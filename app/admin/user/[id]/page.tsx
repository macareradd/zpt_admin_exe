"use client"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Trophy, Calendar, Clock, MapPin } from "lucide-react"

interface UserDetailProps {
  params: {
    id: string
  }
}

export default function UserDetailPage({ params }: UserDetailProps) {
  const router = useRouter()
  const userId = params.id

  // Mock user data
  const user = {
    id: userId,
    username: "kim_runner",
    firstName: "철수",
    lastName: "김",
    englishName: "Chul-soo Kim",
    email: "kim@example.com",
    phone: "010-1234-5678",
    ageRange: "30-39",
    gender: "Male",
    birthDate: "1990-05-15",
    country: "South Korea",
    region: "Seoul",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-03-10",
    avatar: "/placeholder.svg?height=120&width=120",
  }

  // Mock badge data
  const badges = [
    {
      id: 1,
      icon: "🏃",
      name: "First Runner",
      completionDate: "2024-02-15",
      distance: "5.2 km",
      time: "00:25:30",
      count: 1,
    },
    {
      id: 2,
      icon: "🏔️",
      name: "Mountain Explorer",
      completionDate: "2024-03-01",
      distance: "12.5 km",
      time: "01:45:20",
      count: 3,
    },
    {
      id: 3,
      icon: "🌟",
      name: "Weekly Champion",
      completionDate: "2024-03-08",
      distance: "8.7 km",
      time: "00:42:15",
      count: 2,
    },
    {
      id: 4,
      icon: "🎯",
      name: "Goal Achiever",
      completionDate: "2024-03-12",
      distance: "15.0 km",
      time: "01:20:45",
      count: 5,
    },
  ]

  const totalBadges = badges.length
  const totalDistance = badges.reduce((sum, badge) => sum + Number.parseFloat(badge.distance), 0)
  const totalCount = badges.reduce((sum, badge) => sum + badge.count, 0)
  const maxCount = Math.max(...badges.map((badge) => badge.count))

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getCountBadgeClass = (count: number) => {
    if (count >= 5) return "bg-red-100 text-red-800 border-red-300"
    if (count >= 3) return "bg-orange-100 text-orange-800 border-orange-300"
    if (count >= 2) return "bg-yellow-100 text-yellow-800 border-yellow-300"
    return "bg-blue-100 text-blue-800 border-blue-300"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="border-gray-300 hover:border-black bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">User Details</h1>
            <p className="text-muted-foreground">View user information and achievements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - User Information */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.firstName} />
                    <AvatarFallback className="text-lg">{user.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-muted-foreground">@{user.username}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Username</label>
                    <p className="text-sm font-medium">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">English Name</label>
                    <p className="text-sm font-medium">{user.englishName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="text-sm font-medium">{user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="text-sm font-medium">{user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age Range</label>
                    <p className="text-sm font-medium">{user.ageRange}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-sm font-medium">{user.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Birth Date</label>
                    <p className="text-sm font-medium">{user.birthDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Country</label>
                    <p className="text-sm font-medium">{user.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Region</label>
                    <p className="text-sm font-medium">{user.region}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge variant="outline" className={getStatusBadgeClass(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Badge Information */}
          <div className="space-y-6">
            {/* Badge Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold">{totalBadges}</p>
                  <p className="text-sm text-muted-foreground">Total Badges</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{totalDistance.toFixed(1)}km</p>
                  <p className="text-sm text-muted-foreground">Total Distance</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{totalCount}</p>
                  <p className="text-sm text-muted-foreground">Total Count</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{maxCount}</p>
                  <p className="text-sm text-muted-foreground">Max Count</p>
                </CardContent>
              </Card>
            </div>

            {/* Badge List */}
            <Card>
              <CardHeader>
                <CardTitle>Acquired Badges</CardTitle>
                <CardDescription>List of badges earned by the user</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">Icon</TableHead>
                        <TableHead>Badge Name</TableHead>
                        <TableHead>Completion Date</TableHead>
                        <TableHead>Distance</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {badges.map((badge) => (
                        <TableRow key={badge.id}>
                          <TableCell className="text-2xl">{badge.icon}</TableCell>
                          <TableCell className="font-medium">{badge.name}</TableCell>
                          <TableCell>{badge.completionDate}</TableCell>
                          <TableCell>{badge.distance}</TableCell>
                          <TableCell>{badge.time}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getCountBadgeClass(badge.count)}>
                              {badge.count}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
