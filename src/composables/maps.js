// Function to create a Google Maps link for a specific location by latitude and longitude
export function createGoogleMapsLink(lat, lng, label = '') {
  const encodedLabel = label ? encodeURIComponent(label) : ''
  return `https://www.google.com/maps?q=${lng},${lat}${encodedLabel ? `+(${encodedLabel})` : ''}`
}

// Function to create a Google Maps link for a place search by address
export function createPlaceSearchLink(address) {
  const encodedAddress = encodeURIComponent(address)
  return `https://www.google.com/maps/search/${encodedAddress}`
}
