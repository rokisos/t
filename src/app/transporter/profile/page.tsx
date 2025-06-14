'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Truck, 
  Star,
  Edit,
  Save,
  X,
  Building,
  Clock,
  Award
} from 'lucide-react'

// Données de profil de démonstration
const mockProfile = {
  id: '1',
  email: 'transporteur@transportpro.com',
  fullName: 'Jean Transporteur',
  companyName: 'Transport Express SARL',
  phone: '06 12 34 56 78',
  address: '123 Rue du Transport, 75001 Paris',
  siret: '12345678901234',
  coverageZones: ['Île-de-France', 'Centre-Val de Loire', 'Bourgogne-Franche-Comté'],
  vehicleTypes: ['Fourgon', 'Camion 3.5T', 'Camion 7.5T'],
  responseDelayHours: 2,
  rating: 4.7,
  totalDeliveries: 156,
  acceptanceRate: 92,
  avgResponseTime: '1.8h',
  joinDate: '2023-03-15'
}

const mockReviews = [
  {
    id: '1',
    orderNumber: 'TR-2024-001',
    rating: 5,
    comment: 'Livraison parfaite, transporteur très professionnel et ponctuel.',
    date: '2024-06-10',
    client: 'Jean D.'
  },
  {
    id: '2',
    orderNumber: 'TR-2024-002',
    rating: 4,
    comment: 'Bonne prestation, quelques minutes de retard mais bien géré.',
    date: '2024-06-08',
    client: 'Marie M.'
  },
  {
    id: '3',
    orderNumber: 'TR-2024-003',
    rating: 5,
    comment: 'Excellent service, marchandises livrées en parfait état.',
    date: '2024-06-05',
    client: 'Pierre L.'
  }
]

export default function TransporterProfilePage() {
  const [profile, setProfile] = useState(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(mockProfile)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.fullName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{profile.phone}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{profile.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations entreprise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Informations entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'entreprise
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.companyName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIRET
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.siret}
                      onChange={(e) => handleInputChange('siret', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.siret}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Délai de réponse (heures)
                  </label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedProfile.responseDelayHours}
                      onChange={(e) => handleInputChange('responseDelayHours', parseInt(e.target.value))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{profile.responseDelayHours}h</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zones de couverture
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedProfile.coverageZones.map((zone, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={zone}
                          onChange={(e) => {
                            const newZones = [...editedProfile.coverageZones]
                            newZones[index] = e.target.value
                            handleInputChange('coverageZones', newZones)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newZones = editedProfile.coverageZones.filter((_, i) => i !== index)
                            handleInputChange('coverageZones', newZones)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleInputChange('coverageZones', [...editedProfile.coverageZones, ''])
                      }}
                    >
                      Ajouter une zone
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.coverageZones.map((zone, index) => (
                      <Badge key={index} variant="secondary">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Types de véhicules
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedProfile.vehicleTypes.map((vehicle, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={vehicle}
                          onChange={(e) => {
                            const newVehicles = [...editedProfile.vehicleTypes]
                            newVehicles[index] = e.target.value
                            handleInputChange('vehicleTypes', newVehicles)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newVehicles = editedProfile.vehicleTypes.filter((_, i) => i !== index)
                            handleInputChange('vehicleTypes', newVehicles)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleInputChange('vehicleTypes', [...editedProfile.vehicleTypes, ''])
                      }}
                    >
                      Ajouter un véhicule
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.vehicleTypes.map((vehicle, index) => (
                      <Badge key={index} variant="outline" className="flex items-center">
                        <Truck className="mr-1 h-3 w-3" />
                        {vehicle}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques et évaluations */}
        <div className="space-y-6">
          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Performances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {renderStars(Math.floor(profile.rating))}
                  <span className="ml-2 text-lg font-semibold">{profile.rating}</span>
                </div>
                <p className="text-sm text-gray-600">Note moyenne</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Livraisons totales</span>
                  <span className="font-medium">{profile.totalDeliveries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taux d'acceptation</span>
                  <span className="font-medium">{profile.acceptanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Temps de réponse moyen</span>
                  <span className="font-medium">{profile.avgResponseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Membre depuis</span>
                  <span className="font-medium">
                    {new Date(profile.joinDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Évaluations récentes */}
          <Card>
            <CardHeader>
              <CardTitle>Évaluations récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{review.orderNumber}</span>
                      <span>{review.client}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}