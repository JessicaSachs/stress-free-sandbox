/* eslint-env jest */

import { mount } from "@vue/test-utils";
import SpeechBubble from "./SpeechBubble";

describe("SpeechBubble", () => {
  it("renders the default slot inside of the element matching the selector", () => {
    const target = document.createElement("div");
    target.setAttribute("id", "speech-bubble-target");
    document.body.appendChild(target);

    const wrapper = mount(SpeechBubble, {
      propsData: {
        selector: "#speech-bubble-target",
        visible: true
      },
      slots: {
        default: "Woof!"
      }
    });

    // this is empty! The HTML was teleported to the target
    // console.log(wrapper.html());

    // This will return an empty DOMWrapper, it cannot find the blockquote. You need to go through the target
    wrapper.find("blockquote");

    // https://github.com/testing-library/jest-dom#tohavetextcontent
    expect(target).toHaveTextContent("Woof!");
  });
});
