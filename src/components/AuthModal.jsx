'use client';

import React, { useState, useRef } from 'react';
import Logo from './Logo';

export default function AuthModal({ isOpen, onClose }) {
  const [view, setView] = useState('portal'); // portal, sso-signup, success
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
      setSuccessMsg('Student logged in successfully!');
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
          right: 0;
          bottom: 0;
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: fadeIn 0.25s ease-out;
        }

        .modal-container {
          width: 100%;
          max-width: 440px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          position: relative;
          color: #ffffff;
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-card {
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s ease;
          z-index: 20;
        }

        .close-btn:hover {
          background: #ffffff;
          color: #0f172a;
        }

        .modal-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
        }

        .logo-row {
          display: flex;
          justify-content: center;
          margin-bottom: 4px;
        }

        .modal-title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .modal-subtitle {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.4;
        }

        .tabs-container {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 4px;
          border-radius: 10px;
        }

        .tab-btn {
          flex: 1;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          color: #ffffff;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #0f172a;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 12px;
          font-weight: 700;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 12px 14px;
          color: #ffffff;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
        }

        .form-input::placeholder {
          color: #64748b;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #cbd5e1;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-input {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .checkbox-input:checked {
          background: #ffffff;
          border-color: #ffffff;
        }

        .checkbox-input:checked::after {
          content: '✓';
          color: #0f172a;
          font-size: 11px;
          font-weight: 900;
        }

        .forgot-link, .sso-link {
          font-size: 13px;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .forgot-link:hover, .sso-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .submit-btn {
          background: #ffffff;
          color: #0f172a;
          border: none;
          padding: 13px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
        }

        .submit-btn:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          background: #334155;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .divider-text {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 12px;
          color: #475569;
          font-weight: 600;
          text-transform: uppercase;
        }

        .divider-text::before, .divider-text::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .divider-text:not(:empty)::before {
          margin-right: 12px;
        }

        .divider-text:not(:empty)::after {
          margin-left: 12px;
        }

        .google-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-radius: 10px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
        }

        .google-btn:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .register-footer-text {
          font-size: 13px;
          color: #94a3b8;
          text-align: center;
          margin-top: 4px;
        }

        .register-footer-text span {
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .register-footer-text span:hover {
          text-decoration: underline;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #f87171;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.4;
        }

        .file-upload-wrapper {
          border: 2px dashed rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255, 255, 255, 0.01);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .file-upload-wrapper:hover {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.03);
        }

        .file-upload-icon {
          font-size: 28px;
          color: #94a3b8;
        }

        .file-upload-text {
          font-size: 13px;
          color: #94a3b8;
        }

        .file-upload-text span {
          color: #ffffff;
          font-weight: 700;
        }

        .file-upload-name {
          font-size: 13px;
          font-weight: 700;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .success-card {
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        .success-icon-container {
          font-size: 56px;
          color: #ffffff;
        }

        .success-title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .success-desc {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
        }

        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(15, 23, 42, 0.3);
          border-top: 2px solid #0f172a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="modal-container">
        <button className="close-btn" onClick={handleClose}>&times;</button>

        {/* VIEW 1: PORTAL (STUDENT / INSTRUCTOR TAB) */}
        {view === 'portal' && (
          <div className="modal-card">
            <div className="modal-header">
              <div className="logo-row">
                <Logo light />
              </div>
              <h2 className="modal-title">SkillJobs Portal</h2>
              <p className="modal-subtitle">Access your account to start learning and leading</p>
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
                onClick={() => { setPortalTab('instructor'); setError(''); }}
              >
                Instructor
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {portalTab === 'student' ? (
              <form onSubmit={handleSsoLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email address"
                    value={ssoEmail}
                    onChange={(e) => setSsoEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={ssoPassword}
                    onChange={(e) => setSsoPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={ssoRemember}
                      onChange={(e) => setSsoRemember(e.target.checked)}
                    />
                    Remember Me
                  </label>
                  <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setError('Password recovery service is simulated.'); }}>Forgot password?</a>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="loader"></span> : 'Sign In As Student'}
                </button>

                <div className="divider-text">or</div>

                <button type="button" className="google-btn" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setSuccessMsg('Logged in with Google!'); setView('success'); }, 1000); }}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.93 5.482 18 9 18z" fill="#34A853" />
                    <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.59.102-1.167.282-1.707V4.961H.957C.347 6.173 0 7.549 0 9s.347 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" strokeWidth="0" />
                    <path d="M9 3.58c1.32 0 2.5.454 3.433 1.347l2.575-2.575C13.463.853 11.426 0 9 0 5.482 0 2.438 2.07 1.076 5.039l3.007 2.332C4.792 5.164 6.776 3.58 9 3.58z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>

                <div className="register-footer-text">
                  Don't have an account? <span onClick={() => { setError(''); setView('sso-signup'); }}>Register Here</span>
                </div>
              </form>
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
                    required
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
                    required
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setError('Password recovery service is simulated.'); }}>Forgot password?</a>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="loader"></span> : 'Sign In As Instructor'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 2: SSO REGISTER */}
        {view === 'sso-signup' && (
          <div className="modal-card">
            <div className="modal-header">
              <div className="logo-row">
                <Logo light />
              </div>
              <h2 className="modal-title">Student Registration</h2>
              <p className="modal-subtitle">Create an account to join the NextGen community</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSsoSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g. +8801700000000"
                  value={signupMobile}
                  onChange={(e) => setSignupMobile(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Create a strong password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-type your password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Upload Resume (PDF, Max 2MB)</label>
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
                      <span>Change PDF file</span>
                    ) : (
                      <>
                        <span>Click to upload resume</span> or drag and drop
                      </>
                    )}
                  </div>
                  {signupResumeName && (
                    <div className="file-upload-name">
                      <i className="fa-solid fa-circle-check"></i> {signupResumeName}
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <span className="loader"></span> : 'Register & Join'}
              </button>
            </form>

            <div className="register-footer-text" style={{ marginTop: '10px' }}>
              Already have an account? <span onClick={() => { setError(''); setView('portal'); }}>Sign In</span>
            </div>
          </div>
        )}

        {/* VIEW 3: SUCCESS VIEW */}
        {view === 'success' && (
          <div className="success-card">
            <div className="success-icon-container">
              <i className="fa-solid fa-circle-check" style={{ color: '#ffffff' }}></i>
            </div>
            <h2 className="success-title">Successful!</h2>
            <p className="success-desc">{successMsg}</p>
            <button className="submit-btn" style={{ width: '100%', marginTop: '10px' }} onClick={handleClose}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
