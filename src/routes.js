import MainLayout from "./MainLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        protected: true,
    },
    {
        path: "/login",
        element: <Login />,
        protected: false,
    },
    {
        path: "/register",
        element: <Register />,
        protected: false,
    },
    {
        path: "/main",
        element: <MainLayout />,
        protected: true,
    },
];

export default routes;
