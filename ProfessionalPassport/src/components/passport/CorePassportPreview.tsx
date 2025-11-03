import { motion } from "motion/react";
import { ArrowLeft, GraduationCap, Briefcase, FolderGit2, Award, User, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { PassportData } from "./types";
import { ScrollArea } from "../ui/scroll-area";

interface CorePassportPreviewProps {
  data: PassportData;
  userName: string;
  onBack: () => void;
}

export function CorePassportPreview({ data, userName, onBack }: CorePassportPreviewProps) {
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
            style={{ color: "var(--electric-cyan)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 style={{ color: "var(--soft-ivory)" }}>Professional Passport</h2>
          <div className="w-20" />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-xl border"
            style={{
              backgroundColor: "var(--graphite-brushed)",
              borderColor: "var(--border)",
              boxShadow: "rgba(0, 181, 216, 0.2) 0px 0px 30px",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "rgba(0, 181, 216, 0.2)" }}
              >
                <User className="h-6 w-6" style={{ color: "var(--electric-cyan)" }} />
              </div>
              <h1 style={{ color: "var(--soft-ivory)" }}>{userName}</h1>
            </div>
            
            {data.personalSummary && (
              <p className="mb-6" style={{ color: "var(--body-text)" }}>
                {data.personalSummary}
              </p>
            )}

            {/* Key Skills */}
            {data.keySkills && data.keySkills.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2" style={{ color: "var(--soft-ivory)" }}>
                  <Sparkles className="h-4 w-4" style={{ color: "var(--electric-cyan)" }} />
                  Key Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.keySkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-0"
                      style={{
                        backgroundColor: "rgba(0, 181, 216, 0.15)",
                        color: "var(--electric-cyan)",
                        fontFamily: "'Kode Mono', monospace",
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Focus Areas */}
            {data.focusAreas && data.focusAreas.length > 0 && (
              <div>
                <h4 className="mb-3" style={{ color: "var(--soft-ivory)" }}>
                  Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.focusAreas.map((area) => (
                    <Badge
                      key={area}
                      variant="outline"
                      style={{
                        borderColor: "var(--electric-cyan)",
                        color: "var(--soft-ivory)",
                      }}
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Education Section */}
          {data.education.length > 0 && (
            <SectionPreview
              title="Education"
              icon={GraduationCap}
              delay={0.1}
            >
              {data.education.map((edu) => (
                <EntryPreview key={edu.id}>
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
                  {edu.description && (
                    <p className="mt-2" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                      {edu.description}
                    </p>
                  )}
                </EntryPreview>
              ))}
            </SectionPreview>
          )}

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <SectionPreview
              title="Work Experience"
              icon={Briefcase}
              delay={0.2}
            >
              {data.experience.map((exp) => (
                <EntryPreview key={exp.id}>
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
                </EntryPreview>
              ))}
            </SectionPreview>
          )}

          {/* Projects Section */}
          {data.projects.length > 0 && (
            <SectionPreview
              title="Projects"
              icon={FolderGit2}
              delay={0.3}
            >
              {data.projects.map((proj) => (
                <EntryPreview key={proj.id}>
                  <h4 style={{ color: "var(--soft-ivory)" }}>{proj.title}</h4>
                  <p className="mb-1" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                    {proj.role} • {proj.technologies}
                  </p>
                  <p
                    style={{
                      color: "var(--meta-text)",
                      fontSize: "0.75rem",
                      fontFamily: "'Kode Mono', monospace",
                    }}
                  >
                    {proj.startDate} – {proj.endDate}
                  </p>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block transition-colors"
                      style={{
                        color: "var(--electric-cyan)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {proj.url}
                    </a>
                  )}
                  {proj.description && (
                    <p className="mt-2" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                      {proj.description}
                    </p>
                  )}
                </EntryPreview>
              ))}
            </SectionPreview>
          )}

          {/* Awards Section */}
          {data.awards.length > 0 && (
            <SectionPreview
              title="Awards & Recognition"
              icon={Award}
              delay={0.4}
            >
              {data.awards.map((award) => (
                <EntryPreview key={award.id}>
                  <h4 style={{ color: "var(--soft-ivory)" }}>{award.title}</h4>
                  <p className="mb-1" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                    {award.issuer}
                  </p>
                  <p
                    style={{
                      color: "var(--meta-text)",
                      fontSize: "0.75rem",
                      fontFamily: "'Kode Mono', monospace",
                    }}
                  >
                    {award.date}
                  </p>
                  {award.description && (
                    <p className="mt-2" style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                      {award.description}
                    </p>
                  )}
                </EntryPreview>
              ))}
            </SectionPreview>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function SectionPreview({
  title,
  icon: Icon,
  delay,
  children,
}: {
  title: string;
  icon: any;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: "rgba(0, 181, 216, 0.15)" }}
        >
          <Icon className="h-5 w-5" style={{ color: "var(--electric-cyan)" }} />
        </div>
        <h2 style={{ color: "var(--soft-ivory)" }}>{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

function EntryPreview({ children }: { children: React.ReactNode }) {
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
