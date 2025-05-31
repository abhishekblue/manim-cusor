'use client'

import { FaGithub } from "react-icons/fa";

export function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-center space-x-4">
        <span className="text-white text-lg font-semibold">MANIM CURSOR</span>
        <a
          href="https://github.com/abhishekblue/manim-cusor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <FaGithub size={22} />
        </a>
      </div>
    </nav>
  );
}
