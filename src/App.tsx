import { useState } from "react";
import { HomeDashboard } from "./components/home/HomeDashboard";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [userRole, setUserRole] = useState<"applicant" | "recruiter">("applicant");

  return (
    <>
      {/* Main Dashboard */}
      <HomeDashboard userRole={userRole} onRoleChange={setUserRole} />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </>
  );
}
