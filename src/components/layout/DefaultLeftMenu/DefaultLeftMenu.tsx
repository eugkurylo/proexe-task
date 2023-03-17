import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { Stack, styled } from "@mui/material";

interface LeftMenuContainerProps extends MuiDrawerProps {
  drawerwidth: number;
}

const LeftMenuContainer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<LeftMenuContainerProps>(({ drawerwidth }) => ({
  width: drawerwidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ".MuiDrawer-paper": {
    height: "calc(100vh - 4rem)",
    marginTop: "4rem",
  },
}));

interface DefaultLeftMenuProps {
  drawerWidth: number;
}

export const DefaultLeftMenu = (props: DefaultLeftMenuProps) => {
  const { drawerWidth } = props;

  return (
    <LeftMenuContainer
      variant="permanent"
      drawerwidth={drawerWidth}
      PaperProps={{ id: "main-menu" }}
    >
      <Stack
        direction="column"
        sx={{
          width: drawerWidth,
          maxWidth: drawerWidth,
          overflowX: "hidden",
        }}
      >
        {/* <LeftMenu /> */}
      </Stack>
    </LeftMenuContainer>
  );
};
