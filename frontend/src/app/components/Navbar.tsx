import { FaGithub } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-gray-800">
      <h1 className="text-xl font-bold">MANIM ANIMATOR</h1>
      <a href="https://github.com/abhishekblue/manim-cusor" target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-white text-2xl hover:text-gray-400" />
      </a>
    </nav>
  )
}
