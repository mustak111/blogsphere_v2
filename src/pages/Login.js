import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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

    const result = login(formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setMessage(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-content">
            <h1>Welcome Back!</h1>
            <p>
              Sign in to continue your journey. Discover new stories, engage
              with your favorite writers, and share your voice with the world.
            </p>
            <div className="auth-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Writers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Blog Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100K+</span>
                <span className="stat-label">Readers</span>
              </div>
            </div>
            <div className="auth-testimonial">
              <p className="testimonial-text">
                "BlogSphere has completely transformed how I share my ideas. The
                community here is incredibly supportive!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <strong>Anna Martinez</strong>
                  <span>Tech Writer</span>
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
              <h2>Sign in to your account</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            {message && (
              <div className="alert alert-error">
                <span>⚠️</span> {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="#" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <span className="loader"></span> : "Sign In"}
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
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
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
