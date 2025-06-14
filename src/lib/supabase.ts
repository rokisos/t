import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function createSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'transporter'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'admin' | 'transporter'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'transporter'
          created_at?: string
          updated_at?: string
        }
      }
      transporters: {
        Row: {
          id: string
          profile_id: string
          company_name: string
          contact_phone: string | null
          coverage_zones: string[]
          vehicle_types: string[]
          response_delay_hours: number
          is_active: boolean
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          company_name: string
          contact_phone?: string | null
          coverage_zones?: string[]
          vehicle_types?: string[]
          response_delay_hours?: number
          is_active?: boolean
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          company_name?: string
          contact_phone?: string | null
          coverage_zones?: string[]
          vehicle_types?: string[]
          response_delay_hours?: number
          is_active?: boolean
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      transport_requests: {
        Row: {
          id: string
          order_number: string
          assigned_transporter_id: string | null
          pickup_address: string
          delivery_address: string
          contact_name: string | null
          contact_phone: string | null
          request_date: string
          goods_description: string | null
          total_weight: number | null
          price_ht: number | null
          special_instructions: string | null
          status: 'pending' | 'accepted' | 'refused' | 'completed' | 'cancelled'
          response_deadline: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          assigned_transporter_id?: string | null
          pickup_address: string
          delivery_address: string
          contact_name?: string | null
          contact_phone?: string | null
          request_date: string
          goods_description?: string | null
          total_weight?: number | null
          price_ht?: number | null
          special_instructions?: string | null
          status?: 'pending' | 'accepted' | 'refused' | 'completed' | 'cancelled'
          response_deadline: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          assigned_transporter_id?: string | null
          pickup_address?: string
          delivery_address?: string
          contact_name?: string | null
          contact_phone?: string | null
          request_date?: string
          goods_description?: string | null
          total_weight?: number | null
          price_ht?: number | null
          special_instructions?: string | null
          status?: 'pending' | 'accepted' | 'refused' | 'completed' | 'cancelled'
          response_deadline?: string
          created_at?: string
          updated_at?: string
        }
      }
      transport_responses: {
        Row: {
          id: string
          request_id: string
          transporter_id: string
          response_type: 'accepted' | 'refused' | 'delay_request'
          scheduled_date: string | null
          refusal_reason: string | null
          comments: string | null
          created_at: string
        }
        Insert: {
          id?: string
          request_id: string
          transporter_id: string
          response_type: 'accepted' | 'refused' | 'delay_request'
          scheduled_date?: string | null
          refusal_reason?: string | null
          comments?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          request_id?: string
          transporter_id?: string
          response_type?: 'accepted' | 'refused' | 'delay_request'
          scheduled_date?: string | null
          refusal_reason?: string | null
          comments?: string | null
          created_at?: string
        }
      }
    }
  }
}