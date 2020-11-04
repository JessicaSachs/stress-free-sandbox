<template>
  <button @click="value--" data-testid="decrement">Decrease</button>
  <span>{{ value }}</span>
  <button @click="value++" data-testid="increment">Increase</button>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
  watch: {
    value(newValue) {
      this.$emit("update:value", newValue);
    },
  },
};
</script>

<style scoped>
span {
  font-size: 1.4rem;
  color: blueviolet;
  font-weight: bolder;
}
button {
  padding: 0.3rem;
  min-width: 80px;
  font-size: 1rem;
  border: 1px solid blueviolet;
  background: white;
  color: blueviolet;
  border-radius: 5px;
}

* + * {
  margin-left: 1rem;
}
</style>