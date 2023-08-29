import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainInfo from "./info/MainInfo"; // Import components
import IdentityInfo from "./info/Identity/IdentityInfo";
import ErrorPage from "./error/ErrorPage";
import App from "./App";
import EgoInfo from "./info/ego/EgoInfo";
import NewsInfo from "./info/news/NewsInfo";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<NewsInfo />} />
          <Route path="info" element={<MainInfo />} />
          <Route path="identity" element={<IdentityInfo />} />
          <Route path="ego" element={<EgoInfo />} />
          <Route path="news" element={<NewsInfo />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
