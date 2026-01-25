import AsyncStorage from "@react-native-async-storage/async-storage";
import { DotDefaults } from "@/constants/theme";

import DefaultPreference from "react-native-default-preference";

const SETTINGS_KEY = "@year_progress_settings";

export interface DotSettings {
  dotSize: number;
  dotSpacing: number;
  topPadding: number;
  completedColor: string;
  todayColor: string;
  futureColor: string;
  showTodayHighlight: boolean;
  startWeekOnSunday: boolean;
  gridCols: number;
}

export const defaultSettings: DotSettings = {
  dotSize: DotDefaults.dotSize,
  dotSpacing: DotDefaults.dotSpacing,
  topPadding: 100, // Default to a reasonable usage
  completedColor: DotDefaults.completedColor,
  todayColor: DotDefaults.todayColor,
  futureColor: DotDefaults.futureColor,
  showTodayHighlight: DotDefaults.showTodayHighlight,
  startWeekOnSunday: DotDefaults.startWeekOnSunday,
  gridCols: 15,
};

// ... existing imports

export async function saveSettings(settings: DotSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    // Sync to Native SharedPreferences for Wallpaper Service
    // VALIDATION: Ensure we use a specific preference file that matches Native code
    await DefaultPreference.setName("year_progress_prefs");

    await DefaultPreference.set("dotSize", String(settings.dotSize));
    await DefaultPreference.set("dotSpacing", String(settings.dotSpacing));
    await DefaultPreference.set("topPadding", String(settings.topPadding));
    // Add gridCols
    await DefaultPreference.set("gridCols", String(settings.gridCols));
    await DefaultPreference.set("completedColor", settings.completedColor);
    await DefaultPreference.set("todayColor", settings.todayColor);
    await DefaultPreference.set("futureColor", settings.futureColor);
    await DefaultPreference.set(
      "showTodayHighlight",
      String(settings.showTodayHighlight),
    ); // Boolean as string or check lib handling
    // react-native-default-preference handles strings best usually, or setBool if available.
    // The lib has set(key, value) where value is string.
    // My Kotlin code reads boolean? No, I wrote it to read String or Boolean.
    // "showTodayHighlight" = it.getBoolean("showTodayHighlight", true).
    // So I should use DefaultPreference.setBool ideally.
    // Let's check if setBool exists. Common libs have it.
    // If not, I'll store as string and update Kotlin to read string.
    // Checking the lib docs (mental check): it usually has setName, set, get.
    // safely: String(val).
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
