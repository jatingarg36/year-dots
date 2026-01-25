import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import * as IntentLauncher from "expo-intent-launcher";

import { ThemedText } from "@/components/ThemedText";
import ColorPicker from "@/components/ColorPicker";
import SettingsSlider from "@/components/SettingsSlider";
import SettingsToggle from "@/components/SettingsToggle";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/contexts/SettingsContext";
import { Spacing, BorderRadius } from "@/constants/theme";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { settings, updateSettings, resetToDefaults } = useSettings();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = useCallback(() => {
    if (Platform.OS === "web") {
      resetToDefaults();
    } else {
      Alert.alert(
        "Reset to Defaults",
        "Are you sure you want to reset all settings to their default values?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Reset",
            style: "destructive",
            onPress: () => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
              resetToDefaults();
            },
          },
        ],
      );
    }
  }, [resetToDefaults]);

  const handleSetWallpaper = useCallback(async () => {
    if (Platform.OS === "android") {
      try {
        // Try deep link to our specific wallpaper service
        await IntentLauncher.startActivityAsync(
          "android.service.wallpaper.CHANGE_LIVE_WALLPAPER",
          {
            extra: {
              "android.service.wallpaper.extra.LIVE_WALLPAPER_COMPONENT":
                "com.yearprogress.dots/.YearProgressWallpaperService",
            },
          }
        );
      } catch (e) {
        console.warn("Failed specific wallpaper intent, trying general", e);
        try {
          // Fallback to general Live Wallpaper picker
          await IntentLauncher.startActivityAsync(
            "android.service.wallpaper.LIVE_WALLPAPER_SETTINGS"
          );
        } catch (e2) {
          console.warn("Failed live wallpaper settings", e2);
          // Fallback to generic Wallpaper settings
          try {
            await IntentLauncher.startActivityAsync("android.settings.WALLPAPER_SETTINGS");
          } catch (e3) {
            Alert.alert(
              "Error",
              "Could not open wallpaper settings. Please go to Settings -> Wallpaper manually."
            );
          }
        }
      }
    } else {
      Alert.alert(
        "Not Supported",
        "Live Wallpaper is only supported on Android."
      );
    }
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xl,
        },
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
    >
      <View style={styles.section}>
        <ThemedText
          type="small"
          style={[styles.sectionHeader, { color: theme.textSecondary }]}
        >
          APPEARANCE
        </ThemedText>

        <SettingsSlider
          label="Dot Size"
          value={settings.dotSize}
          min={6}
          max={16}
          step={1}
          unit="px"
          onChange={(value) => updateSettings({ dotSize: value })}
        />

        <SettingsSlider
          label="Dot Spacing"
          value={settings.dotSpacing}
          min={2}
          max={12}
          step={1}
          unit="px"
          onChange={(value) => updateSettings({ dotSpacing: value })}
        />

        <SettingsSlider
          label="Top Padding"
          value={settings.topPadding}
          min={0}
          max={300}
          step={10}
          unit="px"
          onChange={(value) => updateSettings({ topPadding: value })}
        />

        <SettingsSlider
          label="Columns"
          value={settings.gridCols || 15}
          min={7}
          max={31}
          step={1}
          unit="cols"
          onChange={(value) => updateSettings({ gridCols: value })}
        />
      </View>

      <View style={styles.section}>
        <ThemedText
          type="small"
          style={[styles.sectionHeader, { color: theme.textSecondary }]}
        >
          COLORS
        </ThemedText>

        <ColorPicker
          label="Completed Days"
          value={settings.completedColor}
          onChange={(color) => updateSettings({ completedColor: color })}
        />

        <ColorPicker
          label="Today Highlight"
          value={settings.todayColor}
          onChange={(color) => updateSettings({ todayColor: color })}
        />

        <ColorPicker
          label="Future Days"
          value={settings.futureColor}
          onChange={(color) => updateSettings({ futureColor: color })}
        />
      </View>

      <View style={styles.section}>
        <ThemedText
          type="small"
          style={[styles.sectionHeader, { color: theme.textSecondary }]}
        >
          BEHAVIOR
        </ThemedText>

        <SettingsToggle
          label="Highlight Today"
          description="Show a pulsing animation on today's dot"
          value={settings.showTodayHighlight}
          onChange={(value) => updateSettings({ showTodayHighlight: value })}
        />

        <SettingsToggle
          label="Start Week on Sunday"
          description="Use Sunday as the first day of the week"
          value={settings.startWeekOnSunday}
          onChange={(value) => updateSettings({ startWeekOnSunday: value })}
        />

        <Pressable
          style={[
            styles.resetButton,
            { backgroundColor: theme.backgroundDefault, marginTop: Spacing.lg },
          ]}
          onPress={handleSetWallpaper}
        >
          <Feather name="image" size={18} color={theme.text} />
          <ThemedText
            type="body"
            style={{ color: theme.text, marginLeft: Spacing.sm }}
          >
            Set Live Wallpaper
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <ThemedText
          type="small"
          style={[styles.sectionHeader, { color: theme.textSecondary }]}
        >
          ABOUT
        </ThemedText>

        <View
          style={[
            styles.aboutCard,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          <ThemedText type="body">Year Progress Dots</ThemedText>
          <ThemedText
            type="small"
            style={{ color: theme.textSecondary, marginTop: Spacing.xs }}
          >
            Version 1.0.0
          </ThemedText>
        </View>

        <Pressable
          style={[
            styles.resetButton,
            { backgroundColor: theme.backgroundDefault },
          ]}
          onPress={handleReset}
        >
          <Feather name="refresh-cw" size={18} color="#FF4757" />
          <ThemedText
            type="body"
            style={{ color: "#FF4757", marginLeft: Spacing.sm }}
          >
            Reset to Defaults
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionHeader: {
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  aboutCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
});
