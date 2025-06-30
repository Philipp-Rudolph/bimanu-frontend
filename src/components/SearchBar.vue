<script setup>
// vue imports
import { ref, watch } from 'vue';

// props and emits
const props = defineProps({
  stations: { type: Array, required: true }
});

const emit = defineEmits(['results', 'reset']);

// state variables
const searchTerm = ref('');

/**
 * Handles the search functionality by filtering stations based on the search term.
 * If the search term is empty, it emits all stations.
 */
const handleSearch = () => {
  if (!searchTerm.value.trim()) {
    emit('results', props.stations);
    return;
  }

  const filtered = props.stations.filter(station =>
    station.adresse.toLowerCase().includes(searchTerm.value.toLowerCase())
  );

  emit('results', filtered);
};

const handleReset = () => {
  searchTerm.value = '';
  emit('reset');
};

watch(searchTerm, handleSearch);
</script>

<template>
  <div class="search-bar">
    <div class="search-input-container">
      <input v-model="searchTerm" type="text" placeholder="Suche nach Straßennamen..." class="search-input"
        autocomplete="off" @keyup.enter="handleSearch">
      <button v-if="searchTerm" class="clear-button" type="button" aria-label="Suche zurücksetzen" @click="handleReset">
        ✕
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  @include input-base;
  width: 100%;
  padding-right: $space-10;
  font-size: $font-size-base;

  &:focus {
    box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
  }
}

.clear-button {
  position: absolute;
  right: $space-3;
  background: none;
  border: none;
  color: $color-gray-400;
  cursor: pointer;
  padding: $space-1;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  transition: all $transition-fast;

  &:hover {
    color: $color-gray-600;
    background: $color-gray-100;
  }
}

.buttons {
  display: flex;
  gap: $space-2;
  justify-content: flex-end;

  @include mobile {
    justify-content: stretch;

    .btn {
      flex: 1;
    }
  }
}

.btn {
  @include button-base;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
