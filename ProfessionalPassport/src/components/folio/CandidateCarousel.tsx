import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { CandidateCardLarge } from "./CandidateCardLarge";
import { BottomAnnotationPanel } from "./BottomAnnotationPanel";
import { Candidate, CandidateTag } from "./types";

interface CandidateCarouselProps {
  folioTitle: string;
  candidates: Candidate[];
  onBack: () => void;
  onCandidateClick: (candidateId: string) => void;
  onQuickTag: (candidateId: string, tag: CandidateTag) => void;
  onSaveAnnotation?: (candidateId: string, notes: string) => void;
  currentTags: Record<string, CandidateTag[]>;
  annotations?: Record<string, string>;
}

export function CandidateCarousel({
  folioTitle,
  candidates,
  onBack,
  onCandidateClick,
  onQuickTag,
  onSaveAnnotation,
  currentTags,
  annotations = {},
}: CandidateCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : candidates.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : 0));
  };

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (candidates.length === 0) {
    return null;
  }

  const currentCandidate = candidates[currentIndex];
  const tags = currentTags[currentCandidate?.id] || [];
  const lastAnnotation = annotations[currentCandidate?.id];

  const handleSaveAnnotation = (candidateId: string, notes: string) => {
    if (onSaveAnnotation) {
      onSaveAnnotation(candidateId, notes);
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
            style={{ color: "var(--emerald)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Folios
          </Button>
          <div className="text-center">
            <h2 style={{ color: "var(--soft-ivory)" }}>{folioTitle}</h2>
            <p
              style={{
                color: "var(--meta-text)",
                fontSize: "0.75rem",
                fontFamily: "'Kode Mono', monospace",
              }}
            >
              {currentIndex + 1} of {candidates.length}
            </p>
          </div>
          <div className="w-32" />
        </div>
      </div>

      {/* Content - with bottom padding for annotation panel */}
      <div
        className="max-w-7xl mx-auto px-4 py-6 md:py-8"
        style={{ paddingBottom: "calc(25vh + 2rem)" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop: 2-3 card carousel view */}
        <div className="hidden md:block">
          <div className="flex items-start justify-center gap-4 lg:gap-6 mb-6">
            {/* Previous card */}
            <div className="opacity-40 transition-all hover:opacity-60">
              {candidates[(currentIndex - 1 + candidates.length) % candidates.length] && (
                <CandidateCardLarge
                  candidate={candidates[(currentIndex - 1 + candidates.length) % candidates.length]}
                  onClick={() => setCurrentIndex((currentIndex - 1 + candidates.length) % candidates.length)}
                  lastAnnotation={annotations[candidates[(currentIndex - 1 + candidates.length) % candidates.length].id]}
                />
              )}
            </div>

            {/* Current card */}
            <div className="transform scale-105 z-10">
              <CandidateCardLarge
                candidate={currentCandidate}
                onClick={() => onCandidateClick(currentCandidate.id)}
                lastAnnotation={lastAnnotation}
                isActive
              />
            </div>

            {/* Next card */}
            <div className="opacity-40 transition-all hover:opacity-60">
              {candidates[(currentIndex + 1) % candidates.length] && (
                <CandidateCardLarge
                  candidate={candidates[(currentIndex + 1) % candidates.length]}
                  onClick={() => setCurrentIndex((currentIndex + 1) % candidates.length)}
                  lastAnnotation={annotations[candidates[(currentIndex + 1) % candidates.length].id]}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile: single large card with swipe */}
        <div className="md:hidden mb-6">
          <CandidateCardLarge
            candidate={currentCandidate}
            onClick={() => onCandidateClick(currentCandidate.id)}
            lastAnnotation={lastAnnotation}
            isActive
          />
          <p
            className="text-center mt-3"
            style={{
              color: "var(--meta-text)",
              fontSize: "0.65rem",
              fontFamily: "'Kode Mono', monospace",
            }}
          >
            ← Swipe to navigate →
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            className="gap-2"
            style={{
              borderColor: "var(--emerald)",
              color: "var(--emerald)",
              backgroundColor: "rgba(0, 196, 140, 0.1)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleNext}
            className="gap-2"
            style={{
              borderColor: "var(--emerald)",
              color: "var(--emerald)",
              backgroundColor: "rgba(0, 196, 140, 0.1)",
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Annotation Panel - persists across candidate swipes */}
      <BottomAnnotationPanel
        candidateId={currentCandidate.id}
        candidateName={currentCandidate.name}
        currentTags={tags}
        annotation={lastAnnotation}
        onQuickTag={(tag) => onQuickTag(currentCandidate.id, tag)}
        onSaveAnnotation={(notes) => handleSaveAnnotation(currentCandidate.id, notes)}
      />
    </div>
  );
}
