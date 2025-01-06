import axios from 'axios';

export const checkAuthentication = async () => {
  try {
    const response = await axios.get("/api/auth/checkAuth", {
      withCredentials: true, // 쿠키 전송 허용
    });
    return response.data;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return { isAuthenticated: false };
  }
};