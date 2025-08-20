import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [navbarName, setNavbarName] = useState("");

  // --- MODIFICATION: FORCING LOCALHOST FOR DEVELOPMENT ---
  const BASE_URL = "https://jrtinker01.onrender.com";
  // -----------------------------------------------------

  const splitNameFunction = (name) => {
    if (!name) {
      setNavbarName("");
      return;
    }
    const splitName = name.split(" ");
    const joinName = splitName.map((e) => e[0]).join("");
    setNavbarName(joinName);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setIsAuthenticated(true);
        setUser(result.user);
        console.log("login user:", result.user.username);
        splitNameFunction(result.user.username);
        toast.success("Login successful!");
        navigate("/");
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Login failed due to unexpected server response.' }));
        toast.error(`Login failed: ${errorData.message || response.statusText}`);
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(`Something went wrong. Network error or server unreachable. Ensure your backend is running at ${BASE_URL}.`);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/getUser`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("/api/getUser data:", data.user);
          setUser(data.user);
          splitNameFunction(data.user.username || data.user.email);
          setIsAuthenticated(true);
        } else if (response.status === 400 || response.status === 401) {
          console.log("User not logged in or session invalid (Status:", response.status, ")");
          setUser(null);
          setIsAuthenticated(false);
        } else {
          const errorData = await response.json().catch(() => ({ message: 'Unexpected server response on user check.' }));
          console.error(`Error checking user status: ${response.status} ${response.statusText}`, errorData);
          setUser(null);
          setIsAuthenticated(false);
          toast.error(`Could not verify user status: ${errorData.message || response.statusText}`);
        }
      } catch (err) {
        console.error("Network error checking user status:", err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  const logoutWithGoogle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/logout-user`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setIsAuthenticated(false);
        setUser(null);
        setNavbarName("");
        toast.success(result.message);
        navigate("/login");
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Google logout failed unexpectedly.' }));
        toast.error(`Logout failed: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error logging out (Google):", error);
      toast.error(`Logout failed (Network error). Ensure your backend is running at ${BASE_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setIsAuthenticated(false);
        setUser(null);
        setNavbarName("");
        toast.success(result.message);
        navigate("/login");
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Normal logout failed unexpectedly.' }));
        toast.error(`Logout failed: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(`Logout failed. Network error or server unreachable. Ensure your backend is running at ${BASE_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        loginWithGoogle,
        logout,
        loading,
        logoutWithGoogle,
        navbarName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};