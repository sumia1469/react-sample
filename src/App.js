import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import { UserProvider } from "./components/contexts/UserContext";
import RoutesComponent from "./routes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <RoutesComponent />
          </React.Suspense>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;