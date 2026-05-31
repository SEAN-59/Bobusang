function showButtonAction(label) {
  const message = label + ' 버튼을 눌렀습니다.';
  if (typeof showToast === 'function' && document.getElementById('toastContainer')) {
    showToast('info', '버튼 클릭', message);
    return;
  }
  console.info(message);
}

function blockLoadingButtonAction(event) {
  const target = event.target;
  if (!target || !target.closest) return;
  const button = target.closest('.btn.is-loading, .btn[aria-busy="true"]');
  if (!button) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}

if (!window.__buttonLoadingGuardReady) {
  document.addEventListener('click', blockLoadingButtonAction, true);
  window.__buttonLoadingGuardReady = true;
}

window.showButtonAction = showButtonAction;
