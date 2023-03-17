import { Theme, ThemeOptions } from "@mui/material/styles";

export type ProexeTheme = Theme & {
  appBar: {
    main: string;
  };
};

export type ProexeThemeOptions = ThemeOptions & {
  appBar?: {
    main?: string;
  };
};
