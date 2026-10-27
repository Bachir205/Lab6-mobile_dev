import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import appConfig from "../../app.json";
import { useTheme } from "../theme-context";

const creatorName = "Tic-Tac-Toe Team";
const appName = appConfig.expo.name;

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.appName, { color: colors.text }]}>{appName}</Text>
        <Text style={[styles.detail, { color: colors.secondaryText }]}>
          Version {appConfig.expo.version}
        </Text>
        <Text style={[styles.detail, { color: colors.mutedText }]}>
          Created by {creatorName}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
});
