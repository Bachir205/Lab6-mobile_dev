# Lab 10 — A Drawer and a Dark Theme for Tic-Tac-Toe

In Lab 6 you built Tic-Tac-Toe on one screen. This lab turns it into a small application: a **drawer** with two more pages, **Settings** and **About**, and in Settings a **switch between a light and a dark theme** that changes every screen at once.

You already know the two tools it needs: the **drawer** from Lab 9, and **Context** from Lecture 5.

**Starting point:** your `tic-tac-toe` project at the end of Lab 6.

---

## Research

Use the Expo documentation only:

- **https://docs.expo.dev/router/advanced/drawer/** — the drawer
- **https://docs.expo.dev/develop/user-interface/color-themes/** — light and dark themes

Before writing any code, check the version of `expo` in `package.json`. The drawer's installation instructions differ depending on the SDK version.

---

## Requirements

1. **A drawer** made with `Drawer` from `expo-router/drawer`, opened by swiping from the edge of the screen and by the menu button in the header
2. **Three items in the drawer:** Game, Settings, About, each with a readable label and a proper header title
3. **The game from Lab 6 works as before**, time travel included, and keeps its moves when you visit another screen and come back
4. **A theme context** in its own file, outside `app/`, with a provider and a custom hook that throws a clear error when used outside the provider
5. **The theme is the only state.** The colours are computed from it, not stored separately
6. **A switch in Settings** turns the dark theme on and off. It always shows the current theme, also after leaving Settings and coming back
7. **Every screen follows the theme**: the header, the drawer menu, the status bar, the board, X and O, the status, the move list, and the About page are all readable in both themes
8. **No colours in `StyleSheet.create`**: layout stays there, colours come from the theme
9. **About** shows the application name, the version read from `app.json`, and your name
10. **Only screens and the layout in `src/app/`**

---

## Verify on a Device

| Check | Expected |
|---|---|
| Swipe from the left edge, or ☰ | The drawer opens with Game, Settings, About |
| The current screen in the menu | Highlighted |
| Play three moves → Settings → Game | The moves are still there |
| Settings → switch on | Header, menu, background, status bar turn dark |
| Game in dark mode | Board, X and O, status, move list all readable |
| About in dark mode | Every line readable |
| Leave Settings and come back | The switch shows the current theme |
| Switch off | Everything returns to light |
| Change `version` in `app.json` | About shows the new version |

---

## Stretch

Choose one:

- Start with the phone's theme, and offer three choices: Light, Dark, System
- Highlight the three winning squares with the theme's primary colour
- Add an icon to each drawer item

---

## Deliverables

The updated Lab 6 repository `tic-tac-toe`, with its `README.md` updated: what the application does, and two screenshots — the game in light mode and in dark mode.
