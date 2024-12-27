import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // JWT 토큰 확인
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // JWT 토큰 삭제 및 로그인 화면으로 이동
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h4">
          메인 화면
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          로그인에 성공했습니다! 메인 화면에 오신 것을 환영합니다.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Box>
    </Container>
  );
};

export default Main;