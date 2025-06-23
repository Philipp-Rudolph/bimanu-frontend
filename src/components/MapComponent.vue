<script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';

const props = defineProps({
  stations: {
    type: Array,
    default: () => []
  }
});

const mapContainer = ref(null);
let map = null;
let markersGroup = null;

onMounted(() => {
  map = L.map(mapContainer.value).setView([50.9375, 6.9603], 11);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  markersGroup = L.layerGroup().addTo(map);

  updateMarkers();
});

watch(() => props.stations, updateMarkers, { deep: true });

function updateMarkers() {
  if (!markersGroup) return;

  markersGroup.clearLayers();

  props.stations.forEach(station => {
    const lat = parseFloat(station.latitude);
    const lng = parseFloat(station.longitude);

    if (isNaN(lat) || isNaN(lng)) return;

    const marker = L.marker([lat, lng]).bindPopup(`
      <div style="min-width: 200px;">
        <strong>⛽ Tankstelle</strong><br>
        ${station.adresse}<br>
        <small>📍 ${lat.toFixed(4)}, ${lng.toFixed(4)}</small><br>
        <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" style="color: #2563eb;">
          🗺️ In Google Maps öffnen
        </a>
      </div>
    `);

    markersGroup.addLayer(marker);
  });

  if (props.stations.length > 0) {
    const group = new L.featureGroup(markersGroup.getLayers());
    map.fitBounds(group.getBounds().pad(0.1));
  }
}
</script>

<template>
  <div class="map-container">
    <div class="map-header">
      <h3>🗺️ {{ stations.length }} Tankstellen auf der Karte</h3>
    </div>
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<style scoped>
.map-container {
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
}

.map-header {
  padding: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  margin: 0;
}

.map-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
}

.map {
  height: 400px;
  width: 100%;
}

/* Leaflet CSS Fix */
.map :deep(.leaflet-container) {
  font-family: inherit;
}
</style>
