import React, { createContext, useContext, useState } from "react";

// UserContext 생성
const UserContext = createContext(null);

// UserProvider 컴포넌트: UserContext를 제공
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: "", userId: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext를 사용하는 훅
export const useUser = () => {
  const context = useContext(UserContext);

  // UserProvider 외부에서 호출 시 에러 발생
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};