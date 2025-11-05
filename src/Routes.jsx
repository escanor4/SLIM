import React from "react";
import { BrowserRouter, Routes as RRRoutes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"; // example other page

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <RRRoutes>
        {/* Redirect root "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </RRRoutes>
    </BrowserRouter>
  );
}