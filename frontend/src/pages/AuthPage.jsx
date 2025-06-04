// src/pages/AuthPage.jsx
import React, { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-6">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            isLogin ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Вход
        </button>
        <button
          className={`px-4 py-2 rounded ${
            !isLogin ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Регистрация
        </button>
      </div>

      <div className="w-full max-w-sm bg-white shadow-md rounded p-6">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default AuthPage;
