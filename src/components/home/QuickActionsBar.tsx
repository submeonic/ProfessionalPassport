import { Button } from "../ui/button";
import { Share2, FolderPlus, Users, BarChart3, FileUser, Eye } from "lucide-react";
import { motion } from "motion/react";

interface QuickActionsBarProps {
  userRole: "applicant" | "recruiter";
  onActionClick: (action: string) => void;
}

export function QuickActionsBar({ userRole, onActionClick }: QuickActionsBarProps) {
  const applicantActions = [
    { icon: Share2, label: "Share Passport", action: "share" },
    { icon: Eye, label: "Preview", action: "preview" },
    { icon: Users, label: "Network", action: "network" },
    { icon: BarChart3, label: "Analytics", action: "analytics" },
  ];

  const recruiterActions = [
    { icon: FolderPlus, label: "Create Folio", action: "create_folio" },
    { icon: FileUser, label: "View Candidates", action: "view_candidates" },
    { icon: Users, label: "Start Networking", action: "network" },
    { icon: BarChart3, label: "Analytics", action: "analytics" },
  ];

  const actions = userRole === "applicant" ? applicantActions : recruiterActions;

  return (
    <div className="px-4 py-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Button
                variant="outline"
                className="group relative w-full h-auto flex flex-col items-center gap-2 p-4 overflow-hidden transition-all duration-300 hover:scale-105 border-border/50"
                style={{
                  backgroundColor: 'var(--graphite-brushed)',
                  boxShadow: 'rgba(0,0,0,0.4) 0px 2px 12px',
                }}
                onClick={() => onActionClick(action.action)}
              >
                {/* Cyan glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(0, 181, 216, 0.1) 0%, transparent 100%)',
                  boxShadow: '0 0 20px rgba(0, 181, 216, 0.3)'
                }} />
                
                <Icon className="h-6 w-6 transition-colors relative z-10" style={{ color: 'var(--warm-nickel)' }} />
                <span className="text-xs transition-colors relative z-10" style={{ 
                  color: 'var(--meta-text)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {action.label}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
