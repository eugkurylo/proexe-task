import { amber, green, grey, red } from "@mui/material/colors";
import { ProexeThemeOptions } from "./proexe.theme.types";

const BORDER_RADIUS = 4.5;

export const customOverridesLight: ProexeThemeOptions = {
  appBar: {
    main: "#272727",
  },
  palette: {
    mode: "light",
    secondary: {
      main: "#2D2D2D",
      contrastText: "#fff",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    warning: {
      main: amber[500],
    },
  },
};

export const customOverridesDark: ProexeThemeOptions = {
  appBar: {
    main: "#282828",
  },
  palette: {
    mode: "dark",
    secondary: {
      main: "#757575",
    },
    text: {
      primary: "#F5F5F5",
    },
    background: {
      default: "#202020",
      paper: "#383838",
    },
  },
};

export const overrides: ProexeThemeOptions = {
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root ": {
            borderRadius: BORDER_RADIUS,
          },
          "& .MuiFormLabel-root": {
            fontSize: 14,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            fontSize: 14,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
  },
};
