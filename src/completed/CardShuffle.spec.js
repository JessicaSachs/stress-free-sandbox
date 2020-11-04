/* eslint-env jest */
/* globals retry */
import { mount } from "@vue/test-utils";
import CardShuffle from "./CardShuffle";

describe("CardShuffle", () => {
  it("reorders the cards when the shuffle button is clicked", async () => {
    const wrapper = mount(CardShuffle, {
      propsData: {
        initialItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

        // Demonstrating how to take randomness out of the equation
        onShuffle(items) {
          return [items[1], items[0], ...items.slice(2)];
        }
      }
    });

    wrapper.find("button").click();

    await retry(() => {
      const cards = wrapper.findAll(".card");
      const text = cards.map((c) => c.text()).join("");

      expect(text).toEqual("21345678910");
    });
  });
});
