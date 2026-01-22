"use client";
import { motion, Variants } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import Link from "next/link";
import "./under-construction.css";

export default function UnderConstructionPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="under-construction-page">
      <Header />

      <main className="construction-container">
        <motion.div
          className="construction-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Construction Icon */}
          <motion.div className="construction-icon" variants={itemVariants}>
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="#FFC300"
      strokeWidth="2"
      opacity="0.2"
    />

    <g>
      {/* Left Bracket < */}
      <path
        d="M38 35 L28 50 L38 65"
        stroke="#FFC300"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Forward Slash / */}
      <path
        d="M45 70 L55 30"
        stroke="#FFC300"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Right Bracket > */}
      <path
        d="M62 35 L72 50 L62 65"
        stroke="#FFC300"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
</motion.div>

          {/* Heading */}
          <motion.h1 className="construction-title" variants={itemVariants}>
            Coming Soon
          </motion.h1>

          {/* Subheading */}
          <motion.p className="construction-subtitle" variants={itemVariants}>
            We're working hard to build something amazing for our community.
            This page will be ready to share soon!
          </motion.p>

          {/* Navigation Links */}
          <motion.div className="finished-pages" variants={itemVariants}>
            <p className="finished-title">In the meantime, check out:</p>
            <div className="links-grid">
              <Link href="/" className="link-card">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="link-icon">🏠</span>
                  <h3>Home</h3>
                  <p>Explore featured resources and community news</p>
                </motion.div>
              </Link>

              <Link href="/directory" className="link-card">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="link-icon">📚</span>
                  <h3>Directory</h3>
                  <p>Browse all community resources and opportunities</p>
                </motion.div>
              </Link>

              <Link href="/submit" className="link-card">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="link-icon">✏️</span>
                  <h3>Submit a Resource</h3>
                  <p>Share your community initiative with us</p>
                </motion.div>
              </Link>

              <Link href="/about" className="link-card">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="link-icon">ℹ️</span>
                  <h3>About</h3>
                  <p>Learn more about Sammamish Circle's mission</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
      </main>
      <Footer />
    </div>
  );
}
