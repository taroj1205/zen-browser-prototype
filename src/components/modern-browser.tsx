"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Chrome,
  Home,
  Plus,
  X,
  Menu,
  Search,
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  Twitter,
  Twitch,
  Facebook,
  Moon,
  Sun,
  Music2,
  BookMarked,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { ComponentPlaceholderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

const initialTabs: Tab[] = [
  {
    id: "1",
    title: "Home",
    url: "https://browser.example.com",
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
];

const MIN_SIDEBAR_WIDTH = 240;
const MAX_SIDEBAR_WIDTH = 480;

export function ModernBrowser() {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [isUIVisible, setIsUIVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "c") {
        setIsUIVisible((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleNewTab = () => {
    const newTab = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Tab",
      url: "about:blank",
      icon: "/placeholder.svg?height=16&width=16",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      handleNewTab();
    }
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      let newWidth = e.clientX;
      if (newWidth < MIN_SIDEBAR_WIDTH) newWidth = MIN_SIDEBAR_WIDTH;
      if (newWidth > MAX_SIDEBAR_WIDTH) newWidth = MAX_SIDEBAR_WIDTH;
      setSidebarWidth(newWidth);
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className={`flex h-screen ${isDark ? "dark" : ""}`}>
      {/* Sidebar Toggle Button - Visible on Mobile */}
      {!isUIVisible && (
        <button
          type="button"
          onClick={() => setIsUIVisible(true)}
          className="fixed top-4 left-4 z-50 bg-background/50 backdrop-blur-sm p-2 rounded-full"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      {/* Vertical Tabs Sidebar */}
      {isUIVisible && (
        <div
          className={`${
            isSidebarExpanded ? `w-[${sidebarWidth}px]` : "w-16"
          } bg-[#f3e5e1] dark:bg-gray-900 flex flex-col transition-all duration-300 relative`}
          style={{ width: isSidebarExpanded ? sidebarWidth : 64 }}
        >
          <div className="p-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsSidebarExpanded((prev) => !prev)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            {isSidebarExpanded && (
              <>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Home className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 ml-auto"
                  onClick={toggleTheme}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              </>
            )}
          </div>
          <ScrollArea className="flex-1">
            {/* Shortcuts Grid */}
            <div
              className={`grid gap-2 p-2 ${
                isSidebarExpanded ? "grid-cols-4" : "grid-cols-1"
              }`}
            >
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Instagram className="w-4 h-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Youtube className="w-4 h-4" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </Link>
              <Link
                href="https://messenger.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <MessageCircle className="w-4 h-4" />
                  <span className="sr-only">Messenger</span>
                </Button>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Linkedin className="w-4 h-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Twitter className="w-4 h-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link
                href="https://twitch.tv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Twitch className="w-4 h-4" />
                  <span className="sr-only">Twitch</span>
                </Button>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Facebook className="w-4 h-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link
                href="https://chrome.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="icon" className="w-full h-10">
                  <Chrome className="w-4 h-4" />
                  <span className="sr-only">Chrome</span>
                </Button>
              </Link>
            </div>

            <div className="flex-1 px-2">
              {/* Collapsible Sections */}
              <div className="space-y-2">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center w-full p-2 text-sm hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg">
                    <Music2 className="w-4 h-4 mr-2" />
                    {isSidebarExpanded && "Music"}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-4 space-y-1">
                      {tabs
                        .filter((tab) => tab.title.includes("YouTube"))
                        .map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/50 dark:hover:bg-gray-800"
                          >
                            <Youtube className="w-4 h-4 text-red-500" />
                            {isSidebarExpanded && tab.title}
                          </button>
                        ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center w-full p-2 text-sm hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg">
                    <BookMarked className="w-4 h-4 mr-2" />
                    {isSidebarExpanded && "Bookmarks"}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-4 space-y-1">
                      {tabs.map((tab) => (
                        <div
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          onKeyUp={(e) => e.key === " " && setActiveTab(tab.id)}
                          onKeyDown={(e) =>
                            e.key === " " && setActiveTab(tab.id)
                          }
                          onTouchStart={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg group hover:bg-white/50 dark:hover:bg-gray-800 cursor-pointer ${
                            activeTab === tab.id
                              ? "bg-white/60 dark:bg-gray-800"
                              : ""
                          }`}
                        >
                          {tab.icon ? (
                            <Image
                              src={tab.icon}
                              alt=""
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                          ) : (
                            <ComponentPlaceholderIcon className="w-4 h-4 text-gray-500" />
                          )}
                          {isSidebarExpanded && (
                            <>
                              <span className="flex-1 text-left truncate">
                                {tab.title}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 opacity-0 group-hover:opacity-100"
                                onClick={(e) => handleCloseTab(tab.id, e)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </ScrollArea>
          {/* Bottom Actions */}
          <div
            className={cn(
              "p-2 grid gap-2 border-t dark:border-gray-800 place-items-center",
              isSidebarExpanded ? "grid-cols-4" : "grid-cols-1"
            )}
          >
            {isSidebarExpanded ? (
              <>
                <Button variant="ghost" size="icon" className="aspect-square">
                  <Home className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="aspect-square">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="aspect-square">
                  <Share2 className="w-4 h-4" />
                </Button>
              </>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              className="aspect-square"
              onClick={handleNewTab}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Resize Handle */}
          {isSidebarExpanded && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-300 dark:bg-gray-700"
              onMouseDown={handleMouseDown}
            />
          )}
        </div>
      )}

      {/* Main Browser Content */}
      <div className="flex-1 flex flex-col bg-background dark:bg-gray-950">
        {isUIVisible && (
          <div className="flex items-center gap-2 p-2 bg-background border-b dark:border-gray-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.forward()}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReload}>
              <RotateCcw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>

            <div className="flex-1 flex items-center bg-muted rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                value={tabs.find((tab) => tab.id === activeTab)?.url}
                onChange={(e) => {
                  const newTabs = tabs.map((tab) =>
                    tab.id === activeTab ? { ...tab, url: e.target.value } : tab
                  );
                  setTabs(newTabs);
                }}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
          </div>
        )}

        {/* Browser Content */}
        {/* <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              The browser made for you,
              <br />
              not your data.
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Beautifully designed, privacy-focused, and packed with features.
              <br />
              We care about your experience, not your data.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Press Ctrl+C to toggle UI visibility
            </p>
            <Button size="lg" className="rounded-full">
              Download Now
            </Button>
          </div>
        </div> */}
        <iframe
          title="browser"
          src="https://tr6dnof6iut6iknflu.b-cdn.net/"
          className="flex-1"
        />
      </div>
    </div>
  );
}
