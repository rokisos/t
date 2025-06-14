'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ChartBarIcon, 
  TruckIcon, 
  ClockIcon, 
  CurrencyEuroIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

const monthlyData = [
  { month: 'Jan', demandes: 45, acceptees: 38, refusees: 7, ca: 12500 },
  { month: 'Fév', demandes: 52, acceptees: 44, refusees: 8, ca: 14200 },
  { month: 'Mar', demandes: 48, acceptees: 41, refusees: 7, ca: 13800 },
  { month: 'Avr', demandes: 61, acceptees: 53, refusees: 8, ca: 16900 },
  { month: 'Mai', demandes: 55, acceptees: 48, refusees: 7, ca: 15600 },
  { month: 'Juin', demandes: 67, acceptees: 58, refusees: 9, ca: 18400 }
]

const transporterPerformance = [
  { name: 'TRADIFRET', acceptation: 92, temps: 1.2, ca: 45000, color: '#10B981' },
  { name: 'LOGISTRANS', acceptation: 88, temps: 1.8, ca: 38000, color: '#3B82F6' },
  { name: 'RAPIDEX', acceptation: 85, temps: 2.1, ca: 32000, color: '#F59E0B' },
  { name: 'TRANSECO', acceptation: 78, temps: 3.2, ca: 28000, color: '#EF4444' }
]

const statusDistribution = [
  { name: 'Acceptées', value: 58, color: '#10B981' },
  { name: 'En attente', value: 12, color: '#F59E0B' },
  { name: 'Refusées', value: 9, color: '#EF4444' },
  { name: 'Terminées', value: 21, color: '#6B7280' }
]

const responseTimeData = [
  { heure: '0-1h', count: 45 },
  { heure: '1-2h', count: 32 },
  { heure: '2-4h', count: 18 },
  { heure: '4-8h', count: 12 },
  { heure: '+8h', count: 8 }
]

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h1>
          <p className="text-gray-600">Analysez les performances de votre plateforme</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['1m', '3m', '6m', '1a'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <DocumentArrowDownIcon className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPIs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Demandes totales</p>
              <p className="text-2xl font-bold text-gray-900">328</p>
              <div className="flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux d'acceptation</p>
              <p className="text-2xl font-bold text-gray-900">86.3%</p>
              <div className="flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+2.1%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TruckIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Temps de réponse moyen</p>
              <p className="text-2xl font-bold text-gray-900">1.8h</p>
              <div className="flex items-center mt-1">
                <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">-15min</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA généré</p>
              <p className="text-2xl font-bold text-gray-900">91.4K€</p>
              <div className="flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+18.2%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CurrencyEuroIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolution mensuelle */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution mensuelle</h3>
            <Badge variant="outline">6 derniers mois</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="demandes" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
                name="Demandes"
              />
              <Area 
                type="monotone" 
                dataKey="acceptees" 
                stackId="2"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
                name="Acceptées"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Répartition des statuts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Répartition des statuts</h3>
            <Badge variant="outline">Période actuelle</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance transporteurs */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance transporteurs</h3>
            <Badge variant="outline">Taux d'acceptation</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transporterPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value) => [`${value}%`, 'Taux d\'acceptation']} />
              <Bar dataKey="acceptation" fill="#10B981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Temps de réponse */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Distribution temps de réponse</h3>
            <Badge variant="outline">Derniers 30 jours</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="heure" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Performance Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance détaillée des transporteurs</h3>
          <Button variant="outline" size="sm">
            Voir tout
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transporteur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Taux d'acceptation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Temps moyen</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CA généré</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tendance</th>
              </tr>
            </thead>
            <tbody>
              {transporterPerformance.map((transporter) => (
                <tr key={transporter.name} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: transporter.color }}
                      />
                      <span className="font-medium text-gray-900">{transporter.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{transporter.acceptation}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${transporter.acceptation}%`,
                            backgroundColor: transporter.color
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{transporter.temps}h</td>
                  <td className="py-3 px-4 text-gray-900">{transporter.ca.toLocaleString()}€</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">+5.2%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}