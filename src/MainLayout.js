import React from "react";
import { Box } from "@mui/material";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";

const MainLayout = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header />

      {/* Body */}
      <Box sx={{ flexGrow: 1 }}>
        <Body />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;