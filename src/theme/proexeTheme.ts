import { PaletteMode, ThemeOptions } from "@mui/material";
import { proexeThemeLight, proexeThemeDark } from "./proexe.theme";

const overrides: ThemeOptions = {
  typography: {
    fontSize: 12,
  },
};

export const getProexeTheme = (mode: PaletteMode) => {
  return mode === "light"
    ? proexeThemeLight(overrides)
    : proexeThemeDark(overrides);
};
