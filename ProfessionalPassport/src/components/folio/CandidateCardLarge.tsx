import { motion } from "motion/react";
import { Briefcase, Lightbulb, FolderGit2, MessageSquare } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Candidate } from "./types";

interface CandidateCardLargeProps {
  candidate: Candidate;
  onClick: () => void;
  lastAnnotation?: string;
  isActive?: boolean;
}

export function CandidateCardLarge({
  candidate,
  onClick,
  lastAnnotation,
  isActive = false,
}: CandidateCardLargeProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const topProjects = candidate.passportData.projects?.slice(0, 3) || [];
  const topExperience = candidate.passportData.experience?.[0];
  
  // Generate best-fit summary based on candidate data
  const generateBestFitSummary = () => {
    const years = topExperience ? "Senior-level" : "Mid-level";
    const primarySkills = candidate.skills.slice(0, 3).join(", ");
    return `${years} professional with expertise in ${primarySkills}. ${topExperience ? `Currently ${topExperience.position} at ${topExperience.company}.` : ""}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: isActive ? 1 : 0.95 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl border overflow-hidden cursor-pointer mx-auto"
      style={{
        backgroundColor: "var(--graphite-brushed)",
        borderColor: isActive ? "var(--emerald)" : "var(--border)",
        boxShadow: isActive
          ? "rgba(0, 196, 140, 0.3) 0px 0px 40px"
          : "rgba(0,0,0,0.4) 0px 4px 16px",
        width: "min(90%, 420px)",
        height: "70vh",
      }}
      onClick={onClick}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0, 196, 140, 0.1) 0%, transparent 100%)",
        }}
      />

      <div className="relative h-full flex flex-col p-3 md:p-4 gap-2 md:gap-2.5">
        {/* Header with Avatar and Name */}
        <div className="flex items-start gap-2 flex-shrink-0">
          <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2" style={{ borderColor: "var(--emerald)" }}>
            <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
            <AvatarFallback
              style={{
                backgroundColor: "rgba(0, 196, 140, 0.2)",
                color: "var(--emerald)",
                fontSize: "0.75rem",
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="mb-0.5 truncate" style={{ color: "var(--soft-ivory)", fontSize: "0.95rem" }}>
              {candidate.name}
            </h3>
            <p
              className="line-clamp-2"
              style={{
                color: "var(--body-text)",
                fontSize: "0.75rem",
                lineHeight: "1.3",
              }}
            >
              {candidate.headline}
            </p>
          </div>
        </div>

        {/* Best-Fit Summary */}
        <div
          className="p-2 rounded-lg border flex-shrink-0"
          style={{
            backgroundColor: "rgba(0, 196, 140, 0.05)",
            borderColor: "rgba(0, 196, 140, 0.3)",
          }}
        >
          <div className="flex items-start gap-1.5 mb-0.5">
            <Lightbulb className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: "var(--emerald)" }} />
            <p
              style={{
                color: "var(--meta-text)",
                fontSize: "0.6rem",
                fontFamily: "'Kode Mono', monospace",
                lineHeight: "1.2",
              }}
            >
              BEST-FIT SUMMARY
            </p>
          </div>
          <p
            className="line-clamp-2"
            style={{
              color: "var(--body-text)",
              fontSize: "0.7rem",
              lineHeight: "1.3",
            }}
          >
            {generateBestFitSummary()}
          </p>
        </div>

        {/* Top Skills */}
        <div className="flex-shrink-0">
          <p
            className="mb-1"
            style={{
              color: "var(--meta-text)",
              fontSize: "0.6rem",
              fontFamily: "'Kode Mono', monospace",
              lineHeight: "1.2",
            }}
          >
            TOP SKILLS
          </p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 5).map((skill) => (
              <Badge
                key={skill}
                className="border-0 cursor-pointer hover:scale-105 transition-transform px-1.5 py-0"
                style={{
                  backgroundColor: "rgba(0, 196, 140, 0.15)",
                  color: "var(--emerald)",
                  fontSize: "0.65rem",
                  lineHeight: "1.4",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Current Position */}
        {topExperience && (
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{
              backgroundColor: "rgb(0, 0, 0)",
            }}
          >
            <div className="flex items-start gap-1.5">
              <Briefcase className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: "var(--emerald)" }} />
              <div className="flex-1 min-w-0">
                <p className="truncate" style={{ color: "var(--soft-ivory)", fontSize: "0.75rem", lineHeight: "1.3" }}>
                  {topExperience.position}
                </p>
                <p className="truncate" style={{ color: "var(--electric-cyan)", fontSize: "0.65rem", lineHeight: "1.3" }}>
                  {topExperience.company}
                </p>
                {topExperience.description && (
                  <p
                    className="line-clamp-1 mt-0.5"
                    style={{
                      color: "var(--body-text)",
                      fontSize: "0.65rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {topExperience.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Projects */}
        {topProjects.length > 0 && (
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1">
              <FolderGit2 className="h-3 w-3" style={{ color: "var(--emerald)" }} />
              <p
                style={{
                  color: "var(--meta-text)",
                  fontSize: "0.6rem",
                  fontFamily: "'Kode Mono', monospace",
                  lineHeight: "1.2",
                }}
              >
                TOP PROJECTS
              </p>
            </div>
            <div className="space-y-1">
              {topProjects.map((project, index) => (
                <div
                  key={index}
                  className="p-1.5 rounded-lg"
                  style={{
                    backgroundColor: "rgba(0, 181, 216, 0.05)",
                  }}
                >
                  <p
                    className="truncate"
                    style={{
                      color: "var(--soft-ivory)",
                      fontSize: "0.7rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {project.title}
                  </p>
                  {project.description && (
                    <p
                      className="line-clamp-1"
                      style={{
                        color: "var(--body-text)",
                        fontSize: "0.65rem",
                        lineHeight: "1.3",
                      }}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Annotation Preview */}
        {lastAnnotation && (
          <div
            className="p-2 rounded-lg border flex-shrink-0"
            style={{
              backgroundColor: "rgba(0, 181, 216, 0.05)",
              borderColor: "var(--electric-cyan)",
            }}
          >
            <div className="flex items-start gap-1.5">
              <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: "var(--electric-cyan)" }} />
              <div className="flex-1 min-w-0">
                <p
                  className="mb-0.5"
                  style={{
                    color: "var(--meta-text)",
                    fontSize: "0.6rem",
                    fontFamily: "'Kode Mono', monospace",
                    lineHeight: "1.2",
                  }}
                >
                  RECENT ANNOTATION
                </p>
                <p
                  className="line-clamp-2"
                  style={{
                    color: "var(--body-text)",
                    fontSize: "0.65rem",
                    lineHeight: "1.3",
                  }}
                >
                  {lastAnnotation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
