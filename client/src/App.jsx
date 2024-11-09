import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Dashboard from "./features/dashboard/pages/dashboard";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Register from "./features/auth/register";

import "react-toastify/dist/ReactToastify.css";
import Login from "./features/auth/login";
import Layout from "./layout/layout";
import RequireAuth from "./layout/require-auth";

function App() {
  const protectedRoutes = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ];
  return (
    <div className="h-screen w-screen bg-slate-100  font-raleway">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          {protectedRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  <RequireAuth>
                    <Layout>{route.element}</Layout>
                  </RequireAuth>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
