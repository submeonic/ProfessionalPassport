import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Star, X, CheckCircle2, Circle, Minus, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Candidate, CandidateTag, CandidateAnnotation } from "./types";
import { toast } from "sonner@2.0.3";

interface CandidateFullHistoryProps {
  candidate: Candidate;
  annotation?: CandidateAnnotation;
  onBack: () => void;
  onSaveAnnotation: (notes: string) => void;
  onToggleTag: (tag: CandidateTag) => void;
  highlightSkill?: string;
}

const suggestedComments = [
  "Strong technical background",
  "Good culture fit",
  "Needs more experience",
  "Impressive project portfolio",
  "Excellent communication skills",
  "Consider for future roles",
  "Schedule interview",
  "Not aligned with requirements",
];

export function CandidateFullHistory({
  candidate,
  annotation,
  onBack,
  onSaveAnnotation,
  onToggleTag,
  highlightSkill,
}: CandidateFullHistoryProps) {
  const [notes, setNotes] = useState(annotation?.notes || "");

  useEffect(() => {
    setNotes(annotation?.notes || "");
  }, [annotation]);

  // Autosave notes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes !== (annotation?.notes || "")) {
        onSaveAnnotation(notes);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [notes, annotation?.notes, onSaveAnnotation]);

  const handleAppendComment = (comment: string) => {
    const newNotes = notes ? `${notes}\n• ${comment}` : `• ${comment}`;
    setNotes(newNotes);
    toast.success("Comment added");
  };

  const tags = annotation?.tags || [];

  const tagButtons: Array<{
    tag: CandidateTag;
    label: string;
    icon: any;
    activeColor: string;
    activeBg: string;
  }> = [
    {
      tag: "shortlist",
      label: "✅ Shortlist",
      icon: CheckCircle2,
      activeColor: "var(--emerald)",
      activeBg: "rgba(0, 196, 140, 0.2)",
    },
    {
      tag: "annotated",
      label: "⚪ Neutral",
      icon: Circle,
      activeColor: "var(--electric-cyan)",
      activeBg: "rgba(0, 181, 216, 0.2)",
    },
    {
      tag: "pass",
      label: "❌ Pass",
      icon: X,
      activeColor: "var(--vermilion)",
      activeBg: "rgba(248, 90, 64, 0.2)",
    },
  ];

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const passportData = candidate.passportData;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, var(--onyx-gradient-start) 0%, var(--onyx-gradient-end) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: "rgb(27, 27, 27)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
            style={{ color: "var(--emerald)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Carousel
          </Button>
          <h2 style={{ color: "var(--soft-ivory)" }}>Candidate History</h2>
          <div className="w-32" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Candidate Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: "var(--graphite-brushed)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20 border-2" style={{ borderColor: "var(--emerald)" }}>
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

                <div className="flex-1">
                  <h1 className="mb-1" style={{ color: "var(--soft-ivory)" }}>
                    {candidate.name}
                  </h1>
                  <p className="mb-4" style={{ color: "var(--body-text)" }}>
                    {candidate.headline}
                  </p>

                  {/* Tag Buttons Bar */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {tagButtons.map((btn) => {
                      const Icon = btn.icon;
                      const isActive = tags.includes(btn.tag);
                      return (
                        <Button
                          key={btn.tag}
                          variant="outline"
                          size="sm"
                          onClick={() => onToggleTag(btn.tag)}
                          className="gap-2 transition-all duration-200"
                          style={{
                            backgroundColor: isActive ? btn.activeBg : "transparent",
                            borderColor: isActive ? btn.activeColor : "var(--border)",
                            color: isActive ? btn.activeColor : "var(--warm-nickel)",
                          }}
                        >
                          {btn.label}
                        </Button>
                      );
                    })}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="border-0"
                        style={{
                          backgroundColor: highlightSkill === skill ? "var(--emerald)" : "rgba(0, 196, 140, 0.15)",
                          color: highlightSkill === skill ? "var(--onyx-gradient-start)" : "var(--emerald)",
                          fontFamily: "'Kode Mono', monospace",
                          fontSize: "0.75rem",
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content - Passport History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 space-y-6"
            >
              {/* Experience */}
              {passportData.experience && passportData.experience.length > 0 && (
                <PassportSection title="Experience" icon={null}>
                  {passportData.experience.map((exp, index) => (
                    <PassportEntry key={index}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 style={{ color: "var(--soft-ivory)" }}>{exp.position}</h4>
                        <span
                          style={{
                            color: "var(--meta-text)",
                            fontSize: "0.75rem",
                            fontFamily: "'Kode Mono', monospace",
                          }}
                        >
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="mb-2" style={{ color: "var(--electric-cyan)", fontSize: "0.875rem" }}>
                        {exp.company}
                      </p>
                      {exp.description && (
                        <p style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                          {exp.description}
                        </p>
                      )}
                    </PassportEntry>
                  ))}
                </PassportSection>
              )}

              {/* Projects */}
              {passportData.projects && passportData.projects.length > 0 && (
                <PassportSection title="Projects" icon={null}>
                  {passportData.projects.map((project, index) => (
                    <PassportEntry key={index}>
                      <h4 className="mb-2" style={{ color: "var(--soft-ivory)" }}>
                        {project.title}
                      </h4>
                      {project.role && (
                        <p className="mb-2" style={{ color: "var(--electric-cyan)", fontSize: "0.875rem" }}>
                          {project.role}
                        </p>
                      )}
                      {project.description && (
                        <p className="mb-3" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                          {project.description}
                        </p>
                      )}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(project.technologies) 
                            ? project.technologies 
                            : project.technologies.split(',').map(t => t.trim())
                          ).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-0"
                              style={{
                                backgroundColor: highlightSkill === tech ? "var(--emerald)" : "rgba(0, 196, 140, 0.1)",
                                color: "var(--emerald)",
                                fontSize: "0.7rem",
                              }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </PassportEntry>
                  ))}
                </PassportSection>
              )}

              {/* Education */}
              {passportData.education && passportData.education.length > 0 && (
                <PassportSection title="Education" icon={null}>
                  {passportData.education.map((edu, index) => (
                    <PassportEntry key={index}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 style={{ color: "var(--soft-ivory)" }}>{edu.degree} in {edu.field}</h4>
                        <span
                          style={{
                            color: "var(--meta-text)",
                            fontSize: "0.75rem",
                            fontFamily: "'Kode Mono', monospace",
                          }}
                        >
                          {edu.endDate}
                        </span>
                      </div>
                      <p style={{ color: "var(--electric-cyan)", fontSize: "0.875rem" }}>
                        {edu.institution}
                      </p>
                    </PassportEntry>
                  ))}
                </PassportSection>
              )}

              {/* Certifications */}
              {passportData.certifications && passportData.certifications.length > 0 && (
                <PassportSection title="Certifications" icon={null}>
                  {passportData.certifications.map((cert, index) => (
                    <PassportEntry key={index}>
                      <div className="flex items-start justify-between">
                        <h4 style={{ color: "var(--soft-ivory)" }}>{cert.name}</h4>
                        <span
                          style={{
                            color: "var(--meta-text)",
                            fontSize: "0.75rem",
                            fontFamily: "'Kode Mono', monospace",
                          }}
                        >
                          {cert.year}
                        </span>
                      </div>
                      <p style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                        {cert.issuer}
                      </p>
                    </PassportEntry>
                  ))}
                </PassportSection>
              )}
            </motion.div>

            {/* Annotation Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div
                className="p-4 rounded-xl border sticky top-24"
                style={{
                  backgroundColor: "var(--graphite-brushed)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5" style={{ color: "var(--emerald)" }} />
                  <h3 style={{ color: "var(--soft-ivory)" }}>Notes & Annotations</h3>
                </div>

                {/* Notes Text Area */}
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this candidate..."
                  rows={8}
                  className="mb-4 border-0 focus-visible:ring-1"
                  style={{
                    backgroundColor: "rgb(0, 0, 0)",
                    color: "var(--soft-ivory)",
                  }}
                />

                {/* Suggested Comments */}
                <div className="mb-3">
                  <p
                    className="mb-2"
                    style={{
                      color: "var(--meta-text)",
                      fontSize: "0.75rem",
                      fontFamily: "'Kode Mono', monospace",
                    }}
                  >
                    SUGGESTED COMMENTS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedComments.map((comment) => (
                      <button
                        key={comment}
                        onClick={() => handleAppendComment(comment)}
                        className="px-2 py-1 rounded-lg border text-left transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: "rgba(0, 196, 140, 0.05)",
                          borderColor: "var(--emerald)",
                          color: "var(--emerald)",
                          fontSize: "0.7rem",
                        }}
                      >
                        + {comment}
                      </button>
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--meta-text)",
                    fontSize: "0.7rem",
                    fontFamily: "'Kode Mono', monospace",
                  }}
                >
                  Notes autosave as you type
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function PassportSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4" style={{ color: "var(--soft-ivory)" }}>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function PassportEntry({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-4 rounded-xl border"
      style={{
        backgroundColor: "rgb(42, 42, 42)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}
