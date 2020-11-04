/* eslint-env jest */
/* globals retry */

import { mount } from "@vue/test-utils";
import SuspenseDemo from "./SuspenseDemo";

describe("SuspenseDemo", () => {
  it("renders the loading content", () => {
    jest.useFakeTimers();
    const wrapper = mount(SuspenseDemo);
    expect(wrapper.html()).toContain("Loading");
    jest.runTimersToTime(1500);
    retry(() => expect(wrapper.html()).toContain("Hello World"));
  });
});
