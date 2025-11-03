import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { PassportEntry, PassportSection } from "./types";

interface EntryCardProps {
  entry: PassportEntry;
  section: PassportSection;
  onEdit: () => void;
  onDelete: () => void;
}

export function EntryCard({ entry, section, onEdit, onDelete }: EntryCardProps) {
  const getTitle = () => {
    switch (section) {
      case "education":
        return (entry as any).degree;
      case "experience":
        return (entry as any).position;
      case "projects":
        return (entry as any).title;
      case "awards":
        return (entry as any).title;
    }
  };

  const getSubtitle = () => {
    switch (section) {
      case "education":
        return `${(entry as any).institution} • ${(entry as any).field}`;
      case "experience":
        return `${(entry as any).company} • ${(entry as any).location}`;
      case "projects":
        return `${(entry as any).role} • ${(entry as any).technologies}`;
      case "awards":
        return `${(entry as any).issuer} • ${(entry as any).date}`;
    }
  };

  const getDateRange = () => {
    if (section === "awards") {
      return (entry as any).date;
    }
    const start = (entry as any).startDate;
    const end = (entry as any).endDate === "Present" ? "Present" : (entry as any).endDate;
    return `${start} – ${end}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group relative p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
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
          background: "linear-gradient(135deg, rgba(0, 181, 216, 0.1) 0%, transparent 100%)",
          boxShadow: "0 0 20px rgba(0, 181, 216, 0.2)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="mb-1" style={{ color: "var(--soft-ivory)" }}>
            {getTitle()}
          </h4>
          <p
            className="mb-2"
            style={{
              color: "var(--body-text)",
              fontSize: "0.875rem",
            }}
          >
            {getSubtitle()}
          </p>
          <p
            style={{
              color: "var(--meta-text)",
              fontSize: "0.75rem",
              fontFamily: "'Kode Mono', monospace",
            }}
          >
            {getDateRange()}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onEdit}
            style={{ color: "var(--electric-cyan)" }}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onDelete}
            style={{ color: "var(--vermilion)" }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {(entry as any).description && (
        <p
          className="mt-3 line-clamp-2"
          style={{
            color: "var(--body-text)",
            fontSize: "0.875rem",
          }}
        >
          {(entry as any).description}
        </p>
      )}
    </motion.div>
  );
}
