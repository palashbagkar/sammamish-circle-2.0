"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";

import Header from "./header";
import Footer from "./footer";
import ResourceCarousel from "./carousel";


export default function HomePage() {  
  const [email, setEmail] = useState("");
  const { scrollY } = useScroll();

  // Parallax effect: hero scrolls at half speed
  const heroY = useTransform(scrollY, [0, 1000], [0, 700]);
  const brightness = useTransform(heroY, (latest) => `brightness(${100- (latest / 5)}%)`);

  const newsletterVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const resourcesData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1514583079045-e928a4732ade?w=600",
      tag: "Event",
      title: "Sammamish Farmers Market",
      description: "Fresh produce, goods, and community connections every Wednesday.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1652971876875-05db98fab376?w=600",
      tag: "Volunteering",
      title: "Volunteer @ Sammamish Landing",
      description: "Looking for volunteer opportunities? Join us to help clean up Sammamish Landing.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
      tag: "Event",
      title: "Coffee with Council",
      description: "Join three Sammamish City Council members for coffee and conversation.",
    },
  ];

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section with Parallax */}
      <motion.section className="hero-section" style={{filter: brightness}}>
        <motion.div
          className="hero-background"
          style={{ y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1563737484889-d240317436f6"
            alt="Sammamish landscape"
            className="hero-image"
          />
          <div className="hero-overlay" />
        </motion.div>

        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect with Your <span className="hero-title-highlight">Community</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover hundreds of events, volunteer opportunities, and initiatives that are making a difference in our community.
          </motion.p>
          <Link href="/directory">
          <motion.button
            className="hero-cta-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: {duration: 0.8, delay: 0.4} }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Resources
          </motion.button>
          </Link>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span>Scroll Down</span>
            <span className="scroll-arrow">∨</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Resources Section with Carousel */}
      <section className="featured-section">
        <div className="featured-container">
          <motion.div 
            className="featured-header-top"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="featured-title">Featured Community Resources</h2>
            <p className="featured-subtitle">
              Our current favorites: a weekly spotlight on events you won't want to miss.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResourceCarousel resources={resourcesData} />
          </motion.div>

          <motion.div
            className="featured-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/directory">
              <button className="featured-view-all">View All Resources</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
         className="newsletter-section"
      >
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={newsletterVariants} className="newsletter-container">
          <h2 className="newsletter-title">Never Miss a Community Moment</h2>
          <p className="newsletter-subtitle">
            Get weekly updates on new events, volunteer opportunities, and community initiatives delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form-wrapper">
            <div className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <Link href="/under-construction">
              <button type="submit" className="newsletter-submit">
                Join Our Newsletter
              </button>
              </Link>
            </div>
            <p className="newsletter-disclaimer">
              No spam, just community goodness. Unsubscribe anytime.
            </p>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
