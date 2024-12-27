import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 50,
        backgroundColor: "primary.main",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2">© 2024 My Application</Typography>
    </Box>
  );
};

export default Footer;