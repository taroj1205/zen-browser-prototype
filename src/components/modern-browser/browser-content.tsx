import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";

interface Tab {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

interface BrowserContentProps {
  isUIVisible: boolean;
  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  iframeUrl: string;
  setIframeUrl: (url: string) => void;
}

export const BrowserContent = ({
  isUIVisible,
  tabs,
  setTabs,
  activeTab,
  isLoading,
  setIsLoading,
  iframeUrl,
  setIframeUrl,
}: BrowserContentProps) => {
  const handleReload = () => {
    setIsLoading(true);
    window.location.reload();
    window.addEventListener("load", () => setIsLoading(false), { once: true });
  };

  return (
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
                setIframeUrl(e.target.value);
              }}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
            />
          </div>
        </div>
      )}

      <iframe title="browser" src={iframeUrl} className="flex-1" />
    </div>
  );
};
