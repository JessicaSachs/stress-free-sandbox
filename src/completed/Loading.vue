<template>
  <transition name="fade" mode="out-in">
    <p v-if="loading" :key="loading">Loading</p>
    <div v-else>
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>