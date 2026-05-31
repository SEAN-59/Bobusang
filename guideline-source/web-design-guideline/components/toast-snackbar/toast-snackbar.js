(() => {
  const TOAST_LIMIT = 4;
  const TOAST_EXIT_MS = 240;
  const toastQueue = [];
  let toastQueueLocked = false;

  function ensureToastContainer() {
    let container = document.getElementById('toastContainer');
    if (container) return container;

    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toastContainer';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
    return container;
  }

  function showToast(type, title, msg) {
    const container = ensureToastContainer();
    toastQueue.push({ type, title, msg });
    processToastQueue(container);
  }

  function processToastQueue(container) {
    if (toastQueueLocked || toastQueue.length === 0) return;

    const currentCount = container.querySelectorAll('.toast').length;
    if (currentCount >= TOAST_LIMIT) {
      const oldest = container.querySelector('.toast:not(.removing)');
      if (!oldest) return;

      toastQueueLocked = true;
      removeToast(oldest, () => {
        toastQueueLocked = false;
        processToastQueue(container);
      });
      return;
    }

    const next = toastQueue.shift();
    appendToast(container, next.type, next.title, next.msg);
    processToastQueue(container);
  }

  function appendToast(container, type, title, msg) {
    const icons = { success: '✓', warning: '!', danger: '✕', info: 'i' };
    const beforeRects = getToastRects(container);
    const toast = document.createElement('div');
    toast.className = 'toast toast-entering';
    toast.innerHTML = '<div class="toast-icon ' + type + '">' + (icons[type] || '') + '</div>'
      + '<div class="toast-content"><div class="toast-title">' + title + '</div>'
      + '<div class="toast-msg">' + msg + '</div></div>'
      + '<button class="toast-close" onclick="removeToast(this)" aria-label="토스트 닫기">✕</button>';

    container.appendChild(toast);
    toast.addEventListener('animationend', () => toast.classList.remove('toast-entering'), { once:true });
    animateToastStack(container, beforeRects);
    toast.__toastTimer = setTimeout(() => removeToast(toast), 4000);
  }

  function getToastRects(container) {
    const rects = new Map();
    container.querySelectorAll('.toast:not(.removing)').forEach(toast => {
      rects.set(toast, toast.getBoundingClientRect());
    });
    return rects;
  }

  function animateToastStack(container, beforeRects) {
    requestAnimationFrame(() => {
      container.querySelectorAll('.toast:not(.removing)').forEach(toast => {
        const before = beforeRects.get(toast);
        if (!before) return;

        const after = toast.getBoundingClientRect();
        const deltaX = before.left - after.left;
        const deltaY = before.top - after.top;
        if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;

        toast.style.transition = 'none';
        toast.style.transform = 'translate(' + deltaX + 'px,' + deltaY + 'px)';
        toast.getBoundingClientRect();

        requestAnimationFrame(() => {
          toast.style.transition = '';
          toast.style.transform = '';
        });
      });
    });
  }

  function removeToast(button, onRemoved) {
    const toast = button && button.closest ? button.closest('.toast') : button;
    if (!toast || toast.classList.contains('removing')) return;

    const container = toast.parentElement;
    clearTimeout(toast.__toastTimer);
    toast.classList.add('removing');
    setTimeout(() => {
      const beforeRects = getToastRects(container);
      toast.remove();
      animateToastStack(container, beforeRects);
      if (typeof onRemoved === 'function') {
        onRemoved();
      } else if (toastQueue.length > 0) {
        processToastQueue(container);
      }
    }, TOAST_EXIT_MS);
  }

  window.showToast = window.showToast || showToast;
  window.removeToast = window.removeToast || removeToast;
})();
