import React, { useState } from 'react';
import './registerpage.css'; 
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/ecobazar-imgs/logo.png";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiHash, FiPhone, FiMapPin, FiCompass } from 'react-icons/fi';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        Username: '',
        email: '',
        password: '',
        confirmPassword: '',
        PostalCode: '',
        Number: '',
        Address: '',
        CreatedAt: new Date().toISOString(), 
        UpdatedAt: new Date().toISOString(),
        DeletedAt: '',
        acceptTerms: false,
    });

    const [alertConfig, setAlertConfig] = useState({ show: false, message: "", isSuccess: true });
    const navigate = useNavigate();

    const showAlert = (message, isSuccess, callback = null) => {
        setAlertConfig({ show: true, message, isSuccess });
        setTimeout(() => {
            setAlertConfig({ show: false, message: "", isSuccess: true });
            if (callback) callback();
        }, 3000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const navigateToLogin = (e) => {
        e.preventDefault(); 
        navigate('/login'); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (formData.password !== formData.confirmPassword) {
            showAlert("Passwords do not match!", false);
            return;
        }

        try {
            const ECOBAZAR_API_URL = 'https://ecobazar-ruby.vercel.app';
            const response = await fetch(`${ECOBAZAR_API_URL}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            if (!response.ok) {
                showAlert(`Server Error: ${response.status}`, false);
                return;
            }

            const result = await response.json();

            if (result.status || response.ok) {
                showAlert("Account Created Successfully!", true, () => navigate('/login'));
            } else {
                showAlert("Error: " + result.message, false);
            }
        } catch (error) {
            console.error("API Error:", error);
            showAlert("Could not connect to the server.", false);
        }
    };

    return (
        <div className="neon-auth-container">
            {alertConfig.show && (
                <div className={`neon-alert ${alertConfig.isSuccess ? 'success' : 'error'}`}>
                    <div className="neon-alert-content">
                        {alertConfig.message}
                    </div>
                </div>
            )}

            <header className="neon-auth-top-bar">
                <button className="neon-back-portfolio-btn" onClick={() => navigate('/')}>
                    <FiArrowLeft className="neon-btn-icon" /> Back to Dashboard
                </button>
                <div className="neon-system-badge-info">
                    <FiCompass className="neon-btn-icon" /> <span>System Terminal: <b>Admin Enrollment Module</b></span>
                </div>
            </header>

            <main className="neon-auth-main-layout">
                <div className="neon-register-card-panel">
                    <div className="neon-auth-header-wrapper">
                        <h2 className="neon-card-title-text">Create Account</h2>
                        <p className="neon-card-subtitle-text">Initialize New Database Root Instance</p>
                    </div>

                    <form className="neon-register-form-block" onSubmit={handleSubmit}>
                        
                        <div className="neon-form-grid-layout">
                            <div className="neon-input-group-wrapper">
                                <FiUser className="neon-input-icon-left" />
                                <input type="text" placeholder='First Name' name='Firstname' onChange={handleChange} className="neon-input-field-element" />
                            </div>

                            <div className="neon-input-group-wrapper">
                                <FiUser className="neon-input-icon-left" />
                                <input type="text" placeholder='Last Name' name='Lastname' onChange={handleChange} className="neon-input-field-element" />
                            </div>
                        </div>

                        <div className="neon-input-group-wrapper">
                            <FiUser className="neon-input-icon-left" />
                            <input type="text" placeholder='User Name' name='Username' onChange={handleChange} className="neon-input-field-element" />
                        </div>

                        <div className="neon-input-group-wrapper">
                            <FiMail className="neon-input-icon-left" />
                            <input type="email" placeholder="Email Address" name="email" onChange={handleChange} className="neon-input-field-element" required />
                        </div>
                        
                        <div className="neon-form-grid-layout">
                            <div className="neon-input-group-wrapper">
                                <FiLock className="neon-input-icon-left" />
                                <input type="password" placeholder="Password" name="password" onChange={handleChange} className="neon-input-field-element" required />
                            </div>
                            
                            <div className="neon-input-group-wrapper">
                                <FiLock className="neon-input-icon-left" />
                                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} className="neon-input-field-element" required />
                            </div>
                        </div>

                        <div className="neon-form-grid-layout">
                            <div className="neon-input-group-wrapper">
                                <FiHash className="neon-input-icon-left" />
                                <input type="number" placeholder='Postal Code' name='PostalCode' onChange={handleChange} className="neon-input-field-element" />
                            </div>

                            <div className="neon-input-group-wrapper">
                                <FiPhone className="neon-input-icon-left" />
                                <input type="number" placeholder='Contact Number' name='Number' onChange={handleChange} className="neon-input-field-element" />
                            </div>
                        </div>

                        <div className="neon-input-group-wrapper">
                            <FiMapPin className="neon-input-icon-left" />
                            <input type="text" placeholder='Physical Address Location' name='Address' onChange={handleChange} className="neon-input-field-element" />
                        </div>
                        
                        <div className="neon-terms-check-wrapper">
                            <input type="checkbox" id="terms" name="acceptTerms" onChange={handleChange} className="neon-custom-checkbox" required />
                            <label htmlFor="terms">Accept all System Security Terms & Conditions</label>
                        </div>

                        <button type="submit" className="neon-pulse-btn-submit">Create System Account</button>
                        <p className="neon-login-redirect-text">Already have account? <strong onClick={navigateToLogin}>Login Console</strong></p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RegistrationPage;
