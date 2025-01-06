import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import routes from "./routes";
import NotFound from "./components/NotFound"; // NotFound 컴포넌트 추가

function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}

export default App;
