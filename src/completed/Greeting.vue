<template>
  <h1 data-testid="title">{{ message }}</h1>
</template>

<script>
export default {
  props: {
    message: { type: String, required: false },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
