(function (root) {
  const INVALID_BASE64_MESSAGE = '不是有效的 Base64 编码';

  function resolveInvalidBase64Message(options) {
    if (typeof options === 'string' && options.trim()) {
      return options;
    }

    if (
      options &&
      typeof options === 'object' &&
      typeof options.invalidBase64Message === 'string' &&
      options.invalidBase64Message.trim()
    ) {
      return options.invalidBase64Message;
    }

    return INVALID_BASE64_MESSAGE;
  }

  function cleanSelectionText(text) {
    return String(text || '').replace(/\s+/g, '');
  }

  function isStandardBase64(text) {
    if (!text || text.length % 4 !== 0) {
      return false;
    }

    if (text.includes('-') || text.includes('_')) {
      return false;
    }

    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(text);
  }

  function base64ToBytes(text) {
    const binary = root.atob(text);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  }

  function decodeUtf8(bytes) {
    return decodeBytes(bytes, 'utf-8', true);
  }

  function decodeBytes(bytes, encoding, fatal) {
    if (typeof root.TextDecoder === 'function') {
      return new root.TextDecoder(encoding, { fatal }).decode(bytes);
    }

    if (encoding !== 'utf-8') {
      throw new Error(`TextDecoder does not support ${encoding} in this environment.`);
    }

    let binary = '';
    for (let index = 0; index < bytes.length; index += 1) {
      binary += String.fromCharCode(bytes[index]);
    }

    return decodeURIComponent(escape(binary));
  }

  function scoreDecodedText(text) {
    let score = 0;

    for (const character of text) {
      const code = character.codePointAt(0);

      if (code >= 0x4e00 && code <= 0x9fff) {
        score += 4;
      } else if (code >= 0x3400 && code <= 0x4dbf) {
        score += 4;
      } else if (code >= 0x3000 && code <= 0x303f) {
        score += 3;
      } else if (code >= 0xff00 && code <= 0xffef) {
        score += 3;
      } else if (code >= 0x20 && code <= 0x7e) {
        score += 1;
      } else if (code === 0x0a || code === 0x0d || code === 0x09) {
        score += 1;
      } else if (code === 0xfffd || code < 0x20) {
        score -= 8;
      }
    }

    return score;
  }

  function decodeTextBytes(bytes) {
    try {
      return decodeUtf8(bytes);
    } catch (error) {
      const candidates = [];

      for (const encoding of ['gb18030', 'gbk', 'big5']) {
        try {
          const value = decodeBytes(bytes, encoding, false);
          candidates.push({
            value,
            score: scoreDecodedText(value),
          });
        } catch (candidateError) {
          // Some browsers may not expose every legacy decoder label.
        }
      }

      if (candidates.length === 0) {
        throw error;
      }

      candidates.sort((left, right) => right.score - left.score);
      return candidates[0].value;
    }
  }

  function decodeBase64Selection(selectionText, options) {
    const invalidBase64Message = resolveInvalidBase64Message(options);
    const cleanedText = cleanSelectionText(selectionText);

    if (!isStandardBase64(cleanedText)) {
      return {
        ok: false,
        error: invalidBase64Message,
      };
    }

    try {
      return {
        ok: true,
        value: decodeTextBytes(base64ToBytes(cleanedText)),
      };
    } catch (error) {
      return {
        ok: false,
        error: invalidBase64Message,
      };
    }
  }

  const api = {
    INVALID_BASE64_MESSAGE,
    cleanSelectionText,
    decodeBase64Selection,
    decodeTextBytes,
    isStandardBase64,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  root.Base64Decode = api;
})(typeof globalThis !== 'undefined' ? globalThis : self);
