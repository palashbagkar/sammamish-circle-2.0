"use client";
export const dynamic = "force-dynamic"
import React, { useState, useEffect, Suspense } from 'react';
import Header from "../header";
import Footer from "../footer";
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from 'utils/supabase';

// 1. THIS IS YOUR ORIGINAL COMPONENT (The "Logic")
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
    } else {
      router.push('/dashboard'); 
    }
  };

  return (
    <div className="login-page">
      <style>{`
        /* Your existing CSS here... */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Source+Serif+4:wght@600&display=swap');
        .login-page { min-height: 100vh; background: linear-gradient(180deg, #142727 0%, #245e5e 93%); font-family: 'Inter', sans-serif; color: white; display: flex; flex-direction: column; }
        .main-content { flex: 1; display: flex; align-items: center; justify-content: center; padding: 80px; }
        .auth-card { width: 534px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
        .auth-card-header { padding: 9px 0; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .auth-card-title { font-size: 20px; font-weight: 600; color: #FFF4D2; line-height: 100px; }
        .auth-card-body { padding: 40px 44px 44px; }
        .input-field { width: 100%; height: 58px; padding: 0 24px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.2); color: white; margin-bottom: 14px; outline: none; }
        .primary-button { width: 100%; height: 56px; border-radius: 9999px; border: none; background: #FFC300; color: #000; font-weight: 600; cursor: pointer; margin-top: 33px; }
        .link-text { font-size: 14px; color: rgba(255,255,255,0.7); text-align: center; margin-top: 14px; cursor: pointer; }
        .error-message { color: #ff6b6b; margin-bottom: 10px; text-align: center; }
      `}</style>

      <Header />
      <main className="main-content">
        <form onSubmit={handleLogin} className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-card-title">Log in</h1>
          </div>
          <div className="auth-card-body">
            {error && <p className="error-message">{error}</p>}
            <input type="email" className="input-field" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="input-field" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="primary-button" disabled={loading}>{loading ? "Authenticating..." : "Log in"}</button>
            <p className="link-text" onClick={() => router.push('/forgot-password')}>Forgot password?</p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

// 2. THIS IS THE EXPORT (The "Wrapper")
export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{background: '#142727', height: '100vh', color: 'white'}}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}