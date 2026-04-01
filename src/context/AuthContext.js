import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("blogsphere_user");
    const storedUsers = localStorage.getItem("blogsphere_users");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, message: "Email already registered!" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      avatar: name.charAt(0).toUpperCase(),
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("blogsphere_users", JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(
      "blogsphere_user",
      JSON.stringify(userWithoutPassword),
    );

    return { success: true, message: "Registration successful!" };
  };

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password!" };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem(
      "blogsphere_user",
      JSON.stringify(userWithoutPassword),
    );

    return { success: true, message: "Login successful!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("blogsphere_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
