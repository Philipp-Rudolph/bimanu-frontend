<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps(['data']);
const emit = defineEmits(['sorted']);

const sortBy = ref('address');
const sortOrder = ref('asc');

// Check if any station has a distance_km property
const hasDistance = computed(() =>
  props.data?.some(station => station.distance_km != null)
);

/**
 * Function to handle sorting when a button is clicked.
 * It toggles the sort order if the same field is clicked again,
 * or sets the sortBy field to the clicked field with ascending order.
 * @param {string} field - The field to sort by ('distance' or 'address').
 */
const sort = (field) => {
  if (field === 'distance' && !hasDistance.value) return;

  if (sortBy.value === field && props.data?.length) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }

  sortData();
};

/* Function to sort the data based on the current sortBy and sortOrder.
 * It emits the sorted data to the parent component.
 */
const sortData = () => {
  if (!props.data?.length) return;

  const sorted = [...props.data].sort((a, b) => {
    let valueA = sortBy.value === 'distance' ? (a.distance_km || 0) : (a.adresse || '');
    let valueB = sortBy.value === 'distance' ? (b.distance_km || 0) : (b.adresse || '');

    if (typeof valueA === 'string') {
      return sortOrder.value === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return sortOrder.value === 'asc' ? valueA - valueB : valueB - valueA;
  });

  emit('sorted', sorted);
};

// Watch for changes in the data prop to re-sort when it changes
watch(() => props.data, () => {
  if (sortBy.value === 'distance' && !hasDistance.value) {
    sortBy.value = 'address';
  }
  sortData();
}, { immediate: true });
</script>

<template>
  <div class="sort-controls">
    <button
      @click="sort('distance')"
      :class="{ active: sortBy === 'distance' }"
      :disabled="!hasDistance"
    >
      Entfernung {{ sortBy === 'distance' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
    </button>
    <button @click="sort('address')" :class="{ active: sortBy === 'address' }">
      Adresse {{ sortBy === 'address' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sort-controls {
  display: flex;
  gap: $space-2;
  margin-bottom: $space-4;
  padding: $space-2;
  background: $color-gray-50;
  border-radius: $radius-md;
}

button {
  display: flex;
  align-items: center;
  gap: $space-1;
  padding: $space-2 $space-3;
  background: $color-white;
  border: 1px solid $color-gray-300;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-gray-700;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background: $color-gray-100;
    border-color: $color-gray-400;
  }

  &.active {
    background: $color-primary;
    border-color: $color-primary;
    color: $color-white;
  }

  &:disabled {
    background: $color-gray-100;
    border-color: $color-gray-200;
    color: $color-gray-400;
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      background: $color-gray-100;
      border-color: $color-gray-200;
    }
  }
}
</style>
