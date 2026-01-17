import React from "react";
import { View, StyleSheet, Switch, Platform } from "react-native";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface SettingsToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function SettingsToggle({
  label,
  description,
  value,
  onChange,
}: SettingsToggleProps) {
  const { theme } = useTheme();

  const handleChange = (newValue: boolean) => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    onChange(newValue);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={styles.textContainer}>
        <ThemedText type="body">{label}</ThemedText>
        {description ? (
          <ThemedText
            type="small"
            style={[styles.description, { color: theme.textSecondary }]}
          >
            {description}
          </ThemedText>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={handleChange}
        trackColor={{
          false: theme.backgroundTertiary,
          true: theme.link,
        }}
        thumbColor={Platform.OS === "android" ? "#FFFFFF" : undefined}
        ios_backgroundColor={theme.backgroundTertiary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  description: {
    marginTop: Spacing.xs,
  },
});
