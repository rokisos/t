'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Package,
  ChevronLeft,
  ChevronRight,
  Truck
} from 'lucide-react'

// Données de démonstration pour le calendrier
const mockDeliveries = [
  {
    id: '1',
    orderNumber: 'TR-2024-001',
    date: '2024-06-15',
    time: '09:00',
    pickup: 'Paris 75001',
    delivery: 'Lyon 69000',
    contact: 'Jean Dupont',
    phone: '06 12 34 56 78',
    status: 'confirmed',
    weight: 150
  },
  {
    id: '2',
    orderNumber: 'TR-2024-002',
    date: '2024-06-15',
    time: '14:30',
    pickup: 'Paris 75006',
    delivery: 'Marseille 13000',
    contact: 'Marie Martin',
    phone: '06 98 76 54 32',
    status: 'confirmed',
    weight: 5
  },
  {
    id: '3',
    orderNumber: 'TR-2024-005',
    date: '2024-06-16',
    time: '10:15',
    pickup: 'Lyon 69002',
    delivery: 'Toulouse 31000',
    contact: 'Claire Bernard',
    phone: '06 77 88 99 00',
    status: 'pending',
    weight: 300
  },
  {
    id: '4',
    orderNumber: 'TR-2024-007',
    date: '2024-06-17',
    time: '08:45',
    pickup: 'Bordeaux 33000',
    delivery: 'Nantes 44000',
    contact: 'Paul Durand',
    phone: '06 33 44 55 66',
    status: 'confirmed',
    weight: 120
  },
  {
    id: '5',
    orderNumber: 'TR-2024-008',
    date: '2024-06-18',
    time: '11:00',
    pickup: 'Lille 59000',
    delivery: 'Strasbourg 67000',
    contact: 'Anne Leroy',
    phone: '06 22 33 44 55',
    status: 'confirmed',
    weight: 80
  }
]

export default function TransporterCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Générer les jours du mois
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        deliveries: []
      })
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day)
      const dateString = currentDay.toISOString().split('T')[0]
      const dayDeliveries = mockDeliveries.filter(d => d.date === dateString)
      
      days.push({
        date: currentDay,
        isCurrentMonth: true,
        deliveries: dayDeliveries
      })
    }
    
    // Compléter avec les jours du mois suivant
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        deliveries: []
      })
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getSelectedDateDeliveries = () => {
    if (!selectedDate) return []
    return mockDeliveries.filter(d => d.date === selectedDate)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-600">Planifiez et suivez vos livraisons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* En-têtes des jours */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dateString = day.date.toISOString().split('T')[0]
                  const isToday = dateString === new Date().toISOString().split('T')[0]
                  const isSelected = dateString === selectedDate
                  
                  return (
                    <div
                      key={index}
                      className={`
                        p-2 min-h-[80px] border border-gray-200 cursor-pointer hover:bg-gray-50
                        ${!day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''}
                        ${isToday ? 'bg-blue-50 border-blue-200' : ''}
                        ${isSelected ? 'bg-blue-100 border-blue-300' : ''}
                      `}
                      onClick={() => setSelectedDate(dateString)}
                    >
                      <div className="text-sm font-medium mb-1">
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {day.deliveries.slice(0, 2).map((delivery) => (
                          <div
                            key={delivery.id}
                            className={`text-xs p-1 rounded ${getStatusColor(delivery.status)}`}
                          >
                            {delivery.time} - {delivery.orderNumber}
                          </div>
                        ))}
                        {day.deliveries.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{day.deliveries.length - 2} autres
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détails du jour sélectionné */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Livraisons du ${new Date(selectedDate).toLocaleDateString('fr-FR')}`
                  : 'Sélectionnez une date'
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-4">
                  {getSelectedDateDeliveries().length > 0 ? (
                    getSelectedDateDeliveries().map((delivery) => (
                      <div key={delivery.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{delivery.orderNumber}</span>
                          <Badge className={getStatusColor(delivery.status)}>
                            {delivery.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{delivery.time}</span>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Enlèvement</p>
                              <p>{delivery.pickup}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Livraison</p>
                              <p>{delivery.delivery}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span>{delivery.weight}kg</span>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <p className="text-xs text-gray-500">Contact</p>
                            <p>{delivery.contact}</p>
                            <p className="text-gray-600">{delivery.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">Aucune livraison prévue ce jour</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Cliquez sur une date pour voir les détails</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistiques rapides */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ce mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Livraisons confirmées</span>
                  <span className="font-medium">
                    {mockDeliveries.filter(d => d.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">En attente</span>
                  <span className="font-medium">
                    {mockDeliveries.filter(d => d.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Poids total</span>
                  <span className="font-medium">
                    {mockDeliveries.reduce((sum, d) => sum + d.weight, 0)}kg
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}