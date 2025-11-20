"use client";

import { useSearchParams } from "next/navigation";
//
import { useAuth } from "@/context/AuthContext";
//
import Header from "@/components/header";
import AuthModal from "@/components/auth-modal";
import Sidebar from "@/components/sidebar/sidebar";
//
import MainContent from "@/app/dashboard/main-content/index";
//
import { Tabs } from "@/types/tab/tab.enums";
//

export default function Home() {
  const params = useSearchParams();

  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <MainContent activeTab={(params.get("tab") as Tabs) || Tabs.ACTIVE} />
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={!isAuthenticated}
        // onClose={() => setShowAuthModal(true)}
        // onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
