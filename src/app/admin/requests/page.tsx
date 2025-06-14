'use client'

import { useState } from 'react'
import { RequestCard } from '@/components/dashboard/request-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Plus, 
  Download,
  RefreshCw
} from 'lucide-react'

// Données de démonstration étendues
const mockRequests = [
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
  },
  {
    id: '3',
    order_number: 'TR-2024-003',
    pickup_address: '15 Rue de Rivoli, Paris 75001',
    delivery_address: '88 Avenue Foch, Bordeaux 33000',
    contact_name: 'Sophie Dubois',
    contact_phone: '06 11 22 33 44',
    goods_description: 'Équipements médicaux',
    total_weight: 75,
    price_ht: 380,
    status: 'refused' as const,
    response_deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    order_number: 'TR-2024-004',
    pickup_address: '42 Boulevard Haussmann, Paris 75009',
    delivery_address: '67 Cours Mirabeau, Aix-en-Provence 13100',
    contact_name: 'Pierre Moreau',
    contact_phone: '06 55 66 77 88',
    goods_description: 'Pièces automobiles',
    total_weight: 200,
    price_ht: 520,
    status: 'completed' as const,
    response_deadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  }
]

const statusFilters = [
  { value: 'all', label: 'Toutes', count: mockRequests.length },
  { value: 'pending', label: 'En attente', count: mockRequests.filter(r => r.status === 'pending').length },
  { value: 'accepted', label: 'Acceptées', count: mockRequests.filter(r => r.status === 'accepted').length },
  { value: 'refused', label: 'Refusées', count: mockRequests.filter(r => r.status === 'refused').length },
  { value: 'completed', label: 'Terminées', count: mockRequests.filter(r => r.status === 'completed').length }
]

export default function RequestsPage() {
  const [requests, setRequests] = useState(mockRequests)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = requests.filter(request => {
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter
    const matchesSearch = searchTerm === '' || 
      request.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.pickup_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.delivery_address.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Demandes</h1>
          <p className="text-gray-600">Gérez toutes les demandes de transport</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle demande
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher par numéro, contact, adresse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className="flex items-center space-x-1"
                >
                  <span>{filter.label}</span>
                  <Badge variant="secondary" className="ml-1">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredRequests.length} demande(s) trouvée(s)
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Trier par:</span>
          <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
            <option>Date de création</option>
            <option>Délai de réponse</option>
            <option>Montant</option>
            <option>Statut</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAcceptRequest}
              onRefuse={handleRefuseRequest}
              showActions={request.status === 'pending'}
            />
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune demande trouvée
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {filteredRequests.length > 10 && (
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </div>
      )}
    </div>
  )
}