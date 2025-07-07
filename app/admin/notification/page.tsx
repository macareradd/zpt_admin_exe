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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Plus, Edit, Trash2, Eye, CalendarIcon, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"

export default function NotificationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [publishDate, setPublishDate] = useState<Date>()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTargetUser, setSelectedTargetUser] = useState("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance Notice",
      content: "Scheduled maintenance on March 15th from 2:00 AM to 4:00 AM",
      category: "notice",
      status: "published",
      publishDate: "2024-03-10",
      views: 1250,
      priority: "high",
      targetUser: "all",
    },
    {
      id: 2,
      title: "Privacy Policy Update",
      content: "Updated privacy policy terms and conditions",
      category: "privacy",
      status: "draft",
      publishDate: "2024-03-15",
      views: 0,
      priority: "medium",
      targetUser: "all",
    },
  ])

  const handleCreateNotification = () => {
    console.log("Creating new notification")
    setShowCreateDialog(false)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "notice":
        return "공지"
      case "terms":
        return "이용약관"
      case "privacy":
        return "개인정보 처리방침"
      case "location":
        return "위치정보 이용약관"
      default:
        return category
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Notification Management</h1>
            <p className="text-muted-foreground">Create and manage system notifications</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>Add a new notification to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <Label htmlFor="notification-category">카테고리 *</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notice">공지</SelectItem>
                      <SelectItem value="terms">이용약관</SelectItem>
                      <SelectItem value="privacy">개인정보 처리방침</SelectItem>
                      <SelectItem value="location">위치정보 이용약관</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="notification-title">제목 *</Label>
                  <Input id="notification-title" placeholder="제목을 입력하세요" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="notification-content">내용 *</Label>
                  <Textarea id="notification-content" placeholder="내용을 입력하세요" className="min-h-[200px]" />
                </div>

                {/* External URL */}
                <div className="space-y-2">
                  <Label htmlFor="external-url">외부 URL</Label>
                  <Input id="external-url" type="url" placeholder="https://example.com" />
                  <p className="text-sm text-muted-foreground">외부 링크가 있는 경우 입력하세요 (선택사항)</p>
                </div>

                {/* Target User Selection */}
                <div className="space-y-4">
                  <Label>타겟 유저 설정 *</Label>
                  <Select value={selectedTargetUser} onValueChange={setSelectedTargetUser}>
                    <SelectTrigger>
                      <SelectValue placeholder="타겟 유저를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 유저</SelectItem>
                      <SelectItem value="specific">특정 유저</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Specific User ID Input */}
                  {selectedTargetUser === "specific" && (
                    <div className="space-y-2">
                      <Label htmlFor="user-ids">유저 ID</Label>
                      <Textarea
                        id="user-ids"
                        placeholder="유저 ID를 입력하세요 (여러 개인 경우 쉼표로 구분)&#10;예: user123, user456, user789"
                        className="min-h-[100px]"
                      />
                      <p className="text-sm text-muted-foreground">
                        특정 유저에게만 알림을 보내려면 유저 ID를 입력하세요
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-priority">우선순위</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">높음</SelectItem>
                        <SelectItem value="medium">보통</SelectItem>
                        <SelectItem value="low">낮음</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification-status">상태</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">임시저장</SelectItem>
                        <SelectItem value="published">발행</SelectItem>
                        <SelectItem value="scheduled">예약발행</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>발행일</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {publishDate ? format(publishDate, "PPP") : "날짜 선택"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={publishDate} onSelect={setPublishDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    취소
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-300 hover:border-blue-500 text-blue-600 bg-transparent"
                  >
                    임시저장
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800" onClick={handleCreateNotification}>
                    <Send className="mr-2 h-4 w-4" />
                    발행
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Search Notifications</CardTitle>
            <CardDescription>Search and filter notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input
                    placeholder="Search by title or content..."
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
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications ({notifications.length})</CardTitle>
            <CardDescription>List of all notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.id}</TableCell>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {getCategoryLabel(notification.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityBadgeClass(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(notification.status)}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {notification.targetUser === "all" ? "전체" : "특정"}
                        </Badge>
                      </TableCell>
                      <TableCell>{notification.publishDate}</TableCell>
                      <TableCell>{notification.views}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-black bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-black bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
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
