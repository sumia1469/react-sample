import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const generateRoutesFromMenu = (menus) => {
  return menus.map((menu) => {
    const Component = React.lazy(() => import(`./ui/BM/${menu.pgmId}.js`));
    return {
      path: `/${menu.menuNm}`,
      element: <Component />,
      protected: true,
    };
  });
};

const RoutesComponent = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/api/menu");
        const menus = await response.json();
        const dynamicRoutes = generateRoutesFromMenu(menus);
        setRoutes(dynamicRoutes);
      } catch (error) {
        console.error("Error fetching menus:", error);
        setRoutes([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    fetchMenus();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {routes.map(({ path, element, protected: isProtected }) => (
        <Route
          key={path}
          path={path}
          element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;