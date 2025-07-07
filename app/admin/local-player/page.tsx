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
import { Search, Plus, Edit, Trash2, Eye, Upload, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LocalPlayerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [autoCompleteResults, setAutoCompleteResults] = useState<string[]>([])
  const [showAutoComplete, setShowAutoComplete] = useState(false)
  const [localPlayers, setLocalPlayers] = useState([
    {
      id: 1,
      companyName: "Mountain Adventure Co.",
      description: "Professional mountain climbing and hiking guide services",
      region: "Seoul",
      thumbnail: "/placeholder.svg?height=60&width=60",
      createdDate: "2024-02-15",
      status: "active",
      programs: 5,
    },
    {
      id: 2,
      companyName: "Trail Masters",
      description: "Expert trail running and hiking equipment rental",
      region: "Busan",
      thumbnail: "/placeholder.svg?height=60&width=60",
      createdDate: "2024-02-10",
      status: "active",
      programs: 3,
    },
    {
      id: 3,
      companyName: "Peak Explorers",
      description: "Specialized in high-altitude climbing expeditions",
      region: "Incheon",
      thumbnail: "/placeholder.svg?height=60&width=60",
      createdDate: "2024-02-05",
      status: "inactive",
      programs: 2,
    },
  ])

  // Mock regions data (would come from Catalog - region)
  const regions = ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Ulsan"]

  // Mock company names for autocomplete
  const companyNames = [
    "Mountain Adventure Co.",
    "Trail Masters",
    "Peak Explorers",
    "Summit Seekers",
    "Alpine Adventures",
    "Outdoor Experts",
    "Nature Guides",
    "Adventure Specialists",
  ]

  const handleCreateLocal = () => {
    console.log("Creating new local player")
    setShowCreateDialog(false)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.length > 0) {
      const filtered = companyNames.filter((name) => name.toLowerCase().includes(value.toLowerCase()))
      setAutoCompleteResults(filtered)
      setShowAutoComplete(true)
    } else {
      setShowAutoComplete(false)
    }
  }

  const handleAutoCompleteSelect = (companyName: string) => {
    setSearchQuery(companyName)
    setShowAutoComplete(false)
  }

  const getStatusBadgeClass = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800 border-green-300" : "bg-gray-200 text-gray-800"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Local Player Management</h1>
            <p className="text-muted-foreground">Manage local business partners and service providers</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Create Local
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Local Player</DialogTitle>
                <DialogDescription>Add a new local business partner</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-description">Company Description *</Label>
                  <Textarea
                    id="company-description"
                    placeholder="Enter detailed description of the company and services"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region-select">Region *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region.toLowerCase()}>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{region}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail Image *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <Button variant="outline">Choose Image</Button>
                      <p className="text-sm text-gray-500">PNG, JPG files supported (recommended: 300x300px)</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800" onClick={handleCreateLocal}>
                    Create Local Player
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Local Players</CardTitle>
            <CardDescription>Search local business partners by company name and filter by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                  <Input
                    placeholder="Search by company name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onBlur={() => setTimeout(() => setShowAutoComplete(false), 200)}
                  />
                </div>
                {/* Auto-complete dropdown */}
                {showAutoComplete && autoCompleteResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {autoCompleteResults.map((company, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleAutoCompleteSelect(company)}
                      >
                        {company}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full md:w-[200px]">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region.toLowerCase()}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Local Players List */}
        <Card>
          <CardHeader>
            <CardTitle>Local Players ({localPlayers.length})</CardTitle>
            <CardDescription>
              List of registered local business partners (sorted by latest registration)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead className="w-[80px]">Thumbnail</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Programs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.id}</TableCell>
                      <TableCell>
                        <img
                          src={player.thumbnail || "/placeholder.svg"}
                          alt={player.companyName}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{player.companyName}</TableCell>
                      <TableCell className="max-w-xs truncate">{player.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span>{player.region}</span>
                        </div>
                      </TableCell>
                      <TableCell>{player.programs}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(player.status)}>
                          {player.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{player.createdDate}</TableCell>
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
