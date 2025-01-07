import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import { UserProvider } from "./components/contexts/UserContext"; // UserProvider 추가
import ProtectedRoute from "./components/auth/ProtectedRoute";
import routes from "./routes";
import NotFound from "./components/NotFound"; // NotFound 컴포넌트 추가

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Router>
                    <Routes>
                        {routes.map(({ path, element, protected: isProtected }) => (
                            <Route
                                key={path}
                                path={path}
                                element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
                            />
                        ))}
                        {/* 404 페이지 처리 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
