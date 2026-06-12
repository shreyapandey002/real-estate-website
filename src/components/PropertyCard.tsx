import { MapPin, Bed, Bath, Ruler } from 'lucide-react'

interface PropertyCardProps {
  image: string
  title: string
  price: string
  location: string
  beds: number
  baths: number
  area: string
}

export default function PropertyCard({ image, title, price, location, beds, baths, area }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{location}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Bed className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-gray-900">{beds}</span>
            </div>
            <p className="text-xs text-gray-600">Bedrooms</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Bath className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-gray-900">{baths}</span>
            </div>
            <p className="text-xs text-gray-600">Bathrooms</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Ruler className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-gray-900 text-sm">{area}</span>
            </div>
            <p className="text-xs text-gray-600">Sq.ft</p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  )
}
