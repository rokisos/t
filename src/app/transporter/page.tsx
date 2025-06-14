'use client'

import { useState } from 'react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { RequestCard } from '@/components/dashboard/request-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Star,
  TrendingUp,
  Calendar,
  Euro,
  Truck
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Données de démonstration pour transporteur
const mockTransporterStats = {
  pendingRequests: 5,
  acceptedThisMonth: 28,
  refusedThisMonth: 3,
  avgResponseTime: '1.8h',
  rating: 4.7,
  monthlyEarnings: 12400
}

const mockPendingRequests = [
  {
    id: '1',
    order_number: 'TR-2024-003',
    pickup_address: '15 Rue de Rivoli, Paris 75001',
    delivery_address: '88 Avenue Foch, Bordeaux 33000',
    contact_name: 'Sophie Dubois',
    contact_phone: '06 11 22 33 44',
    goods_description: 'Équipements médicaux',
    total_weight: 75,
    price_ht: 380,
    status: 'pending' as const,
    response_deadline: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    order_number: 'TR-2024-004',
    pickup_address: '42 Boulevard Haussmann, Paris 75009',
    delivery_address: '67 Cours Mirabeau, Aix-en-Provence 13100',
    contact_name: 'Pierre Moreau',
    contact_phone: '06 55 66 77 88',
    goods_description: 'Pièces automobiles',
    total_weight: 200,
    price_ht: 520,
    status: 'pending' as const,
    response_deadline: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  }
]

const performanceData = [
  { name: 'Jan', acceptees: 22, refusees: 2 },
  { name: 'Fév', acceptees: 25, refusees: 1 },
  { name: 'Mar', acceptees: 28, refusees: 3 },
  { name: 'Avr', acceptees: 30, refusees: 2 },
  { name: 'Mai', acceptees: 26, refusees: 4 },
  { name: 'Juin', acceptees: 28, refusees: 3 }
]

const upcomingDeliveries = [
  {
    id: '1',
    orderNumber: 'TR-2024-001',
    date: '2024-06-15',
    time: '09:00',
    destination: 'Lyon 69000',
    status: 'confirmed'
  },
  {
    id: '2',
    orderNumber: 'TR-2024-002',
    date: '2024-06-15',
    time: '14:30',
    destination: 'Marseille 13000',
    status: 'confirmed'
  },
  {
    id: '3',
    orderNumber: 'TR-2024-005',
    date: '2024-06-16',
    time: '10:15',
    destination: 'Toulouse 31000',
    status: 'pending'
  }
]

export default function TransporterDashboard() {
  const [requests, setRequests] = useState(mockPendingRequests)

  const handleAcceptRequest = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id))
    // Ici, on ajouterait la logique pour envoyer l'acceptation au backend
  }

  const handleRefuseRequest = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id))
    // Ici, on ajouterait la logique pour envoyer le refus au backend
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Transporteur</h1>
          <p className="text-gray-600">Gérez vos demandes et suivez vos performances</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Star className="mr-1 h-3 w-3 fill-current" />
            {mockTransporterStats.rating}/5
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Demandes en attente"
          value={mockTransporterStats.pendingRequests}
          change="Réponse requise"
          changeType="neutral"
          icon={Clock}
          description="À traiter rapidement"
        />
        <StatsCard
          title="Acceptées ce mois"
          value={mockTransporterStats.acceptedThisMonth}
          change="+12% vs mois dernier"
          changeType="positive"
          icon={CheckCircle}
          description="Taux: 90%"
        />
        <StatsCard
          title="Temps de réponse moyen"
          value={mockTransporterStats.avgResponseTime}
          change="-0.3h vs objectif"
          changeType="positive"
          icon={TrendingUp}
          description="Objectif: 2h"
        />
        <StatsCard
          title="Note moyenne"
          value={mockTransporterStats.rating}
          change="Excellente performance"
          changeType="positive"
          icon={Star}
          description="Évaluation client"
        />
      </div>

      {/* Urgent Requests Alert */}
      {requests.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <Clock className="mr-2 h-5 w-5" />
              Demandes urgentes - Réponse requise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              Vous avez {requests.length} demande(s) en attente de réponse. 
              Veuillez traiter ces demandes rapidement pour maintenir votre taux de réactivité.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Demandes en attente ({requests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAcceptRequest}
                  onRefuse={handleRefuseRequest}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune demande en attente
              </h3>
              <p className="text-gray-600">
                Toutes vos demandes ont été traitées. Excellent travail !
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performances mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="acceptees" fill="#10B981" name="Acceptées" />
                <Bar dataKey="refusees" fill="#EF4444" name="Refusées" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Livraisons à venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {delivery.orderNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {delivery.destination}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {delivery.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      {delivery.time}
                    </p>
                  </div>
                  <Badge 
                    variant={delivery.status === 'confirmed' ? 'default' : 'secondary'}
                  >
                    {delivery.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}