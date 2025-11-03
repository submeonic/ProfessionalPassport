import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Plus, GraduationCap, Briefcase, FolderGit2, Award } from "lucide-react";
import { Button } from "../ui/button";
import { EntryCard } from "./EntryCard";
import { PassportEntry, PassportSection } from "./types";

interface SectionCardProps {
  section: PassportSection;
  entries: PassportEntry[];
  onAddNew: () => void;
  onEditEntry: (entry: PassportEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const sectionConfig = {
  education: {
    title: "Education",
    icon: GraduationCap,
    emptyMessage: "Add your educational background",
  },
  experience: {
    title: "Work Experience",
    icon: Briefcase,
    emptyMessage: "Add your professional experience",
  },
  projects: {
    title: "Projects",
    icon: FolderGit2,
    emptyMessage: "Showcase your projects",
  },
  awards: {
    title: "Awards & Recognition",
    icon: Award,
    emptyMessage: "Add your achievements",
  },
};

export function SectionCard({
  section,
  entries,
  onAddNew,
  onEditEntry,
  onDeleteEntry,
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const config = sectionConfig[section];
  const Icon = config.icon;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        backgroundColor: "rgb(42, 42, 42)",
        borderColor: "var(--border)",
      }}
    >
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 transition-colors duration-200 hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{
              backgroundColor: "rgba(0, 181, 216, 0.15)",
            }}
          >
            <Icon className="h-5 w-5" style={{ color: "var(--electric-cyan)" }} />
          </div>
          <div className="text-left">
            <h3 style={{ color: "var(--soft-ivory)" }}>{config.title}</h3>
            <p
              style={{
                color: "var(--meta-text)",
                fontSize: "0.75rem",
                fontFamily: "'Kode Mono', monospace",
              }}
            >
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" style={{ color: "var(--warm-nickel)" }} />
        </motion.div>
      </button>

      {/* Section Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Add New Button */}
              <Button
                variant="outline"
                className="w-full justify-center gap-2 border-dashed transition-all duration-200 hover:scale-[1.02]"
                style={{
                  borderColor: "var(--electric-cyan)",
                  color: "var(--electric-cyan)",
                  backgroundColor: "rgba(0, 181, 216, 0.05)",
                }}
                onClick={onAddNew}
              >
                <Plus className="h-4 w-4" />
                Add New
              </Button>

              {/* Entries or Empty State */}
              {entries.length === 0 ? (
                <div
                  className="py-8 text-center rounded-lg border-2 border-dashed"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "rgb(0, 0, 0)",
                  }}
                >
                  <p style={{ color: "var(--meta-text)", fontSize: "0.875rem" }}>
                    {config.emptyMessage}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      section={section}
                      onEdit={() => onEditEntry(entry)}
                      onDelete={() => onDeleteEntry(entry.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
