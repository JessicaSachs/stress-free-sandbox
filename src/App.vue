<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Greeting message="Welcome to Stress-free Testing in Vue 3" />
  <h2>Each of these examples is a component we'll test in isolation</h2>

  <hr />

  <h3>Simple Stepper</h3>
  <Stepper />

  <h3>Stepper with Validation + Emits</h3>
  <StepperWithValidation v-model:value="value" />

  <h3>Stepper with Scoped Slots</h3>
  <StepperWithSlots>
    <template #default="{ value }">
      <span style="color: red">{{ value }}</span>
    </template>
  </StepperWithSlots>

  <hr />

  <h3>Loading Component with Transitions</h3>
  <Loading :loading="loading">
    <p>Ready!</p>
  </Loading>
  <button @click="loading = !loading">Toggle Loading State</button>

  <h2>Card Shuffle with transition-group</h2>
  <CardShuffle class="center" />

  <hr />

  <h2>Component that uses Suspense</h2>
  <SuspenseDemo />

  <h2>Component that uses Teleport</h2>
  <Avatar id="pupper" />
  <SpeechBubble selector="#pupper" :visible="showSpeechBubble">
    Woof!
  </SpeechBubble>
  <button @click="showSpeechBubble = !showSpeechBubble">Speak!</button>
</template>

<script>
import Greeting from "./completed/Greeting";
import Avatar from "./completed/Avatar";
import CardShuffle from "./completed/CardShuffle";
import Loading from "./completed/Loading";
import SpeechBubble from "./completed/SpeechBubble";
import Stepper from "./completed/Stepper";
import StepperWithSlots from "./completed/StepperWithSlots";
import StepperWithValidation from "./completed/StepperWithValidation";
import SuspenseDemo from "./completed/SuspenseDemo";

export default {
  name: "App",
  data() {
    return { loading: true, showSpeechBubble: false, value: 0 };
  },
  components: {
    Avatar,
    SpeechBubble,
    CardShuffle,
    Greeting,
    Stepper,
    Loading,
    SuspenseDemo,
    StepperWithSlots,
    StepperWithValidation,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.center {
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
