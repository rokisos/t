'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  CogIcon,
  EnvelopeIcon,
  ClockIcon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // Paramètres généraux
    companyName: 'TransportPro',
    companyEmail: 'contact@transportpro.com',
    companyPhone: '+33 1 23 45 67 89',
    timezone: 'Europe/Paris',
    
    // Paramètres email
    emailScanInterval: 5,
    emailProvider: 'gmail',
    emailAddress: 'scan@transportpro.com',
    emailPassword: '',
    
    // Paramètres délais
    defaultResponseTime: 2,
    urgentResponseTime: 1,
    maxRelances: 3,
    reassignmentDelay: 24,
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    
    // Sécurité
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    auditLogs: true
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const tabs = [
    { id: 'general', name: 'Général', icon: CogIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'delays', name: 'Délais', icon: ClockIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Sécurité', icon: ShieldCheckIcon },
    { id: 'users', name: 'Utilisateurs', icon: UserGroupIcon }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Configurez votre plateforme de transport</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Annuler
          </Button>
          <Button>
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.name}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise
                    </label>
                    <Input
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange('companyName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contact
                    </label>
                    <Input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <Input
                      value={settings.companyPhone}
                      onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau horaire
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    >
                      <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                      <option value="Europe/London">Europe/London (UTC+0)</option>
                      <option value="America/New_York">America/New_York (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Email</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fournisseur email
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={settings.emailProvider}
                        onChange={(e) => handleSettingChange('emailProvider', e.target.value)}
                      >
                        <option value="gmail">Gmail</option>
                        <option value="outlook">Outlook</option>
                        <option value="imap">IMAP Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intervalle de scan (minutes)
                      </label>
                      <Input
                        type="number"
                        value={settings.emailScanInterval}
                        onChange={(e) => handleSettingChange('emailScanInterval', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email de scan
                    </label>
                    <Input
                      type="email"
                      value={settings.emailAddress}
                      onChange={(e) => handleSettingChange('emailAddress', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe / Token
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={settings.emailPassword}
                      onChange={(e) => handleSettingChange('emailPassword', e.target.value)}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test de connexion</h3>
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    Tester la connexion
                  </Button>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-600">Dernière connexion réussie il y a 5 minutes</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'delays' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Délais de réponse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai standard (heures)
                    </label>
                    <Input
                      type="number"
                      value={settings.defaultResponseTime}
                      onChange={(e) => handleSettingChange('defaultResponseTime', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai urgent (heures)
                    </label>
                    <Input
                      type="number"
                      value={settings.urgentResponseTime}
                      onChange={(e) => handleSettingChange('urgentResponseTime', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre max de relances
                    </label>
                    <Input
                      type="number"
                      value={settings.maxRelances}
                      onChange={(e) => handleSettingChange('maxRelances', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai avant réassignation (heures)
                    </label>
                    <Input
                      type="number"
                      value={settings.reassignmentDelay}
                      onChange={(e) => handleSettingChange('reassignmentDelay', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres par transporteur</h3>
                <div className="space-y-4">
                  {['TRADIFRET', 'LOGISTRANS', 'RAPIDEX'].map((transporter) => (
                    <div key={transporter} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{transporter}</h4>
                        <p className="text-sm text-gray-600">Délai personnalisé</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Délai (h)</label>
                          <Input className="w-20" type="number" defaultValue="2" />
                        </div>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de notification</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Notifications par email', description: 'Recevoir les alertes par email' },
                    { key: 'smsNotifications', label: 'Notifications SMS', description: 'Recevoir les alertes urgentes par SMS' },
                    { key: 'pushNotifications', label: 'Notifications push', description: 'Notifications dans le navigateur' },
                    { key: 'adminAlerts', label: 'Alertes administrateur', description: 'Alertes pour les actions critiques' }
                  ].map((notification) => (
                    <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.label}</h4>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[notification.key as keyof typeof settings] as boolean}
                          onChange={(e) => handleSettingChange(notification.key, e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de sécurité</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Authentification à deux facteurs</h4>
                      <p className="text-sm text-gray-600">Sécurité renforcée pour tous les comptes</p>
                    </div>
                    <Badge variant={settings.twoFactorAuth ? 'success' : 'secondary'}>
                      {settings.twoFactorAuth ? 'Activé' : 'Désactivé'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeout de session (minutes)
                      </label>
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Politique de mot de passe
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={settings.passwordPolicy}
                        onChange={(e) => handleSettingChange('passwordPolicy', e.target.value)}
                      >
                        <option value="basic">Basique (8 caractères)</option>
                        <option value="strong">Fort (12 caractères + symboles)</option>
                        <option value="enterprise">Entreprise (16 caractères + complexité)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Logs et audit</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Logs d'audit</h4>
                      <p className="text-sm text-gray-600">Enregistrer toutes les actions utilisateur</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.auditLogs}
                        onChange={(e) => handleSettingChange('auditLogs', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      Télécharger les logs
                    </Button>
                    <Button variant="outline">
                      Purger les anciens logs
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gestion des utilisateurs</h3>
                  <Button>
                    Ajouter un utilisateur
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Admin Principal', email: 'admin@transportpro.com', role: 'Administrateur', status: 'Actif' },
                    { name: 'Jean Dupont', email: 'jean@transportpro.com', role: 'Gestionnaire', status: 'Actif' },
                    { name: 'Marie Martin', email: 'marie@transportpro.com', role: 'Opérateur', status: 'Inactif' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant={user.status === 'Actif' ? 'success' : 'secondary'}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}