export interface UserPreference {
    interests: string[];
    subjects: {
        math: number;
        science: number;
        language: number;
        social: number;
        art: number;
    };
    careerGoals: string[];
    personality: string[];
}

export interface RecommendationResult {
    collegeName: string;
    matchScore: number;
    reasons: string[];
} 