import { Brightness5 } from "@mui/icons-material";
import { Box } from "@mui/material";

export const Brightness = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const radius = 5;

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
          inset: 4.5,
          overflowX: "clip",
        }}
      >
        <Box
          sx={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: "white",
            transform: isDarkMode ? "translateX(-50%)" : "translateX(-100%)",
            transition: "all 225ms cubic-bezier(0.4, 0, 0.6, 1)",
          }}
        />
      </Box>
      <Brightness5 />
    </Box>
  );
};
