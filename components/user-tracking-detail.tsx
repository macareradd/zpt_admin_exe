"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Activity, TrendingUp, Zap } from "lucide-react"

interface UserTrackingDetailProps {
  participant: any
  onClose: () => void
}

export function UserTrackingDetail({ participant, onClose }: UserTrackingDetailProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock GPS tracking data
  const trackingData = {
    currentLocation: {
      lat: 37.5665,
      lng: 126.978,
      altitude: 245,
    },
    route: [
      { lat: 37.5665, lng: 126.978, altitude: 245, time: "09:00", distance: 0 },
      { lat: 37.5675, lng: 126.9785, altitude: 250, time: "09:15", distance: 1.2 },
      { lat: 37.5685, lng: 126.979, altitude: 265, time: "09:30", distance: 2.5 },
      { lat: 37.5695, lng: 126.9795, altitude: 280, time: "09:45", distance: 3.8 },
      { lat: 37.5705, lng: 126.98, altitude: 295, time: "10:00", distance: 5.1 },
      { lat: 37.5715, lng: 126.9805, altitude: 310, time: "10:15", distance: 6.4 },
      { lat: 37.5725, lng: 126.981, altitude: 325, time: "10:30", distance: 7.7 },
      { lat: 37.5735, lng: 126.9815, altitude: 340, time: "10:45", distance: 8.5 },
    ],
    stats: {
      totalDistance: 8.5,
      currentPace: "15.3 min/km",
      avgPace: "15.1 min/km",
      elevation: 95,
      duration: "1h 45m",
      calories: 420,
    },
  }

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Generate altitude chart data points
  const altitudeData = trackingData.route.map((point, index) => ({
    x: (index / (trackingData.route.length - 1)) * 100,
    y: ((point.altitude - 200) / 200) * 100,
    time: point.time,
    altitude: point.altitude,
    distance: point.distance,
  }))

  // Create SVG path for altitude chart
  const pathData = altitudeData
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${100 - point.y}`)
    .join(" ")

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{trackingData.stats.totalDistance} km</div>
                <div className="text-xs text-gray-600">Distance</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{trackingData.stats.duration}</div>
                <div className="text-xs text-gray-600">Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{trackingData.stats.currentPace}</div>
                <div className="text-xs text-gray-600">Current Pace</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{trackingData.stats.elevation}m</div>
                <div className="text-xs text-gray-600">Elevation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Tracking</span>
              </CardTitle>
              <CardDescription>Real-time location and movement data</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <Zap className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">Last updated: {currentTime.toLocaleTimeString()}</div>
        </CardContent>
      </Card>

      {/* Map Area */}
      <Card>
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
          <CardDescription>User movement path displayed in blue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23000000%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
              </div>
            </div>

            {/* Route Path */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Route line */}
              {trackingData.route.map((point, index) => {
                if (index === 0) return null
                const prevPoint = trackingData.route[index - 1]
                const x1 = ((prevPoint.lng - 126.975) / 0.01) * 100 + "%"
                const y1 = ((37.575 - prevPoint.lat) / 0.01) * 100 + "%"
                const x2 = ((point.lng - 126.975) / 0.01) * 100 + "%"
                const y2 = ((37.575 - point.lat) / 0.01) * 100 + "%"
                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#routeGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                )
              })}
              {/* Route points */}
              {trackingData.route.map((point, index) => {
                const x = ((point.lng - 126.975) / 0.01) * 100 + "%"
                const y = ((37.575 - point.lat) / 0.01) * 100 + "%"
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={index === trackingData.route.length - 1 ? "8" : "4"}
                    fill={index === trackingData.route.length - 1 ? "#ef4444" : "#3b82f6"}
                    stroke="white"
                    strokeWidth="2"
                  />
                )
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-blue-500 rounded"></div>
                  <span>Route Path</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Current Position</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Checkpoints</span>
                </div>
              </div>
            </div>

            {/* Current Location Info */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
              <div className="text-sm">
                <div className="font-medium">Current Location</div>
                <div className="text-gray-600">Lat: {trackingData.currentLocation.lat.toFixed(4)}</div>
                <div className="text-gray-600">Lng: {trackingData.currentLocation.lng.toFixed(4)}</div>
                <div className="text-gray-600">Alt: {trackingData.currentLocation.altitude}m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Altitude Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Elevation Profile</CardTitle>
          <CardDescription>Altitude changes over time during the challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="altitudeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#e5e7eb" strokeWidth="1" />
              ))}
              {[0, 25, 50, 75, 100].map((x) => (
                <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#e5e7eb" strokeWidth="1" />
              ))}
              {/* Altitude area */}
              <path d={`${pathData} L 100 100 L 0 100 Z`} fill="url(#altitudeGradient)" />
              {/* Altitude line */}
              <path d={pathData} stroke="#3b82f6" strokeWidth="3" fill="none" />
              {/* Data points */}
              {altitudeData.map((point, index) => (
                <circle
                  key={index}
                  cx={`${point.x}%`}
                  cy={`${100 - point.y}%`}
                  r="4"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
            {/* Y-axis labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-600 py-2">
              <span>400m</span>
              <span>350m</span>
              <span>300m</span>
              <span>250m</span>
              <span>200m</span>
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-gray-600 px-8">
              <span>09:00</span>
              <span>09:30</span>
              <span>10:00</span>
              <span>10:30</span>
              <span>10:45</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">Export Data</Button>
      </div>
    </div>
  )
}
