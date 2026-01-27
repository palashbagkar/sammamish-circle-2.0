"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from 'utils/supabase';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // We still check auth in the background to handle the routing
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => setHasScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className={`header-container ${hasScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <Link href="/" className="logo-section">
          <h1 className="logo-text">SAMMAMISH CIRCLE</h1>
        </Link>

        <nav className="nav-menu">
          <Link href="/directory" className="nav-link">Directory</Link>
          <Link href="/submit" className="nav-link">Submit a resource</Link>
          {/* STATIC LABEL: Always says "Account" 
              DYNAMIC ROUTE: Redirects to /auth (if guest) or /dashboard (if member)
          */}
          <Link 
            href={user ? "/dashboard" : "/auth"} 
            className="nav-link"
          >
            Account
          </Link>
          <Link href="/references" className="nav-link">References</Link>
          <Link href="/about" className="nav-link">About</Link>
        </nav>
      </div>
    </header>
  );
}