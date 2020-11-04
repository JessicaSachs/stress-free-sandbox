<template>
  <div>
    <teleport :to="selector">
      <blockquote
        data-testid="teleported"
        class="speech bubble"
        :style="`opacity: ${visible ? 1 : 0}`"
      >
        <slot></slot>
      </blockquote>
    </teleport>
  </div>
</template>

<script>
// Example borrowed from https://codepen.io/dudleystorey/pen/wMLBLK
export default {
  // components: { Portal },
  props: {
    selector: { type: String, required: true },
    visible: { type: Boolean, required: false, default: true },
  },
};
</script>

<style>
@font-face {
  font-family: "SequentialistBB";
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_1_0.woff2")
      format("woff2"),
    url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff")
      format("woff");
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: "SequentialistBB";
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff2")
      format("woff2"),
    url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff")
      format("woff");
  font-style: italic;
  font-weight: 400;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
  font-family: SequentialistBB, cursive;
  font-size: 2rem;
}

blockquote.bubble {
  background-position: center;
  background-repeat: no-repeat !important;
  background-size: 100% 100%;
  margin: 0 auto;
  text-align: center;
  height: 0;
  box-sizing: content-box;
  line-height: 1;
}
blockquote.speech {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/speech-bubble.svg);
  /* width: 25%; */
  padding-top: 6%;
  /* padding-bottom: 20%; */
  position: absolute;
  top: calc(-1 * (150px / 2));
  right: calc(-1 * (150px / 4));
  /* width: min-content; */
  height: 150px;
  display: block;
  padding: 12% 10% 0%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
blockquote.whisper {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/whisper.svg);
  width: 25%;
  font-size: 2vw;
  color: #ccc;
  font-style: italic;
  padding: 6% 5% 15%;
}
blockquote.electric {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/electric.svg);
  width: 25%;
  font-size: 2.4vw;
  font-style: italic;
  padding: 4% 6% 12% 0%;
}
blockquote.electric span {
  display: block;
  font-size: 3vw;
  font-weight: bold;
}
</style>
