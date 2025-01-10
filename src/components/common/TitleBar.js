import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Star, StarBorder, Refresh } from "@mui/icons-material";

const TitleBar = ({ title, breadcrumb, isFavorite, toggleFavorite, handleRefresh }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
      <Typography variant="h4">{title}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">{breadcrumb}</Typography>
        <IconButton onClick={toggleFavorite} color="primary">
          {isFavorite ? <Star /> : <StarBorder />}
        </IconButton>
        <IconButton onClick={handleRefresh} color="primary">
          <Refresh />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TitleBar;