import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Package, Euro } from 'lucide-react'
import { formatDate, formatCurrency, getTimeRemaining, getStatusColor, getStatusText } from '@/lib/utils'

interface TransportRequest {
  id: string
  order_number: string
  pickup_address: string
  delivery_address: string
  contact_name: string | null
  contact_phone: string | null
  goods_description: string | null
  total_weight: number | null
  price_ht: number | null
  status: 'pending' | 'accepted' | 'refused' | 'completed' | 'cancelled'
  response_deadline: string
  created_at: string
}

interface RequestCardProps {
  request: TransportRequest
  onAccept?: (id: string) => void
  onRefuse?: (id: string) => void
  onViewDetails?: (id: string) => void
  showActions?: boolean
}

export function RequestCard({ 
  request, 
  onAccept, 
  onRefuse, 
  onViewDetails,
  showActions = false 
}: RequestCardProps) {
  const timeRemaining = getTimeRemaining(request.response_deadline)
  
  return (
    <Card className="hover:shadow-md transition-shadow">
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
            {showActions && request.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRefuse?.(request.id)}
                >
                  Refuser
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAccept?.(request.id)}
                >
                  Accepter
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onViewDetails?.(request.id)}
            >
              Détails
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}