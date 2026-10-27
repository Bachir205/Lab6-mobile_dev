import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../theme-context";

export default function SettingsScreen() {
  const { colors, isDark, setIsDark } = useTheme();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>
        <View
          style={[
            styles.settingRow,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.settingCopy}>
            <Text style={[styles.label, { color: colors.text }]}>
              Dark theme
            </Text>
            <Text style={[styles.value, { color: colors.mutedText }]}>
              Current theme: {isDark ? "Dark" : "Light"}
            </Text>
          </View>
          <Switch
            accessibilityLabel="Dark theme"
            accessibilityHint={`Switch to ${isDark ? "light" : "dark"} theme`}
            value={isDark}
            onValueChange={setIsDark}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={isDark ? colors.primaryText : colors.surface}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  settingRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingCopy: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
  },
});
