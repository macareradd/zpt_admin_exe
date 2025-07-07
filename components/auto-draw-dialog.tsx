"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users, Trophy, CalendarDays, Download, List, Hash } from "lucide-react"
import { format, addDays } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AutoDrawDialogProps {
  onClose: () => void
}

export function AutoDrawDialog({ onClose }: AutoDrawDialogProps) {
  const [selectedProgram, setSelectedProgram] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [durationHours, setDurationHours] = useState("")
  const [durationMinutes, setDurationMinutes] = useState("")
  const [winnerCount, setWinnerCount] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState(false)
  const [winners, setWinners] = useState<any[]>([])
  const [showWinners, setShowWinners] = useState(false)

  // Mock data for programs
  const programs = [
    { id: 1, name: "Mountain Challenge", code: "MT001" },
    { id: 2, name: "Hiking Adventure", code: "HK002" },
    { id: 3, name: "Trail Running", code: "TR003" },
    { id: 4, name: "Long Distance Trek", code: "LW004" },
    { id: 5, name: "Peak Climbing", code: "MT006" },
  ]

  // Mock winners data
  const mockWinners = [
    {
      id: 1,
      rank: 1,
      userName: "John Doe",
      programName: "Mountain Challenge",
      programCode: "MT001",
      completionDate: "2024-02-15",
      duration: "3h 45m",
      status: "completed",
    },
    {
      id: 2,
      rank: 2,
      userName: "Jane Smith",
      programName: "Mountain Challenge",
      programCode: "MT001",
      completionDate: "2024-02-18",
      duration: "3h 52m",
      status: "completed",
    },
    {
      id: 3,
      rank: 3,
      userName: "Mike Johnson",
      programName: "Mountain Challenge",
      programCode: "MT001",
      completionDate: "2024-02-20",
      duration: "4h 10m",
      status: "completed",
    },
    {
      id: 4,
      rank: 4,
      userName: "Sarah Wilson",
      programName: "Mountain Challenge",
      programCode: "MT001",
      completionDate: "2024-02-22",
      duration: "4h 25m",
      status: "completed",
    },
    {
      id: 5,
      rank: 5,
      userName: "Tom Brown",
      programName: "Mountain Challenge",
      programCode: "MT001",
      completionDate: "2024-02-25",
      duration: "4h 35m",
      status: "completed",
    },
  ]

  const handleExecuteDraw = () => {
    const drawSettings = {
      program: selectedProgram,
      status: selectedStatus,
      duration: durationHours && durationMinutes ? `${durationHours}h ${durationMinutes}m` : "",
      winnerCount: Number.parseInt(winnerCount),
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
    }

    console.log("Executing auto draw with settings:", drawSettings)

    // Mock draw execution - select winners based on winner count
    const selectedWinners = mockWinners.slice(0, Number.parseInt(winnerCount))
    setWinners(selectedWinners)
    setShowWinners(true)

    alert(`Auto Draw Completed!\n\nTotal ${selectedWinners.length} winners selected.\n\nCheck the winners list below.`)
  }

  const handleExportWinners = () => {
    console.log("Exporting winners to Excel:", winners)
    alert(`Exporting ${winners.length} winners to Excel file...`)
  }

  const isFormValid =
    selectedProgram && selectedStatus && durationHours && durationMinutes && winnerCount && startDate && endDate

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Draw Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-purple-600" />
            <span>Draw Configuration</span>
          </CardTitle>
          <CardDescription>Set criteria for automatic participant selection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Program Selection */}
          <div className="space-y-2">
            <Label htmlFor="draw-program">Program Name *</Label>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Select program for draw" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.name}>
                    {program.name} ({program.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <Label htmlFor="draw-status">Status *</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select participant status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration Setting */}
          <div className="space-y-4">
            <Label className="text-base font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Specified Duration *</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration-hours" className="text-sm">
                  Hours
                </Label>
                <Select value={durationHours} onValueChange={setDurationHours}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hours" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} Hours
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration-minutes" className="text-sm">
                  Minutes
                </Label>
                <Select value={durationMinutes} onValueChange={setDurationMinutes}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minutes" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {Array.from({ length: 60 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} Minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Set the target duration for filtering participants</p>
          </div>

          {/* Winner Count Setting */}
          <div className="space-y-2">
            <Label htmlFor="winner-count" className="text-base font-medium flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <span>Winner Count *</span>
            </Label>
            <Input
              id="winner-count"
              type="number"
              min="1"
              max="100"
              placeholder="Enter number of winners (e.g., 5)"
              value={winnerCount}
              onChange={(e) => setWinnerCount(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Specify how many winners to select from eligible participants
            </p>
          </div>

          {/* Period Setting */}
          <div className="space-y-4">
            <Label className="text-base font-medium flex items-center space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span>Period Setting *</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="draw-start-date" className="text-sm">
                  Start Date
                </Label>
                <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date)
                        setIsStartDateOpen(false)
                        // Auto-set end date to 7 days later if not set
                        if (date && !endDate) {
                          setEndDate(addDays(date, 7))
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="draw-end-date" className="text-sm">
                  End Date
                </Label>
                <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date)
                        setIsEndDateOpen(false)
                      }}
                      initialFocus
                      disabled={(date) => (startDate ? date < startDate : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Select the period range for participant activity filtering</p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Draw Preview</span>
          </CardTitle>
          <CardDescription>Preview of current draw settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Program:</span>
                <span className="text-gray-600">{selectedProgram || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-gray-600 capitalize">{selectedStatus || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Winners:</span>
                <span className="text-gray-600">{winnerCount || "Not set"} people</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span className="text-gray-600">
                  {durationHours && durationMinutes ? `${durationHours}h ${durationMinutes}m` : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Period:</span>
                <span className="text-gray-600">
                  {startDate && endDate ? `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}` : "Not set"}
                </span>
              </div>
            </div>
          </div>

          {isFormValid && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">✓ All criteria set. Ready to execute auto draw.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Winners List */}
      {showWinners && winners.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Draw Results</span>
                </CardTitle>
                <CardDescription>Selected winners from the auto draw</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 bg-transparent">
                  <List className="mr-2 h-4 w-4" />
                  View All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:border-green-500 bg-transparent"
                  onClick={handleExportWinners}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Excel Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Rank</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="w-[120px]">Completion Date</TableHead>
                    <TableHead className="w-[100px]">Duration</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {winners.map((winner) => (
                    <TableRow key={winner.id}>
                      <TableCell className="font-bold text-center">
                        <div className="flex items-center justify-center">
                          {winner.rank === 1 && <span className="text-yellow-600">🥇</span>}
                          {winner.rank === 2 && <span className="text-gray-500">🥈</span>}
                          {winner.rank === 3 && <span className="text-orange-600">🥉</span>}
                          {winner.rank > 3 && <span className="font-medium">{winner.rank}</span>}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{winner.userName}</TableCell>
                      <TableCell>{winner.programName}</TableCell>
                      <TableCell className="font-mono text-sm">{winner.programCode}</TableCell>
                      <TableCell>{winner.completionDate}</TableCell>
                      <TableCell className="font-medium">{winner.duration}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 border-green-300">{winner.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                🎉 Draw completed successfully! {winners.length} winners selected from eligible participants.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          {showWinners ? "Close" : "Cancel"}
        </Button>
        {!showWinners && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleExecuteDraw}
            disabled={!isFormValid}
          >
            <Trophy className="mr-2 h-4 w-4" />
            Execute Draw
          </Button>
        )}
      </div>
    </div>
  )
}
