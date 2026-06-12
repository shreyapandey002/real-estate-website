import PropertyCard from './PropertyCard'

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop',
    title: 'Luxury Villa in Bangalore',
    price: '₹1.2 Cr',
    location: 'Whitefield, Bangalore',
    beds: 4,
    baths: 3,
    area: '3,500',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=400&fit=crop',
    title: 'Modern Apartment Downtown',
    price: '₹85 Lakh',
    location: 'Bandra, Mumbai',
    beds: 3,
    baths: 2,
    area: '2,200',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop',
    title: 'Beachfront Condo',
    price: '₹2 Cr',
    location: 'Marine Drive, Mumbai',
    beds: 5,
    baths: 4,
    area: '4,800',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c52f8e?w=500&h=400&fit=crop',
    title: 'Contemporary House',
    price: '₹75 Lakh',
    location: 'Indiranagar, Bangalore',
    beds: 3,
    baths: 2,
    area: '2,100',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop',
    title: 'Premium Penthouse',
    price: '₹3.5 Cr',
    location: 'Lower Parel, Mumbai',
    beds: 4,
    baths: 3,
    area: '3,800',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&h=400&fit=crop',
    title: 'Garden Villa',
    price: '₹1.5 Cr',
    location: 'DLF Phase 4, Gurgaon',
    beds: 4,
    baths: 3,
    area: '4,200',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1613545287388-459ecdaf60eb?w=500&h=400&fit=crop',
    title: 'Smart Home Apartment',
    price: '₹1 Cr',
    location: 'Sector 15, Noida',
    beds: 3,
    baths: 2,
    area: '2,400',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&h=400&fit=crop',
    title: 'Luxury Farmhouse',
    price: '₹2.8 Cr',
    location: 'Manesar, Gurgaon',
    beds: 5,
    baths: 4,
    area: '5,600',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1600121848619-c6eb366d63b3?w=500&h=400&fit=crop',
    title: 'Studio Apartment',
    price: '₹45 Lakh',
    location: 'Koramangala, Bangalore',
    beds: 1,
    baths: 1,
    area: '650',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1600560886742-f049cd451bba?w=500&h=400&fit=crop',
    title: 'Heritage Bungalow',
    price: '₹2.2 Cr',
    location: 'New Delhi',
    beds: 4,
    baths: 3,
    area: '3,900',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1600585152715-8cdc751ba205?w=500&h=400&fit=crop',
    title: 'Riverside Apartment',
    price: '₹95 Lakh',
    location: 'Sector 18, Noida',
    beds: 3,
    baths: 2,
    area: '2,300',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500&h=400&fit=crop',
    title: 'Eco-Friendly Villa',
    price: '₹1.8 Cr',
    location: 'Bangalore Tech Park',
    beds: 4,
    baths: 3,
    area: '3,600',
  },
]

export default function PropertyListings() {
  return (
    <section id="listings" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium properties across major Indian cities
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  )
}
