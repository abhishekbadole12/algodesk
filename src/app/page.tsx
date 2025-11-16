"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
//
import { useAuth } from "@/context/AuthContext";
//
import Header from "@/components/header";
import AuthModal from "@/components/auth-modal";
import Sidebar from "@/components/sidebar/sidebar";
//
import MainContent from "@/app/dashboard/main-content/index";
//
import { useInstruments } from "@/hooks/useInstruments";
//
import { Tabs } from "@/enum/tabs.enum";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const params = useSearchParams();

  // const { data, loading } = useInstruments();

  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [showAuthModal, setShowAuthModal] = useState<boolean>(isAuthenticated);

  // const handleAuthSuccess = () => {
  //   setIsAuthenticated(true);
  //   setShowAuthModal(false);
  // };
  console.log(params);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <MainContent activeTab={params.get("tab") || Tabs.ACTIVE} />
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
