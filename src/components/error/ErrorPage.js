import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        서버 에러입니다.
      </Typography>
      <Typography variant="body1">
        서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
      </Typography>
    </Box>
  );
};

export default ErrorPage;