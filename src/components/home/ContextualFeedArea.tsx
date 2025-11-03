import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "motion/react";
import { MessageSquare, Eye, ThumbsUp, Users, Briefcase, Clock } from "lucide-react";

interface ContextualFeedAreaProps {
  userRole: "applicant" | "recruiter";
  onCardClick: (id: string) => void;
}

export function ContextualFeedArea({ userRole, onCardClick }: ContextualFeedAreaProps) {
  // Mock data for applicant view
  const applicantCards = [
    {
      id: "1",
      type: "recruiter_view",
      recruiter: "Sarah Chen",
      company: "TechCorp Inc.",
      action: "viewed your passport",
      time: "2 hours ago",
      engagement: { views: 12, likes: 3 },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: "2",
      type: "recruiter_view",
      recruiter: "Michael Rodriguez",
      company: "InnovateLabs",
      action: "sent you a message",
      time: "5 hours ago",
      engagement: { views: 8, likes: 5 },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      id: "3",
      type: "engagement",
      title: "Your Passport Performance",
      description: "12 new profile views this week",
      time: "Today",
      engagement: { views: 45, likes: 12 },
    },
  ];

  // Mock data for recruiter view
  const recruiterCards = [
    {
      id: "4",
      type: "candidate",
      candidate: "Alex Thompson",
      role: "Senior Frontend Developer",
      skills: ["React", "TypeScript", "Node.js"],
      status: "active",
      time: "Updated 1 hour ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      id: "5",
      type: "candidate",
      candidate: "Jamie Liu",
      role: "UX Designer",
      skills: ["Figma", "User Research", "Prototyping"],
      status: "active",
      time: "Updated 3 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie"
    },
    {
      id: "6",
      type: "folio_activity",
      title: "Product Design Folio",
      description: "3 new candidates added this week",
      count: 12,
      time: "Today",
    },
  ];

  const cards = userRole === "applicant" ? applicantCards : recruiterCards;

  return (
    <div className="px-4 py-2 md:px-6">
      <h3 className="mb-4 px-2" style={{ color: 'var(--soft-ivory)' }}>
        {userRole === "applicant" ? "Recent Activity" : "Active Candidates"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] border-border/50"
              style={{ 
                backgroundColor: 'var(--graphite-brushed)',
                boxShadow: 'rgba(0,0,0,0.4) 0px 2px 12px',
              }}
              onClick={() => onCardClick(card.id)}
            >
              {/* Subtle top accent line with cyan glow on hover */}
              <div 
                className="h-1 w-full transition-all duration-300 group-hover:h-1.5 group-hover:shadow-lg" 
                style={{ 
                  backgroundColor: userRole === "applicant" ? 'var(--electric-cyan)' : 'var(--emerald)',
                  boxShadow: userRole === "applicant" 
                    ? '0 2px 12px rgba(0, 181, 216, 0)'
                    : '0 2px 12px rgba(0, 196, 140, 0)'
                }}
              />
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  {(card as any).recruiter || (card as any).candidate ? (
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={(card as any).avatar} />
                        <AvatarFallback style={{ backgroundColor: 'var(--graphite-brushed)', color: 'var(--electric-cyan)' }}>
                          {((card as any).recruiter || (card as any).candidate)?.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm truncate" style={{ color: 'var(--soft-ivory)' }}>
                          {(card as any).recruiter || (card as any).candidate}
                        </CardTitle>
                        <p className="text-xs mt-0.5 truncate" style={{ 
                          color: 'var(--body-text)',
                          fontFamily: "'Inter', sans-serif"
                        }}>
                          {(card as any).company || (card as any).role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <CardTitle className="text-sm" style={{ color: 'var(--soft-ivory)' }}>
                        {(card as any).title}
                      </CardTitle>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {(card as any).action && (
                  <p className="text-xs mb-3" style={{ color: 'var(--body-text)' }}>
                    {(card as any).action}
                  </p>
                )}
                
                {(card as any).description && (
                  <p className="text-xs mb-3" style={{ color: 'var(--body-text)' }}>
                    {(card as any).description}
                  </p>
                )}

                {(card as any).skills && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(card as any).skills.slice(0, 3).map((skill: string) => (
                      <Badge 
                        key={skill}
                        variant="outline"
                        className="text-xs px-2 py-0 border-0"
                        style={{ 
                          backgroundColor: 'var(--graphite-brushed)',
                          color: 'var(--meta-text)',
                          fontFamily: "'Kode Mono', monospace"
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--meta-text)' }}>
                    {(card as any).engagement && (
                      <>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {(card as any).engagement.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {(card as any).engagement.likes}
                        </span>
                      </>
                    )}
                    {(card as any).count && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {(card as any).count}
                      </span>
                    )}
                  </div>
                  <span className="text-xs flex items-center gap-1" style={{ 
                    color: 'var(--meta-text)',
                    fontFamily: "'Kode Mono', monospace"
                  }}>
                    <Clock className="h-3 w-3" />
                    {card.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
