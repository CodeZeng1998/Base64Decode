try {
  importScripts('base64.js');
} catch (error) {
  console.error('Failed to load Base64 helpers.', error);
}

const MENU_ID = 'base64decode-decode-selection';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: '解码 Base64',
    contexts: ['selection'],
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: '解码 Base64',
      contexts: ['selection'],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab || !tab.id) {
    return;
  }

  const result = Base64Decode.decodeBase64Selection(info.selectionText || '');
  const message = result.ok ? result.value : result.error;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: showBase64DecodeOverlay,
    args: [
      {
        text: message,
        canCopy: result.ok,
      },
    ],
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Failed to inject Base64 decode overlay.', chrome.runtime.lastError);
    }
  });
});

function showBase64DecodeOverlay(payload) {
  function getOverlayPosition(targetOverlay) {
    const margin = 12;
    const selection = window.getSelection();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let rect = null;

    if (selection && selection.rangeCount > 0) {
      const rangeRect = selection.getRangeAt(0).getBoundingClientRect();

      if (rangeRect && (rangeRect.width > 0 || rangeRect.height > 0)) {
        rect = rangeRect;
      }
    }

    const overlayRect = targetOverlay.getBoundingClientRect();
    const defaultLeft = Math.max(margin, (viewportWidth - overlayRect.width) / 2);
    const defaultTop = Math.max(margin, (viewportHeight - overlayRect.height) / 2);

    if (!rect) {
      return {
        left: defaultLeft,
        top: defaultTop,
      };
    }

    let left = rect.left;
    let top = rect.bottom + 8;

    if (left + overlayRect.width > viewportWidth - margin) {
      left = viewportWidth - overlayRect.width - margin;
    }

    if (left < margin) {
      left = margin;
    }

    if (top + overlayRect.height > viewportHeight - margin) {
      top = rect.top - overlayRect.height - 8;
    }

    if (top < margin) {
      top = Math.min(defaultTop, viewportHeight - overlayRect.height - margin);
    }

    return {
      left: Math.max(margin, left),
      top: Math.max(margin, top),
    };
  }

  const EXISTING_ID = 'base64decode-overlay';
  const existingOverlay = document.getElementById(EXISTING_ID);

  if (existingOverlay) {
    existingOverlay.remove();
  }

  const overlay = document.createElement('div');
  const textArea = document.createElement('pre');
  const actions = document.createElement('div');
  const copyButton = document.createElement('button');
  const closeButton = document.createElement('button');
  const status = document.createElement('span');

  overlay.id = EXISTING_ID;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Base64 解码结果');

  Object.assign(overlay.style, {
    position: 'fixed',
    zIndex: '2147483647',
    boxSizing: 'border-box',
    width: 'min(420px, calc(100vw - 24px))',
    maxHeight: 'min(360px, calc(100vh - 24px))',
    padding: '14px',
    border: '1px solid rgba(15, 23, 42, 0.16)',
    borderRadius: '8px',
    background: '#ffffff',
    color: '#111827',
    boxShadow: '0 18px 48px rgba(15, 23, 42, 0.22)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
  });

  Object.assign(textArea.style, {
    boxSizing: 'border-box',
    maxHeight: '240px',
    margin: '0 0 12px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    color: '#111827',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
    fontSize: '13px',
    lineHeight: '1.5',
  });

  Object.assign(actions.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  const buttonStyle = {
    boxSizing: 'border-box',
    minHeight: '32px',
    padding: '5px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(15, 23, 42, 0.18)',
    background: '#f8fafc',
    color: '#111827',
    cursor: 'pointer',
    font: 'inherit',
  };

  Object.assign(copyButton.style, buttonStyle, {
    background: '#2563eb',
    borderColor: '#2563eb',
    color: '#ffffff',
  });

  Object.assign(closeButton.style, buttonStyle, {
    marginLeft: 'auto',
  });

  Object.assign(status.style, {
    color: '#047857',
    minWidth: '48px',
  });

  textArea.textContent = payload.text;
  copyButton.type = 'button';
  copyButton.textContent = '复制到剪贴板';
  closeButton.type = 'button';
  closeButton.textContent = '关闭';

  if (!payload.canCopy) {
    copyButton.disabled = true;
    Object.assign(copyButton.style, {
      opacity: '0.54',
      cursor: 'not-allowed',
    });
  }

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(payload.text);
      status.textContent = '已复制';
      window.setTimeout(() => {
        status.textContent = '';
      }, 1600);
    } catch (error) {
      status.style.color = '#b91c1c';
      status.textContent = '复制失败';
    }
  });

  function closeOverlay() {
    document.removeEventListener('mousedown', handleOutsidePointerDown, true);
    overlay.remove();
  }

  function handleOutsidePointerDown(event) {
    if (!overlay.contains(event.target)) {
      closeOverlay();
    }
  }

  closeButton.addEventListener('click', () => {
    closeOverlay();
  });

  actions.append(copyButton, status, closeButton);
  overlay.append(textArea, actions);
  document.documentElement.append(overlay);

  const position = getOverlayPosition(overlay);
  overlay.style.left = `${position.left}px`;
  overlay.style.top = `${position.top}px`;

  window.setTimeout(() => {
    document.addEventListener('mousedown', handleOutsidePointerDown, true);
  }, 0);
}
