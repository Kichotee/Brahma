import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard/pages/mainPage";

const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

const Router = () => {
  return (
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
  );
};

export default Router;
