/* eslint-env jest */
/* global retry */
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Stepper from "./Stepper";
import StepperWithVModel from "./StepperWithValidation";
import StepperWithSlots from "./StepperWithSlots";

describe("Stepper", () => {
  it("renders with a default value of 0", () => {
    const wrapper = mount(Stepper);
    expect(wrapper.text()).toContain(0);
  });

  it("updates the count when the increment or decrement buttons are used", async () => {
    const wrapper = mount(Stepper);
    wrapper.find("[data-testid=increment]").trigger("click");
    await retry(() => expect(wrapper.text()).toContain(1));

    const incrementButton = wrapper.find("[data-testid=increment]");
    incrementButton.trigger("click");
    await nextTick();
    expect(wrapper.text()).toContain(2);

    await wrapper.findByTestId("decrement").click();
    expect(wrapper.text()).toContain(1);
  });

  it("demonstrates all the ways to click and trigger native DOM events", async () => {
    const wrapper = mount(Stepper);

    // Verbose
    const incrementButton = wrapper.find("[data-testid=increment]");
    incrementButton.trigger("click");
    await nextTick();
    expect(wrapper.text()).toContain(1);

    // Using await on click -- only SOME events can be awaited
    const incrementButton2 = wrapper.find("[data-testid=increment]");
    await incrementButton2.trigger("click");
    expect(wrapper.text()).toContain(2);

    // Using await on click, but with chaining
    await wrapper.find("[data-testid=increment]").trigger("click");
    expect(wrapper.text()).toContain(3);

    // Using the helpers and plugins from component-helpers.js
    await wrapper.findByTestId("increment").click();
    expect(wrapper.text()).toContain(4);

    // Showing off the retry method, good for any event that cannot be awaited normally. We'll come back to this.
    wrapper.findByTestId("decrement").click();
    // For methods that cannot be awaited in the VTU API
    await retry(() => expect(wrapper.text()).toContain(3));
  });

  it("cannot go below 0", async () => {
    const wrapper = mount(Stepper);
    wrapper.findByTestId("decrement").trigger("click");
    expect(wrapper.text()).toContain(0);
  });

  // Broken, fix this test -- try *all* of the methods outlined above if your tests are failing
  it("emits a change event with the new value", async () => {
    const wrapper = mount(Stepper);

    await wrapper.findByTestId("increment").click();

    await retry(() => expect(wrapper.emitted("update:value")).toHaveLength(1));
    await retry(() => expect(wrapper.emitted("update:value")[0]).toEqual([1]));
  });

  // You can refactor your tests so that they don't depend on the DOM output
  // Caution: This will make your tests more brittle -- you can consider this an implementation detail or a code smell.
  // However, we don't always have the flexibility to make our code "perfect" so this is an easy workaround.
  it("has an internal value of 0 by default", () => {
    expect(mount(Stepper).vm.value).toEqual(0);
  });
});

describe("StepperWithSlots", () => {
  it("renders the default slots", () => {
    expect(mount(Stepper).text()).toContain(0);
  });

  it("allows the parent to inject custom slots", () => {
    const wrapper = mount(StepperWithSlots, {
      slots: {
        default() {
          return "The Value";
        }
      }
    });
    expect(wrapper.text()).toContain("The Value");
  });

  it("passes the value up to the parent", () => {
    const wrapper = mount(StepperWithSlots, {
      slots: {
        default({ value }) {
          return `<h1>$# ${value}</h1>`;
        }
      }
    });

    expect(wrapper.text()).toContain("# 0");
  });
});

describe("listeners in for testing Vue 3", () => {
  it("can be supported by wrapping the subject under test", async () => {
    const valueSpy = jest.fn();
    const incrementWrapper = mount({
      template: `<StepperWithVModel v-model:value.plural="value"/>`,
      data: () => ({ value: 0 }),
      components: { StepperWithVModel },
      watch: { value: valueSpy }
    }).findByTestId("increment");

    await incrementWrapper.click();

    expect(valueSpy.mock.calls[0][0]).toEqual(1);
  });
});

describe("StepperWithVModel", () => {
  it("will not emit events for negative numbers", async () => {
    const wrapper = mount(StepperWithVModel, {
      propsData: {
        value: 0
      }
    });

    await wrapper.findByTestId("increment").click();

    await retry(() => expect(wrapper.emitted("update:value")[0]).toEqual([1]));
  });

  it("pluralizes", async () => {
    const wrapper = mount({
      template: `<StepperWithVModel v-model:value.plural="value"/>`,
      data: () => ({ value: 0 }),
      components: { StepperWithVModel }
    }).findComponent(StepperWithVModel);

    expect(wrapper.text()).toContain("0 items");

    const incrementButton = wrapper.findByTestId("increment");

    incrementButton.click();

    await retry(() => expect(wrapper.text()).toContain("1 item"));

    incrementButton.click();

    await retry(() => expect(wrapper.text()).toContain("2 items"));
  });
});
