import React from "react";
import { Routes, Route } from "react-router-dom";
import MainInfo from "./info/MainInfo"; // Import components
import IdentityInfo from "./info/IdentityInfo";
import ErrorPage from "./error/ErrorPage";
import App from "./App";

function AppRouter() {
  return (
    <Routes>
      <Route path="/limbusinfo" element={<App />}>
        <Route index element={<MainInfo />} />
        <Route path="info" element={<MainInfo />} />
        <Route path="identity" element={<IdentityInfo />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
