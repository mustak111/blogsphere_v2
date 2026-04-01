import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setMessage(result.message);
    }

    setIsLoading(false);
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { level: 0, text: "", color: "" };
    if (password.length < 4)
      return { level: 1, text: "Weak", color: "#e74c3c" };
    if (password.length < 6)
      return { level: 2, text: "Fair", color: "#f39c12" };
    if (password.length < 8)
      return { level: 3, text: "Good", color: "#3498db" };
    return { level: 4, text: "Strong", color: "#2ecc71" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-content">
            <h1>Join BlogSphere</h1>
            <p>
              Connect with writers, share your stories, and discover amazing
              content from around the world.
            </p>
            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">✍️</span>
                <div>
                  <strong>Write & Publish</strong>
                  <p>Share your thoughts with the world</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌍</span>
                <div>
                  <strong>Global Community</strong>
                  <p>Connect with readers worldwide</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div>
                  <strong>Track Analytics</strong>
                  <p>Understand your audience better</p>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-left-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <Link to="/" className="auth-brand">
                <span className="brand-icon">✦</span> BlogSphere
              </Link>
              <h2>Create your account</h2>
              <p>Start your blogging journey today</p>
            </div>

            {message && (
              <div className="alert alert-error">
                <span>⚠️</span> {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className={`form-group ${errors.name ? "error" : ""}`}>
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>

              <div className={`form-group ${errors.email ? "error" : ""}`}>
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className={`form-group ${errors.password ? "error" : ""}`}>
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`strength-bar ${i <= strength.level ? "active" : ""}`}
                          style={{
                            background:
                              i <= strength.level ? strength.color : "#e0e0e0",
                          }}
                        ></div>
                      ))}
                    </div>
                    <span style={{ color: strength.color }}>
                      {strength.text}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div
                className={`form-group ${errors.confirmPassword ? "error" : ""}`}
              >
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="loader"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn google">
                <span>G</span> Google
              </button>
              <button className="social-btn github">
                <span>⌘</span> GitHub
              </button>
            </div>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
