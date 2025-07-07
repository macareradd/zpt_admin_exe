"use client"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, MapPin, Medal } from "lucide-react"

export default function RankingPage() {
  // Mock data for distance ranking
  const distanceRanking = [
    {
      rank: 1,
      userName: "John Doe",
      totalDistance: "125.8 km",
      programs: 8,
      avgDistance: "15.7 km",
      lastActivity: "2024-02-28",
    },
    {
      rank: 2,
      userName: "Jane Smith",
      totalDistance: "98.4 km",
      programs: 6,
      avgDistance: "16.4 km",
      lastActivity: "2024-02-27",
    },
    {
      rank: 3,
      userName: "Mike Johnson",
      totalDistance: "87.2 km",
      programs: 5,
      avgDistance: "17.4 km",
      lastActivity: "2024-02-26",
    },
    {
      rank: 4,
      userName: "Sarah Wilson",
      totalDistance: "76.9 km",
      programs: 4,
      avgDistance: "19.2 km",
      lastActivity: "2024-02-25",
    },
    {
      rank: 5,
      userName: "Tom Brown",
      totalDistance: "65.3 km",
      programs: 3,
      avgDistance: "21.8 km",
      lastActivity: "2024-02-24",
    },
  ]

  // Mock data for time ranking
  const timeRanking = [
    {
      rank: 1,
      userName: "Charlie Davis",
      totalTime: "18h 45m",
      programs: 7,
      avgTime: "2h 41m",
      bestTime: "2h 15m",
      lastActivity: "2024-02-28",
    },
    {
      rank: 2,
      userName: "Alice Cooper",
      totalTime: "16h 32m",
      programs: 5,
      avgTime: "3h 18m",
      bestTime: "2h 45m",
      lastActivity: "2024-02-27",
    },
    {
      rank: 3,
      userName: "Bob Wilson",
      totalTime: "14h 28m",
      programs: 4,
      avgTime: "3h 37m",
      bestTime: "3h 12m",
      lastActivity: "2024-02-26",
    },
    {
      rank: 4,
      userName: "Emma Thompson",
      totalTime: "12h 15m",
      programs: 3,
      avgTime: "4h 05m",
      bestTime: "3h 45m",
      lastActivity: "2024-02-25",
    },
    {
      rank: 5,
      userName: "David Lee",
      totalTime: "10h 52m",
      programs: 2,
      avgTime: "5h 26m",
      bestTime: "4h 20m",
      lastActivity: "2024-02-24",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-yellow-600">🥇</span>
      case 2:
        return <span className="text-gray-500">🥈</span>
      case 3:
        return <span className="text-orange-600">🥉</span>
      default:
        return <Medal className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Ranking System</h1>
          <p className="text-muted-foreground">View user rankings by distance and time performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-xs text-gray-600">Total Participants</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">2,847 km</div>
                  <div className="text-xs text-gray-600">Total Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">485h</div>
                  <div className="text-xs text-gray-600">Total Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Medal className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">18.2 km</div>
                  <div className="text-xs text-gray-600">Avg Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>User Rankings</CardTitle>
            <CardDescription>Performance rankings based on distance and time metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="distance" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="distance" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Distance Ranking</span>
                </TabsTrigger>
                <TabsTrigger value="time" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Time Ranking</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="distance" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Rank</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Total Distance</TableHead>
                        <TableHead>Programs</TableHead>
                        <TableHead>Avg Distance</TableHead>
                        <TableHead>Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {distanceRanking.map((user) => (
                        <TableRow key={user.rank}>
                          <TableCell className="font-bold text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {getRankIcon(user.rank)}
                              <span>{user.rank}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{user.userName}</TableCell>
                          <TableCell className="font-bold text-blue-600">{user.totalDistance}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-gray-300">
                              {user.programs} programs
                            </Badge>
                          </TableCell>
                          <TableCell>{user.avgDistance}</TableCell>
                          <TableCell>{user.lastActivity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="time" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Rank</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Total Time</TableHead>
                        <TableHead>Programs</TableHead>
                        <TableHead>Avg Time</TableHead>
                        <TableHead>Best Time</TableHead>
                        <TableHead>Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeRanking.map((user) => (
                        <TableRow key={user.rank}>
                          <TableCell className="font-bold text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {getRankIcon(user.rank)}
                              <span>{user.rank}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{user.userName}</TableCell>
                          <TableCell className="font-bold text-green-600">{user.totalTime}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-gray-300">
                              {user.programs} programs
                            </Badge>
                          </TableCell>
                          <TableCell>{user.avgTime}</TableCell>
                          <TableCell className="font-medium text-orange-600">{user.bestTime}</TableCell>
                          <TableCell>{user.lastActivity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
