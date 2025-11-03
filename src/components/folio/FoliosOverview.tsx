import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, FolderOpen } from "lucide-react";
import { Button } from "../ui/button";
import { FolioCard } from "./FolioCard";
import { FolioForm } from "./FolioForm";
import { Folio, FolioFormData } from "./types";
import { toast } from "sonner@2.0.3";

interface FoliosOverviewProps {
  folios: Folio[];
  onBack: () => void;
  onFolioClick: (folioId: string) => void;
  onCreateFolio: (data: FolioFormData) => void;
  openFormDirectly?: boolean;
}

export function FoliosOverview({
  folios,
  onBack,
  onFolioClick,
  onCreateFolio,
  openFormDirectly = false,
}: FoliosOverviewProps) {
  const [showCreateForm, setShowCreateForm] = useState(openFormDirectly);

  const handleCreateFolio = (data: FolioFormData) => {
    onCreateFolio(data);
    setShowCreateForm(false);
    toast.success("Folio created successfully");
  };

  const activeFolios = folios.filter((f) => f.status === "active");
  const draftFolios = folios.filter((f) => f.status === "draft");

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
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
            style={{ color: "var(--emerald)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h2 style={{ color: "var(--soft-ivory)" }}>My Folios</h2>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="mb-2" style={{ color: "var(--soft-ivory)" }}>
                Recruitment Folios
              </h1>
              <p style={{ color: "var(--body-text)" }}>
                Organize and review candidates for your open positions
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="gap-2"
              style={{
                backgroundColor: "var(--emerald)",
                color: "var(--onyx-gradient-start)",
              }}
            >
              <Plus className="h-4 w-4" />
              Create Folio
            </Button>
          </div>
        </motion.div>

        {/* Active Folios */}
        {activeFolios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h3 className="mb-4" style={{ color: "var(--soft-ivory)" }}>
              Active Folios
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {activeFolios.map((folio) => (
                <FolioCard
                  key={folio.id}
                  folio={folio}
                  candidateCount={folio.candidateIds.length}
                  onClick={() => onFolioClick(folio.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Draft Folios */}
        {draftFolios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4" style={{ color: "var(--soft-ivory)" }}>
              Drafts
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {draftFolios.map((folio) => (
                <FolioCard
                  key={folio.id}
                  folio={folio}
                  candidateCount={folio.candidateIds.length}
                  onClick={() => onFolioClick(folio.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {folios.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="py-16 text-center"
          >
            <div
              className="inline-flex p-6 rounded-2xl mb-6"
              style={{
                backgroundColor: "rgba(0, 196, 140, 0.1)",
              }}
            >
              <FolderOpen className="h-16 w-16" style={{ color: "var(--emerald)" }} />
            </div>
            <h3 className="mb-2" style={{ color: "var(--soft-ivory)" }}>
              No folios yet
            </h3>
            <p className="mb-6" style={{ color: "var(--body-text)" }}>
              Create your first folio to start reviewing candidates
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="gap-2"
              style={{
                backgroundColor: "var(--emerald)",
                color: "var(--onyx-gradient-start)",
              }}
            >
              <Plus className="h-4 w-4" />
              Create First Folio
            </Button>
          </motion.div>
        )}
      </div>

      {/* Create Form Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <FolioForm
            onSave={handleCreateFolio}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
