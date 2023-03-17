import { PaletteMode } from "@mui/material";

export const THEME_MODE_ITEM_NAME = "mode";

export const getPersistedThemeMode = () => {
  return JSON.parse(JSON.stringify(localStorage.getItem(THEME_MODE_ITEM_NAME)));
};

export const persistThemeMode = (value: PaletteMode) => {
  localStorage.setItem(THEME_MODE_ITEM_NAME, value);
};
