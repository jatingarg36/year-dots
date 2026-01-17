import AsyncStorage from "@react-native-async-storage/async-storage";
import { DotDefaults } from "@/constants/theme";

const SETTINGS_KEY = "@year_progress_settings";

export interface DotSettings {
  dotSize: number;
  dotSpacing: number;
  completedColor: string;
  todayColor: string;
  futureColor: string;
  showTodayHighlight: boolean;
  startWeekOnSunday: boolean;
}

export const defaultSettings: DotSettings = {
  dotSize: DotDefaults.dotSize,
  dotSpacing: DotDefaults.dotSpacing,
  completedColor: DotDefaults.completedColor,
  todayColor: DotDefaults.todayColor,
  futureColor: DotDefaults.futureColor,
  showTodayHighlight: DotDefaults.showTodayHighlight,
  startWeekOnSunday: DotDefaults.startWeekOnSunday,
};

export async function saveSettings(settings: DotSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}

export async function loadSettings(): Promise<DotSettings> {
  try {
    const stored = await AsyncStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
    return defaultSettings;
  } catch (error) {
    console.error("Failed to load settings:", error);
    return defaultSettings;
  }
}

export async function resetSettings(): Promise<DotSettings> {
  try {
    await AsyncStorage.removeItem(SETTINGS_KEY);
    return defaultSettings;
  } catch (error) {
    console.error("Failed to reset settings:", error);
    return defaultSettings;
  }
}
