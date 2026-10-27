import { StatusBar } from "expo-status-bar";
import { Drawer } from "expo-router/drawer";
import { ThemeProvider, useTheme } from "../theme-context";

function AppDrawer() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
          sceneStyle: { backgroundColor: colors.background },
          drawerStyle: { width: 280, backgroundColor: colors.surface },
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.text,
          drawerActiveBackgroundColor: colors.selected,
          drawerInactiveBackgroundColor: colors.surface,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: "Game", title: "Game" }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerLabel: "Settings", title: "Settings" }}
        />
        <Drawer.Screen
          name="about"
          options={{ drawerLabel: "About", title: "About" }}
        />
      </Drawer>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppDrawer />
    </ThemeProvider>
  );
}
