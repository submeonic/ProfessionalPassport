import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "motion/react";
import { TrendingUp, Users, Eye, Heart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Line, LineChart } from "recharts";

interface InsightsFooterCardProps {
  userRole: "applicant" | "recruiter";
}

export function InsightsFooterCard({ userRole }: InsightsFooterCardProps) {
  // Mock data for applicant analytics
  const applicantData = [
    { day: "Mon", views: 12 },
    { day: "Tue", views: 19 },
    { day: "Wed", views: 15 },
    { day: "Thu", views: 25 },
    { day: "Fri", views: 22 },
    { day: "Sat", views: 8 },
    { day: "Sun", views: 10 },
  ];

  // Mock data for recruiter analytics
  const recruiterData = [
    { day: "Mon", candidates: 8 },
    { day: "Tue", candidates: 12 },
    { day: "Wed", candidates: 10 },
    { day: "Thu", candidates: 15 },
    { day: "Fri", candidates: 18 },
    { day: "Sat", candidates: 5 },
    { day: "Sun", candidates: 6 },
  ];

  const applicantMetrics = [
    { icon: Eye, label: "Profile Views", value: "111", change: "+12%" },
    { icon: Heart, label: "Engagement", value: "47", change: "+8%" },
    { icon: Users, label: "Connections", value: "23", change: "+15%" },
  ];

  const recruiterMetrics = [
    { icon: Users, label: "Active Folios", value: "8", change: "+2" },
    { icon: Eye, label: "Candidate Views", value: "74", change: "+18%" },
    { icon: TrendingUp, label: "Placements", value: "5", change: "+1" },
  ];

  const metrics = userRole === "applicant" ? applicantMetrics : recruiterMetrics;
  const chartData = userRole === "applicant" ? applicantData : recruiterData;
  const dataKey = userRole === "applicant" ? "views" : "candidates";

  return (
    <motion.div
      className="px-4 py-6 md:px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <Card 
        className="overflow-hidden border-border/50"
        style={{ 
          backgroundColor: 'var(--graphite-brushed)',
          backgroundImage: 'linear-gradient(135deg, var(--graphite-brushed) 0%, #2E2E2E 100%)',
          boxShadow: 'rgba(0,0,0,0.4) 0px 2px 12px'
        }}
      >
        {/* Top accent gradient */}
        <div 
          className="h-2 w-full" 
          style={{ 
            background: userRole === "applicant" 
              ? 'linear-gradient(90deg, var(--electric-cyan) 0%, var(--emerald) 100%)'
              : 'linear-gradient(90deg, var(--emerald) 0%, var(--electric-cyan) 100%)'
          }}
        />

        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--soft-ivory)' }}>
            <TrendingUp className="h-5 w-5" style={{ color: userRole === "applicant" ? 'var(--electric-cyan)' : 'var(--emerald)' }} />
            {userRole === "applicant" ? "Your Performance Insights" : "Recruitment Analytics"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: '#2E2E2E' }}
                    >
                      <Icon className="h-4 w-4" style={{ color: 'var(--warm-nickel)' }} />
                    </div>
                  </div>
                  <div className="text-2xl mb-1" style={{ 
                    color: 'var(--soft-ivory)',
                    fontFamily: "'Overpass', sans-serif"
                  }}>
                    {metric.value}
                  </div>
                  <div className="text-xs mb-1" style={{ color: 'var(--body-text)' }}>
                    {metric.label}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ 
                      color: 'var(--electric-cyan)',
                      fontFamily: "'Kode Mono', monospace"
                    }}
                  >
                    {metric.change}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="mt-6">
            <h4 className="text-xs mb-3" style={{ 
              color: 'var(--meta-text)',
              fontFamily: "'Kode Mono', monospace"
            }}>
              Last 7 Days
            </h4>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="day" 
                  stroke="var(--warm-nickel)"
                  style={{ fontSize: '10px', fontFamily: "'Kode Mono', monospace" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="var(--warm-nickel)"
                  style={{ fontSize: '10px', fontFamily: "'Kode Mono', monospace" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Bar 
                  dataKey={dataKey} 
                  fill={userRole === "applicant" ? "#00B5D8" : "#00C48C"}
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sparkline for trend */}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--body-text)' }}>
                Overall Trend
              </span>
              <ResponsiveContainer width="60%" height={30}>
                <LineChart data={chartData}>
                  <Line 
                    type="monotone" 
                    dataKey={dataKey} 
                    stroke={userRole === "applicant" ? "#00B5D8" : "#00C48C"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
