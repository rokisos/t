'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  Plus,
  Edit
} from 'lucide-react'

// Données de démonstration pour le scan email
const mockEmailScans = [
  {
    id: '1',
    subject: 'Demande de transport TRADIFRET - TR-2024-001',
    sender: 'noreply@tradifret.com',
    receivedAt: '2024-06-14T10:30:00Z',
    status: 'processed',
    extractedData: {
      orderNumber: 'TR-2024-001',
      transporter: 'TRADIFRET',
      pickupAddress: '123 Rue de la Paix, Paris 75001',
      deliveryAddress: '456 Avenue des Champs, Lyon 69000',
      contactName: 'Jean Dupont',
      contactPhone: '06 12 34 56 78',
      weight: 150,
      priceHT: 450,
      description: 'Matériel informatique'
    },
    confidence: 95
  },
  {
    id: '2',
    subject: 'Transport urgent - Commande #TR-2024-002',
    sender: 'orders@express-transport.com',
    receivedAt: '2024-06-14T09:15:00Z',
    status: 'failed',
    error: 'Format d\'email non reconnu',
    confidence: 0
  },
  {
    id: '3',
    subject: 'Nouvelle mission TRADIFRET - TR-2024-003',
    sender: 'noreply@tradifret.com',
    receivedAt: '2024-06-14T08:45:00Z',
    status: 'pending',
    confidence: 0
  },
  {
    id: '4',
    subject: 'Demande transport - TR-2024-004',
    sender: 'noreply@tradifret.com',
    receivedAt: '2024-06-14T08:20:00Z',
    status: 'processed',
    extractedData: {
      orderNumber: 'TR-2024-004',
      transporter: 'TRADIFRET',
      pickupAddress: '42 Boulevard Haussmann, Paris 75009',
      deliveryAddress: '67 Cours Mirabeau, Aix-en-Provence 13100',
      contactName: 'Pierre Moreau',
      contactPhone: '06 55 66 77 88',
      weight: 200,
      priceHT: 520,
      description: 'Pièces automobiles'
    },
    confidence: 88
  }
]

const mockScanConfig = {
  isActive: true,
  scanInterval: 5, // minutes
  emailHost: 'imap.gmail.com',
  emailPort: 993,
  emailUser: 'scan@transportpro.com',
  lastScan: '2024-06-14T10:35:00Z',
  totalScanned: 1247,
  successRate: 87
}

export default function AdminEmailScanPage() {
  const [scans, setScans] = useState(mockEmailScans)
  const [config, setConfig] = useState(mockScanConfig)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedScan, setSelectedScan] = useState<any>(null)
  const [showConfig, setShowConfig] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleManualScan = async () => {
    setIsScanning(true)
    // Simulation du scan
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsScanning(false)
    
    // Ajouter un nouvel email scanné
    const newScan = {
      id: Date.now().toString(),
      subject: 'Nouvelle demande TRADIFRET - TR-2024-005',
      sender: 'noreply@tradifret.com',
      receivedAt: new Date().toISOString(),
      status: 'processed',
      extractedData: {
        orderNumber: 'TR-2024-005',
        transporter: 'TRADIFRET',
        pickupAddress: '25 Rue du Commerce, Lyon 69002',
        deliveryAddress: '78 Avenue de la Liberté, Toulouse 31000',
        contactName: 'Claire Bernard',
        contactPhone: '06 77 88 99 00',
        weight: 300,
        priceHT: 680,
        description: 'Mobilier de bureau'
      },
      confidence: 92
    }
    setScans(prev => [newScan, ...prev])
  }

  const toggleScanService = () => {
    setConfig(prev => ({ ...prev, isActive: !prev.isActive }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scan Email Automatique</h1>
          <p className="text-gray-600">Surveillance et extraction automatique des demandes de transport</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowConfig(!showConfig)}>
            <Settings className="mr-2 h-4 w-4" />
            Configuration
          </Button>
          <Button onClick={handleManualScan} disabled={isScanning}>
            {isScanning ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            {isScanning ? 'Scan en cours...' : 'Scan manuel'}
          </Button>
        </div>
      </div>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Service de scan</p>
                <p className="text-lg font-semibold">
                  {config.isActive ? 'Actif' : 'Inactif'}
                </p>
              </div>
              <Button
                size="sm"
                variant={config.isActive ? "default" : "outline"}
                onClick={toggleScanService}
              >
                {config.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{config.totalScanned}</p>
                <p className="text-sm text-gray-600">Emails scannés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{config.successRate}%</p>
                <p className="text-sm text-gray-600">Taux de succès</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{config.scanInterval}min</p>
                <p className="text-sm text-gray-600">Intervalle de scan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Panel */}
      {showConfig && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration du scan email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serveur IMAP
                </label>
                <Input value={config.emailHost} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Port
                </label>
                <Input value={config.emailPort} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compte email
                </label>
                <Input value={config.emailUser} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intervalle (minutes)
                </label>
                <Input 
                  type="number" 
                  value={config.scanInterval}
                  onChange={(e) => setConfig(prev => ({ ...prev, scanInterval: parseInt(e.target.value) }))}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button>Sauvegarder la configuration</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Scans List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Emails récents</CardTitle>
            <div className="text-sm text-gray-500">
              Dernier scan: {new Date(config.lastScan).toLocaleString('fr-FR')}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scans.map((scan) => (
              <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(scan.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{scan.subject}</h4>
                      <p className="text-sm text-gray-600">De: {scan.sender}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(scan.status)}>
                      {scan.status === 'processed' ? 'Traité' : 
                       scan.status === 'failed' ? 'Échec' : 'En attente'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(scan.receivedAt).toLocaleString('fr-FR')}
                    </span>
                  </div>
                </div>

                {scan.status === 'processed' && scan.extractedData && (
                  <div className="mt-3 p-3 bg-green-50 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Commande:</span> {scan.extractedData.orderNumber}
                      </div>
                      <div>
                        <span className="font-medium">Transporteur:</span> {scan.extractedData.transporter}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {scan.extractedData.contactName}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">Enlèvement:</span> {scan.extractedData.pickupAddress}
                      </div>
                      <div>
                        <span className="font-medium">Poids:</span> {scan.extractedData.weight}kg
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">Livraison:</span> {scan.extractedData.deliveryAddress}
                      </div>
                      <div>
                        <span className="font-medium">Prix HT:</span> {scan.extractedData.priceHT}€
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-green-700">
                        Confiance: {scan.confidence}%
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-4 w-4" />
                          Voir détails
                        </Button>
                        <Button size="sm">
                          Créer demande
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {scan.status === 'failed' && scan.error && (
                  <div className="mt-3 p-3 bg-red-50 rounded-md">
                    <p className="text-sm text-red-700">
                      <AlertTriangle className="inline h-4 w-4 mr-1" />
                      Erreur: {scan.error}
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline">
                        Réessayer l'extraction
                      </Button>
                    </div>
                  </div>
                )}

                {scan.status === 'pending' && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-700">
                      <Clock className="inline h-4 w-4 mr-1" />
                      En attente de traitement...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Templates de reconnaissance */}
      <Card>
        <CardHeader>
          <CardTitle>Templates de reconnaissance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium">TRADIFRET Standard</h4>
                <p className="text-sm text-gray-600">Template pour les emails TRADIFRET classiques</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default">Actif</Badge>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium">Express Transport</h4>
                <p className="text-sm text-gray-600">Template pour Express Transport</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Inactif</Badge>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}