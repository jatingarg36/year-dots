import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Slider from "@react-native-community/slider";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface SettingsSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function SettingsSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: SettingsSliderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={styles.header}>
        <ThemedText type="body">{label}</ThemedText>
        <ThemedText type="body" style={{ color: theme.link }}>
          {value}
          {unit}
        </ThemedText>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={theme.link}
        maximumTrackTintColor={theme.backgroundTertiary}
        thumbTintColor={Platform.OS === "android" ? theme.link : undefined}
      />
      <View style={styles.labels}>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {min}
          {unit}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {max}
          {unit}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
