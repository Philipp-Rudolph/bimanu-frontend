<script setup>
import { ref, onMounted } from 'vue';
import StationsList from '@/components/StationsList.vue';
import SearchBar from '@/components/SearchBar.vue';
import GeoFilter from '@/components/GeoFilter.vue';
import MapComponent from '@/components/MapComponent.vue';
import { fetchStations } from '@/composables/api.js';

const allStations = ref([]);
const filteredStations = ref([]);
const loading = ref(true);
const error = ref(null);
const showMap = ref(false);

onMounted(async () => {
  try {
    allStations.value = await fetchStations();
    filteredStations.value = allStations.value;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});

const handleSearchResults = (results) => {
  filteredStations.value = results;
};

const handleGeoResults = (results) => {
  filteredStations.value = results;
};

const handleReset = () => {
  filteredStations.value = allStations.value;
};
</script>

<template>
  <div class="container">
    <header>
      <h1>Tankstellen Finder Köln</h1>
    </header>

    <main>
      <div v-if="loading" class="loading">
        Lade Tankstellen...
      </div>

      <div v-else-if="error" class="error">
        Fehler: {{ error.message }}
      </div>

      <div v-else>
        <div class="filters">
          <SearchBar :stations="allStations" @results="handleSearchResults" @reset="handleReset" />
          <GeoFilter @results="handleGeoResults" @reset="handleReset" />
        </div>

        <div class="view-controls">
          <div class="results-info">
            <span class="count">{{ filteredStations.length }} Tankstellen gefunden</span>
          </div>

          <div class="view-buttons">
            <button @click="showMap = false" class="btn" :class="{ 'btn-primary': !showMap, 'btn-secondary': showMap }">
              Liste
            </button>
            <button @click="showMap = true" class="btn" :class="{ 'btn-primary': showMap, 'btn-secondary': !showMap }">
              Karte
            </button>
          </div>
        </div>

        <div class="content">
          <MapComponent v-if="showMap" :stations="filteredStations" />
          <StationsList v-else :data="filteredStations" />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: $breakpoint-xl;
  margin: 0 auto;
  padding: $space-8 $space-4;
}

header {
  text-align: center;
  margin-bottom: $space-8;

  h1 {
    color: $color-gray-700;
    margin: 0;
  }
}

.filters {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-6;
  margin-bottom: $space-8;
}

.loading {
  text-align: center;
  padding: $space-12;
  color: $color-gray-500;
  font-size: $font-size-lg;
}

.error {
  padding: $space-4;
  background: rgba($color-error, 0.05);
  border: 1px solid rgba($color-error, 0.2);
  border-radius: $radius-lg;
  color: $color-error;
  margin-bottom: $space-4;
}

.results {
  .count {
    color: $color-gray-500;
    margin-bottom: $space-4;
    font-weight: $font-weight-medium;
  }
}

.view-controls {
  @include flex-between;
  margin-bottom: $space-8;

  .results-info {
    flex-grow: 1;
    color: $color-gray-600;
  }

  .view-buttons {
    display: flex;
    gap: $space-2;
  }
}
</style>
