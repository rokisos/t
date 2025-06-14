'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  DocumentTextIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { formatDate, getStatusColor, getStatusText } from '@/lib/utils'

const historyData = [
  {
    id: 'TR-2024-001',
    status: 'completed',
    pickupAddress: '123 Rue de la Paix, Paris 75001',
    deliveryAddress: '456 Avenue des Champs, Lyon 69000',
    contact: 'Jean Dupont',
    phone: '06 12 34 56 78',
    weight: 150,
    price: 450,
    description: 'Matériel informatique',
    createdAt: '2024-06-10T08:00:00Z',
    completedAt: '2024-06-10T16:30:00Z',
    rating: 5,
    feedback: 'Livraison parfaite, transporteur très professionnel'
  },
  {
    id: 'TR-2024-002',
    status: 'completed',
    pickupAddress: '789 Boulevard Saint-Germain, Paris 75006',
    deliveryAddress: '321 Rue de la République, Marseille 13000',
    contact: 'Marie Martin',
    phone: '06 98 76 54 32',
    weight: 5,
    price: 120,
    description: 'Documents confidentiels',
    createdAt: '2024-06-08T14:00:00Z',
    completedAt: '2024-06-09T10:15:00Z',
    rating: 4,
    feedback: 'Bon service, légèrement en retard'
  },
  {
    id: 'TR-2024-003',
    status: 'completed',
    pickupAddress: '15 Rue de Rivoli, Paris 75001',
    deliveryAddress: '88 Avenue Foch, Bordeaux 33000',
    contact: 'Sophie Dubois',
    phone: '06 11 22 33 44',
    weight: 75,
    price: 380,
    description: 'Équipements médicaux',
    createdAt: '2024-06-05T09:30:00Z',
    completedAt: '2024-06-06T14:45:00Z',
    rating: 5,
    feedback: 'Excellent service, très rapide'
  },
  {
    id: 'TR-2024-004',
    status: 'completed',
    pickupAddress: '42 Boulevard Haussmann, Paris 75009',
    deliveryAddress: '67 Cours Mirabeau, Aix-en-Provence 13100',
    contact: 'Pierre Moreau',
    phone: '06 55 66 77 88',
    weight: 200,
    price: 520,
    description: 'Pièces automobiles',
    createdAt: '2024-06-01T11:00:00Z',
    completedAt: '2024-06-02T17:20:00Z',
    rating: 4,
    feedback: 'Bonne prestation dans l\'ensemble'
  },
  {
    id: 'TR-2024-005',
    status: 'cancelled',
    pickupAddress: '25 Rue du Commerce, Paris 75015',
    deliveryAddress: '134 Avenue de la Liberté, Lille 59000',
    contact: 'Antoine Leroy',
    phone: '06 77 88 99 00',
    weight: 30,
    price: 180,
    description: 'Matériel de bureau',
    createdAt: '2024-05-28T16:00:00Z',
    completedAt: null,
    rating: null,
    feedback: 'Annulé par le client'
  }
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const filteredHistory = historyData.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: historyData.length,
    completed: historyData.filter(r => r.status === 'completed').length,
    cancelled: historyData.filter(r => r.status === 'cancelled').length,
    totalRevenue: historyData.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.price, 0),
    averageRating: historyData.filter(r => r.rating).reduce((sum, r, _, arr) => sum + (r.rating || 0) / arr.length, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historique des Missions</h1>
          <p className="text-gray-600">Consultez l'historique de vos livraisons</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowDownTrayIcon className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total missions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Missions terminées</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}/5</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <StarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}€</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher par numéro, contact, adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les dates</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {filteredHistory.length} mission(s) trouvée(s)
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Commande #{request.id}
                  </h3>
                  <Badge 
                    variant={request.status === 'completed' ? 'success' : 'secondary'}
                  >
                    {getStatusText(request.status)}
                  </Badge>
                  {request.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < request.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Enlèvement</p>
                        <p className="text-sm text-gray-600">{request.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Livraison</p>
                        <p className="text-sm text-gray-600">{request.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Contact</p>
                      <p className="text-sm text-gray-600">{request.contact}</p>
                      <p className="text-sm text-gray-600">{request.phone}</p>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Poids</p>
                        <p className="text-sm text-gray-600">{request.weight}kg</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Prix</p>
                        <p className="text-sm text-gray-600">{request.price.toLocaleString()}€</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                  <p className="text-sm text-gray-600">{request.description}</p>
                </div>

                {request.feedback && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Commentaire client</p>
                    <p className="text-sm text-gray-600">{request.feedback}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Créée le {formatDate(request.createdAt)}</span>
                    {request.completedAt && (
                      <span>Terminée le {formatDate(request.completedAt)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRequest(request)}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="p-12 text-center">
          <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune mission trouvée</h3>
          <p className="text-gray-600">
            Aucune mission ne correspond à vos critères de recherche.
          </p>
        </Card>
      )}

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Détails de la mission #{selectedRequest.id}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Fermer
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Statut</p>
                    <Badge variant={selectedRequest.status === 'completed' ? 'success' : 'secondary'}>
                      {getStatusText(selectedRequest.status)}
                    </Badge>
                  </div>
                  {selectedRequest.rating && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Évaluation</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < selectedRequest.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {selectedRequest.rating}/5
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Itinéraire</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{selectedRequest.pickupAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600">{selectedRequest.deliveryAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Contact</p>
                    <p className="text-sm text-gray-600">{selectedRequest.contact}</p>
                    <p className="text-sm text-gray-600">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Détails</p>
                    <p className="text-sm text-gray-600">Poids: {selectedRequest.weight}kg</p>
                    <p className="text-sm text-gray-600">Prix: {selectedRequest.price.toLocaleString()}€</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                  <p className="text-sm text-gray-600">{selectedRequest.description}</p>
                </div>

                {selectedRequest.feedback && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Commentaire client</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{selectedRequest.feedback}</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Date de création</p>
                      <p className="text-gray-600">{formatDate(selectedRequest.createdAt)}</p>
                    </div>
                    {selectedRequest.completedAt && (
                      <div>
                        <p className="font-medium text-gray-700">Date de completion</p>
                        <p className="text-gray-600">{formatDate(selectedRequest.completedAt)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}