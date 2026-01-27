"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from 'react';
import { supabase } from 'utils/supabase';
import { useRouter } from 'next/navigation';
import Header from "../header";
import Footer from "../footer";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth'); // Updated to your new auth naming convention
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Error during Protocol exit:", error);
    }
  };

  if (!user) return <div className="loading-state" style={{color: 'white', background: '#0a1f1a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Initializing Protocol...</div>;

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <style>{`
          .dashboard-container {
            min-height: 100vh;
            background: linear-gradient(180deg, #0a1f1a 0%, #1a3a2e 100%);
            padding: 80px;
            color: white;
            font-family: 'Inter', sans-serif;
          }

          .dashboard-header {
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            margin-bottom: 40px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 20px;
          }

          .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }

          .stat-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
          }

          .stat-value {
            display: block;
            font-size: 24px;
            font-weight: 700;
            color: #FFC300;
          }

          .stat-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.6;
          }

          .resource-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          .welcome-card {
            grid-column: span 3;
            background: rgba(255, 255, 255, 0.07);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 24px;
          }

          .resource-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .resource-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.08);
            border-color: #FFC300;
          }

          .logout-btn {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .logout-btn:hover {
            background: rgba(255, 0, 0, 0.2);
            border-color: #ff4b4b;
          }

          @media (max-width: 1024px) {
            .resource-grid { grid-template-columns: repeat(2, 1fr); }
            .stats-row { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 768px) {
            .resource-grid, .stats-row { grid-template-columns: 1fr; }
            .dashboard-container { padding: 20px; }
            .welcome-card { grid-column: span 1; }
          }
        `}</style>

        <div className="dashboard-header">
          <h2 style={{fontSize: '24px', fontWeight: '600', letterSpacing: '-0.5px'}}>Dashboard</h2>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>

        <div className="welcome-card">
          <h2 style={{fontSize: '28px', marginBottom: '8px'}}>Welcome back, Neighbor.</h2>
          <p style={{opacity: 0.7}}>User Session Active: <strong>{user.email}</strong></p>
        </div>

        {/* NEW: Protocol Stats Section */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-value">12</span>
            <span className="stat-label">Saved Resources</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">Sammamish</span>
            <span className="stat-label">Current Sector</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">Active</span>
            <span className="stat-label">Protocol Status</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">42°F</span>
            <span className="stat-label">Local Weather</span>
          </div>
        </div>

        <div className="resource-grid">
          <div className="resource-card" onClick={() => router.push('/directory')}>
            <div>
              <h3 style={{color: '#FFC300'}}>City Directory</h3>
              <p style={{fontSize: '14px', marginTop: '8px', opacity: 0.8}}>Access emergency contacts and local city information.</p>
            </div>
            <span style={{fontSize: '12px', marginTop: '15px', color: '#FFC300'}}>View List →</span>
          </div>

          <div className="resource-card" onClick={() => router.push('/submit')}>
            <div>
              <h3 style={{color: '#FFC300'}}>Submit Resource</h3>
              <p style={{fontSize: '14px', marginTop: '8px', opacity: 0.8}}>Contribute to the Sammamish Circle database.</p>
            </div>
            <span style={{fontSize: '12px', marginTop: '15px', color: '#FFC300'}}>Open Form →</span>
          </div>

          <div className="resource-card">
            <div>
              <h3 style={{color: '#FFC300'}}>Account Settings</h3>
              <p style={{fontSize: '14px', marginTop: '8px', opacity: 0.8}}>Manage your profile, email preferences, and security.</p>
            </div>
            <span style={{fontSize: '12px', marginTop: '15px', color: '#FFC300'}}>Edit Profile →</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}