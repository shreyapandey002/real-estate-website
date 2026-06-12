export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold text-gray-900">DreamHomes</span>
        </div>

        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </a>
          </li>
          <li>
            <a href="#listings" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Listings
            </a>
          </li>
          <li>
            <a href="#agents" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Agents
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </li>
        </ul>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Sign In
        </button>
      </nav>
    </header>
  )
}
