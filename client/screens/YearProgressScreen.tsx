import React, { useCallback } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import DotGrid from "@/components/DotGrid";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/contexts/SettingsContext";
import { getDayOfYear, getDaysInYear, getYearProgress } from "@/lib/dateUtils";
import { Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function YearProgressScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { isLoading } = useSettings();

  const currentYear = new Date().getFullYear();
  const currentDay = getDayOfYear();
  const totalDays = getDaysInYear(currentYear);
  const progress = getYearProgress(currentDay, totalDays);

  const handleSettingsPress = useCallback(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    navigation.navigate("Settings");
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]} />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
        <View style={styles.progressInfo}>
          <ThemedText type="h2" style={styles.progressText}>
            {progress}%
          </ThemedText>
          <ThemedText
            type="small"
            style={[styles.yearText, { color: theme.textSecondary }]}
          >
            of {currentYear}
          </ThemedText>
        </View>
        <Pressable
          style={[
            styles.settingsButton,
            { backgroundColor: theme.backgroundDefault },
          ]}
          onPress={handleSettingsPress}
          hitSlop={10}
        >
          <Feather name="settings" size={20} color={theme.text} />
        </Pressable>
      </View>

      <View style={styles.gridContainer}>
        <DotGrid />
      </View>

      <View
        style={[styles.footer, { paddingBottom: insets.bottom + Spacing.lg }]}
      >
        <ThemedText
          type="small"
          style={[styles.dayInfo, { color: theme.textSecondary }]}
        >
          Day {currentDay} of {totalDays}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.xl,
  },
  progressInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.sm,
  },
  progressText: {
    fontWeight: "700",
  },
  yearText: {
    fontWeight: "500",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    paddingTop: Spacing.lg,
  },
  dayInfo: {
    fontWeight: "500",
  },
});
