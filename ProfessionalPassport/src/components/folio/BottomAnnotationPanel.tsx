import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, X, Circle, MessageSquare } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CandidateTag } from "./types";
import { toast } from "sonner@2.0.3";

interface BottomAnnotationPanelProps {
  candidateId: string;
  candidateName: string;
  currentTags: CandidateTag[];
  annotation?: string;
  onQuickTag: (tag: CandidateTag) => void;
  onSaveAnnotation: (notes: string) => void;
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

export function BottomAnnotationPanel({
  candidateId,
  candidateName,
  currentTags,
  annotation = "",
  onQuickTag,
  onSaveAnnotation,
}: BottomAnnotationPanelProps) {
  const [notes, setNotes] = useState(annotation);

  useEffect(() => {
    setNotes(annotation);
  }, [annotation, candidateId]);

  // Autosave notes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes !== annotation) {
        onSaveAnnotation(notes);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [notes, annotation, onSaveAnnotation]);

  const handleAppendComment = (comment: string) => {
    const newNotes = notes ? `${notes}\n• ${comment}` : `• ${comment}`;
    setNotes(newNotes);
    toast.success("Comment added");
  };

  const tagButtons: Array<{
    tag: CandidateTag;
    label: string;
    activeColor: string;
    activeBg: string;
  }> = [
    {
      tag: "shortlist",
      label: "✅ Shortlist",
      activeColor: "var(--emerald)",
      activeBg: "rgba(0, 196, 140, 0.2)",
    },
    {
      tag: "annotated",
      label: "⚪ Neutral",
      activeColor: "var(--electric-cyan)",
      activeBg: "rgba(0, 181, 216, 0.2)",
    },
    {
      tag: "pass",
      label: "❌ Pass",
      activeColor: "var(--vermilion)",
      activeBg: "rgba(248, 90, 64, 0.2)",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 z-20 border-t overflow-hidden"
      style={{
        backgroundColor: "rgb(27, 27, 27)",
        borderColor: "var(--border)",
        height: "25vh",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 flex-shrink-0">
          <MessageSquare className="h-3 w-3 md:h-4 md:w-4" style={{ color: "var(--emerald)" }} />
          <p
            style={{
              color: "var(--meta-text)",
              fontSize: "0.65rem",
              fontFamily: "'Kode Mono', monospace",
            }}
          >
            ANNOTATING: {candidateName.toUpperCase()}
          </p>
        </div>

        {/* Tag Buttons Bar */}
        <div className="flex flex-wrap gap-1.5 mb-2 flex-shrink-0">
          {tagButtons.map((btn) => {
            const isActive = currentTags.includes(btn.tag);
            return (
              <Button
                key={btn.tag}
                variant="outline"
                size="sm"
                onClick={() => onQuickTag(btn.tag)}
                className="transition-all duration-200 h-7 px-2 text-xs"
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

        {/* Annotation Text Field */}
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes about this candidate..."
          rows={2}
          className="mb-2 border-0 focus-visible:ring-1 text-xs flex-1 min-h-0 resize-none"
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            color: "var(--soft-ivory)",
          }}
        />

        {/* Suggested Comments - compact */}
        <div className="flex-shrink-0 overflow-hidden">
          <p
            className="mb-1"
            style={{
              color: "var(--meta-text)",
              fontSize: "0.6rem",
              fontFamily: "'Kode Mono', monospace",
            }}
          >
            QUICK ADD
          </p>
          <div className="flex flex-wrap gap-1">
            {suggestedComments.slice(0, 4).map((comment) => (
              <button
                key={comment}
                onClick={() => handleAppendComment(comment)}
                className="px-1.5 py-0.5 rounded border text-left transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(0, 196, 140, 0.05)",
                  borderColor: "var(--emerald)",
                  color: "var(--emerald)",
                  fontSize: "0.6rem",
                }}
              >
                + {comment}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
