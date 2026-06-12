import type { PropertyListing } from '../types/property'

export const propertyImages = {
  compact: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&h=400&fit=crop',
  ],
  apartment: [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=500&h=400&fit=crop',
  ],
  villa: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c52f8e?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&h=400&fit=crop',
  ],
}

export const fallbackProperties: PropertyListing[] = [
  {
    id: 'demo-1',
    image: propertyImages.villa[0],
    title: 'Luxury Villa in Bangalore',
    price: '₹1.2 Cr',
    location: 'Whitefield, Bangalore',
    beds: 4,
    baths: 3,
    area: '3,500',
    propertyType: 'Villa',
  },
  {
    id: 'demo-2',
    image: propertyImages.apartment[0],
    title: 'Modern Apartment Downtown',
    price: '₹85 Lakh',
    location: 'Bandra, Mumbai',
    beds: 3,
    baths: 2,
    area: '2,200',
    propertyType: 'Apartment',
  },
  {
    id: 'demo-3',
    image: propertyImages.compact[0],
    title: 'Studio Apartment',
    price: '₹45 Lakh',
    location: 'Koramangala, Bangalore',
    beds: 1,
    baths: 1,
    area: '650',
    propertyType: '1BHK',
  },
  {
    id: 'demo-4',
    image: propertyImages.apartment[1],
    title: 'Riverside Apartment',
    price: '₹95 Lakh',
    location: 'Sector 18, Noida',
    beds: 3,
    baths: 2,
    area: '2,300',
    propertyType: 'Apartment',
  },
  {
    id: 'demo-5',
    image: propertyImages.villa[1],
    title: 'Garden Villa',
    price: '₹1.5 Cr',
    location: 'DLF Phase 4, Gurgaon',
    beds: 4,
    baths: 3,
    area: '4,200',
    propertyType: 'Villa',
  },
  {
    id: 'demo-6',
    image: propertyImages.apartment[2],
    title: 'Smart Home Apartment',
    price: '₹1 Cr',
    location: 'Sector 15, Noida',
    beds: 3,
    baths: 2,
    area: '2,400',
    propertyType: 'Apartment',
  },
]

export function getPropertyImage(propertyType: string, beds: number, index: number) {
  if (beds <= 1 || /1\s*bhk|studio/i.test(propertyType)) {
    return propertyImages.compact[index % propertyImages.compact.length]
  }

  if (/villa|bungalow|farmhouse|house/i.test(propertyType)) {
    return propertyImages.villa[index % propertyImages.villa.length]
  }

  return propertyImages.apartment[index % propertyImages.apartment.length]
}
