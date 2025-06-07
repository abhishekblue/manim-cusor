import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs'
import { FaGithub } from 'react-icons/fa'


export default function Navbar() {
  const { userId } = useAuth()
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-gray-800">
      <h1 className="text-xl font-bold">MANIM ANIMATOR</h1>
      <a href="https://github.com/abhishekblue/manim-cusor" target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-white text-3xl hover:text-gray-400" />
      </a>
      { userId
        ? <div className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"><SignOutButton /></div>
        : <div className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"><SignInButton /></div>
      }
    </nav>
  )
}
