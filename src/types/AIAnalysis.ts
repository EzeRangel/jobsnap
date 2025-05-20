export interface MatchDetails {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  keywordScore: number;
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
  exceededRequirements: string[];
}

export interface SkillMatch {
  required: boolean;
  match: boolean;
  importance: "low" | "medium" | "high" | "critical";
  yearsExperience?: number;
  confidence: number; // 0-1, confianza de la IA en la extracción
}

export interface ExperienceMatch {
  required: number; // años requeridos
  actual: number; // años actuales
  match: number; // porcentaje de match
  relevance: number; // qué tan relevante es (0-1)
}

export interface EducationMatch {
  required: string; // nivel requerido
  actual: string; // nivel actual
  match: boolean;
  fieldMatch?: boolean; // si el campo de estudio coincide
}

export interface Recommendation {
  type:
    | "skill"
    | "experience"
    | "education"
    | "keyword"
    | "format"
    | "emphasis";
  priority: "low" | "medium" | "high";
  description: string;
  action: string;
  impact: string; // descripción del impacto esperado
}
