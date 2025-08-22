export interface ProfileInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  website: string;
}

export interface Summary {
  content: string;
}

export interface WorkExperience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
}

export interface Project {
  projectName: string;
  technologies: string;
  description: string;
}

export interface Skill {
  category: string;
  skills: string;
}

export interface MasterProfile {
  profileInfo: ProfileInfo;
  summary: Summary;
  workExperiences: WorkExperience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}
