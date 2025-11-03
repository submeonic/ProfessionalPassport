import { motion } from "motion/react";
import { Home, FileUser, Users, BarChart3, Settings, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationRailProps {
  userRole: "applicant" | "recruiter";
  onNavigate: (section: string) => void;
  isMobile?: boolean;
  activeSection?: string;
}

export function NavigationRail({ userRole, onNavigate, isMobile = false, activeSection: propActiveSection }: NavigationRailProps) {
  const [activeSection, setActiveSection] = useState(propActiveSection || "home");

  // Update active section when prop changes
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  const applicantNavItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "passport", icon: FileUser, label: "Passport" },
    { id: "networking", icon: Users, label: "Network" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const recruiterNavItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "folios", icon: FolderOpen, label: "Folios" },
    { id: "networking", icon: Users, label: "Network" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const navItems = userRole === "applicant" ? applicantNavItems : recruiterNavItems;
  const accentColor = userRole === "applicant" ? "#00B5D8" : "#00C48C";

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    onNavigate(id);
  };

  if (isMobile) {
    // Bottom tab navigation for mobile
    return (
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{ 
          backgroundColor: 'rgb(27, 27, 27)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative flex flex-col items-center justify-center px-3 py-2 min-w-[60px] transition-all duration-200"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: `${accentColor}15` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <Icon 
                  className="h-5 w-5 mb-1 transition-colors relative z-10"
                  style={{ color: isActive ? accentColor : 'var(--warm-nickel)' }}
                />
                <span 
                  className="text-xs relative z-10 transition-colors"
                  style={{ 
                    color: isActive ? accentColor : 'var(--warm-nickel)',
                    fontFamily: "'Kode Mono', monospace"
                  }}
                >
                  {item.label}
                </span>

                {/* Glow effect for active item */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-xl opacity-30"
                    style={{ backgroundColor: accentColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Side rail navigation for desktop
  return (
    <div 
      className="fixed left-0 top-0 bottom-0 w-20 border-r z-40 hidden md:flex flex-col"
      style={{ 
        backgroundColor: 'rgb(27, 27, 27)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="flex-1 flex flex-col items-center py-6 gap-4">
        {/* Logo/Brand */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-8"
          style={{ backgroundColor: 'var(--graphite-brushed)' }}
        >
          <div 
            className="text-lg"
            style={{ 
              color: accentColor,
              fontFamily: "'Overpass', sans-serif",
              fontWeight: 800
            }}
          >
            PP
          </div>
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 group"
            >
              {/* Active indicator - left bar */}
              {isActive && (
                <motion.div
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="desktopActiveTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Background */}
              <div 
                className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
                style={{ backgroundColor: `${accentColor}15` }}
              />
              
              <Icon 
                className="h-6 w-6 transition-colors relative z-10"
                style={{ color: isActive ? accentColor : 'var(--warm-nickel)' }}
              />

              {/* Tooltip */}
              <div 
                className="absolute left-full ml-4 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                style={{ 
                  backgroundColor: 'var(--graphite-brushed)',
                  color: 'var(--soft-ivory)',
                  fontSize: '0.75rem',
                  boxShadow: 'rgba(0,0,0,0.4) 0px 2px 12px'
                }}
              >
                {item.label}
              </div>

              {/* Glow effect for active item */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl blur-lg opacity-20"
                  style={{ backgroundColor: accentColor }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
