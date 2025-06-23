<script setup>
import { ref } from 'vue';
import { fetchNearbyStations } from '@/composables/api.js';

const emit = defineEmits(['results', 'reset']);

const latitude = ref('');
const longitude = ref('');
const radius = ref('');

const handleFilter = async () => {
  try {
    const lat = parseFloat(latitude.value) || 50.9375;
    const lng = parseFloat(longitude.value) || 6.9603;
    const rad = parseInt(radius.value) || 1000;

    const results = await fetchNearbyStations(lat, lng, rad);
    emit('results', results);
  } catch (error) {
    console.error('Geo filter error:', error);
    emit('results', []);
  }
};

// Fehlende Funktionen:

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude.toFixed(6);
        longitude.value = position.coords.longitude.toFixed(6);
        if (!radius.value) radius.value = 1000;
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Standort konnte nicht ermittelt werden');
      }
    );
  } else {
    alert('Geolocation wird nicht unterstützt');
  }
};

const handleReset = () => {
  latitude.value = '';
  longitude.value = '';
  radius.value = '';
  emit('reset');
};
</script>

<template>
  <div class="geo-filter">
    <h4>📍 Umkreissuche</h4>

    <div class="inputs">
      <input v-model="latitude" type="number" step="0.000001" placeholder="Breitengrad (50.9375)" class="geo-input" />

      <input v-model="longitude" type="number" step="0.000001" placeholder="Längengrad (6.9603)" class="geo-input" />

      <input v-model="radius" type="number" placeholder="Radius in Metern (1000)" class="geo-input" />
    </div>

    <div class="radius-buttons">
      <button @click="radius = 1000" class="radius-btn">1km</button>
      <button @click="radius = 2000" class="radius-btn">2km</button>
      <button @click="radius = 5000" class="radius-btn">5km</button>
      <button @click="radius = 10000" class="radius-btn">10km</button>
    </div>

    <div class="buttons">
      <button @click="getCurrentLocation" class="btn btn-secondary">
        🎯 Mein Standort
      </button>
      <button @click="handleFilter" class="btn btn-primary">
        🔍 Suchen
      </button>
      <button @click="handleReset" class="btn btn-secondary">
        ↺ Reset
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.geo-filter {
  @include card-base;
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding: $space-4;
}

h4 {
  margin: 0;
  color: $color-gray-700;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.geo-input {
  @include input-base;
  font-size: $font-size-sm;
}

.radius-buttons {
  display: flex;
  gap: $space-2;
  flex-wrap: wrap;
}

.radius-btn {
  padding: $space-1 $space-3;
  background: $color-gray-100;
  border: 1px solid $color-gray-300;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  cursor: pointer;
  transition: background-color $transition-fast;

  &:hover {
    background: $color-gray-200;
  }
}

.buttons {
  display: flex;
  gap: $space-2;
  flex-wrap: wrap;
}

.btn {
  @include button-base;
  flex: 1;

  &.btn-primary {
    background: $color-primary;
    color: white;

    &:hover {
      background: $color-primary-dark;
    }
  }

  &.btn-secondary {
    background: $color-gray-100;
    color: $color-gray-700;

    &:hover {
      background: $color-gray-200;
    }
  }
}

@include tablet {
  .inputs {
    flex-direction: row;
  }

  .buttons .btn {
    flex: none;
  }
}
</style>
