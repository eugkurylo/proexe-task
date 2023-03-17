import { PaletteMode } from "@mui/material";
import { PropsWithChildren } from "react";

export type DefaultLayoutProps = {
  pageTitle: string;
  themeMode: PaletteMode;
  toggleMode: () => void;
} & PropsWithChildren;
