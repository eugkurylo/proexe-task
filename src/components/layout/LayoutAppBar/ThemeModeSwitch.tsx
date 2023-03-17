import { FC } from "react";
import { FormControlLabel, PaletteMode, Switch } from "@mui/material";
import { Brightness } from "./Brightness";

type Props = {
  mode: PaletteMode;
  toggleMode: () => void;
};

export const themeModeSwitchTestId = "theme-mode-switch-id";

export const ThemeModeSwitch: FC<Props> = ({ mode, toggleMode }) => {
  const isDarkMode = mode === "dark";

  return (
    <FormControlLabel
      data-testid={themeModeSwitchTestId}
      label={<Brightness isDarkMode={isDarkMode} />}
      control={
        <Switch
          checked={isDarkMode}
          onChange={toggleMode}
          style={{ transition: "all 225ms cubic-bezier(0.4, 0, 0.6, 1)" }}
        />
      }
      id="theme-mode-switch"
      sx={{
        ".MuiTypography-root": {
          lineHeight: 0,
        },
        ml: "auto",
      }}
    />
  );
};
