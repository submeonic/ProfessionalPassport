// Folio data types

export type FolioStatus = "draft" | "active" | "archived";
export type CandidateTag = "shortlist" | "pass" | "neutral" | "annotated";

export interface Folio {
  id: string;
  roleTitle: string;
  department: string;
  requiredSkills: string[];
  experienceRange: [number, number]; // [min, max] years
  status: FolioStatus;
  createdDate: string;
  candidateIds: string[];
}

export interface CandidateAnnotation {
  candidateId: string;
  folioId: string;
  tags: CandidateTag[];
  notes: string;
  reviewedDate?: string;
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  skills: string[];
  keySkills: string[];
  // Reference to their passport data
  passportData: any;
}

export interface FolioFormData {
  roleTitle: string;
  department: string;
  requiredSkills: string[];
  experienceRange: [number, number];
}

export interface FoliosData {
  folios: Folio[];
  candidates: Candidate[];
  annotations: Record<string, CandidateAnnotation>; // key: `${folioId}-${candidateId}`
}
