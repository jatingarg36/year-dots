import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  DotSettings,
  defaultSettings,
  loadSettings,
  saveSettings,
  resetSettings,
} from "@/lib/settingsStorage";

interface SettingsContextType {
  settings: DotSettings;
  updateSettings: (newSettings: Partial<DotSettings>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DotSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings().then((loaded) => {
      setSettings(loaded);
      setIsLoading(false);
      // Ensure native preferences are synced on startup
      saveSettings(loaded);
    });
  }, []);

  const updateSettings = (newSettings: Partial<DotSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
  };

  const resetToDefaults = () => {
    resetSettings().then((defaults) => {
      setSettings(defaults);
    });
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetToDefaults, isLoading }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
