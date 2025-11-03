import { motion } from "motion/react";
import { FileUser, Target, X } from "lucide-react";
import { Button } from "../ui/button";

interface PreviewOptionsModalProps {
  onSelectCorePassport: () => void;
  onSelectRoleFocus: () => void;
  onDismiss: () => void;
}

export function PreviewOptionsModal({
  onSelectCorePassport,
  onSelectRoleFocus,
  onDismiss,
}: PreviewOptionsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgb(0, 0, 0)" }}
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "var(--onyx-gradient-start)",
          borderColor: "var(--border)",
          boxShadow: "rgba(0, 181, 216, 0.3) 0px 0px 40px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 style={{ color: "var(--soft-ivory)" }}>Choose Preview Type</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
            className="h-8 w-8 p-0"
            style={{ color: "var(--warm-nickel)" }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {/* Core Passport Option */}
          <button
            onClick={onSelectCorePassport}
            className="group w-full p-4 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--graphite-brushed)",
              borderColor: "var(--border)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(0, 181, 216, 0.15) 0%, transparent 100%)",
                boxShadow: "0 0 20px rgba(0, 181, 216, 0.3)",
              }}
            />

            <div className="relative flex items-start gap-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "rgba(0, 181, 216, 0.2)" }}
              >
                <FileUser className="h-6 w-6" style={{ color: "var(--electric-cyan)" }} />
              </div>
              <div className="flex-1">
                <h3 className="mb-1" style={{ color: "var(--soft-ivory)" }}>
                  Core Passport
                </h3>
                <p style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                  Complete overview of your professional profile including all sections
                </p>
              </div>
            </div>
          </button>

          {/* Role Focus Option */}
          <button
            onClick={onSelectRoleFocus}
            className="group w-full p-4 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--graphite-brushed)",
              borderColor: "var(--border)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(0, 181, 216, 0.15) 0%, transparent 100%)",
                boxShadow: "0 0 20px rgba(0, 181, 216, 0.3)",
              }}
            />

            <div className="relative flex items-start gap-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "rgba(0, 181, 216, 0.2)" }}
              >
                <Target className="h-6 w-6" style={{ color: "var(--electric-cyan)" }} />
              </div>
              <div className="flex-1">
                <h3 className="mb-1" style={{ color: "var(--soft-ivory)" }}>
                  Role Focus
                </h3>
                <p style={{ color: "var(--body-text)", fontSize: "0.875rem" }}>
                  Tailored view focused on specific roles and requirements
                </p>
                <p
                  className="mt-2"
                  style={{
                    color: "var(--meta-text)",
                    fontSize: "0.75rem",
                    fontFamily: "'Kode Mono', monospace",
                  }}
                >
                  Coming soon
                </p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
