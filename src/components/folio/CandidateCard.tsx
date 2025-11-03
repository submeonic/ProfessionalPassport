import { motion } from "motion/react";
import { User, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Candidate } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
  isActive?: boolean;
}

export function CandidateCard({ candidate, onClick, isActive = false }: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`group relative w-full p-5 rounded-xl border text-left transition-all duration-300 ${
        isActive ? "ring-2" : ""
      }`}
      style={{
        backgroundColor: "var(--graphite-brushed)",
        borderColor: isActive ? "var(--emerald)" : "var(--border)",
        ringColor: "var(--emerald)",
        boxShadow: isActive
          ? "rgba(0, 196, 140, 0.3) 0px 0px 20px"
          : "rgba(0,0,0,0.2) 0px 2px 8px",
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

      <div className="relative flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
          <AvatarFallback
            style={{
              backgroundColor: "rgba(0, 196, 140, 0.2)",
              color: "var(--emerald)",
            }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h4 className="mb-1" style={{ color: "var(--soft-ivory)" }}>
            {candidate.name}
          </h4>
          <p
            className="mb-3 line-clamp-2"
            style={{ color: "var(--body-text)", fontSize: "0.875rem" }}
          >
            {candidate.headline}
          </p>

          {/* Key Skills */}
          <div className="flex flex-wrap gap-1.5">
            {candidate.keySkills.slice(0, 3).map((skill) => (
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
            {candidate.keySkills.length > 3 && (
              <Badge
                variant="outline"
                className="border-0"
                style={{
                  backgroundColor: "rgba(0, 196, 140, 0.1)",
                  color: "var(--emerald)",
                  fontSize: "0.75rem",
                }}
              >
                +{candidate.keySkills.length - 3}
              </Badge>
            )}
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
