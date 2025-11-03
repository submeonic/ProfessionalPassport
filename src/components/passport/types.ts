// Passport data types

export type PassportSection = "education" | "experience" | "projects" | "awards";

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  role: string;
  technologies: string;
  startDate: string;
  endDate: string;
  description?: string;
  url?: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export type PassportEntry = EducationEntry | ExperienceEntry | ProjectEntry | AwardEntry;

export interface PassportData {
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  awards: AwardEntry[];
  personalSummary?: string;
  keySkills?: string[];
  focusAreas?: string[];
}

export interface EntryFormProps {
  section: PassportSection;
  entry?: PassportEntry;
  mode: "add" | "edit";
  onSave: (data: PassportEntry) => void;
  onCancel: () => void;
  onDelete?: () => void;
}
