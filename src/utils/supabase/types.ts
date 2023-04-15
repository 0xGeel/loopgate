export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      content_types: {
        Row: {
          content_id: number
          content_name: string
        }
        Insert: {
          content_id?: number
          content_name: string
        }
        Update: {
          content_id?: number
          content_name?: string
        }
      }
      roles: {
        Row: {
          role_id: number
          role_name: string
        }
        Insert: {
          role_id?: number
          role_name: string
        }
        Update: {
          role_id?: number
          role_name?: string
        }
      }
      unlock_criteria: {
        Row: {
          id: number
          nft_id: string
          owner: string
          unlockable_id: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          nft_id: string
          owner: string
          unlockable_id: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          nft_id?: string
          owner?: string
          unlockable_id?: string
          updated_at?: string | null
        }
      }
      unlockables: {
        Row: {
          content_type_id: number
          content_url: string
          criteria_unlock_amount: number
          description: string | null
          id: string
          name: string | null
          owner: string
          updated_at: string | null
        }
        Insert: {
          content_type_id: number
          content_url: string
          criteria_unlock_amount: number
          description?: string | null
          id?: string
          name?: string | null
          owner: string
          updated_at?: string | null
        }
        Update: {
          content_type_id?: number
          content_url?: string
          criteria_unlock_amount?: number
          description?: string | null
          id?: string
          name?: string | null
          owner?: string
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          eth_address: string
          role_id: number
        }
        Insert: {
          eth_address: string
          role_id: number
        }
        Update: {
          eth_address?: string
          role_id?: number
        }
      }
    }
    Views: {
      unlockables_with_criteria: {
        Row: {
          content_url: string | null
          criteria_unlock_amount: number | null
          description: string | null
          id: string | null
          name: string | null
          nft_ids: string | null
          owner: string | null
          updated_at: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
