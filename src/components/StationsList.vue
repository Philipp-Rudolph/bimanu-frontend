<script setup>
import { ref } from 'vue';
import { createGoogleMapsLink } from '@/composables/maps.js';
import SortBar from '@/components/SortBar.vue';

const props = defineProps({
  data: {
    type: Array,
    required: false,
    default: () => []
  }
});

const sortedStations = ref([]);

/**
 * Handles the sorted event from the SortBar component.
 * Updates the sortedStations with the sorted data.
 * @param {Array} sorted - The sorted array of stations.
 */
const handleSorted = (sorted) => {
  sortedStations.value = sorted;
};

</script>

<template>
  <div class="stations-list">
    <div v-if="!props.data?.length" class="empty-state">
      Keine Tankstellen gefunden
    </div>

    <div v-else>
      <SortBar :data="props.data" @sorted="handleSorted" />
      <div class="stations-grid">
        <article v-for="station in sortedStations.length ? sortedStations : props.data" :key="station.id || station.adresse" class="station-card">
          <div class="station-info">
            <a :href="createGoogleMapsLink(station.longitude, station.latitude, station.adresse)" target="_blank"
              rel="noopener noreferrer">
              <h3 class="station-address">{{ station.adresse }}</h3>
              <p v-if="station.distance_km">{{ station.distance_km.toFixed(1) }} km entfernt</p>
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stations-list {
  width: 100%;
}

.empty-state {
  @include flex-center;
  padding: $space-12;
  color: $color-gray-500;
  font-size: $font-size-lg;
  background: $color-gray-50;
  border-radius: $radius-lg;
  border: 2px dashed $color-gray-300;
}

.stations-grid {
  display: grid;
  gap: $space-4;

  @include mobile {
    gap: $space-3;
  }
}

.station-card {
  @include card-base;
  padding: $space-4;
  transition: all $transition-fast;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
    border-color: $color-primary-light;
  }
}

.station-info {
  display: flex;
  flex-direction: column;
  gap: $space-2;

  >a {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.station-address {
  margin: 0;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $color-gray-900;
  line-height: 1.4;
}

.station-brand {
  font-size: $font-size-sm;
  color: $color-primary;
  font-weight: $font-weight-medium;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

</style>
