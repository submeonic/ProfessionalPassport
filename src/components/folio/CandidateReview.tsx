import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Star, X, Edit3, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Candidate, CandidateTag, CandidateAnnotation } from "./types";
import { toast } from "sonner@2.0.3";

interface CandidateReviewProps {
  candidate: Candidate;
  annotation?: CandidateAnnotation;
  onBack: () => void;
  onSaveAnnotation: (notes: string) => void;
  onToggleTag: (tag: CandidateTag) => void;
}

export function CandidateReview({
  candidate,
  annotation,
  onBack,
  onSaveAnnotation,
  onToggleTag,
}: CandidateReviewProps) {
  const [notes, setNotes] = useState(annotation?.notes || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  useEffect(() => {
    setNotes(annotation?.notes || "");
  }, [annotation]);

  const handleSaveNotes = () => {
    onSaveAnnotation(notes);
    setIsEditingNotes(false);
    toast.success("Notes saved");
  };

  const tags = annotation?.tags || [];

  const tagButtons: Array<{
    tag: CandidateTag;
    label: string;
    icon: any;
    color: string;
    bgColor: string;
  }> = [
    {
      tag: "pass",
      label: "Pass",
      icon: X,
      color: "var(--vermilion)",
      bgColor: "rgba(248, 90, 64, 0.15)",
    },
    {
      tag: "annotated",
      label: "Annotate",
      icon: Edit3,
      color: "var(--electric-cyan)",
      bgColor: "rgba(0, 181, 216, 0.15)",
    },
    {
      tag: "shortlist",
      label: "Shortlist",
      icon: Star,
      color: "var(--emerald)",
      bgColor: "rgba(0, 196, 140, 0.15)",
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
            Back
          </Button>
          <h2 style={{ color: "var(--soft-ivory)" }}>Candidate Review</h2>
          <div className="w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column: Passport Content (2/3) */}
          <div className="md:col-span-2">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-6 pr-4">
                {/* Candidate Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: "var(--graphite-brushed)",
                    borderColor: "var(--border)",
                    boxShadow: "rgba(0, 196, 140, 0.2) 0px 0px 30px",
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16">
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
                      <p style={{ color: "var(--body-text)" }}>{candidate.headline}</p>
                    </div>
                  </div>

                  {passportData.personalSummary && (
                    <p className="mb-4" style={{ color: "var(--body-text)" }}>
                      {passportData.personalSummary}
                    </p>
                  )}

                  {/* Key Skills */}
                  {passportData.keySkills && passportData.keySkills.length > 0 && (
                    <div>
                      <h4 className="mb-3" style={{ color: "var(--soft-ivory)" }}>
                        Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {passportData.keySkills.map((skill: string) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="border-0"
                            style={{
                              backgroundColor: "rgba(0, 196, 140, 0.15)",
                              color: "var(--emerald)",
                              fontFamily: "'Kode Mono', monospace",
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Experience Section */}
                {passportData.experience && passportData.experience.length > 0 && (
                  <PassportSection title="Work Experience" delay={0.1}>
                    {passportData.experience.map((exp: any) => (
                      <PassportEntry key={exp.id}>
                        <h4 style={{ color: "var(--soft-ivory)" }}>{exp.position}</h4>
                        <p className="mb-1" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                          {exp.company} • {exp.location}
                        </p>
                        <p
                          style={{
                            color: "var(--meta-text)",
                            fontSize: "0.75rem",
                            fontFamily: "'Kode Mono', monospace",
                          }}
                        >
                          {exp.startDate} – {exp.endDate}
                        </p>
                        {exp.description && (
                          <p className="mt-2" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                            {exp.description}
                          </p>
                        )}
                      </PassportEntry>
                    ))}
                  </PassportSection>
                )}

                {/* Education Section */}
                {passportData.education && passportData.education.length > 0 && (
                  <PassportSection title="Education" delay={0.2}>
                    {passportData.education.map((edu: any) => (
                      <PassportEntry key={edu.id}>
                        <h4 style={{ color: "var(--soft-ivory)" }}>{edu.degree}</h4>
                        <p className="mb-1" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                          {edu.institution} • {edu.field}
                        </p>
                        <p
                          style={{
                            color: "var(--meta-text)",
                            fontSize: "0.75rem",
                            fontFamily: "'Kode Mono', monospace",
                          }}
                        >
                          {edu.startDate} – {edu.endDate}
                        </p>
                      </PassportEntry>
                    ))}
                  </PassportSection>
                )}

                {/* Projects Section */}
                {passportData.projects && passportData.projects.length > 0 && (
                  <PassportSection title="Projects" delay={0.3}>
                    {passportData.projects.map((proj: any) => (
                      <PassportEntry key={proj.id}>
                        <h4 style={{ color: "var(--soft-ivory)" }}>{proj.title}</h4>
                        <p className="mb-1" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                          {proj.role} • {proj.technologies}
                        </p>
                        {proj.description && (
                          <p className="mt-2" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                            {proj.description}
                          </p>
                        )}
                      </PassportEntry>
                    ))}
                  </PassportSection>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column: Annotation Panel (1/3) */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-4"
            >
              {/* Tag Buttons */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--graphite-brushed)",
                  borderColor: "var(--border)",
                }}
              >
                <h4 className="mb-3" style={{ color: "var(--soft-ivory)" }}>
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  {tagButtons.map(({ tag, label, icon: Icon, color, bgColor }) => {
                    const isActive = tags.includes(tag);
                    return (
                      <Button
                        key={tag}
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => onToggleTag(tag)}
                        style={
                          isActive
                            ? {
                                backgroundColor: color,
                                color: "var(--onyx-gradient-start)",
                                borderColor: color,
                              }
                            : {
                                borderColor: "var(--border)",
                                color: color,
                                backgroundColor: bgColor,
                              }
                        }
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Notes Section */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--graphite-brushed)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 style={{ color: "var(--soft-ivory)" }}>Notes</h4>
                  {!isEditingNotes ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingNotes(true)}
                      className="gap-1"
                      style={{ color: "var(--emerald)" }}
                    >
                      <Edit3 className="h-3 w-3" />
                      Edit
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleSaveNotes}
                      className="gap-1"
                      style={{ color: "var(--emerald)" }}
                    >
                      <Save className="h-3 w-3" />
                      Save
                    </Button>
                  )}
                </div>

                {isEditingNotes ? (
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this candidate..."
                    rows={8}
                    className="border-0 focus-visible:ring-1"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      color: "var(--soft-ivory)",
                    }}
                  />
                ) : (
                  <p
                    style={{
                      color: notes ? "var(--body-text)" : "var(--meta-text)",
                      fontSize: "0.875rem",
                      minHeight: "8rem",
                    }}
                  >
                    {notes || "No notes yet. Click Edit to add notes."}
                  </p>
                )}
              </div>

              {/* Review Date */}
              {annotation?.reviewedDate && (
                <p
                  className="text-center"
                  style={{
                    color: "var(--meta-text)",
                    fontSize: "0.75rem",
                    fontFamily: "'Kode Mono', monospace",
                  }}
                >
                  Last reviewed: {new Date(annotation.reviewedDate).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PassportSection({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <h3 className="mb-4" style={{ color: "var(--soft-ivory)" }}>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </motion.div>
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
