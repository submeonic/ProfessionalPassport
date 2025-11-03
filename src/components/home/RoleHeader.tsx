import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

interface RoleHeaderProps {
  userName: string;
  userRole: "applicant" | "recruiter";
  avatarUrl?: string;
}

export function RoleHeader({ userName, userRole, avatarUrl }: RoleHeaderProps) {
  const roleColors = {
    applicant: "var(--electric-cyan)",
    recruiter: "var(--emerald)",
  };

  const roleLabels = {
    applicant: "Applicant",
    recruiter: "Recruiter",
  };

  return (
    <div className="relative px-4 py-4 md:px-6 md:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-offset-background" style={{ '--tw-ring-color': roleColors[userRole] } as React.CSSProperties}>
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback style={{ backgroundColor: 'var(--graphite-brushed)', color: roleColors[userRole] }}>
              {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-soft-ivory">{userName}</h2>
            <Badge 
              variant="outline" 
              className="mt-1 border-0 px-2 py-0.5"
              style={{ 
                backgroundColor: `${roleColors[userRole]}20`,
                color: roleColors[userRole],
                fontFamily: "'Kode Mono', monospace",
                fontSize: '0.75rem'
              }}
            >
              {roleLabels[userRole]}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Animated accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ backgroundColor: roleColors[userRole] }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
