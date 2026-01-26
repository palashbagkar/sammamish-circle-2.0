"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push("/"); // Pivot to home on success
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="p-8 bg-white shadow-xl rounded-lg border-t-4 border-[#D4AF37] w-96"
      >
        <h1 className="text-2xl font-bold mb-6">Sammamish Circle Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="Email" 
            className="w-full p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="w-full bg-[#D4AF37] text-white py-2 rounded font-bold">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}