const assert = require('node:assert/strict');
const test = require('node:test');
const { decodeBase64Selection } = require('../base64');

test('decodes standard Base64 text', () => {
  const result = decodeBase64Selection('SGVsbG8gV29ybGQ=');

  assert.deepEqual(result, {
    ok: true,
    value: 'Hello World',
  });
});

test('ignores embedded whitespace before validating', () => {
  const result = decodeBase64Selection('SGVs\nbG8g V29y\tbGQ=');

  assert.equal(result.ok, true);
  assert.equal(result.value, 'Hello World');
});

test('decodes UTF-8 text', () => {
  const result = decodeBase64Selection('5L2g5aW977yM5LiW55WM');

  assert.deepEqual(result, {
    ok: true,
    value: '你好，世界',
  });
});

test('decodes mixed Chinese and ASCII UTF-8 text with punctuation', () => {
  const result = decodeBase64Selection('5L2g5aW977yM5LiW55WM77yBSGVsbG8gV29ybGQh');

  assert.deepEqual(result, {
    ok: true,
    value: '你好，世界！Hello World!',
  });
});

test('does not rewrite valid UTF-8 bytes into a different sentence', () => {
  const result = decodeBase64Selection('5L2g5aW977yM5LiW5JqW77yHSGVsbG9Xb3JsZCE=');

  assert.deepEqual(result, {
    ok: true,
    value: '你好，世䚖＇HelloWorld!',
  });
});

test('decodes GBK Chinese text when UTF-8 decoding fails', () => {
  const result = decodeBase64Selection('xOO6w6OsysC95w==');

  assert.deepEqual(result, {
    ok: true,
    value: '你好，世界',
  });
});

test('decodes Big5 Chinese text when UTF-8 decoding fails', () => {
  const result = decodeBase64Selection('p0GmbqFBpUCsyQ==');

  assert.deepEqual(result, {
    ok: true,
    value: '你好，世界',
  });
});

test('rejects URL-safe Base64 characters', () => {
  const result = decodeBase64Selection('SGVsbG8-');

  assert.deepEqual(result, {
    ok: false,
    error: '不是有效的 Base64 编码',
  });
});

test('rejects invalid padding', () => {
  const result = decodeBase64Selection('SGV=sbG8=');

  assert.deepEqual(result, {
    ok: false,
    error: '不是有效的 Base64 编码',
  });
});

test('rejects text whose length is not a valid Base64 length', () => {
  const result = decodeBase64Selection('abcde');

  assert.deepEqual(result, {
    ok: false,
    error: '不是有效的 Base64 编码',
  });
});
