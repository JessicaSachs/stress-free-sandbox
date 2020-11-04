/* eslint-env jest */
/* globals retry */
import Loading from "./Loading";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

describe("Loading", () => {
  it("requires the loading property", () => {
    const wrapper = mount(Loading);
    expect(wrapper.html()).not.toContain("Loading");
  });

  it("it shows loading text when it's loading", () => {
    const wrapper = mount(Loading, { propsData: { loading: true } });
    expect(wrapper.html()).toContain("Loading");
  });

  it("it shows the passed in slot when it is not loading", async () => {
    let loading = ref(true);

    const wrapper = mount(Loading, {
      propsData: { loading },
      slots: {
        default: "<p>Ready!</p>"
      }
    });

    loading.value = false;

    await retry(() => {
      const html = wrapper.html();

      expect(html).toContain("Ready!");
    });
  });
});
