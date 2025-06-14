'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Clock, 
  Package, 
  Euro, 
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { formatDate, formatCurrency, getTimeRemaining, getStatusColor, getStatusText } from '@/lib/utils'

// Modal pour accepter une demande
function AcceptRequestModal({ 
  request, 
  isOpen, 
  onClose, 
  onConfirm 
}: { 
  request: any, 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: (date: string, comment: string) => void 
}) {
  const [selectedDate, setSelectedDate] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate) {
      onConfirm(selectedDate, comment)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Accepter la demande #{request?.order_number}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de livraison prévue *
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commentaire (optionnel)
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Informations complémentaires..."
              />
            </div>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Confirmer l'acceptation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Modal pour refuser une demande
function RefuseRequestModal({ 
  request, 
  isOpen, 
  onClose, 
  onConfirm 
}: { 
  request: any, 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: (reason: string, comment: string) => void 
}) {
  const [reason, setReason] = useState('')
  const [comment, setComment] = useState('')

  const refusalReasons = [
    'Véhicule non disponible',
    'Zone géographique non couverte',
    'Tarif insuffisant',
    'Surcharge temporaire',
    'Type de marchandise non adapté',
    'Autre'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reason) {
      onConfirm(reason, comment)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Refuser la demande #{request?.order_number}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Raison du refus *
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="">Sélectionner une raison</option>
                {refusalReasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commentaire {reason === 'Autre' ? '*' : '(optionnel)'}
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Précisez la raison..."
                required={reason === 'Autre'}
              />
            </div>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" variant="destructive" className="flex-1">
                Confirmer le refus
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const mockRequests = [
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
  },
  {
    id: '3',
    order_number: 'TR-2024-005',
    pickup_address: '25 Rue du Commerce, Lyon 69002',
    delivery_address: '78 Avenue de la Liberté, Toulouse 31000',
    contact_name: 'Claire Bernard',
    contact_phone: '06 77 88 99 00',
    goods_description: 'Mobilier de bureau',
    total_weight: 300,
    price_ht: 680,
    status: 'accepted' as const,
    response_deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
]

export default function TransporterRequestsPage() {
  const [requests, setRequests] = useState(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRefuseModal, setShowRefuseModal] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true
    return request.status === filter
  })

  const handleAcceptRequest = (request: any) => {
    setSelectedRequest(request)
    setShowAcceptModal(true)
  }

  const handleRefuseRequest = (request: any) => {
    setSelectedRequest(request)
    setShowRefuseModal(true)
  }

  const confirmAccept = (date: string, comment: string) => {
    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: 'accepted' as const, scheduled_date: date, comments: comment }
        : req
    ))
    setSelectedRequest(null)
  }

  const confirmRefuse = (reason: string, comment: string) => {
    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: 'refused' as const, refusal_reason: reason, comments: comment }
        : req
    ))
    setSelectedRequest(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Demandes</h1>
          <p className="text-gray-600">Gérez vos demandes de transport</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-2">
            {[
              { value: 'all', label: 'Toutes', count: requests.length },
              { value: 'pending', label: 'En attente', count: requests.filter(r => r.status === 'pending').length },
              { value: 'accepted', label: 'Acceptées', count: requests.filter(r => r.status === 'accepted').length },
              { value: 'refused', label: 'Refusées', count: requests.filter(r => r.status === 'refused').length }
            ].map((filterOption) => (
              <Button
                key={filterOption.value}
                variant={filter === filterOption.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.value)}
                className="flex items-center space-x-1"
              >
                <span>{filterOption.label}</span>
                <Badge variant="secondary" className="ml-1">
                  {filterOption.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const timeRemaining = getTimeRemaining(request.response_deadline)
          
          return (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Commande #{request.order_number}
                  </CardTitle>
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                </div>
                {request.status === 'pending' && (
                  <div className={`flex items-center space-x-1 text-sm ${
                    timeRemaining.expired ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    <Clock className="h-4 w-4" />
                    <span>{timeRemaining.text}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Enlèvement</p>
                        <p className="text-sm font-medium">{request.pickup_address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Livraison</p>
                        <p className="text-sm font-medium">{request.delivery_address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {request.contact_name && (
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="text-sm font-medium">{request.contact_name}</p>
                        {request.contact_phone && (
                          <p className="text-sm text-gray-600">{request.contact_phone}</p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      {request.total_weight && (
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{request.total_weight}kg</span>
                        </div>
                      )}
                      
                      {request.price_ht && (
                        <div className="flex items-center space-x-1">
                          <Euro className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">
                            {formatCurrency(request.price_ht)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {request.goods_description && (
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm">{request.goods_description}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Créée le {formatDate(request.created_at)}
                  </p>
                  
                  <div className="flex space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRefuseRequest(request)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Refuser
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAcceptRequest(request)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Accepter
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost">
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modals */}
      <AcceptRequestModal
        request={selectedRequest}
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={confirmAccept}
      />

      <RefuseRequestModal
        request={selectedRequest}
        isOpen={showRefuseModal}
        onClose={() => setShowRefuseModal(false)}
        onConfirm={confirmRefuse}
      />
    </div>
  )
}