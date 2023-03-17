import { DefaultLayout } from "@/components/layout/DefaultLayout/DefaultLayout";
import { DefaultLayoutProps } from "@/components/layout/DefaultLayout/DefaultLayoutProps";
import { store } from "@/store";
import { getPersistedThemeMode, persistThemeMode } from "@/theme/memorizeTheme";
import { getProexeTheme } from "@/theme/proexeTheme";
import { LayoutStyles, NextPageWithData } from "@/types/Layout";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Provider } from "react-redux";

const LayoutForLayoutStyle = (style: LayoutStyles) => {
  switch (style) {
    case LayoutStyles.default:
      return DefaultLayout;
  }
};

function App({ Component, pageProps }: AppProps) {
  const metadata = (Component as NextPageWithData).metadata;

  let Layout: FC<DefaultLayoutProps>;

  if (metadata) {
    const { layout } = metadata;
    Layout = LayoutForLayoutStyle(layout);
  } else {
    Layout = (props: PropsWithChildren<{}>) => <>{props.children}</>;
  }

  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const persistedMode = getPersistedThemeMode();

    if (!persistedMode) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setMode("dark");
      } else {
        setMode("light");
      }
    } else {
      setMode(persistedMode);
    }
  }, []);

  useEffect(() => {
    persistThemeMode(mode);
  }, [mode]);

  const theme = useMemo(() => getProexeTheme(mode), [mode]);
  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={8}>
          <Layout
            pageTitle={metadata?.pageTitle}
            themeMode={mode}
            toggleMode={toggleMode}
          >
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
