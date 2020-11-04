<template>
  <Suspense>
    <template #default>
      <AsyncHelloWorld>Hello World!</AsyncHelloWorld>
    </template>
    <template #fallback>
      <p>Loading!</p>
    </template>
  </Suspense>
</template>

<script>
import { defineAsyncComponent, onErrorCaptured, ref } from "vue";

const AsyncHelloWorld = defineAsyncComponent({
  loader: () => import("./AsyncHelloWorld.vue"),
  delay: 1000,
  suspensible: true,
});

function asyncSetTimeout(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export default {
  components: { AsyncHelloWorld },
  setup() {
    // await asyncSetTimeout(1);
    const err = ref(null);
    onErrorCaptured((newError) => (err.value = newError));
    return {
      hello: "world",
    };
    // try {
    //   const response = await fetch("/public/users.json");
    //   return response.json();
    // } catch (err) {
    //   throw err;
    // }
  },
};
</script>