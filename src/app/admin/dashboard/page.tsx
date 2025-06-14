'use client'

import { useState, useEffect } from 'react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { RequestCard } from '@/components/dashboard/request-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Users,
  Euro
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

// Données de démonstration
const mockStats = {
  totalRequests: 156,
  pendingRequests: 23,
  acceptedRequests: 98,
  refusedRequests: 35,
  avgResponseTime: '2.3h',
  monthlyRevenue: 45600
}

const mockRecentRequests = [
  {
    id: '1',
    order_number: 'TR-2024-001',
    pickup_address: '123 Rue de la Paix, Paris 75001',
    delivery_address: '456 Avenue des Champs, Lyon 69000',
    contact_name: 'Jean Dupont',
    contact_phone: '06 12 34 56 78',
    goods_description: 'Matériel informatique',
    total_weight: 150,
    price_ht: 450,
    status: 'pending' as const,
    response_deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    order_number: 'TR-2024-002',
    pickup_address: '789 Boulevard Saint-Germain, Paris 75006',
    delivery_address: '321 Rue de la République, Marseille 13000',
    contact_name: 'Marie Martin',
    contact_phone: '06 98 76 54 32',
    goods_description: 'Documents confidentiels',
    total_weight: 5,
    price_ht: 120,
    status: 'accepted' as const,
    response_deadline: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  }
]

const chartData = [
  { name: 'Lun', demandes: 12, acceptees: 10 },
  { name: 'Mar', demandes: 19, acceptees: 16 },
  { name: 'Mer', demandes: 15, acceptees: 13 },
  { name: 'Jeu', demandes: 22, acceptees: 18 },
  { name: 'Ven', demandes: 18, acceptees: 15 },
  { name: 'Sam', demandes: 8, acceptees: 7 },
  { name: 'Dim', demandes: 5, acceptees: 4 }
]

const revenueData = [
  { name: 'Jan', revenue: 35000 },
  { name: 'Fév', revenue: 42000 },
  { name: 'Mar', revenue: 38000 },
  { name: 'Avr', revenue: 45000 },
  { name: 'Mai', revenue: 48000 },
  { name: 'Juin', revenue: 45600 }
]

export default function AdminDashboard() {
  const [requests, setRequests] = useState(mockRecentRequests)

  const handleAcceptRequest = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'accepted' as const } : req
    ))
  }

  const handleRefuseRequest = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'refused' as const } : req
    ))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble de votre plateforme de transport</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Demandes totales"
          value={mockStats.totalRequests}
          change="+12% ce mois"
          changeType="positive"
          icon={FileText}
          description="Toutes les demandes"
        />
        <StatsCard
          title="En attente"
          value={mockStats.pendingRequests}
          change="-5% vs hier"
          changeType="positive"
          icon={Clock}
          description="Réponse requise"
        />
        <StatsCard
          title="Acceptées"
          value={mockStats.acceptedRequests}
          change="+8% ce mois"
          changeType="positive"
          icon={CheckCircle}
          description="Taux: 63%"
        />
        <StatsCard
          title="Temps de réponse"
          value={mockStats.avgResponseTime}
          change="-0.2h vs objectif"
          changeType="positive"
          icon={TrendingUp}
          description="Temps moyen"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demandes par jour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demandes" fill="#3B82F6" name="Demandes" />
                <Bar dataKey="acceptees" fill="#10B981" name="Acceptées" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution du CA</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}€`, 'Chiffre d\'affaires']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Alertes urgentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-orange-900">3 demandes sans réponse depuis plus de 4h</p>
                <p className="text-sm text-orange-700">Transporteurs: TRADIFRET, EXPRESS+, RAPID</p>
              </div>
              <Button variant="outline" size="sm">
                Voir détails
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-orange-900">Transporteur SPEED TRANS indisponible</p>
                <p className="text-sm text-orange-700">2 demandes à réassigner</p>
              </div>
              <Button variant="outline" size="sm">
                Réassigner
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Demandes récentes</CardTitle>
            <Button variant="outline" size="sm">
              Voir toutes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={handleAcceptRequest}
                onRefuse={handleRefuseRequest}
                showActions={request.status === 'pending'}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}