import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

const lightColors = {
  background: "#f4f7fb",
  surface: "#ffffff",
  board: "#dbeafe",
  square: "#eff6ff",
  text: "#1f2937",
  secondaryText: "#0f172a",
  mutedText: "#475569",
  border: "#dbeafe",
  squareBorder: "#93c5fd",
  primary: "#2563eb",
  primaryText: "#ffffff",
  selected: "#bfdbfe",
  x: "#2563eb",
  o: "#dc2626",
  winner: "#86efac",
  winnerBorder: "#16a34a",
} as const;

const darkColors = {
  background: "#111827",
  surface: "#1f2937",
  board: "#263449",
  square: "#334155",
  text: "#f9fafb",
  secondaryText: "#e2e8f0",
  mutedText: "#cbd5e1",
  border: "#475569",
  squareBorder: "#64748b",
  primary: "#60a5fa",
  primaryText: "#0f172a",
  selected: "#334e70",
  x: "#93c5fd",
  o: "#fca5a5",
  winner: "#14532d",
  winnerBorder: "#4ade80",
} as const;

type ThemeColors = {
  [ColorName in keyof typeof lightColors]: string;
};

type ThemeContextValue = {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);
  const colors: ThemeColors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}
