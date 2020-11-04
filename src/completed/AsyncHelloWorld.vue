<template>
  <slot />
</template>
<script>
function asyncSetTimeout(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export default {
  async setup() {
    await asyncSetTimeout(1000);
    return {
      hello: "world",
    };
  },
};
</script>