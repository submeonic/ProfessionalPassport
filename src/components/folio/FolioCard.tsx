import { motion } from "motion/react";
import { FolderOpen, Users, Calendar, ChevronRight } from "lucide-react";
import { Folio } from "./types";
import { Badge } from "../ui/badge";

interface FolioCardProps {
  folio: Folio;
  candidateCount: number;
  onClick: () => void;
}

export function FolioCard({ folio, candidateCount, onClick }: FolioCardProps) {
  const statusColors = {
    active: "var(--emerald)",
    draft: "var(--meta-text)",
    archived: "var(--warm-nickel)",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="group relative w-full p-5 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: "var(--graphite-brushed)",
        borderColor: "var(--border)",
        boxShadow: "rgba(0,0,0,0.2) 0px 2px 8px",
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0, 196, 140, 0.1) 0%, transparent 100%)",
          boxShadow: "0 0 20px rgba(0, 196, 140, 0.2)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="p-2 rounded-lg mt-1"
              style={{
                backgroundColor: "rgba(0, 196, 140, 0.15)",
              }}
            >
              <FolderOpen className="h-5 w-5" style={{ color: "var(--emerald)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1" style={{ color: "var(--soft-ivory)" }}>
                {folio.roleTitle}
              </h3>
              <p style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                {folio.department}
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-0 capitalize"
              style={{
                backgroundColor: `${statusColors[folio.status]}20`,
                color: statusColors[folio.status],
                fontFamily: "'Kode Mono', monospace",
                fontSize: "0.75rem",
              }}
            >
              {folio.status}
            </Badge>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {folio.requiredSkills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="border-0"
                style={{
                  backgroundColor: "rgba(0, 196, 140, 0.1)",
                  color: "var(--emerald)",
                  fontSize: "0.75rem",
                }}
              >
                {skill}
              </Badge>
            ))}
            {folio.requiredSkills.length > 4 && (
              <Badge
                variant="outline"
                className="border-0"
                style={{
                  backgroundColor: "rgba(0, 196, 140, 0.1)",
                  color: "var(--emerald)",
                  fontSize: "0.75rem",
                }}
              >
                +{folio.requiredSkills.length - 4}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" style={{ color: "var(--meta-text)" }} />
              <span
                style={{
                  color: "var(--meta-text)",
                  fontSize: "0.75rem",
                  fontFamily: "'Kode Mono', monospace",
                }}
              >
                {candidateCount} {candidateCount === 1 ? "candidate" : "candidates"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" style={{ color: "var(--meta-text)" }} />
              <span
                style={{
                  color: "var(--meta-text)",
                  fontSize: "0.75rem",
                  fontFamily: "'Kode Mono', monospace",
                }}
              >
                {formatDate(folio.createdDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Arrow indicator */}
        <ChevronRight
          className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--emerald)" }}
        />
      </div>
    </motion.button>
  );
}
