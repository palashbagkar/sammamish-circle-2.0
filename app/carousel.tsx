"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Resource {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
}

interface CarouselProps {
  resources: Resource[];
}

export default function ResourceCarousel({ resources }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % resources.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, resources.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const sideCardVariants = {
    left: {
      x: -120,
      opacity: 0.6,
      scale: 0.85,
      zIndex: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    right: {
      x: 120,
      opacity: 0.6,
      scale: 0.85,
      zIndex: 0,
    },
  };

  const handlePrev = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % resources.length);
  };

  const getCardPosition = (index: number) => {
    if (index === currentIndex) return "center";
    if (index === (currentIndex - 1 + resources.length) % resources.length) return "left";
    if (index === (currentIndex + 1) % resources.length) return "right";
    return "hidden";
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {/* Left Arrow */}
        <motion.button
          className="carousel-arrow carousel-arrow-left"
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous resource"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        {/* Carousel Content */}
        <div className="carousel-content">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="carousel-slide-center"
            >
              <div className="resource-card-carousel">
                <div className="resource-image-wrapper-carousel">
                  <img
                    src={resources[currentIndex].image}
                    alt={resources[currentIndex].title}
                    className="resource-image-carousel"
                  />
                </div>
                <div className="resource-content-carousel">
                  <span className="resource-tag-carousel">{resources[currentIndex].tag}</span>
                  <h3 className="resource-title-carousel">{resources[currentIndex].title}</h3>
                  <p className="resource-description-carousel">{resources[currentIndex].description}</p>
                  <Link href="/under-construction">
                    <button className="resource-learn-more-carousel">
                      <span>Learn More</span>
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3226 7.19032C11.6452 6.86763 11.6452 6.34358 11.3226 6.02089L7.19212 1.89046C6.86943 1.56776 6.34538 1.56776 6.02269 1.89046C5.7 2.21315 5.7 2.73719 6.02269 3.05988L8.74619 5.78081H0.826087C0.369158 5.78081 0 6.14997 0 6.6069C0 7.06383 0.369158 7.43298 0.826087 7.43298H8.74361L6.02527 10.1539C5.70258 10.4766 5.70258 11.0006 6.02527 11.3233C6.34796 11.646 6.87201 11.646 7.1947 11.3233L11.3251 7.1929L11.3226 7.19032Z" fill="#334335"/>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side Cards Preview */}
          <div className="carousel-side-cards">
            {resources.map((resource, index) => {
              const position = getCardPosition(index);
              if (position === "hidden") return null;

              return (
                <motion.div
                  key={resource.id}
                  className="carousel-side-card"
                  variants={sideCardVariants}
                  animate={position}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="side-card-image"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <motion.button
          className="carousel-arrow carousel-arrow-right"
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next resource"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {resources.map((_, index) => (
          <motion.button
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setAutoplay(false);
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
