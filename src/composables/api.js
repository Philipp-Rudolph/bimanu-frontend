const API_BASE_URL = '/api'

/**
 * Makes an API request
 * @param {string} url
 * @param {object} options
 * @returns
 */
export async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const data = await response.json()

  return data
}

/**
 * Fetches the list of gas stations
 * @returns {Promise<Array>} List of gas stations
 */
export async function fetchStations() {
  try {
    return await apiRequest(`${API_BASE_URL}/gas-stations`)
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw new Error(`Tankstellen konnten nicht geladen werden: ${error.message}`)
  }
}

/** * Fetches a specific gas station by ID
 * @param {string} id - The ID of the gas station
 * @returns {Promise<Object>} The gas station data
 */
export async function fetchNearbyStations(lat, lng, radius) {
  if (typeof lat !== 'number' || lat < -90 || lat > 90) {
    throw new Error('Ungültiger Breitengrad. Muss zwischen -90 und 90 liegen.')
  }

  if (typeof lng !== 'number' || lng < -180 || lng > 180) {
    throw new Error('Ungültiger Längengrad. Muss zwischen -180 und 180 liegen.')
  }

  if (typeof radius !== 'number' || radius <= 0 || radius > 50000) {
    throw new Error('Ungültiger Radius. Muss zwischen 1 und 50000 Metern liegen.')
  }

  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
    })

    return await apiRequest(`${API_BASE_URL}/gas-stations/nearby?${params}`)
  } catch (error) {
    console.error('Error fetching nearby stations:', error)
    throw new Error(`Standortbasierte Suche fehlgeschlagen: ${error.message}`)
  }
}
