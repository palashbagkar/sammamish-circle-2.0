"use client";
import React, { useState, useRef } from "react";
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import "./about.css";

// Stat card component with 3D flip effect
const FlipCard = ({ 
  frontContent, 
  backNumber, 
  backLabel,
  delay = 0 
}: { 
  frontContent: string;
  backNumber: string;
  backLabel: string;
  delay?: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      className="flip-card-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="flip-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front of card */}
        <div className="flip-card-front">
          <p>{frontContent}</p>
        </div>

        {/* Back of card */}
        <div className="flip-card-back">
          <div className="stat-number-large">{backNumber}</div>
          <div className="stat-label-text">{backLabel}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Value pill with tooltip
const ValuePill = ({ 
  text, 
  color, 
  tooltipText 
}: { 
  text: string; 
  color: string;
  tooltipText: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="value-pill-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div
        className="value-pill"
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.div>
      
      {showTooltip && (
        <motion.div
          className="value-tooltip"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 4px 12px ${color}40`
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tooltipText}
        </motion.div>
      )}
    </div>
  );
};

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect: hero scrolls at half speed
  const heroY = useTransform(scrollY, [0, 800], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const brightness = useTransform(heroY, (latest) => `brightness(${100- (latest / 3)}%)`);

  return (
    <div className="about-page">
      <Header />

      {/* Hero Section with Parallax */}
      <motion.section className="about-hero-section" ref={heroRef} style={{filter: brightness}}>
        <motion.div 
          className="about-hero-background"
          style={{ y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=2880"
            alt="Sammamish landscape"
            className="about-hero-image"
          />
          <div className="about-hero-overlay" />
        </motion.div>
        
        <motion.div 
          className="about-hero-content-wrapper"
          style={{ opacity: heroOpacity }}
        >
          <motion.h1 
            className="about-main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About
            <br />
            Sammamish Circle
          </motion.h1>
          <motion.p 
            className="about-main-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connecting neighbors, building community
          </motion.p>
        </motion.div>

        <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span>Scroll Down</span>
            <span className="scroll-arrow">∨</span>
          </motion.div>
      </motion.section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <motion.div 
          className="mission-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mission-content">
            <motion.h2 
              className="mission-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="mission-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Sammamish Circle connects neighbors and strengthens community by making it effortless to discover local events, volunteer opportunities, and initiatives that matter. We believe vibrant communities are built through shared experiences and genuine connection. By bringing together residents, organizations, and opportunities in one place, we empower everyone to get involved, give back, and help build a thriving Sammamish—one connection at a time.
            </motion.p>
          </div>

          <motion.div 
            className="mission-values"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ValuePill 
              text="Connection" 
              color="#113B52" 
              tooltipText="We bring people together through shared experiences and meaningful interactions that strengthen our community bonds."
            />
            <ValuePill 
              text="Transparency" 
              color="#4D5E22" 
              tooltipText="We operate openly and honestly, ensuring every member has clear access to information about our initiatives and decision-making."
            />
            <ValuePill 
              text="Accessibility" 
              color="#225332" 
              tooltipText="We make community involvement effortless for everyone, removing barriers so all residents can participate and contribute."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Our Impact Section */}
      <section className="impact-stats-section">
          

        <div className="impact-stats-grid">
          {/* Left column stats */}
          <div className="stats-column stats-left">
            <FlipCard 
              frontContent="Click to view"
              backNumber="4500+"
              backLabel="community members reached"
              delay={0.1}
            />
            <FlipCard 
              frontContent="Click to view"
              backNumber="50+"
              backLabel="nonprofit organizations"
              delay={0.2}
            />
          </div>

          
        <motion.div 
          className="impact-center-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        ><h2 className="impact-title">Our Impact</h2>
          <p className="impact-description">
            We are proud of the profound impact we've had on the local community. With over a thousand community members reached and counting, we have connected people to the resources they need to truly thrive in Sammamish.
          </p>
        </motion.div>

          {/* Right column stats */}
          <div className="stats-column stats-right">
            <FlipCard 
              frontContent="Click to view"
              backNumber="250+"
              backLabel="resources listed"
              delay={0.3}
            />
            <FlipCard 
              frontContent="Click to view"
              backNumber="900+"
              backLabel="forum threads"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <motion.h2 
          className="how-it-works-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          How It Works
        </motion.h2>

        <div className="how-it-works-grid">
          {/* Resource Directory Card */}
          <motion.div 
            className="how-it-works-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
          >
            <div className="card-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13" cy="13" r="8" stroke="#000" strokeWidth="2"/>
                <path d="M19 19L25 25" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="card-title">Resource Directory</h3>
            <p className="card-description">
              Looking for volunteer opportunities, educational programs, or other community events? Browse our curated catalog of events, volunteer opportunities, and initiatives that are making a difference in our community.
            </p>
            <Link href="/directory">
            <motion.button 
              className="card-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Resources
            </motion.button>
            </Link>
          </motion.div>

          {/* Submit Resources Card */}
          <motion.div 
            className="how-it-works-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
          >
            <div className="card-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8V22M8 15H22" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="card-title">Submit Resources</h3>
            <p className="card-description">
              Are you the an event organizer, nonprofit manager, or just know about a community program that doesn't seem to be listed on our site? Submit a new community resource to our directory. All submissions will be reviewed.
            </p>
            <Link href="/submit">
            <motion.button 
              className="card-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit a Resource
            </motion.button>
            </Link>
          </motion.div>

          {/* Community Forum Card */}
          <motion.div 
            className="how-it-works-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
          >
            <div className="card-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10H23M7 15H23M7 20H17" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="card-title">Community Forum</h3>
            <p className="card-description">
              Have a question about local services? Looking for recommendations? Want to organize a neighborhood cleanup? Post in the forum and tap into the collective knowledge of Sammamish residents who are eager to help.
            </p>
            <Link href="/under-construction">
            <motion.button 
              className="card-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Forum
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
