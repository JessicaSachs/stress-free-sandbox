/* eslint-env jest */ // required for CodeSandbox only
import { mount, config as appConfig } from "@vue/test-utils";
import Greeting from "./Greeting";

xdescribe("Greeting", () => {
  it("exists after mounting", () => {
    // Wrapper documentation: https://vue-test-utils.vuejs.org/v2/api/#wrapper-methods

    const wrapper = mount(Greeting);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders the message prop if it's passed in", () => {
    const message = "Welcome to Stress-free Testing in Vue 3";
    const wrapper = mount(Greeting, { props: { message } });
    expect(wrapper.find("[data-testid=title]").text()).toContain(message);
  });
});
