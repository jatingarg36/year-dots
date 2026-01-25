import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#FFFFFF",
  "#FF6B35",
  "#FF4757",
  "#2ED573",
  "#1E90FF",
  "#A55EEA",
  "#FF6B81",
  "#FFA502",
  "#2BCBBA",
  "#4B7BEC",
  "#E8E8E8",
  "#8A8A8A",
  "#4A4A4A",
  "#2A2A2A",
  "#1A1A1A",
];

export default function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const handleColorSelect = (color: string) => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    onChange(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (text: string) => {
    setCustomColor(text);
    if (/^#[0-9A-Fa-f]{6}$/.test(text)) {
      onChange(text);
    }
  };

  return (
    <>
      <Pressable
        style={[styles.container, { backgroundColor: theme.backgroundDefault }]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.labelRow}>
          <ThemedText type="body">{label}</ThemedText>
        </View>
        <View style={styles.valueRow}>
          <View
            style={[
              styles.colorPreview,
              { backgroundColor: value, borderColor: theme.backgroundTertiary },
            ]}
          />
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {value.toUpperCase()}
          </ThemedText>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        </View>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: theme.backgroundDefault },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <ThemedText type="h4">{label}</ThemedText>
              <Pressable onPress={() => setModalVisible(false)} hitSlop={20}>
                <Feather name="x" size={24} color={theme.text} />
              </Pressable>
            </View>

            <View style={styles.previewContainer}>
              <View
                style={[
                  styles.largePreview,
                  {
                    backgroundColor: value,
                    borderColor: theme.backgroundTertiary,
                  },
                ]}
              />
            </View>

            <View style={styles.colorGrid}>
              {PRESET_COLORS.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    value === color && styles.selectedColor,
                  ]}
                  onPress={() => handleColorSelect(color)}
                >
                  {value === color ? (
                    <Feather
                      name="check"
                      size={16}
                      color={
                        ["#FFFFFF", "#E8E8E8", "#FFA502"].includes(
                          color,
                        )
                          ? "#000"
                          : "#FFF"
                      }
                    />
                  ) : null}
                </Pressable>
              ))}
            </View>

            <View style={styles.customColorRow}>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Custom hex:
              </ThemedText>
              <TextInput
                style={[
                  styles.hexInput,
                  {
                    color: theme.text,
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.backgroundTertiary,
                  },
                ]}
                value={customColor}
                onChangeText={handleCustomColorChange}
                placeholder="#FFFFFF"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="characters"
                maxLength={7}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
  labelRow: {
    flex: 1,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    width: "100%",
    maxWidth: 340,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  largePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  customColorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  hexInput: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    fontFamily: "monospace",
    fontSize: 16,
  },
});
