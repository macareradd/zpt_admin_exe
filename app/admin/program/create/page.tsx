"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateProgram() {
  const [programType, setProgramType] = useState("")
  const [isDailyPractice, setIsDailyPractice] = useState(false)
  const [estimateHours, setEstimateHours] = useState("")
  const [estimateMinutes, setEstimateMinutes] = useState("")
  const [cutoffHours, setCutoffHours] = useState("")
  const [cutoffMinutes, setCutoffMinutes] = useState("")

  // Mock data for dropdowns (would come from Catalog in real app)
  const regions = ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Ulsan"]
  const badges = ["Mountain Explorer", "Trail Master", "Adventure Seeker", "Peak Conqueror"]
  const packages = ["Basic Package", "Premium Package", "VIP Package", "Ultimate Package"]

  const handleTypeChange = (value: string) => {
    setProgramType(value)
    setIsDailyPractice(value === "daily practice")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/admin/program">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Program</h1>
            <p className="text-muted-foreground">Fill in the details to create a new program</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="program-name">Program Name *</Label>
                  <Input id="program-name" placeholder="Enter program name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code *</Label>
                  <Input id="code" placeholder="Enter program code" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" placeholder="Enter program description" className="min-h-[120px]" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="detail">Detail</Label>
                <Textarea
                  id="detail"
                  placeholder="Enter detailed information about the program"
                  className="min-h-[120px]"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Attach Image
                  </Button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region.toLowerCase()}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="deactive">Deactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Notice and policy information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notice">Notice</Label>
                <Textarea id="notice" placeholder="Enter notice information" className="min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="return-policy">Return Policy</Label>
                <Textarea id="return-policy" placeholder="Enter return policy" className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
              <CardDescription>Set pricing and payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reboot-price">Reboot Price</Label>
                  <Input id="reboot-price" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-url">Payment URL</Label>
                  <Input id="payment-url" type="url" placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reboot-payment-url">Reboot Payment URL</Label>
                  <Input id="reboot-payment-url" type="url" placeholder="https://" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Program Configuration</CardTitle>
              <CardDescription>Configure program type and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select onValueChange={handleTypeChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one way">One Way</SelectItem>
                    <SelectItem value="multiple course">Multiple Course</SelectItem>
                    <SelectItem value="long way course">Long Way Course</SelectItem>
                    <SelectItem value="track course">Track Course</SelectItem>
                    <SelectItem value="daily practice">Daily Practice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isDailyPractice && (
                <div className="space-y-2">
                  <Label>Daily Practice Options</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="location-specific" />
                    <Label htmlFor="location-specific">위치 지정</Label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance</Label>
                  <div className="relative">
                    <Input id="distance" type="number" placeholder="0" className="pr-8" />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-500">m</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviation-rate">경로 이탈율</Label>
                  <div className="relative">
                    <Input id="deviation-rate" type="number" placeholder="0" className="pr-8" />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estimate Time</Label>
                  <div className="flex space-x-2">
                    <Select onValueChange={setEstimateHours}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} Hours
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setEstimateMinutes}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} Minutes
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cut off Time</Label>
                  <div className="flex space-x-2">
                    <Select onValueChange={setCutoffHours}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} Hours
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setCutoffMinutes}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} Minutes
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-speed">Max Speed</Label>
                <div className="relative">
                  <Input id="max-speed" type="number" placeholder="0" className="pr-12" />
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500">km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges and Packages */}
          <Card>
            <CardHeader>
              <CardTitle>Badges and Packages</CardTitle>
              <CardDescription>Configure badges and packages for the program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="badges">Badges</Label>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select badge" />
                    </SelectTrigger>
                    <SelectContent>
                      {badges.map((badge) => (
                        <SelectItem key={badge} value={badge.toLowerCase().replace(" ", "-")}>
                          {badge}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="link" className="text-sm">
                    New Badge
                  </Button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="packages">Packages</Label>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg} value={pkg.toLowerCase().replace(" ", "-")}>
                          {pkg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="link" className="text-sm">
                    New Package
                  </Button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reboot-packages">Reboot Packages</Label>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select reboot package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg} value={pkg.toLowerCase().replace(" ", "-")}>
                          {pkg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="link" className="text-sm">
                    New Package
                  </Button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Upload program images and watermarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feature-image">Feature Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <Button type="button" variant="outline" size="sm">
                      Select File
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">Thumbnail image</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate-watermark">Certificate Watermark</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <Button type="button" variant="outline" size="sm">
                      Select File
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">Certificate image</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completion-watermark">Completion Watermark</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <Button type="button" variant="outline" size="sm">
                      Select File
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">Program watermark</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-black text-white hover:bg-gray-800 px-8">
              등록
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
