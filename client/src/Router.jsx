import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  ArticleForm,
  ArticleReview,
} from "./scenes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<ArticleForm />} />
          <Route path="/review/:reviewId" element={<ArticleReview />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
