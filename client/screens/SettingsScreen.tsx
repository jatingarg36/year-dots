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
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

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
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              resetToDefaults();
            },
          },
        ]
      );
    }
  }, [resetToDefaults]);

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
          <ThemedText type="body" style={{ color: "#FF4757", marginLeft: Spacing.sm }}>
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
