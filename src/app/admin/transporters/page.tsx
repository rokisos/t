'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  Truck,
  MapPin,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

// Données de démonstration des transporteurs
const mockTransporters = [
  {
    id: '1',
    companyName: 'Transport Express SARL',
    contactName: 'Jean Transporteur',
    email: 'jean@transport-express.com',
    phone: '06 12 34 56 78',
    coverageZones: ['Île-de-France', 'Centre-Val de Loire'],
    vehicleTypes: ['Fourgon', 'Camion 3.5T'],
    responseDelayHours: 2,
    rating: 4.7,
    totalDeliveries: 156,
    acceptanceRate: 92,
    avgResponseTime: '1.8h',
    isActive: true,
    lastActivity: '2024-06-14T10:30:00Z'
  },
  {
    id: '2',
    companyName: 'TRADIFRET',
    contactName: 'Marie Dupont',
    email: 'marie@tradifret.com',
    phone: '06 98 76 54 32',
    coverageZones: ['PACA', 'Occitanie'],
    vehicleTypes: ['Camion 7.5T', 'Camion 19T'],
    responseDelayHours: 4,
    rating: 4.3,
    totalDeliveries: 234,
    acceptanceRate: 88,
    avgResponseTime: '3.2h',
    isActive: true,
    lastActivity: '2024-06-14T09:15:00Z'
  },
  {
    id: '3',
    companyName: 'Rapid Transport',
    contactName: 'Pierre Martin',
    email: 'pierre@rapid-transport.com',
    phone: '06 55 66 77 88',
    coverageZones: ['Nouvelle-Aquitaine', 'Pays de la Loire'],
    vehicleTypes: ['Fourgon', 'Camion 3.5T', 'Camion 7.5T'],
    responseDelayHours: 3,
    rating: 4.5,
    totalDeliveries: 189,
    acceptanceRate: 85,
    avgResponseTime: '2.5h',
    isActive: false,
    lastActivity: '2024-06-12T16:45:00Z'
  },
  {
    id: '4',
    companyName: 'Speed Trans',
    contactName: 'Sophie Bernard',
    email: 'sophie@speed-trans.com',
    phone: '06 33 44 55 66',
    coverageZones: ['Hauts-de-France', 'Grand Est'],
    vehicleTypes: ['Fourgon', 'Camion 3.5T'],
    responseDelayHours: 2,
    rating: 4.8,
    totalDeliveries: 98,
    acceptanceRate: 95,
    avgResponseTime: '1.5h',
    isActive: true,
    lastActivity: '2024-06-14T11:20:00Z'
  }
]

export default function AdminTransportersPage() {
  const [transporters, setTransporters] = useState(mockTransporters)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTransporters = transporters.filter(transporter => {
    const matchesSearch = searchTerm === '' || 
      transporter.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transporter.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transporter.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'active' && transporter.isActive) ||
      (filterStatus === 'inactive' && !transporter.isActive)
    
    return matchesSearch && matchesFilter
  })

  const toggleTransporterStatus = (id: string) => {
    setTransporters(prev => prev.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getLastActivityText = (lastActivity: string) => {
    const now = new Date()
    const activity = new Date(lastActivity)
    const diffHours = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'À l\'instant'
    if (diffHours < 24) return `Il y a ${diffHours}h`
    const diffDays = Math.floor(diffHours / 24)
    return `Il y a ${diffDays}j`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Transporteurs</h1>
          <p className="text-gray-600">Gérez votre réseau de transporteurs partenaires</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un transporteur
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, entreprise, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filterStatus === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                Tous ({transporters.length})
              </Button>
              <Button
                variant={filterStatus === 'active' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Actifs ({transporters.filter(t => t.isActive).length})
              </Button>
              <Button
                variant={filterStatus === 'inactive' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus('inactive')}
              >
                Inactifs ({transporters.filter(t => !t.isActive).length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transporters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTransporters.map((transporter) => (
          <Card key={transporter.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{transporter.companyName}</CardTitle>
                    <p className="text-sm text-gray-600">{transporter.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={transporter.isActive ? "default" : "secondary"}>
                    {transporter.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.floor(transporter.rating))}
                    <span className="text-sm font-medium">{transporter.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{transporter.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{transporter.phone}</span>
                </div>
              </div>

              {/* Coverage Zones */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Zones de couverture</p>
                <div className="flex flex-wrap gap-1">
                  {transporter.coverageZones.map((zone, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <MapPin className="mr-1 h-3 w-3" />
                      {zone}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Vehicle Types */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Types de véhicules</p>
                <div className="flex flex-wrap gap-1">
                  {transporter.vehicleTypes.map((vehicle, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {vehicle}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{transporter.totalDeliveries}</p>
                  <p className="text-xs text-gray-500">Livraisons</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{transporter.acceptanceRate}%</p>
                  <p className="text-xs text-gray-500">Acceptation</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{transporter.avgResponseTime}</p>
                  <p className="text-xs text-gray-500">Réponse moy.</p>
                </div>
              </div>

              {/* Response Delay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Délai de réponse: {transporter.responseDelayHours}h</span>
                </div>
                <span className="text-xs text-gray-500">
                  {getLastActivityText(transporter.lastActivity)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Modifier
                  </Button>
                  <Button 
                    size="sm" 
                    variant={transporter.isActive ? "outline" : "default"}
                    onClick={() => toggleTransporterStatus(transporter.id)}
                  >
                    {transporter.isActive ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
                <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTransporters.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun transporteur trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche ou d'ajouter un nouveau transporteur.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un transporteur
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{transporters.filter(t => t.isActive).length}</p>
                <p className="text-sm text-gray-600">Transporteurs actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(transporters.reduce((sum, t) => sum + t.acceptanceRate, 0) / transporters.length)}%
                </p>
                <p className="text-sm text-gray-600">Taux d'acceptation moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">2.3h</p>
                <p className="text-sm text-gray-600">Temps de réponse moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{transporters.filter(t => !t.isActive).length}</p>
                <p className="text-sm text-gray-600">Transporteurs inactifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}