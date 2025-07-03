// data/properties.js

export const properties = [{
    id: 'property-1',
    image: 'assets/house-4.jpg',
    type: '3 BEDROOM DUPLEX',
    priceCents: 2000000000, // Storing in cents to avoid floating point issues
    location: 'Ogun State, Abeokuta. Camp, harmony street.',
    keywords: ['ogun', 'abeokuta', 'duplex', '3 bedroom', 'camp', 'harmony street']
}, {
    id: 'property-2',
    image: 'assets/house-3.jpg',
    type: '5 BEDROOM FLAT',
    priceCents: 12000000000,
    location: 'Lagos State, old ikoyi road.',
    keywords: ['lagos', 'ikoyi', 'flat', '5 bedroom', 'old ikoyi road']
}, {
    id: 'property-3',
    image: 'assets/land-1.png',
    type: '3 ACRES OF LAND',
    priceCents: 1500000000,
    location: 'Ogun State, Shagamu.',
    keywords: ['ogun', 'shagamu', 'land', '3 acres']
}, {
    id: 'property-4',
    image: 'assets/house-2.jpg',
    type: 'BUNGALOW',
    priceCents: 2400000000,
    location: 'Ibadan Oyo State, Bodija.',
    keywords: ['ibadan', 'oyo', 'bungalow', 'bodija']
}, {
    id: 'property-5',
    image: 'assets/house-1.png',
    type: 'FULLY DETACHED DUPLEX',
    priceCents: 7000000000,
    location: 'Lagos State, Agidingbi.',
    keywords: ['lagos', 'agidingbi', 'duplex', 'fully detached']
}, {
    id: 'property-6',
    image: 'assets/land-2.png',
    type: '9 ACRES OF FARMING LAND',
    priceCents: 15000000000,
    location: 'Ogun State, Lagos-Abeokuta Express way.',
    keywords: ['ogun', 'lagos-abeokuta expressway', 'land', 'farming land', '9 acres']
}, {
    id: 'property-7',
    image: 'assets/house-5.jpg',
    type: 'SEMI FULLY DETACHED',
    priceCents: 4200000000,
    location: 'Oyo State Ibadan, Near Governor\'s office...',
    keywords: ['oyo', 'ibadan', 'semi fully detached', 'governor office']
}, {
    id: 'property-8',
    image: 'assets/land-3.jpeg',
    type: '5 ACRES OF LAND',
    priceCents: 5000000000,
    location: 'Ogun State, Funaab road, inside harmony junction.',
    keywords: ['ogun', 'funaab road', 'harmony junction', 'land', '5 acres']
}];

// Helper function to get property by ID (similar to getProduct)
export function getProperty(propertyId) {
    let matchingProperty;
    properties.forEach((property) => {
        if (property.id === propertyId) {
            matchingProperty = property;
        }
    });
    return matchingProperty;
}

// Helper function to format currency (assuming NGN, Naira)
// You might want to create a separate utils/money.js for this.
export function formatNaira(priceCents) {
    // Assuming the smallest currency unit is ₦1 (no kobo for this example)
    // Adjust if kobo are used or if you need to handle decimals more precisely
    return `₦${(priceCents / 100).toLocaleString('en-NG')}`;
}