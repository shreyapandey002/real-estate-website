import { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'
import { fallbackProperties, getPropertyImage } from '../data/propertyFallbacks'
import type { PropertyListing } from '../types/property'

type ApiProperty = {
  property_id: string
  property_name: string
  property_type: string
  location: string
  price: string | number
  square_feet: number
  bedrooms: number
  bathrooms: number
  configuration: string | null
}

function formatPrice(value: string | number) {
  const price = Number(value)

  if (!Number.isFinite(price)) {
    return 'Price on request'
  }

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 1)} Cr`
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)} Lakh`
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

function mapApiProperty(property: ApiProperty, index: number): PropertyListing {
  const propertyType = property.configuration ?? property.property_type

  return {
    id: property.property_id,
    image: getPropertyImage(propertyType, property.bedrooms, index),
    title: property.property_name,
    price: formatPrice(property.price),
    location: property.location,
    beds: property.bedrooms,
    baths: property.bathrooms,
    area: new Intl.NumberFormat('en-IN').format(property.square_feet),
    propertyType,
  }
}

export default function PropertyListings() {
  const [properties, setProperties] = useState<PropertyListing[]>(fallbackProperties)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperties() {
      try {
        const response = await fetch('/api/listings', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Listings request failed with status ${response.status}`)
        }

        const data = (await response.json()) as ApiProperty[]

        if (Array.isArray(data) && data.length > 0) {
          setProperties(data.map(mapApiProperty))
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProperties()

    return () => controller.abort()
  }, [])

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

        {isLoading && (
          <p className="mb-6 text-center text-sm font-medium text-gray-500">
            Loading latest listings...
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  )
}
