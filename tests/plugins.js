/* eslint-env jest,node,jasmine */
import "@testing-library/jest-dom";
import { config } from "@vue/test-utils";

export const retry = (assertion, { interval = 20, timeout = 1000 } = {}) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const tryAgain = () => {
      setTimeout(async () => {
        try {
          resolve(await assertion());
        } catch (err) {
          Date.now() - startTime > timeout ? reject(err) : tryAgain();
        }
      }, interval);
    };

    tryAgain();
  });
};

/** Vue Test Utils Plugins
 * Methods returned from a plugin will wind up on the VueWrapper
 * or DOMWrapper depending on where you install it.
 */
const FindByPlugin = (wrapper) => {
  function findByTestId(selector) {
    const dataSelector = `[data-testid='${selector}']`;
    const foundWrapper = wrapper.find(dataSelector);
    if (foundWrapper) {
      return foundWrapper;
    }

    return null;
  }

  return {
    findByTestId
  };
};

const makeDOMTriggerPlugin = (events) => {
  const methods = {};
  const DOMTriggerPlugin = (wrapper) => {
    events.forEach((event) => {
      methods[event] = async () => wrapper.trigger(event);
    });
    return methods;
  };
  return DOMTriggerPlugin;
};

// Bubble up Vue Warnings and make them throw tests
export const globalMountConfig = {
  config: {
    errorHandler: (err, _, componentStack) => {
      fail(err + "\n" + componentStack);
    },
    warnHandler: (err, _, componentStack) => {
      fail(err + "\n" + componentStack);
    }
  }
};

export const setupMountConfig = () => {
  config.global = globalMountConfig;
  return config;
};

export const installPlugins = () => {
  config.plugins.VueWrapper.install(FindByPlugin);
  config.plugins.VueWrapper.install(makeDOMTriggerPlugin(["click"]));
  config.plugins.DOMWrapper.install(makeDOMTriggerPlugin(["click"]));
};
