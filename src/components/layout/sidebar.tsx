'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Truck,
  FileText,
  Users,
  Settings,
  Mail,
  BarChart3,
  MapPin,
  Clock
} from 'lucide-react'

interface SidebarProps {
  userRole: 'admin' | 'transporter'
}

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Demandes',
    href: '/admin/requests',
    icon: FileText
  },
  {
    title: 'Transporteurs',
    href: '/admin/transporters',
    icon: Truck
  },
  {
    title: 'Scan Email',
    href: '/admin/email-scan',
    icon: Mail
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'Paramètres',
    href: '/admin/settings',
    icon: Settings
  }
]

const transporterNavItems = [
  {
    title: 'Dashboard',
    href: '/transporter',
    icon: LayoutDashboard
  },
  {
    title: 'Mes Demandes',
    href: '/transporter/requests',
    icon: FileText
  },
  {
    title: 'Calendrier',
    href: '/transporter/calendar',
    icon: MapPin
  },
  {
    title: 'Historique',
    href: '/transporter/history',
    icon: Clock
  },
  {
    title: 'Profil',
    href: '/transporter/profile',
    icon: Users
  }
]

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const navItems = userRole === 'admin' ? adminNavItems : transporterNavItems

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Truck className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">TransportPro</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userRole === 'admin' ? 'Administrateur' : 'Transporteur'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              user@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}