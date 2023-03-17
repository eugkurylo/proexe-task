import {
  PaletteMode,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { ThemeModeSwitch } from "./ThemeModeSwitch";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useRouter } from "next/router";
import { ProexeTheme } from "@/theme/proexe.theme.types";

interface LayoutAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const LayoutAppBar = (props: LayoutAppBarProps) => {
  const { mode, toggleColorMode } = props;
  const router = useRouter();
  const theme = useTheme<ProexeTheme>();

  const goHome = () => router.push("/");
  const goToDashboard = () => router.push("/users");

  return (
    <AppBar
      sx={{ background: theme.appBar.main, zIndex: theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Tooltip title="Go Home" arrow>
            <IconButton
              sx={{ color: (theme) => theme.palette.common.white }}
              onClick={goHome}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go To Dashboard" arrow>
            <IconButton
              sx={{ color: (theme) => theme.palette.common.white }}
              onClick={goToDashboard}
            >
              <TableChartIcon />
            </IconButton>
          </Tooltip>
          <ThemeModeSwitch mode={mode} toggleMode={toggleColorMode} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
