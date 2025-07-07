"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { format, differenceInMinutes } from "date-fns"

interface EditParticipantDialogProps {
  isOpen: boolean
  onClose: () => void
  participant: any
  onSave: (data: any) => void
}

export function EditParticipantDialog({ isOpen, onClose, participant, onSave }: EditParticipantDialogProps) {
  const [status, setStatus] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [finishDate, setFinishDate] = useState<Date>()
  const [finishTime, setFinishTime] = useState("")
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isFinishDateOpen, setIsFinishDateOpen] = useState(false)
  const [distance, setDistance] = useState("")

  // Initialize form data when participant changes
  useEffect(() => {
    if (participant) {
      setStatus(participant.status || "")
      setDescription(participant.description || "")

      // Set default start date/time (mock data - would come from API)
      const defaultStartDate = new Date("2024-02-15T09:00:00")
      setStartDate(defaultStartDate)
      setStartTime("09:00")

      // Set finish date/time if completed
      if (participant.status === "completed" && participant.completionDate) {
        const finishDateTime = new Date(participant.completionDate + "T15:45:00")
        setFinishDate(finishDateTime)
        setFinishTime("15:45")

        // Calculate duration automatically
        const durationMinutes = differenceInMinutes(finishDateTime, defaultStartDate)
        const hours = Math.floor(durationMinutes / 60)
        const minutes = durationMinutes % 60
        setDuration(`${hours}h ${minutes}m`)
      } else {
        setFinishDate(undefined)
        setFinishTime("")
        setDuration("")
      }

      // Set distance if completed
      if (participant.status === "completed" && participant.distance) {
        setDistance(participant.distance.replace(" km", "")) // Remove "km" unit for input
      } else {
        setDistance("")
      }
    }
  }, [participant])

  // Auto-calculate duration when start or finish time changes
  useEffect(() => {
    if (startDate && startTime && finishDate && finishTime && status === "completed") {
      try {
        const startDateTime = new Date(`${format(startDate, "yyyy-MM-dd")}T${startTime}:00`)
        const finishDateTime = new Date(`${format(finishDate, "yyyy-MM-dd")}T${finishTime}:00`)

        if (finishDateTime > startDateTime) {
          const durationMinutes = differenceInMinutes(finishDateTime, startDateTime)
          const hours = Math.floor(durationMinutes / 60)
          const minutes = durationMinutes % 60
          setDuration(`${hours}h ${minutes}m`)
        }
      } catch (error) {
        console.error("Error calculating duration:", error)
      }
    }
  }, [startDate, startTime, finishDate, finishTime, status])

  // Clear finish time and duration when status is not completed
  useEffect(() => {
    if (status !== "completed") {
      setFinishDate(undefined)
      setFinishTime("")
      setDuration("")
      setDistance("")
    } else if (status === "completed" && participant?.distance) {
      // Set default distance when status becomes completed
      setDistance(participant.distance.replace(" km", ""))
    }
  }, [status, participant?.distance])

  const handleSave = () => {
    const updatedData = {
      id: participant.id,
      status,
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : null,
      startTime,
      finishDate: finishDate ? format(finishDate, "yyyy-MM-dd") : null,
      finishTime,
      duration,
      distance: distance ? `${distance} km` : "", // Add this line
      description,
    }
    onSave(updatedData)
  }

  const handleCancel = () => {
    onClose()
  }

  // Generate time options (24-hour format)
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      timeOptions.push(timeString)
    }
  }

  if (!participant) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Participant</DialogTitle>
          <DialogDescription>
            Update participant information for {participant.userName} in {participant.programName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Participant Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Participant:</span> {participant.userName}
              </div>
              <div>
                <span className="font-medium">Program:</span> {participant.programName}
              </div>
              <div>
                <span className="font-medium">Code:</span> {participant.programCode}
              </div>
              <div>
                <span className="font-medium">Current Status:</span>{" "}
                <span className="capitalize">{participant.status}</span>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Time */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Start Time *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm">
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
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm">
                  Start Time
                </Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Default time is when the user started the program (can be modified)
            </p>
          </div>

          {/* Finish Time - Only show if status is completed or failed */}
          {(status === "completed" || status === "failed") && (
            <div className="space-y-4">
              <Label className="text-base font-medium">Finish Time {status === "completed" ? "*" : ""}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="finish-date" className="text-sm">
                    Finish Date
                  </Label>
                  <Popover open={isFinishDateOpen} onOpenChange={setIsFinishDateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {finishDate ? format(finishDate, "PPP") : "Select finish date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={finishDate}
                        onSelect={(date) => {
                          setFinishDate(date)
                          setIsFinishDateOpen(false)
                        }}
                        initialFocus
                        disabled={(date) => (startDate ? date < startDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finish-time" className="text-sm">
                    Finish Time
                  </Label>
                  <Select value={finishTime} onValueChange={setFinishTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {status === "completed"
                  ? "Time when the user clicked the completion button"
                  : "Time when the challenge was marked as failed"}
              </p>
            </div>
          )}

          {/* Duration - Only show if status is completed */}
          {status === "completed" && (
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <div className="relative">
                <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                <Input
                  id="duration"
                  placeholder="e.g., 3h 45m"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="pl-8"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Total time taken to complete the program (automatically calculated, but can be modified)
              </p>
            </div>
          )}

          {/* Distance - Only show if status is completed */}
          {status === "completed" && (
            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 15.2"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="pl-8 pr-12"
                />
                <span className="absolute right-3 top-2.5 text-sm text-gray-500">km</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total distance covered during the program (automatically set from completion data, but can be modified)
              </p>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add any notes or comments about this participant's performance..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              Optional notes about the participant's performance, issues encountered, or other relevant information
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="bg-black text-white hover:bg-gray-800"
              onClick={handleSave}
              disabled={!status || !startDate || !startTime || (status === "completed" && (!finishDate || !finishTime))}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
