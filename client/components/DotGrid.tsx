import React, { useMemo } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSettings } from "@/contexts/SettingsContext";
import { getDayOfYear, getDaysInYear } from "@/lib/dateUtils";

interface DotProps {
  index: number;
  size: number;
  color: string;
  isToday: boolean;
  todayColor: string;
  showTodayHighlight: boolean;
}

const Dot = React.memo(function Dot({
  index,
  size,
  color,
  isToday,
  todayColor,
  showTodayHighlight,
}: DotProps) {
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    if (isToday && showTodayHighlight) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(1, { duration: 800 }),
        ),
        -1,
        true,
      );
    }
  }, [isToday, showTodayHighlight]);

  const animatedStyle = useAnimatedStyle(() => {
    if (isToday && showTodayHighlight) {
      return {
        transform: [{ scale: pulseScale.value }],
      };
    }
    return {};
  });

  const dotColor = isToday && showTodayHighlight ? todayColor : color;
  const glowSize = isToday && showTodayHighlight ? size * 2 : 0;

  return (
    <Animated.View
      entering={FadeIn.delay(Math.min(index * 2, 500)).duration(300)}
      style={[
        styles.dotContainer,
        {
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
    >
      {isToday && showTodayHighlight ? (
        <View
          style={[
            styles.todayGlow,
            {
              width: glowSize,
              height: glowSize,
              borderRadius: glowSize / 2,
              backgroundColor: todayColor,
              opacity: 0.2,
            },
          ]}
        />
      ) : null}
      <View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: dotColor,
          },
        ]}
      />
    </Animated.View>
  );
});

export default function DotGrid() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { settings } = useSettings();

  const currentYear = new Date().getFullYear();
  const totalDays = getDaysInYear(currentYear);
  const currentDayOfYear = getDayOfYear();

  const { columns, rows, dotSize, actualSpacing, topPadding } = useMemo(() => {
    const horizontalPadding = 40;
    // We don't use verticalPadding directly for layout logic inside the hook for rows,
    // but the concept of "availableHeight" usually subtracts it. 
    // However, topPadding is now "where we start", so it affects available space if we want to be strict.
    // For now, let's pass it out to be used in styling or margin if needed, or if it simply shifts content.
    // Actually, DotGrid aligns "center" currently in styles.wrapper if we look at styles.
    // If we want "Top Padding" specifically, we probably want to change justifyContent or add marginTop.

    // Let's assume user wants 'topPadding' to push content down from the top.

    // Align with native wallpaper constraint and dynamic top padding for consistency check? 
    // The native code uses `topPadding` to set specific Y-coordinates.

    const maxGridHeight = screenHeight * 0.5;

    const cols = settings.gridCols || 15;
    const rowsNeeded = Math.ceil(totalDays / cols);

    const availableWidth = screenWidth - horizontalPadding * 2;
    const maxDotSizeByWidth =
      (availableWidth - (cols - 1) * settings.dotSpacing) / cols;

    const maxDotSizeByHeight =
      (maxGridHeight - (rowsNeeded - 1) * settings.dotSpacing) / rowsNeeded;

    // Use user setting but clamp to available space
    let calculatedDotSize = Math.min(
      settings.dotSize,
      maxDotSizeByWidth,
      maxDotSizeByHeight,
      100
    );
    calculatedDotSize = Math.max(calculatedDotSize, 2);

    return {
      columns: cols,
      rows: rowsNeeded,
      dotSize: calculatedDotSize,
      actualSpacing: settings.dotSpacing,
      topPadding: settings.topPadding
    };
  }, [
    screenWidth,
    screenHeight,
    insets,
    totalDays,
    settings.dotSpacing,
    settings.topPadding,
    settings.gridCols,
    settings.dotSize
  ]);

  const dots = useMemo(() => {
    const dotArray = [];
    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i + 1;
      const isPast = dayNumber < currentDayOfYear;
      const isToday = dayNumber === currentDayOfYear;
      const isFuture = dayNumber > currentDayOfYear;

      let color = settings.futureColor;
      if (isPast) {
        color = settings.completedColor;
      } else if (isToday) {
        color = settings.showTodayHighlight
          ? settings.todayColor
          : settings.completedColor;
      }

      dotArray.push({
        key: i,
        color,
        isToday,
      });
    }
    return dotArray;
  }, [totalDays, currentDayOfYear, settings]);

  const gridWidth = columns * dotSize + (columns - 1) * actualSpacing;

  return (
    <View style={[styles.container, { width: gridWidth, marginTop: topPadding }]}>
      <View style={styles.grid}>
        {dots.map((dot, index) => (
          <View
            key={dot.key}
            style={{
              marginRight: (index + 1) % columns === 0 ? 0 : actualSpacing,
              marginBottom: actualSpacing,
            }}
          >
            <Dot
              index={index}
              size={dotSize}
              color={dot.color}
              isToday={dot.isToday}
              todayColor={settings.todayColor}
              showTodayHighlight={settings.showTodayHighlight}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  dotContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
  },
  todayGlow: {
    position: "absolute",
  },
});
