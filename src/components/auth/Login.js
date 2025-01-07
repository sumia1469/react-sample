import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Loading from "../common/Loading";
import { useUser } from "../contexts/UserContext";

const Login = () => {
    const { isAuthenticated, isLoading, setIsAuthenticated } = useContext(AuthContext); // 인증 상태 관리
    const { setUser } = useUser(); // 사용자 정보 관리
    const navigate = useNavigate(); // 페이지 이동
    const [formData, setFormData] = useState({ email: "", password: "" }); // 폼 데이터 상태
    const [error, setError] = useState(""); // 에러 메시지 상태

    // 이미 인증된 경우 메인 페이지로 이동
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate("/main");
        }
    }, [isLoading, isAuthenticated, navigate]);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 로그인 처리 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", formData, { withCredentials: true });
            if (response.status === 200) {
                setIsAuthenticated(true); // 인증 상태 업데이트
                const userData = response.data.user; // 서버에서 반환된 사용자 정보
                debugger;
                setUser({ userName: userData.name, userId: userData.id }); // 사용자 정보 설정
                navigate("/main"); // 메인 페이지로 이동
            }
        } catch (err) {
            setError(err.response?.data?.message || "로그인에 실패했습니다."); // 에러 메시지 설정
        }
    };

    // 로딩 중일 경우 로딩 화면 표시
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 8,
                }}
            >
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        로그인
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
