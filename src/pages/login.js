import { useState } from "react";
import { motion } from "framer-motion";

export default function Login({ onLogin }) {
  const [token, setToken] = useState("");

  const handleLogin = () => {
    if (token) {
      localStorage.setItem("baserow_token", token);
      onLogin(token);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800 p-6">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Login ke <span className="text-blue-500">Baserow</span>
        </h2>

        <motion.input
          type="text"
          placeholder="Masukkan API Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          whileFocus={{ scale: 1.02 }}
        />

        <motion.button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}
