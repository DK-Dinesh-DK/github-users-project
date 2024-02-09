import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import UserDetailsPage from "./pages/UserDetailsPage";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="user-details/:id" element={<UserDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
