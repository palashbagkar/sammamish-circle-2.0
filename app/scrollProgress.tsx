"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "5px",
        backgroundColor: "#FFC300", 
        originX: 0,
        zIndex: 1000,
        // TACTICAL FIXES FOR BLUR:
        willChange: "transform", // Prepares the GPU
        translateZ: 0, // Forces 3D rendering for sharpness
        backfaceVisibility: "hidden", // Prevents flickering
      }}
    />
  );
}