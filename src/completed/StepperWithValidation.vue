<template>
  <button @click="updateValue(value - 1)" data-testid="decrement">
    Decrease
  </button>
  <span>{{ valueWithLabel }}</span>
  <button @click="updateValue(value + 1)" data-testid="increment">
    Increase
  </button>
</template>

<script>
import { makeVModelValidator } from "./validators";

const pluralize = (value) => (value === 0 || value > 1 ? "items" : "item");

export default {
  props: {
    value: { type: Number, required: true },
    valueModifiers: makeVModelValidator(["plural"]),
  },
  emits: {
    "update:value": (newValue) => {
      return newValue >= 0;
    },
  },
  computed: {
    valueWithLabel() {
      if (this.valueModifiers.plural) {
        return `${this.value} ${pluralize(this.value)}`;
      }
      return this.value;
    },
  },
  methods: {
    updateValue(newValue) {
      if (newValue <= -1) return;

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