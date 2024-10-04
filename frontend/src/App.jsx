import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./Context/AuthContext";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RouteGuard from "./components/RouteGuard";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route
                path="/jobs/add-job"
                element={
                  <RouteGuard>
                    <AddJobPage />
                  </RouteGuard>
                }
              />
              <Route
                path="/edit-job/:id"
                element={
                  <RouteGuard>
                    <EditJobPage />
                  </RouteGuard>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
