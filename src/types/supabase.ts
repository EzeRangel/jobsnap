export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      CVS: {
        Row: {
          created_at: string
          embedding: number[] | null
          file_size: number | null
          file_type: string | null
          filename: string | null
          id: number
          is_active: boolean
          parsed_data: Json | null
          raw_file_url: string | null
          updated_at: string
          user_id: string
          version: number | null
        }
        Insert: {
          created_at?: string
          embedding?: number[] | null
          file_size?: number | null
          file_type?: string | null
          filename?: string | null
          id?: number
          is_active?: boolean
          parsed_data?: Json | null
          raw_file_url?: string | null
          updated_at?: string
          user_id?: string
          version?: number | null
        }
        Update: {
          created_at?: string
          embedding?: number[] | null
          file_size?: number | null
          file_type?: string | null
          filename?: string | null
          id?: number
          is_active?: boolean
          parsed_data?: Json | null
          raw_file_url?: string | null
          updated_at?: string
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      JobAnalyses: {
        Row: {
          ai_model_version: string | null
          ai_prompt: string | null
          analysis_date: string
          created_at: string
          cv_id: number | null
          education_match: Json
          experience_match: Json
          id: number
          is_archived: boolean
          job_posting_id: number
          keyword_suggestions: Json | null
          match_details: Json
          match_score: number
          notes: string | null
          priority_areas: string[]
          recommendations: Json
          skills_match: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_model_version?: string | null
          ai_prompt?: string | null
          analysis_date?: string
          created_at?: string
          cv_id?: number | null
          education_match?: Json
          experience_match?: Json
          id?: number
          is_archived?: boolean
          job_posting_id: number
          keyword_suggestions?: Json | null
          match_details?: Json
          match_score: number
          notes?: string | null
          priority_areas: string[]
          recommendations?: Json
          skills_match?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_model_version?: string | null
          ai_prompt?: string | null
          analysis_date?: string
          created_at?: string
          cv_id?: number | null
          education_match?: Json
          experience_match?: Json
          id?: number
          is_archived?: boolean
          job_posting_id?: number
          keyword_suggestions?: Json | null
          match_details?: Json
          match_score?: number
          notes?: string | null
          priority_areas?: string[]
          recommendations?: Json
          skills_match?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "JobAnalyses_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "CVS"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JobAnalyses_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "JobPostings"
            referencedColumns: ["id"]
          },
        ]
      }
      JobCategories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          keywords: string[] | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          keywords?: string[] | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          keywords?: string[] | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      JobPostings: {
        Row: {
          category_id: number | null
          company_name: string | null
          created_at: string
          id: number
          job_description: string
          job_location: string | null
          job_requirements: Json | null
          job_title: string
          job_type: string | null
          salary: string | null
          source_url: string | null
        }
        Insert: {
          category_id?: number | null
          company_name?: string | null
          created_at?: string
          id?: number
          job_description: string
          job_location?: string | null
          job_requirements?: Json | null
          job_title: string
          job_type?: string | null
          salary?: string | null
          source_url?: string | null
        }
        Update: {
          category_id?: number | null
          company_name?: string | null
          created_at?: string
          id?: number
          job_description?: string
          job_location?: string | null
          job_requirements?: Json | null
          job_title?: string
          job_type?: string | null
          salary?: string | null
          source_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "JobPostings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "JobCategories"
            referencedColumns: ["id"]
          },
        ]
      }
      TrendingSkills: {
        Row: {
          category: string
          count: number
          created_at: string
          id: number
          period_end: string | null
          period_start: string | null
          skill: string
        }
        Insert: {
          category: string
          count?: number
          created_at?: string
          id?: number
          period_end?: string | null
          period_start?: string | null
          skill: string
        }
        Update: {
          category?: string
          count?: number
          created_at?: string
          id?: number
          period_end?: string | null
          period_start?: string | null
          skill?: string
        }
        Relationships: []
      }
      UsersProfile: {
        Row: {
          created_at: string
          first_name: string | null
          id: number
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
