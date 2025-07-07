import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Trophy, Calendar, FileText } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Programs",
      value: "24",
      description: "Active programs",
      icon: BarChart3,
    },
    {
      title: "Participants",
      value: "1,234",
      description: "Registered users",
      icon: Users,
    },
    {
      title: "Challenges",
      value: "56",
      description: "Active challenges",
      icon: Trophy,
    },
    {
      title: "Events",
      value: "12",
      description: "Upcoming events",
      icon: Calendar,
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the admin dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-2 border-gray-200 hover:border-black transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{stat.value}</div>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="space-y-4">
                <div className="flex items-center border-b border-gray-100 pb-2">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-black">New participant registered</p>
                    <p className="text-sm text-gray-600">John Doe joined Mountain Challenge</p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900">2 min ago</div>
                </div>
                <div className="flex items-center border-b border-gray-100 pb-2">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-black">Certificate issued</p>
                    <p className="text-sm text-gray-600">Certificate sent to Jane Smith</p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900">5 min ago</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-black">New event created</p>
                    <p className="text-sm text-gray-600">Summer Hiking Event scheduled</p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900">1 hour ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used admin actions</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center space-x-4 rounded-md border-2 border-gray-200 p-4 hover:border-black transition-colors">
                <Users className="h-6 w-6 text-black" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-black">Add Participant</p>
                  <p className="text-sm text-gray-600">Register new user</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-md border-2 border-gray-200 p-4 hover:border-black transition-colors">
                <Trophy className="h-6 w-6 text-black" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-black">Create Challenge</p>
                  <p className="text-sm text-gray-600">Add new challenge</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-md border-2 border-gray-200 p-4 hover:border-black transition-colors">
                <FileText className="h-6 w-6 text-black" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-black">Generate Report</p>
                  <p className="text-sm text-gray-600">Export data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
