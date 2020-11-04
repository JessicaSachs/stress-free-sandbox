/* eslint-env jest,node,jasmine */
import { setupMountConfig, installPlugins, retry } from "./plugins";

// Expose this for your tests
global.retry = retry;

installPlugins();

beforeEach(() => {
  document.body.innerHTML = "";
  jest.useRealTimers();
  setupMountConfig();
});
