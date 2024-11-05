"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar, type Tab } from "./sidebar";
import { BrowserContent } from "./browser-content";

const HOME_PAGE = "https://zen-browser.app/";

export const ModernBrowser = () => {
  const initialTabs: Tab[] = useMemo(
    () => [
      {
        id: "1",
        title: "Zen Browser",
        url: HOME_PAGE,
      },
      {
        id: "2",
        title: "YouTube - LINARIA",
        url: "https://youtube.com/watch?v=123",
      },
      {
        id: "3",
        title: "YouTube - Vespera",
        url: "https://youtube.com/watch?v=456",
      },
      {
        id: "4",
        title: "GitHub",
        url: "https://github.com",
      },
    ],
    []
  );

  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [isUIVisible, setIsUIVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(HOME_PAGE);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "c") {
        setIsUIVisible((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (activeTabData) {
      setIframeUrl(activeTabData.url);
    }
  }, [activeTab, tabs]);

  return (
    <div className={`flex h-screen ${isDark ? "dark" : ""}`}>
      {!isUIVisible && (
        <button
          type="button"
          onClick={() => setIsUIVisible(true)}
          className="fixed top-4 left-4 z-50 bg-background/50 backdrop-blur-sm p-2 rounded-full"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      {isUIVisible && (
        <Sidebar
          tabs={tabs}
          setTabs={setTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          setIsDark={setIsDark}
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
          isResizing={isResizing}
          setIsResizing={setIsResizing}
        />
      )}

      <BrowserContent
        isUIVisible={isUIVisible}
        tabs={tabs}
        setTabs={setTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        iframeUrl={iframeUrl}
        setIframeUrl={setIframeUrl}
      />
    </div>
  );
};
