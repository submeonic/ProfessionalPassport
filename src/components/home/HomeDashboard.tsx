import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { RoleHeader } from "./RoleHeader";
import { QuickActionsBar } from "./QuickActionsBar";
import { ContextualFeedArea } from "./ContextualFeedArea";
import { InsightsFooterCard } from "./InsightsFooterCard";
import { NavigationRail } from "./NavigationRail";
import { PassportOverview } from "../passport/PassportOverview";
import { CorePassportPreview } from "../passport/CorePassportPreview";
import { PreviewOptionsModal } from "../passport/PreviewOptionsModal";
import { FoliosOverview } from "../folio/FoliosOverview";
import { CandidateCarousel } from "../folio/CandidateCarousel";
import { CandidateFullHistory } from "../folio/CandidateFullHistory";
import { PassportData } from "../passport/types";
import { mockPassportData } from "../passport/mockData";
import { Folio, FolioFormData, FoliosData, CandidateTag, CandidateAnnotation } from "../folio/types";
import { mockFoliosData } from "../folio/mockData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { UserCircle, Briefcase } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface HomeDashboardProps {
  userRole: "applicant" | "recruiter";
  onRoleChange: (role: "applicant" | "recruiter") => void;
}

type ApplicantViewState = "home" | "passport" | "preview";
type RecruiterViewState = "home" | "folios" | "carousel" | "review";
type ViewState = ApplicantViewState | RecruiterViewState;

