/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "./services/auth";
import { useEffect } from "react";
import { logout, setCredentials } from "./redux/slices/authSlice";
import { ThemeProvider } from "./components/layout/theme-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import UserDashboard from "./pages/DashboardPages/UserDashboard";
import AgentDashboard from "./pages/DashboardPages/AgentDashboard";
import AdminDashboard from "./pages/DashboardPages/AdminDashboard";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { TourProvider } from "./components/layout/TourProvider";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: any) => state.auth);
  const { data, isError } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (data && token) {
      dispatch(setCredentials({ user: data.user, token }));
      console.log("called");
    } else if (isError) {
      dispatch(logout());
    }
  }, [data, isError, token, dispatch]);

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TourProvider>
          <div className="min-h-screen  flex flex-col bg-background">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Auth Routes */}
                <Route
                  path="/login"
                  element={user ? <Navigate to={`/${user.role}`} /> : <Login />}
                />
                <Route
                  path="/register"
                  element={
                    user ? <Navigate to={`/${user.role}`} /> : <Register />
                  }
                />

                {/* Protected Routes */}
                <Route path="/profile" element={user && <Profile />} />
                <Route
                  path="/user/*"
                  element={
                    user?.role === "user" ? (
                      <UserDashboard />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/agent/*"
                  element={
                    user?.role === "agent" ? (
                      <AgentDashboard />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    user?.role === "admin" ? (
                      <AdminDashboard />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                {/* Unknown Routes Redirect */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TourProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
