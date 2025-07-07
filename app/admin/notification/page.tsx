"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Eye, Calendar, Users, Bell } from "lucide-react"

interface Notification {
  id: string
  category: string
  title: string
  content: string
  externalUrl?: string
  targetType: "all" | "specific"
  targetUsers?: string[]
  priority: "high" | "medium" | "low"
  status: "draft" | "published" | "scheduled"
  publishDate: string
  createdAt: string
  views: number
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      category: "공지",
      title: "시스템 점검 안내",
      content: "2024년 1월 15일 오전 2시부터 4시까지 시스템 점검이 진행됩니다.",
      targetType: "all",
      priority: "high",
      status: "published",
      publishDate: "2024-01-10",
      createdAt: "2024-01-10",
      views: 1250,
    },
    {
      id: "2",
      category: "이용약관",
      title: "서비스 이용약관 개정 안내",
      content: "서비스 이용약관이 개정되었습니다. 자세한 내용을 확인해주세요.",
      externalUrl: "https://example.com/terms",
      targetType: "all",
      priority: "medium",
      status: "published",
      publishDate: "2024-01-08",
      createdAt: "2024-01-08",
      views: 890,
    },
    {
      id: "3",
      category: "개인정보 처리방침",
      title: "개인정보 처리방침 업데이트",
      content: "개인정보 처리방침이 업데이트되었습니다.",
      targetType: "specific",
      targetUsers: ["user123", "user456"],
      priority: "medium",
      status: "draft",
      publishDate: "2024-01-20",
      createdAt: "2024-01-12",
      views: 0,
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  // Form states
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    externalUrl: "",
    targetType: "all" as "all" | "specific",
    targetUsers: "",
    priority: "medium" as "high" | "medium" | "low",
    publishDate: "",
  })

  const categories = ["공지", "이용약관", "개인정보 처리방침", "위치정보 이용약관"]
  const statuses = ["draft", "published", "scheduled"]
  const priorities = ["high", "medium", "low"]

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || notification.category === selectedCategory
    const matchesStatus = !selectedStatus || notification.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleCreateNotification = (action: "draft" | "publish") => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      category: formData.category,
      title: formData.title,
      content: formData.content,
      externalUrl: formData.externalUrl || undefined,
      targetType: formData.targetType,
      targetUsers:
        formData.targetType === "specific" ? formData.targetUsers.split(",").map((id) => id.trim()) : undefined,
      priority: formData.priority,
      status: action === "publish" ? "published" : "draft",
      publishDate: formData.publishDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
      views: 0,
    }

    setNotifications([newNotification, ...notifications])
    setIsCreateDialogOpen(false)
    setFormData({
      category: "",
      title: "",
      content: "",
      externalUrl: "",
      targetType: "all",
      targetUsers: "",
      priority: "medium",
      publishDate: "",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지":
        return "bg-blue-100 text-blue-800"
      case "이용약관":
        return "bg-purple-100 text-purple-800"
      case "개인정보 처리방침":
        return "bg-orange-100 text-orange-800"
      case "위치정보 이용약관":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Notification Management</h1>
            <p className="text-muted-foreground">Manage system notifications and announcements</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>Create a new notification to send to users</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter notification title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter notification content"
                    className="min-h-[120px]"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="external-url">External URL</Label>
                  <Input
                    id="external-url"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-type">Target Users *</Label>
                    <Select
                      value={formData.targetType}
                      onValueChange={(value: "all" | "specific") => setFormData({ ...formData, targetType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="specific">Specific Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: "high" | "medium" | "low") =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.targetType === "specific" && (
                  <div className="space-y-2">
                    <Label htmlFor="target-users">User IDs</Label>
                    <Input
                      id="target-users"
                      placeholder="Enter user IDs separated by commas (e.g., user123, user456)"
                      value={formData.targetUsers}
                      onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">Enter user IDs separated by commas</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="publish-date">Publish Date</Label>
                  <Input
                    id="publish-date"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => handleCreateNotification("draft")}>
                    Save as Draft
                  </Button>
                  <Button
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => handleCreateNotification("publish")}
                    disabled={!formData.category || !formData.title || !formData.content}
                  >
                    Publish
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.status === "published").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.status === "scheduled").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">{notifications.reduce((sum, n) => sum + n.views, 0)}</p>
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
                    placeholder="Search notifications..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage and monitor all system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <Badge className={getCategoryColor(notification.category)}>{notification.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{notification.content}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={notification.targetType === "all" ? "default" : "secondary"}>
                        {notification.targetType === "all"
                          ? "All Users"
                          : `${notification.targetUsers?.length || 0} Users`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                    </TableCell>
                    <TableCell>{notification.views.toLocaleString()}</TableCell>
                    <TableCell>{notification.publishDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
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
