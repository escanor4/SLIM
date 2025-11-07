import React from "react";
import { BrowserRouter, Routes as RRRoutes, Route } from "react-router-dom";
import LoginPage from "./pages/login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <RRRoutes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </RRRoutes>
    </BrowserRouter>
  );
}