export function HomeDashboard({ userRole, onRoleChange }: HomeDashboardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Applicant state
  const [passportData, setPassportData] = useState<PassportData>(mockPassportData);
  
  // Recruiter state
  const [foliosData, setFoliosData] = useState<FoliosData>(mockFoliosData);
  const [activeFolioId, setActiveFolioId] = useState<string | null>(null);
  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleActionClick = (action: string) => {
    if (userRole === "applicant" && action === "preview") {
      setShowPreviewModal(true);
      return;
    }

    if (userRole === "recruiter") {
      if (action === "create_folio") {
        // Directly open FolioFormView by setting a flag
        setActiveFolioId("new");
        setCurrentView("folios");
        return;
      }
      if (action === "view_candidates") {
        // Open FoliosOverview to show all folios
        setCurrentView("folios");
        return;
      }
    }

    const actionMessages: Record<string, string> = {
      share: "Share Passport feature coming soon!",
      network: "Launching Networking Mode...",
      analytics: "Opening detailed analytics...",
    };

    toast.success(actionMessages[action] || `${action} clicked`);
  };

  const handleCardClick = (id: string) => {
    toast.info(`Opening details for card ${id}`);
  };

  const handleNavigate = (section: string) => {
    if (section === "passport" && userRole === "applicant") {
      setCurrentView("passport");
      return;
    }
    if (section === "folios" && userRole === "recruiter") {
      setCurrentView("folios");
      return;
    }
    if (section === "home") {
      setCurrentView("home");
      return;
    }
    toast.info(`Navigating to ${section}`);
  };

  const handlePreviewCorePassport = () => {
    setShowPreviewModal(false);
    setCurrentView("preview");
  };

  const handlePreviewRoleFocus = () => {
    setShowPreviewModal(false);
    toast.info("Role Focus view coming soon");
  };

  // Recruiter handlers
  const handleCreateFolio = (data: FolioFormData) => {
    const newFolio: Folio = {
      id: `folio-${Date.now()}`,
      ...data,
      status: "active",
      createdDate: new Date().toISOString().split("T")[0],
      candidateIds: [],
    };
    setFoliosData((prev) => ({
      ...prev,
      folios: [...prev.folios, newFolio],
    }));
  };

  const handleFolioClick = (folioId: string) => {
    setActiveFolioId(folioId);
    setCurrentView("carousel");
  };

  const handleCandidateClick = (candidateId: string) => {
    setActiveCandidateId(candidateId);
    setCurrentView("review");
  };

  const handleQuickTag = (candidateId: string, tag: CandidateTag) => {
    if (!activeFolioId) return;
    
    const key = `${activeFolioId}-${candidateId}`;
    const currentAnnotation = foliosData.annotations[key];
    const currentTags = currentAnnotation?.tags || [];
    
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    
    setFoliosData((prev) => ({
      ...prev,
      annotations: {
        ...prev.annotations,
        [key]: {
          candidateId,
          folioId: activeFolioId,
          tags: newTags,
          notes: currentAnnotation?.notes || "",
          reviewedDate: new Date().toISOString().split("T")[0],
        },
      },
    }));
    
    toast.success(`Tagged as ${tag}`);
  };

  const handleSaveAnnotation = (candidateId: string, notes: string) => {
    if (!activeFolioId) return;
    
    const key = `${activeFolioId}-${candidateId}`;
    const currentAnnotation = foliosData.annotations[key];
    
    setFoliosData((prev) => ({
      ...prev,
      annotations: {
        ...prev.annotations,
        [key]: {
          candidateId,
          folioId: activeFolioId,
          tags: currentAnnotation?.tags || [],
          notes,
          reviewedDate: new Date().toISOString().split("T")[0],
        },
      },
    }));
  };

  const handleToggleTag = (candidateId: string, tag: CandidateTag) => {
    handleQuickTag(candidateId, tag);
  };

  const userName = userRole === "applicant" ? "Jordan Smith" : "Patricia Rivera";
  const avatarUrl = userRole === "applicant" 
    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia";

  // Applicant Views
  if (userRole === "applicant") {
    // Render Passport Overview
    if (currentView === "passport") {
      return (
        <>
          <NavigationRail 
            userRole={userRole} 
            onNavigate={handleNavigate}
            isMobile={isMobile}
            activeSection="passport"
          />
          <div className={isMobile ? 'pb-20' : 'md:pl-20'}>
            <PassportOverview
              userName={userName}
              initialData={passportData}
              onBack={() => setCurrentView("home")}
              onDataChange={setPassportData}
            />
          </div>
        </>
      );
    }

    // Render Core Passport Preview
    if (currentView === "preview") {
      return (
        <>
          <NavigationRail 
            userRole={userRole} 
            onNavigate={handleNavigate}
            isMobile={isMobile}
            activeSection="home"
          />
          <div className={isMobile ? 'pb-20' : 'md:pl-20'}>
            <CorePassportPreview
              data={passportData}
              userName={userName}
              onBack={() => setCurrentView("home")}
            />
          </div>
        </>
      );
    }
  }

  // Recruiter Views
  if (userRole === "recruiter") {
    // Render Folios Overview
    if (currentView === "folios") {
      const openFormDirectly = activeFolioId === "new";
      
      return (
        <>
          <NavigationRail 
            userRole={userRole} 
            onNavigate={handleNavigate}
            isMobile={isMobile}
            activeSection="folios"
          />
          <div className={isMobile ? 'pb-20' : 'md:pl-20'}>
            <FoliosOverview
              folios={foliosData.folios}
              onBack={() => {
                setActiveFolioId(null);
                setCurrentView("home");
              }}
              onFolioClick={handleFolioClick}
              onCreateFolio={(data) => {
                handleCreateFolio(data);
                setActiveFolioId(null);
              }}
              openFormDirectly={openFormDirectly}
            />
          </div>
        </>
      );
    }

    // Render Candidate Carousel
    if (currentView === "carousel" && activeFolioId) {
      const folio = foliosData.folios.find((f) => f.id === activeFolioId);
      const candidates = foliosData.candidates.filter((c) =>
        folio?.candidateIds.includes(c.id)
      );
      const annotationKeys = candidates.reduce((acc, c) => {
        acc[c.id] = foliosData.annotations[`${activeFolioId}-${c.id}`]?.tags || [];
        return acc;
      }, {} as Record<string, CandidateTag[]>);
      
      const annotationNotes = candidates.reduce((acc, c) => {
        const notes = foliosData.annotations[`${activeFolioId}-${c.id}`]?.notes;
        if (notes) {
          acc[c.id] = notes;
        }
        return acc;
      }, {} as Record<string, string>);

      return (
        <>
          <NavigationRail 
            userRole={userRole} 
            onNavigate={handleNavigate}
            isMobile={isMobile}
            activeSection="folios"
          />
          <div className={isMobile ? 'pb-20' : 'md:pl-20'}>
            <CandidateCarousel
              folioTitle={folio?.roleTitle || "Candidates"}
              candidates={candidates}
              onBack={() => setCurrentView("folios")}
              onCandidateClick={handleCandidateClick}
              onQuickTag={handleQuickTag}
              onSaveAnnotation={handleSaveAnnotation}
              currentTags={annotationKeys}
              annotations={annotationNotes}
            />
          </div>
        </>
      );
    }

    // Render Candidate Full History
    if (currentView === "review" && activeCandidateId && activeFolioId) {
      const candidate = foliosData.candidates.find((c) => c.id === activeCandidateId);
      const annotation = foliosData.annotations[`${activeFolioId}-${activeCandidateId}`];

      if (candidate) {
        return (
          <>
            <NavigationRail 
              userRole={userRole} 
              onNavigate={handleNavigate}
              isMobile={isMobile}
              activeSection="folios"
            />
            <div className={isMobile ? 'pb-20' : 'md:pl-20'}>
              <CandidateFullHistory
                candidate={candidate}
                annotation={annotation}
                onBack={() => setCurrentView("carousel")}
                onSaveAnnotation={(notes) => handleSaveAnnotation(activeCandidateId, notes)}
                onToggleTag={(tag) => handleToggleTag(activeCandidateId, tag)}
              />
            </div>
          </>
        );
      }
    }
  }

  // Render Home Dashboard
  return (
    <div className="min-h-screen dark" style={{ 
      background: 'linear-gradient(135deg, var(--onyx-gradient-start) 0%, var(--onyx-gradient-end) 100%)'
    }}>
      {/* Role Toggle - Only visible on home page */}
      {currentView === "home" && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <Badge 
            variant="outline"
            className="px-3 py-1.5 border-0"
            style={{
              backgroundColor: 'rgb(42, 42, 42)',
              color: 'var(--meta-text)',
              fontFamily: "'Kode Mono', monospace"
            }}
          >
            Demo Mode
          </Badge>
          <div 
            className="flex gap-2 p-1 rounded-xl border"
            style={{
              backgroundColor: 'rgb(42, 42, 42)',
              borderColor: 'var(--border)'
            }}
          >
            <Button
              size="sm"
              variant={userRole === "applicant" ? "default" : "ghost"}
              onClick={() => onRoleChange("applicant")}
              className="gap-2 transition-all duration-200"
              style={userRole === "applicant" ? {
                backgroundColor: 'var(--electric-cyan)',
                color: 'var(--onyx-gradient-start)',
                fontWeight: 700
              } : {
                color: 'var(--warm-nickel)'
              }}
            >
              <UserCircle className="h-4 w-4" />
              Applicant
            </Button>
            <Button
              size="sm"
              variant={userRole === "recruiter" ? "default" : "ghost"}
              onClick={() => onRoleChange("recruiter")}
              className="gap-2 transition-all duration-200"
              style={userRole === "recruiter" ? {
                backgroundColor: 'var(--emerald)',
                color: 'var(--onyx-gradient-start)',
                fontWeight: 700
              } : {
                color: 'var(--warm-nickel)'
              }}
            >
              <Briefcase className="h-4 w-4" />
              Recruiter
            </Button>
          </div>
        </div>
      )}

      {/* Navigation Rail */}
      <NavigationRail 
        userRole={userRole} 
        onNavigate={handleNavigate}
        isMobile={isMobile}
        activeSection="home"
      />

      {/* Main Content */}
      <div className={`${isMobile ? 'pb-20' : 'md:pl-20'} pt-20 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          {/* Role Header */}
          <RoleHeader 
            userName={userName}
            userRole={userRole}
            avatarUrl={avatarUrl}
          />

          {/* Quick Actions Bar */}
          <QuickActionsBar 
            userRole={userRole}
            onActionClick={handleActionClick}
          />

          {/* Contextual Feed Area */}
          <ContextualFeedArea 
            userRole={userRole}
            onCardClick={handleCardClick}
          />

          {/* Insights Footer Card */}
          <InsightsFooterCard userRole={userRole} />
        </div>
      </div>

      {/* Preview Options Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <PreviewOptionsModal
            onSelectCorePassport={handlePreviewCorePassport}
            onSelectRoleFocus={handlePreviewRoleFocus}
            onDismiss={() => setShowPreviewModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
