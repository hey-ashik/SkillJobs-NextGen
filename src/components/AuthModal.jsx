'use client';

import React, { useState, useRef } from 'react';
import Logo from './Logo';

export default function AuthModal({ isOpen, onClose }) {
  const [view, setView] = useState('portal'); // portal, sso-login, sso-signup, success
  const [portalTab, setPortalTab] = useState('student'); // student, instructor
  
  // Forms state
  const [instructorEmail, setInstructorEmail] = useState('');
  const [instructorPassword, setInstructorPassword] = useState('');
  
  const [ssoEmail, setSsoEmail] = useState('');
  const [ssoPassword, setSsoPassword] = useState('');
  const [ssoRemember, setSsoRemember] = useState(false);
  
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupResume, setSignupResume] = useState(null);
  const [signupResumeName, setSignupResumeName] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const resetForms = () => {
    setInstructorEmail('');
    setInstructorPassword('');
    setSsoEmail('');
    setSsoPassword('');
    setSignupEmail('');
    setSignupMobile('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupResume(null);
    setSignupResumeName('');
    setError('');
    setView('portal');
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  // Submissions
  const handleInstructorLogin = (e) => {
    e.preventDefault();
    if (!instructorEmail || !instructorPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Logged in successfully as Instructor!');
      setView('success');
    }, 1200);
  };

  const handleSsoLogin = (e) => {
    e.preventDefault();
    if (!ssoEmail || !ssoPassword) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Logged in successfully via Skill Jobs SSO!');
      setView('success');
    }, 1200);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        setSignupResume(null);
        setSignupResumeName('');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('File size must be less than 2MB.');
        setSignupResume(null);
        setSignupResumeName('');
        return;
      }
      setError('');
      setSignupResume(file);
      setSignupResumeName(file.name);
    }
  };

  const handleSsoSignup = (e) => {
    e.preventDefault();
    if (!signupEmail || !signupMobile || !signupPassword || !signupConfirmPassword) {
      setError('Please fill in all required (*) fields.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Registration completed successfully! Welcome to Skill Jobs NextGen.');
      setView('success');
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(2, 6, 23, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-container {
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        /* Portal View - Dark Glassmorphism */
        .portal-card {
          background: #111827; /* Fallback */
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 40px 30px;
          color: var(--color-white);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--color-dark-gray);
          background: rgba(255, 255, 255, 0.05);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: var(--color-white);
        }

        .portal-header {
          text-align: center;
          margin-bottom: 8px;
        }

        .portal-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 30px;
          font-weight: 900;
          margin-bottom: 8px;
          background: var(--gradient-linear);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .portal-subtitle {
          font-size: 14px;
          color: var(--color-dark-gray);
        }

        .tabs-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px;
          border-radius: 14px;
        }

        .tab-btn {
          padding: 10px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 10px;
          color: var(--color-dark-gray);
        }

        .tab-btn.active {
          background: var(--color-white);
          color: var(--color-royal-blue);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .sso-trigger-btn {
          background: var(--gradient-linear-1);
          color: var(--color-white);
          padding: 14px;
          border-radius: var(--border-radius-md);
          font-size: 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        }

        .sso-trigger-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
        }

        .disclaimer-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-dark-gray);
          text-align: center;
        }

        /* Forms Styling */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-light-gray);
        }

        .form-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 16px;
          border-radius: 10px;
          color: var(--color-white);
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: var(--color-royal-blue-2);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-footer-links {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .forgot-link {
          color: var(--color-medium-purple);
          font-weight: 600;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .submit-btn {
          background: var(--gradient-linear-7);
          color: var(--color-white);
          padding: 14px;
          border-radius: var(--border-radius-md);
          font-size: 15px;
          font-weight: 800;
          margin-top: 10px;
          box-shadow: 0 4px 15px rgba(219, 39, 119, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(219, 39, 119, 0.4);
        }

        /* SSO Gateway View - Light Replicated Theme */
        .sso-card {
          background: #f8fafc;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .sso-header {
          background: #ffffff;
          padding: 15px 25px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .sso-close-btn {
          color: #64748b;
          font-size: 20px;
        }

        .sso-close-btn:hover {
          color: #0f172a;
        }

        .sso-body {
          padding: 35px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sso-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          text-align: center;
          margin-bottom: 5px;
        }

        .sso-warning {
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 12px;
          line-height: 1.6;
          color: #c53030;
          text-align: left;
        }

        .sso-warning a {
          color: #2b6cb0;
          text-decoration: underline;
          font-weight: 700;
        }

        .sso-label {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
        }

        .sso-input {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 12px 16px;
          border-radius: 8px;
          color: #0f172a;
          font-size: 14px;
          transition: all 0.2s;
        }

        .sso-input:focus {
          border-color: #1b4d9b;
          box-shadow: 0 0 0 3px rgba(27, 77, 155, 0.15);
        }

        .sso-checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #475569;
          user-select: none;
        }

        .sso-checkbox {
          width: 16px;
          height: 16px;
          accent-color: #1b4d9b;
        }

        .sso-submit-btn {
          background: #1b4d9b;
          color: #ffffff;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          margin-top: 10px;
          box-shadow: 0 4px 6px -1px rgba(27, 77, 155, 0.1), 0 2px 4px -1px rgba(27, 77, 155, 0.06);
        }

        .sso-submit-btn:hover {
          background: #153c7a;
          transform: translateY(-1px);
        }

        .sso-divider {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .sso-divider::before, .sso-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }

        .sso-divider:not(:empty)::before {
          margin-right: .5em;
        }

        .sso-divider:not(:empty)::after {
          margin-left: .5em;
        }

        .google-login-btn {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 600;
          color: #334155;
          font-size: 14px;
        }

        .google-login-btn:hover {
          background: #f1f5f9;
        }

        .sso-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          margin-top: 10px;
        }

        .sso-link-blue {
          color: #1b4d9b;
          font-weight: 700;
        }

        .sso-link-blue:hover {
          text-decoration: underline;
        }

        .sso-link-register {
          color: #475569;
        }

        .sso-link-register span {
          color: #e11d48;
          font-weight: 700;
        }

        .sso-link-register:hover span {
          text-decoration: underline;
        }

        /* File Upload */
        .file-upload-wrapper {
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .file-upload-wrapper:hover {
          border-color: #1b4d9b;
          background: #f8fafc;
        }

        .file-upload-icon {
          font-size: 24px;
          margin-bottom: 8px;
          color: #94a3b8;
        }

        .file-upload-text {
          font-size: 13px;
          color: #64748b;
          line-height: 1.4;
        }

        .file-upload-text span {
          color: #1b4d9b;
          font-weight: 700;
        }

        .file-upload-name {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Success View */
        .success-card {
          background: #0f172a;
          padding: 50px 30px;
          color: #ffffff;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .success-icon-container {
          width: 80px;
          height: 80px;
          background: rgba(16, 185, 129, 0.1);
          border: 2px solid #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: #10b981;
          animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scaleUp {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .success-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 26px;
          font-weight: 800;
        }

        .success-desc {
          font-size: 14px;
          color: var(--color-dark-gray);
          line-height: 1.6;
        }

        .success-done-btn {
          background: var(--gradient-linear-1);
          color: #ffffff;
          padding: 12px 30px;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          margin-top: 10px;
        }

        .success-done-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        /* Utilities */
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          text-align: left;
        }

        .error-message-light {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #ef4444;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          text-align: left;
        }

        .loader {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid #ffffff;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        .loader-dark {
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 3px solid #1b4d9b;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="modal-container">
        {/* VIEW 1: PORTAL (STUDENT / INSTRUCTOR TAB) */}
        {view === 'portal' && (
          <div className="portal-card">
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <div className="portal-header">
              <h2 className="portal-title">SkillJobs Portal</h2>
              <p className="portal-subtitle">Access your account to start learning and leading</p>
            </div>

            <div className="tabs-container">
              <button
                className={`tab-btn ${portalTab === 'student' ? 'active' : ''}`}
                onClick={() => { setPortalTab('student'); setError(''); }}
              >
                Student
              </button>
              <button
                className={`tab-btn ${portalTab === 'instructor' ? 'active' : ''}`}
                onClick={() => { setPortalTab('student'); /* We mock student / instructor switches, let's toggle properly: */ setPortalTab('instructor'); setError(''); }}
              >
                Instructor
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {portalTab === 'student' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <button className="sso-trigger-btn" onClick={() => setView('sso-login')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                  </svg>
                  Login with Skill Jobs
                </button>
                <div className="disclaimer-box">
                  Students should login using Skill Jobs. Local login is only for internal admin/testing users.
                </div>
              </div>
            ) : (
              <form onSubmit={handleInstructorLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email / Username</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter email or username"
                    value={instructorEmail}
                    onChange={(e) => setInstructorEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter password"
                    value={instructorPassword}
                    onChange={(e) => setInstructorPassword(e.target.value)}
                  />
                </div>
                <div className="form-footer-links">
                  <span style={{ color: 'var(--color-dark-gray)' }}>Forgot your password?</span>
                  <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setError('Password reset links are currently unavailable.'); }}>Reset here</a>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="loader"></span> : 'Sign In As Instructor'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 2: SSO LOGIN */}
        {view === 'sso-login' && (
          <div className="sso-card animate-fade-in">
            <div className="sso-header">
              <Logo />
              <button
                className="sso-close-btn"
                style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            
            <div className="sso-body">
              <h2 className="sso-title">Jobseeker Sign In</h2>
              
              <div className="sso-warning">
                If you come from our old site or having password issue, please reset your password using the email and check spam for OTP. <a href="#" onClick={(e) => { e.preventDefault(); setError('Password recovery service is simulated.'); }}>here</a>.
              </div>

              {error && <div className="error-message-light">{error}</div>}

              <form onSubmit={handleSsoLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="sso-label">Email</label>
                  <input
                    type="email"
                    className="sso-input"
                    placeholder="Enter your email address"
                    value={ssoEmail}
                    onChange={(e) => setSsoEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="sso-label">Password</label>
                  <input
                    type="password"
                    className="sso-input"
                    placeholder="Enter your password"
                    value={ssoPassword}
                    onChange={(e) => setSsoPassword(e.target.value)}
                  />
                </div>
                
                <label className="sso-checkbox-container">
                  <input
                    type="checkbox"
                    className="sso-checkbox"
                    checked={ssoRemember}
                    onChange={(e) => setSsoRemember(e.target.checked)}
                  />
                  Remember Me
                </label>

                <button type="submit" className="sso-submit-btn" disabled={loading}>
                  {loading ? <span className="loader-dark"></span> : 'Sign In As Jobseeker'}
                </button>
              </form>

              <div className="sso-divider">or</div>

              <button className="google-login-btn" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setSuccessMsg('Logged in with Google!'); setView('success'); }, 1000); }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.93 5.482 18 9 18z" fill="#34A853" />
                  <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.59.102-1.167.282-1.707V4.961H.957C.347 6.173 0 7.549 0 9s.347 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" strokeWidth="0" />
                  <path d="M9 3.58c1.32 0 2.5.454 3.433 1.347l2.575-2.575C13.463.853 11.426 0 9 0 5.482 0 2.438 2.07 1.076 5.039l3.007 2.332C4.792 5.164 6.776 3.58 9 3.58z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <div className="sso-links">
                <a href="#" className="sso-link-blue" onClick={(e) => { e.preventDefault(); setError('Simulated: Reset link has been sent.'); }}>Reset/Forgot password?</a>
                <a href="#" className="sso-link-register" onClick={(e) => { e.preventDefault(); setError(''); setView('sso-signup'); }}>
                  Don't have an account? <span>Register Here</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SSO SIGN UP */}
        {view === 'sso-signup' && (
          <div className="sso-card animate-fade-in">
            <div className="sso-header">
              <Logo />
              <button
                className="sso-close-btn"
                style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            
            <div className="sso-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 className="sso-title">Jobseeker Sign Up</h2>

              {error && <div className="error-message-light">{error}</div>}

              <form onSubmit={handleSsoSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="sso-label">Email *</label>
                  <input
                    type="email"
                    className="sso-input"
                    placeholder="Enter your email address"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="sso-label">Mobile Number *</label>
                  <input
                    type="tel"
                    className="sso-input"
                    placeholder="e.g. +8801700000000"
                    value={signupMobile}
                    onChange={(e) => setSignupMobile(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="sso-label">Password *</label>
                  <input
                    type="password"
                    className="sso-input"
                    placeholder="Enter strong password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="sso-label">Confirm Password *</label>
                  <input
                    type="password"
                    className="sso-input"
                    placeholder="Re-enter password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="sso-label">Upload Your Resume (PDF, Max 2MB)</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".pdf"
                    onChange={handleResumeChange}
                  />
                  <div className="file-upload-wrapper" onClick={() => fileInputRef.current.click()}>
                    <div className="file-upload-icon">
                      <i className="fa-solid fa-file-pdf"></i>
                    </div>
                    <div className="file-upload-text">
                      {signupResumeName ? (
                        <span>Change file</span>
                      ) : (
                        <>
                          <span>Click to upload resume</span> or drag and drop
                        </>
                      )}
                    </div>
                    {signupResumeName && (
                      <div className="file-upload-name">
                        <i className="fa-solid fa-circle-check" style={{ marginRight: '6px' }}></i> {signupResumeName}
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="sso-submit-btn" disabled={loading}>
                  {loading ? <span className="loader-dark"></span> : 'Sign Up As Jobseeker'}
                </button>
              </form>

              <div className="sso-links">
                <a href="#" className="sso-link-blue" onClick={(e) => { e.preventDefault(); setError(''); setView('sso-login'); }}>
                  Already have an account? Sign In
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: SUCCESS VIEW */}
        {view === 'success' && (
          <div className="success-card">
            <div className="success-icon-container">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 className="success-title">Successful!</h2>
            <p className="success-desc">{successMsg}</p>
            <button className="success-done-btn" onClick={handleClose}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
