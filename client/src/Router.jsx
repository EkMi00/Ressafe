import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  ArticleForm,
  ArticleReview,
  SuccessPage,
} from "./scenes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<ArticleForm />} />
          <Route path="/review/:article_id" element={<ArticleReview />} />
          <Route path="/success/:articleId" element={<SuccessPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
