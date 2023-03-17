import { NoSSR } from "@/components/NoSSR/NoSSR";
import { useNotifier } from "@/hooks/useNotifier";
import { Stack, Box } from "@mui/material";
import { FC } from "react";
import { LayoutAppBar } from "../LayoutAppBar/LayoutAppBar";
import { DefaultLayoutProps } from "./DefaultLayoutProps";
export const DefaultLayout: FC<DefaultLayoutProps> = ({
  children,
  themeMode,
  toggleMode,
}) => {
  useNotifier();

  return (
    <Stack direction={"row"}>
      <NoSSR>
        <LayoutAppBar mode={themeMode} toggleColorMode={toggleMode} />
      </NoSSR>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pr: 3,
          mt: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
