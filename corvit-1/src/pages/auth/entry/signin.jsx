import React, { useState } from 'react';
import './signin.css'; 
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiEye } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();
  const [alertConfig, setAlertConfig] = useState({ show: false, message: "", isSuccess: true });
  const navigate = useNavigate();

  const showAlert = (message, isSuccess, callback = null) => {
    setAlertConfig({ show: true, message, isSuccess });
    setTimeout(() => {
      setAlertConfig({ show: false, message: "", isSuccess: true });
      if (callback) callback();
    }, 3000);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const ECOBAZAR_API_URL = 'https://ecobazar-ruby.vercel.app/api';

      const response = await fetch(`${ECOBAZAR_API_URL}/user/login`, { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email,
          password: password 
        })
      });

      const data = await response.json();
      setUserData(data);

      if (data.status) {
        showAlert(data.message, true, () => navigate('/'));
      } else {
        showAlert(data.message, false);
      }

    } catch (err) {
      console.error("Login Error:", err); 
      showAlert("Something went wrong!", false);
    }
  };

  const navigateToRegister = (e) => {
    e.preventDefault(); 
    navigate('/register'); 
  };

  return (
    <div className="signin-container neon-theme">
      {alertConfig.show && (
        <div className={`neon-alert ${alertConfig.isSuccess ? 'success' : 'error'}`}>
          <div className="neon-alert-content">
            {alertConfig.message}
          </div>
        </div>
      )}

      <div className="auth-top-bar">
        <button className="back-portfolio-btn" onClick={() => navigate('/')}>
          <FiArrowLeft className="btn-icon" /> Back to Dashboard
        </button>
        <div className="demo-credentials-info">
          <span>Demo Access - Email: <b>test@user.com</b> | Pass: <b>123456</b></span>
        </div>
      </div>

      <main className="main-content">
        <div className="login-card neon-card">
          <div className="auth-header-wrapper">
            <h2 className="card-title">System Authentication</h2>
            <p className="card-subtitle">Secure Administration Gateway</p>
          </div>

          <form className="form-group" onSubmit={userLogin}>
            
            <div className="input-group-wrapper">
              <FiMail className="input-icon-left" />
              <input
                type="email"
                placeholder="Admin Email"
                className="input-field-element"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group-wrapper">
              <FiLock className="input-icon-left" />
              <input
                type="password"
                placeholder="Security Password"
                className="input-field-element"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FiEye className="eye-icon" />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" className="neon-checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forget Password</a>
            </div>

            <button type="submit" className="login-btn neon-pulse-btn">
              Authenticate Module
            </button>
          </form>

          <p className="register-text">
            Don't have account? <a href="#" onClick={navigateToRegister}>Register Dashboard</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
