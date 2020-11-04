<template>
  <div class="container" v-bind="$attrs">
    <transition-group name="shuffle">
      <div
        v-for="i in items"
        :key="`${i}item`"
        class="card"
        :style="`background-color: ${colors[i % (items.length / 2)]}`"
      >
        {{ i }}
      </div>
    </transition-group>
  </div>
  <button @click="shuffle">Shuffle</button>
</template>

<script>
import { shuffle } from "lodash";
const colors = ["red", "deeppink", "blue", "orangered", "blueviolet"];
export default {
  props: {
    initialItems: { type: Array },
    onShuffle: { type: Function, default: shuffle },
  },
  methods: {
    shuffle() {
      this.items = this.onShuffle(this.items);
    },
  },
  data() {
    return {
      items: this.initialItems
        ? this.initialItems
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      colors,
    };
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: repeat(2, 50px);
  grid-template-columns: repeat(5, 50px);
  grid-gap: 15px;
}
.card {
  width: 50px;
  height: 50px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

button {
  display: inline-block;
  padding: 0.25rem 1rem;
  margin: 1rem 0;
  text-align: center;
}

.shuffle-move {
  transition: transform 0.8s ease;
}
</style>