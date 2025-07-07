"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Menu,
  Home,
  BookOpen,
  Users,
  Trophy,
  FolderOpen,
  User,
  UserCheck,
  Calendar,
  Award,
  FileText,
  BarChart3,
  Shield,
  MapPin,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Program",
    href: "/admin/program",
    icon: BookOpen,
  },
  {
    title: "Participants",
    href: "/admin/participants",
    icon: Users,
  },
  {
    title: "Challenge",
    href: "/admin/challenge",
    icon: Trophy,
  },
  {
    title: "User",
    href: "/admin/user",
    icon: User,
  },
  {
    title: "Migrate User",
    href: "/admin/migrate-user",
    icon: UserCheck,
  },
  {
    title: "Event",
    href: "/admin/event",
    icon: Calendar,
  },
  {
    title: "Trophies",
    href: "/admin/trophies",
    icon: Award,
  },
  {
    title: "Notification",
    href: "/admin/notification",
    icon: FileText,
  },
  {
    title: "Catalogs",
    icon: FolderOpen,
    items: [
      { title: "Badges", href: "/admin/catalogs/badges" },
      { title: "Packages", href: "/admin/catalogs/packages" },
      { title: "Keywords", href: "/admin/catalogs/keywords" },
      { title: "Region", href: "/admin/catalogs/region" },
      { title: "Mountain", href: "/admin/catalogs/mountain" },
      { title: "Age Range", href: "/admin/catalogs/age-range" },
    ],
  },
  {
    title: "Ranking",
    href: "/admin/ranking",
    icon: BarChart3,
  },
  {
    title: "Local Player",
    href: "/admin/local-player",
    icon: MapPin,
  },
  {
    title: "Administrators",
    href: "/admin/administrators",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

function NavItem({ item, pathname }: { item: any; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)

  if (item.items) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start font-normal">
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
            {isOpen ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.items.map((subItem: any) => (
            <Button
              key={subItem.href}
              variant="ghost"
              className={cn("w-full justify-start font-normal pl-8", pathname === subItem.href && "bg-muted")}
              asChild
            >
              <Link href={subItem.href}>{subItem.title}</Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start font-normal", pathname === item.href && "bg-muted")}
      asChild
    >
      <Link href={item.href}>
        <item.icon className="mr-2 h-4 w-4" />
        {item.title}
      </Link>
    </Button>
  )
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-black">Admin Panel</h2>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavItem key={item.title} item={item} pathname={pathname} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-white">
      <div className="hidden border-r-2 border-gray-200 bg-gray-50 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <ScrollArea className="flex-1">
            <Sidebar pathname={pathname} />
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b-2 border-gray-200 bg-white px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-white border-2 border-gray-300 hover:border-black"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <ScrollArea className="flex-1">
                <Sidebar pathname={pathname} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-white">{children}</main>
      </div>
    </div>
  )
}
