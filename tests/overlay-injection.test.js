const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

function createFakeElement(tagName) {
  return {
    tagName,
    id: '',
    style: {},
    children: [],
    textContent: '',
    disabled: false,
    type: '',
    removeCalled: false,
    setAttribute(name, value) {
      this[name] = value;
    },
    append(...children) {
      this.children.push(...children);
    },
    addEventListener() {},
    contains(target) {
      return target === this || this.children.includes(target);
    },
    getBoundingClientRect() {
      return {
        width: 240,
        height: 120,
      };
    },
    remove() {
      this.removeCalled = true;
    },
  };
}

test('overlay injection function runs without service worker helper scope', () => {
  const backgroundSource = fs.readFileSync('background.js', 'utf8');
  const serviceWorkerContext = {
    console,
    importScripts() {},
    Base64Decode: {
      decodeBase64Selection() {
        return {
          ok: true,
          value: 'Hello World',
        };
      },
    },
    chrome: {
      i18n: {
        getMessage(key) {
          const map = {
            contextMenuDecode: 'Decode Base64',
            invalidBase64Message: 'Invalid Base64 input',
            overlayAriaLabel: 'Base64 decode result',
            copyButton: 'Copy',
            closeButton: 'Close',
            copiedStatus: 'Copied',
            copyFailedStatus: 'Copy failed',
          };
          return map[key] || '';
        },
      },
      runtime: {
        onInstalled: { addListener() {} },
        onStartup: { addListener() {} },
      },
      contextMenus: {
        create() {},
        removeAll(callback) {
          callback();
        },
        onClicked: { addListener() {} },
      },
      scripting: {
        executeScript() {},
      },
    },
  };

  vm.runInNewContext(backgroundSource, serviceWorkerContext);

  const injectedSource = `(${serviceWorkerContext.showBase64DecodeOverlay.toString()})({
    text: 'Hello World',
    canCopy: true
  });`;
  const appended = [];
  const documentElement = {
    append(element) {
      appended.push(element);
    },
  };
  const pageContext = {
    document: {
      documentElement,
      getElementById() {
        return null;
      },
      createElement: createFakeElement,
    },
    navigator: {
      clipboard: {
        writeText() {
          return Promise.resolve();
        },
      },
    },
    window: {
      innerWidth: 1024,
      innerHeight: 768,
      setTimeout() {},
      getSelection() {
        return {
          rangeCount: 1,
          getRangeAt() {
            return {
              getBoundingClientRect() {
                return {
                  left: 100,
                  top: 120,
                  bottom: 140,
                  width: 80,
                  height: 20,
                };
              },
            };
          },
        };
      },
    },
  };

  assert.doesNotThrow(() => {
    vm.runInNewContext(injectedSource, pageContext);
  });
  assert.equal(appended.length, 1);
  assert.equal(appended[0].id, 'base64decode-overlay');
});

test('overlay closes when clicking outside it', () => {
  const backgroundSource = fs.readFileSync('background.js', 'utf8');
  const serviceWorkerContext = {
    console,
    importScripts() {},
    Base64Decode: {
      decodeBase64Selection() {
        return {
          ok: true,
          value: 'Hello World',
        };
      },
    },
    chrome: {
      i18n: {
        getMessage(key) {
          const map = {
            contextMenuDecode: 'Decode Base64',
            invalidBase64Message: 'Invalid Base64 input',
            overlayAriaLabel: 'Base64 decode result',
            copyButton: 'Copy',
            closeButton: 'Close',
            copiedStatus: 'Copied',
            copyFailedStatus: 'Copy failed',
          };
          return map[key] || '';
        },
      },
      runtime: {
        onInstalled: { addListener() {} },
        onStartup: { addListener() {} },
      },
      contextMenus: {
        create() {},
        removeAll(callback) {
          callback();
        },
        onClicked: { addListener() {} },
      },
      scripting: {
        executeScript() {},
      },
    },
  };

  vm.runInNewContext(backgroundSource, serviceWorkerContext);

  const injectedSource = `(${serviceWorkerContext.showBase64DecodeOverlay.toString()})({
    text: 'Hello World',
    canCopy: true
  });`;
  const listeners = {};
  const appended = [];
  const documentElement = {
    append(element) {
      appended.push(element);
    },
  };
  const pageContext = {
    document: {
      documentElement,
      getElementById() {
        return null;
      },
      createElement: createFakeElement,
      addEventListener(type, listener) {
        listeners[type] = listener;
      },
      removeEventListener(type) {
        delete listeners[type];
      },
    },
    navigator: {
      clipboard: {
        writeText() {
          return Promise.resolve();
        },
      },
    },
    window: {
      innerWidth: 1024,
      innerHeight: 768,
      setTimeout(callback) {
        callback();
      },
      getSelection() {
        return {
          rangeCount: 1,
          getRangeAt() {
            return {
              getBoundingClientRect() {
                return {
                  left: 100,
                  top: 120,
                  bottom: 140,
                  width: 80,
                  height: 20,
                };
              },
            };
          },
        };
      },
    },
  };

  vm.runInNewContext(injectedSource, pageContext);

  assert.equal(typeof listeners.mousedown, 'function');
  listeners.mousedown({ target: createFakeElement('main') });
  assert.equal(appended[0].removeCalled, true);
});
