import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainInfo from "./info/MainInfo"; // Import components
import IdentityInfo from "./info/Identity/IdentityInfo";
import ErrorPage from "./error/ErrorPage";
import App from "./App";
import EgoInfo from "./info/ego/EgoInfo";
import NewsInfo from "./info/news/NewsInfo";
import EgogiftInfo from "./info/egogift/EgogiftInfo";
import SelectorInfo from "./info/selector/SelectorInfo";
import BuildInfo from "./info/build/BuildInfo";
import AbnormalityInfo from "./info/abnormality/AbnormalityInfo";

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
          <Route path="egogift" element={<EgogiftInfo />} />
          <Route path="selector" element={<SelectorInfo />} />
          <Route path="build" element={<BuildInfo />} />
          <Route path="abnormality" element={<AbnormalityInfo />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
