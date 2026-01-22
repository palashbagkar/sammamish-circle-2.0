"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";

import Header from "./header";
import Footer from "./footer";


export default function HomePage() {  
  const [email, setEmail] = useState("");
  const { scrollY } = useScroll();

  // Parallax effect: hero scrolls at half speed
  const heroY = useTransform(scrollY, [0, 1000], [0, 700]);
  const brightness = useTransform(heroY, (latest) => `brightness(${100- (latest / 5)}%)`);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each card
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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

      {/* Featured Resources Section */}
      <section className="featured-section">
        <div className="featured-container">
          <motion.div 
            className="featured-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {resourcesData.map((resource) => (
              <motion.div 
                key={resource.id} 
                className="resource-card-item"
                variants={itemVariants}
                whileHover={{ y: -3 }} // Gentle lift on hover
              >
                <div className="resource-card-wrapper">
                  <div className="resource-image-wrapper">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="resource-image"
                    />
                  </div>
                  <div className="resource-content">
                    <span className="resource-tag">{resource.tag}</span>
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <Link href="/under-construction">
                    <button className="resource-learn-more">
                      <span>Learn More</span>
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3226 7.19032C11.6452 6.86763 11.6452 6.34358 11.3226 6.02089L7.19212 1.89046C6.86943 1.56776 6.34538 1.56776 6.02269 1.89046C5.7 2.21315 5.7 2.73719 6.02269 3.05988L8.74619 5.78081H0.826087C0.369158 5.78081 0 6.14997 0 6.6069C0 7.06383 0.369158 7.43298 0.826087 7.43298H8.74361L6.02527 10.1539C5.70258 10.4766 5.70258 11.0006 6.02527 11.3233C6.34796 11.646 6.87201 11.646 7.1947 11.3233L11.3251 7.1929L11.3226 7.19032Z" fill="#334335"/>
                      </svg>
                    </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Header treated as a grid item so it follows the stagger sequence */}
            <motion.div className="featured-header" variants={itemVariants}>
              <h2 className="featured-title">Featured Community Resources</h2>
              <p className="featured-subtitle">
                Our current favorites: a weekly spotlight on events you won't want to miss.
              </p>
              <Link href="/directory">
              <button className="featured-view-all">View All Resources</button>
              </Link>
            </motion.div>
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
