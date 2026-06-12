import { Search, MapPin, DollarSign, Home } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen bg-cover bg-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="container-custom relative h-full flex items-center justify-center">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Home Instantly
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Browse premium properties and connect with our AI agent for personalized recommendations
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col md:flex-row gap-4 md:gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Budget range"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <Home className="w-5 h-5 text-gray-400" />
              <select className="w-full bg-transparent text-gray-800 outline-none">
                <option>Property type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>House</option>
                <option>Condo</option>
              </select>
            </div>

            <button className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 md:min-w-fit">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
