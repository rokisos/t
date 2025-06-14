'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Truck, Eye, EyeOff } from 'lucide-react'

export default function TransporterLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulation de l'authentification
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Compte de démonstration transporteur
      if (email === 'transporteur@transportpro.com' && password === 'transport123') {
        // Stocker les informations de session
        localStorage.setItem('userType', 'transporter')
        localStorage.setItem('userEmail', email)
        localStorage.setItem('isAuthenticated', 'true')
        
        // Rediriger vers le dashboard transporteur
        router.push('/transporter')
      } else {
        setError('Email ou mot de passe incorrect')
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Truck className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">TransportPro</h1>
          </div>
          <p className="text-gray-600">Espace Transporteur</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion Transporteur</CardTitle>
            <CardDescription>
              Accédez à votre espace de gestion des demandes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Erreur */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Bouton de connexion */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Compte de démonstration */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Compte de démonstration :</h4>
              <div className="text-xs text-gray-600">
                <strong>Email:</strong> transporteur@transportpro.com<br />
                <strong>Mot de passe:</strong> transport123
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lien admin */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/admin')}
            className="text-gray-600"
          >
            Accès administrateur →
          </Button>
        </div>
      </div>
    </div>
  )
}