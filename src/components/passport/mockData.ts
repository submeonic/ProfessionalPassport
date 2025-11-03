import { PassportData } from "./types";

export const mockPassportData: PassportData = {
  personalSummary: "Full-stack software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and continuous learning.",
  keySkills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
  focusAreas: ["Frontend Architecture", "API Design", "Performance Optimization"],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "Graduated with Honors. Focus on software engineering and distributed systems.",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2021-06",
      endDate: "Present",
      description: "Led frontend architecture for customer-facing dashboard. Improved performance by 40% through code optimization and caching strategies.",
    },
    {
      id: "exp-2",
      company: "StartupXYZ",
      position: "Software Engineer",
      location: "Remote",
      startDate: "2019-07",
      endDate: "2021-05",
      description: "Built core features for SaaS platform serving 50K+ users. Implemented real-time notifications and data synchronization.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Open Source Dashboard Library",
      role: "Creator & Maintainer",
      technologies: "React, TypeScript, Storybook",
      startDate: "2022-01",
      endDate: "Present",
      description: "Created a customizable dashboard component library with 2K+ GitHub stars. Used by 100+ companies.",
      url: "https://github.com/example/dashboard-lib",
    },
    {
      id: "proj-2",
      title: "ML Model Deployment Platform",
      role: "Full-Stack Developer",
      technologies: "Python, FastAPI, Docker, Kubernetes",
      startDate: "2020-03",
      endDate: "2020-12",
      description: "Built platform for deploying and monitoring machine learning models in production.",
    },
  ],
  awards: [
    {
      id: "award-1",
      title: "Best Paper Award",
      issuer: "International Conference on Software Engineering",
      date: "2023-05",
      description: "Research on optimizing React component rendering patterns.",
    },
    {
      id: "award-2",
      title: "Employee of the Year",
      issuer: "TechCorp Inc.",
      date: "2022-12",
      description: "Recognized for outstanding contributions to product development and team leadership.",
    },
  ],
};
