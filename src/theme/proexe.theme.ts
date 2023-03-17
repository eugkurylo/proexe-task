import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import {
  customOverridesDark,
  customOverridesLight,
  overrides,
} from "./proexe.theme.constants";
import { ProexeTheme, ProexeThemeOptions } from "./proexe.theme.types";

export const proexeThemeLight = (options?: ProexeThemeOptions) =>
  createTheme(
    deepmerge(deepmerge(customOverridesLight, overrides), options)
  ) as ProexeTheme;

export const proexeThemeDark = (options?: ProexeThemeOptions) =>
  createTheme(
    deepmerge(deepmerge(customOverridesDark, overrides), options)
  ) as ProexeTheme;
