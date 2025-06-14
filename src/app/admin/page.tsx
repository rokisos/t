'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Truck, Eye, EyeOff, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Vérifier si l'utilisateur est déjà connecté en tant qu'admin
  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    
    if (userType === 'admin' && isAuthenticated === 'true') {
      router.push('/admin/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulation de l'authentification
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Compte de démonstration admin
      if (email === 'admin@transportpro.com' && password === 'admin123') {
        // Stocker les informations de session
        localStorage.setItem('userType', 'admin')
        localStorage.setItem('userEmail', email)
        localStorage.setItem('isAuthenticated', 'true')
        
        // Rediriger vers le dashboard admin
        router.push('/admin/dashboard')
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-gray-700 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">TransportPro</h1>
          </div>
          <p className="text-gray-600">Administration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion Administrateur</CardTitle>
            <CardDescription>
              Accédez au back-office de gestion
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
                  placeholder="admin@transportpro.com"
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
              <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Compte de démonstration */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Compte de démonstration :</h4>
              <div className="text-xs text-gray-600">
                <strong>Email:</strong> admin@transportpro.com<br />
                <strong>Mot de passe:</strong> admin123
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lien retour */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-600"
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  )
}