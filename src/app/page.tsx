"use client";

import { useState } from "react";
//
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { AuthModal } from "@/components/auth-modal";
//
import MainContent from "@/app/dashboard/main-content/index";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(isAuthenticated);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAuthenticated={isAuthenticated} />
        <MainContent />
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(true)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
