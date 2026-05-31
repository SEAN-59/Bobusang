/* ============================================================
   내부 유틸 함수 (function 선언 → 호이스팅으로 어디서든 참조 가능)
   ============================================================ */

// Validation rules
const emailRules = {
  'email-format': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
};
const pwRules = {
  'pw-length':  v => v.length >= 8,
  'pw-upper':   v => /[A-Z]/.test(v),
  'pw-lower':   v => /[a-z]/.test(v),
  'pw-number':  v => /[0-9]/.test(v),
  'pw-special': v => /[!@#$%^&*]/.test(v)
};

function allRulesPass(rules, value) {
  return Object.values(rules).every(fn => fn(value));
}

function updateRules(inputEl, rules, listId) {
  const val = inputEl.value;
  const hasInput = val.length > 0;
  Object.entries(rules).forEach(([ruleKey, fn]) => {
    const li = document.querySelector('#' + listId + ' [data-rule="' + ruleKey + '"]');
    if (!li) return;
    if (!hasInput) {
      li.classList.remove('pass', 'fail');
    } else if (fn(val)) {
      li.classList.remove('fail'); li.classList.add('pass');
    } else {
      li.classList.remove('pass'); li.classList.add('fail');
    }
  });
}

function forceFailRules(listId) {
  document.querySelectorAll('#' + listId + ' .validation-rule').forEach(li => {
    li.classList.remove('pass'); li.classList.add('fail');
  });
}

function showFieldError(input, msgEl, message) {
  input.classList.add('is-error');
  msgEl.textContent = message;
  msgEl.style.display = 'block';
  // shake: 클래스 제거 후 다음 프레임에 추가해야 재트리거됨
  input.classList.remove('shake');
  void input.offsetWidth; // reflow 강제
  input.classList.add('shake');
  input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
}

function clearFieldError(input, msgEl) {
  if (!input || !msgEl) return;
  input.classList.remove('is-error');
  msgEl.style.display = 'none';
}

function submitDemo() {
  const nameInput = document.getElementById('demo-name');
  const emailEl   = document.getElementById('demo-email');
  const pwEl      = document.getElementById('demo-pw');
  const nameErr   = document.getElementById('demo-name-err');
  const emailErr  = document.getElementById('demo-email-err');
  const pwErr     = document.getElementById('demo-pw-err');

  // 체크리스트 강제 업데이트 (빈 값 포함)
  if (emailEl.value.length > 0) updateRules(emailEl, emailRules, 'email-rules');
  else forceFailRules('email-rules');
  if (pwEl.value.length > 0) updateRules(pwEl, pwRules, 'pw-rules');
  else forceFailRules('pw-rules');

  const fields = [
    { input: nameInput, msgEl: nameErr,  ok: nameInput.value.trim().length > 0,        msg: '이름을 입력해주세요.' },
    { input: emailEl,   msgEl: emailErr, ok: allRulesPass(emailRules, emailEl.value),   msg: '올바른 이메일 형식을 입력해주세요.' },
    { input: pwEl,      msgEl: pwErr,    ok: allRulesPass(pwRules, pwEl.value),         msg: '아래 조건을 모두 충족해주세요.' }
  ];

  let firstError = null;
  fields.forEach(({ input, msgEl, ok, msg }) => {
    if (!ok) {
      showFieldError(input, msgEl, msg);
      if (!firstError) firstError = input;
    } else {
      clearFieldError(input, msgEl);
    }
  });

  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError.focus();
    return;
  }

  // 성공
  showToast('success', '가입 완료', '회원가입이 완료되었습니다.');
  [nameInput, emailEl, pwEl].forEach(el => {
    el.value = '';
    clearFieldError(el, document.getElementById(el.id + '-err'));
  });
  document.querySelectorAll('.validation-rule').forEach(li => li.classList.remove('pass', 'fail'));
}

const TOAST_LIMIT = 4;
const TOAST_EXIT_MS = 240;
const toastQueue = [];
let toastQueueLocked = false;

function showToast(type, title, msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

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
  const t = document.createElement('div');
  t.className = 'toast toast-entering';
  t.innerHTML = '<div class="toast-icon ' + type + '">' + (icons[type]||'') + '</div>'
    + '<div class="toast-content"><div class="toast-title">' + title + '</div>'
    + '<div class="toast-msg">' + msg + '</div></div>'
    + '<button class="toast-close" onclick="removeToast(this)" aria-label="토스트 닫기">✕</button>';
  container.appendChild(t);
  t.addEventListener('animationend', () => t.classList.remove('toast-entering'), { once:true });
  animateToastStack(container, beforeRects);
  t.__toastTimer = setTimeout(() => removeToast(t), 4000);
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

function removeToast(btn, onRemoved) {
  const t = btn && btn.closest ? btn.closest('.toast') : btn;
  if (!t || t.classList.contains('removing')) return;

  const container = t.parentElement;
  clearTimeout(t.__toastTimer);
  t.classList.add('removing');
  setTimeout(() => {
    const beforeRects = getToastRects(container);
    t.remove();
    animateToastStack(container, beforeRects);
    if (typeof onRemoved === 'function') {
      onRemoved();
    } else if (toastQueue.length > 0) {
      processToastQueue(container);
    }
  }, TOAST_EXIT_MS);
}

function showButtonAction(label) {
  const message = label + ' 버튼을 눌렀습니다.';
  if (document.getElementById('toastContainer')) {
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

function updateCharCount() {
  const ta = document.getElementById('charTextarea');
  const count = document.getElementById('charCount');
  if (!ta || !count) return;
  const len = ta.value.length;
  count.textContent = len + ' / 200';
  count.style.color = len > 180 ? 'var(--color-danger)' : len > 150 ? 'var(--color-warning)' : 'var(--color-text-muted)';
}

function togglePw() {
  const pw = document.getElementById('pwInput');
  const icon = document.getElementById('pw-eye');
  if (!pw) return;
  const isHidden = pw.type === 'password';
  pw.type = isHidden ? 'text' : 'password';
  if (icon) {
    icon.innerHTML = isHidden
      ? '<path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="currentColor" stroke-width="1.4"/><line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
      : '<path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.4"/>';
  }
}

function toggleDemoPw() {
  const pw = document.getElementById('demo-pw');
  if (!pw) return;
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

function handleFileSelect(input) {
  const list = document.getElementById('fileList');
  if (!list) return;
  list.innerHTML = '';
  Array.from(input.files).forEach(f => {
    const size = f.size < 1024*1024
      ? (f.size/1024).toFixed(1) + 'KB'
      : (f.size/1024/1024).toFixed(1) + 'MB';
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = '<span style="font-size:14px">📄</span>'
      + '<span class="file-item-name">' + f.name + '</span>'
      + '<span class="file-item-size">' + size + '</span>'
      + '<button class="file-item-remove" onclick="this.closest(\'.file-item\').remove()">✕</button>';
    list.appendChild(item);
  });
}

function switchTabSlide(tabsId, idx) {
  const container = document.getElementById(tabsId);
  if (!container) return;
  container.querySelectorAll('.tab-item').forEach((t,i) => t.classList.toggle('active', i===idx));
  container.querySelectorAll('.tab-panel').forEach((p,i) => p.classList.toggle('active', i===idx));
  // 슬라이딩 인디케이터 위치 업데이트
  const indicator = document.getElementById(tabsId + '-indicator');
  const active    = container.querySelector('.tab-item.active');
  const list      = container.querySelector('.tabs-list');
  if (indicator && active && list) {
    const listRect   = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    indicator.style.left  = (activeRect.left - listRect.left) + 'px';
    indicator.style.width = activeRect.width + 'px';
  }
}

function switchTabV(tabsId, idx) {
  const container = document.getElementById(tabsId);
  if (!container) return;
  container.querySelectorAll('.tab-v-item').forEach((t,i) => t.classList.toggle('active', i===idx));
  container.querySelectorAll('.tab-v-panel').forEach((p,i) => p.classList.toggle('active', i===idx));
  // 수직 슬라이딩 인디케이터
  const indicator = document.getElementById(tabsId + '-indicator');
  const active    = container.querySelector('.tab-v-item.active');
  const list      = container.querySelector('.tabs-vertical-list');
  if (indicator && active && list) {
    const listRect   = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    indicator.style.top    = (activeRect.top - listRect.top) + 'px';
    indicator.style.height = activeRect.height + 'px';
  }
}

window.switchTabSlide = switchTabSlide;
window.switchTabV     = switchTabV;

// 슬라이딩 탭 초기 위치
setTimeout(() => {
  ['tabs1','tabs2'].forEach(id => switchTabSlide(id, 0));
  switchTabV('tabs3', 0);
}, 0);

function switchTab(tabsId, idx) {
  const container = document.getElementById(tabsId);
  if (!container) return;
  container.querySelectorAll('.tab-item').forEach((t, i) => t.classList.toggle('active', i === idx));
  container.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
}

function closeDropdowns() {
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.custom-select-btn.is-open, .table-title-menu.is-open').forEach(btn => {
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  });
}

function getDropdownItems(menu) {
  return Array.from(menu.querySelectorAll('.dropdown-item:not(:disabled)'));
}

function getDropdownForTrigger(trigger) {
  if (!trigger) return null;
  if (trigger.id && trigger.id.endsWith('-btn')) {
    const menu = document.getElementById(trigger.id.slice(0, -4));
    if (menu && menu.classList.contains('dropdown-menu')) return menu;
  }
  if (trigger.nextElementSibling && trigger.nextElementSibling.classList.contains('dropdown-menu')) {
    return trigger.nextElementSibling;
  }
  return Array.from(document.querySelectorAll('.dropdown-menu'))
    .find(menu => menu.__dropdownTrigger === trigger) || null;
}

function focusDropdownItem(menu, placement) {
  const items = getDropdownItems(menu);
  if (!items.length) return;
  if (placement === 'last') {
    items[items.length - 1].focus();
    return;
  }
  items[0].focus();
}

function positionDropdown(menu, trigger) {
  const margin = 8;
  const rect = trigger.getBoundingClientRect();
  const widthMode = menu.dataset.dropdownWidthMode
    || (menu.style.width === '100%' ? 'trigger' : 'min');

  menu.dataset.dropdownWidthMode = widthMode;

  if (menu.parentElement !== document.body) {
    document.body.appendChild(menu);
  }

  const availableWidth = Math.max(120, window.innerWidth - margin * 2);
  const desiredWidth = widthMode === 'trigger'
    ? rect.width
    : Math.max(rect.width, 180);
  const menuWidth = Math.min(desiredWidth, availableWidth);
  const preferredLeft = rect.left + rect.width / 2 - menuWidth / 2;
  const maxLeft = Math.max(margin, window.innerWidth - menuWidth - margin);
  const left = Math.min(Math.max(preferredLeft, margin), maxLeft);

  menu.style.width = menuWidth + 'px';
  menu.style.left = left + 'px';
  menu.style.maxHeight = Math.max(120, window.innerHeight - margin * 2) + 'px';
  menu.style.overflowY = 'auto';

  const menuHeight = menu.scrollHeight;
  const spaceBelow = window.innerHeight - rect.bottom;
  const openUp = spaceBelow < menuHeight + margin && rect.top > menuHeight + margin;
  const preferredTop = openUp ? rect.top - menuHeight - 4 : rect.bottom + 4;
  const maxTop = Math.max(margin, window.innerHeight - Math.min(menuHeight, window.innerHeight - margin * 2) - margin);
  const top = Math.min(Math.max(preferredTop, margin), maxTop);

  menu.style.top = top + 'px';
  menu.style.bottom = 'auto';
}

function toggleDropdown(id, options) {
  const menu = document.getElementById(id);
  if (!menu) return;
  const isOpen = menu.classList.contains('open');

  // 모두 닫기
  closeDropdowns();

  if (!isOpen) {
    // 트리거 버튼 찾기 — dropdown-menu 바로 이전 형제 또는 id+'-btn'
    const trigger = document.getElementById(id + '-btn')
      || menu.__dropdownTrigger
      || menu.previousElementSibling;
    if (!trigger) return;
    menu.__dropdownTrigger = trigger;
    trigger.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');

    positionDropdown(menu, trigger);

    menu.classList.add('open');
    if (options && options.focus) {
      requestAnimationFrame(() => focusDropdownItem(menu, options.focus));
    }
  }
}

let lastOverlayTrigger = null;

function focusFirstInOverlay(root) {
  const target = root.querySelector('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])');
  if (target) target.focus();
}

function openSheet() {
  lastOverlayTrigger = document.activeElement;
  document.getElementById('sheet-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => focusFirstInOverlay(document.getElementById('sheet-panel')), 0);
}
function closeSheet() {
  document.getElementById('sheet-overlay').classList.remove('open');
  document.body.style.overflow = '';
  if (lastOverlayTrigger && lastOverlayTrigger.focus) lastOverlayTrigger.focus();
}
function openDrawer() {
  lastOverlayTrigger = document.activeElement;
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => focusFirstInOverlay(document.getElementById('drawer-panel')), 0);
}
function closeDrawer() {
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
  if (lastOverlayTrigger && lastOverlayTrigger.focus) lastOverlayTrigger.focus();
}

// 오버레이 클릭 시 닫기 (sheet / drawer 내부 클릭은 전파 차단)
document.getElementById('sheet-panel').addEventListener('click', e => e.stopPropagation());
document.getElementById('drawer-panel').addEventListener('click', e => e.stopPropagation());

window.openSheet  = openSheet;
window.closeSheet = closeSheet;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;

// ESC로 닫기
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeSheet(); closeDrawer();
  document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
});

function openModal(id) {
  lastOverlayTrigger = document.activeElement;
  const modal = document.getElementById(id);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => focusFirstInOverlay(modal), 0);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
  if (lastOverlayTrigger && lastOverlayTrigger.focus) lastOverlayTrigger.focus();
}

function handleOverlayClick(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

function hexToHSL(hex) {
  let r = parseInt(hex.slice(1,3),16)/255,
      g = parseInt(hex.slice(3,5),16)/255,
      b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max+min)/2;
  if (max === min) { h = s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch (max) {
      case r: h = ((g-b)/d + (g<b?6:0))/6; break;
      case g: h = ((b-r)/d + 2)/6; break;
      case b: h = ((r-g)/d + 4)/6; break;
    }
  }
  return { h: Math.round(h*360), s: Math.round(s*100) };
}

/* ============================================================
   window 노출 — inline onclick에서 호출되는 것만
   ============================================================ */
function toggleBtnClick(btn) {
  btn.classList.toggle('active');
}

function moveIndicator(groupId) {
  const group     = document.getElementById(groupId);
  const indicator = document.getElementById(groupId + '-indicator');
  const active    = group.querySelector('.btn-toggle-seg.active');
  if (!indicator || !active) return;
  const groupRect  = group.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  indicator.style.left  = (activeRect.left - groupRect.left) + 'px';
  indicator.style.width = activeRect.width + 'px';
}

function toggleSegClick(btn, groupId) {
  document.querySelectorAll('#' + groupId + ' .btn-toggle-seg')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  moveIndicator(groupId);
}

window.toggleBtnClick = toggleBtnClick;
window.toggleSegClick = toggleSegClick;

// 초기 indicator 위치 설정
document.addEventListener('DOMContentLoaded', () => {
  ['toggleGroup1'].forEach(id => moveIndicator(id));
});
// DOMContentLoaded가 이미 지난 경우 즉시 실행
if (document.readyState !== 'loading') {
  setTimeout(() => ['toggleGroup1'].forEach(id => moveIndicator(id)), 0);
}

// Indeterminate 체크박스 3단계 순환 (indeterminate → 선택 → 미선택)
document.querySelectorAll('.is-indeterminate').forEach(input => {
  input.indeterminate = true;
  input._state = 'indeterminate';
  input.addEventListener('change', () => {
    const box = input.nextElementSibling;
    const path = box ? box.querySelector('.indeterminate-path') : null;
    if (input._state === 'indeterminate') {
      // indeterminate → checked
      input._state = 'checked';
      input.checked = true;
      input.indeterminate = false;
      if (box) {
        box.classList.remove('check-box-indeterminate');
        box.classList.add('check-box-checked');
      }
    } else if (input._state === 'checked') {
      // checked → unchecked
      input._state = 'unchecked';
      input.checked = false;
      input.indeterminate = false;
      if (box) {
        box.classList.remove('check-box-indeterminate', 'check-box-checked');
      }
    } else {
      // unchecked → indeterminate
      input._state = 'indeterminate';
      input.checked = false;
      input.indeterminate = true;
      if (box) {
        box.classList.remove('check-box-checked');
        box.classList.add('check-box-indeterminate');
        if (path) { path.style.animation='none'; void path.offsetWidth; path.style.animation=''; }
      }
    }
  });
});

window.submitDemo       = submitDemo;
window.showToast        = showToast;
window.showButtonAction = showButtonAction;
window.removeToast      = removeToast;
window.updateCharCount  = updateCharCount;
window.togglePw         = togglePw;
window.toggleDemoPw     = toggleDemoPw;
window.handleFileSelect = handleFileSelect;
window.switchTab        = switchTab;
window.toggleDropdown   = toggleDropdown;
window.openModal        = openModal;
window.closeModal       = closeModal;
window.handleOverlayClick = handleOverlayClick;

/* ============================================================
   초기화 — DOM 이벤트 바인딩
   ============================================================ */

// 실시간 유효성 체크리스트
const emailInput = document.getElementById('demo-email');
const pwInput2   = document.getElementById('demo-pw');

if (emailInput) {
  emailInput.addEventListener('input', () => {
    updateRules(emailInput, emailRules, 'email-rules');
    if (emailInput.classList.contains('is-error') && allRulesPass(emailRules, emailInput.value)) {
      clearFieldError(emailInput, document.getElementById('demo-email-err'));
    }
  });
}

if (pwInput2) {
  pwInput2.addEventListener('input', () => {
    updateRules(pwInput2, pwRules, 'pw-rules');
    if (pwInput2.classList.contains('is-error') && allRulesPass(pwRules, pwInput2.value)) {
      clearFieldError(pwInput2, document.getElementById('demo-pw-err'));
    }
  });
}

// 이름 입력 시 오류 해제
const demoName = document.getElementById('demo-name');
if (demoName) {
  demoName.addEventListener('input', () => {
    if (demoName.value.trim().length > 0) {
      clearFieldError(demoName, document.getElementById('demo-name-err'));
    }
  });
}

// 파일 드롭
const fileDrop = document.getElementById('fileDrop');
if (fileDrop) {
  fileDrop.addEventListener('dragover', e => {
    e.preventDefault();
    fileDrop.style.borderColor = 'var(--color-accent)';
    fileDrop.style.background  = 'var(--color-accent-light)';
  });
  fileDrop.addEventListener('dragleave', () => {
    fileDrop.style.borderColor = '';
    fileDrop.style.background  = '';
  });
  fileDrop.addEventListener('drop', e => {
    e.preventDefault();
    fileDrop.style.borderColor = '';
    fileDrop.style.background  = '';
    const inp = fileDrop.querySelector('input');
    if (inp) {
      const dt = new DataTransfer();
      Array.from(e.dataTransfer.files).forEach(f => dt.items.add(f));
      inp.files = dt.files;
      handleFileSelect(inp);
    }
  });
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const btn    = document.getElementById('darkModeBtn');
  const icon   = btn.querySelector('.dark-mode-icon');
  const status = document.getElementById('darkModeStatus');
  if (isDark) {
    icon.textContent   = '🌙';
    status.textContent = 'Off';
  } else {
    icon.textContent   = '☀️';
    status.textContent = 'On';
  }
}
window.toggleDarkMode = toggleDarkMode;

// Accent picker
const picker   = document.getElementById('accentPicker');
const hexLabel = document.getElementById('accentHex');
if (picker) {
  picker.addEventListener('input', e => {
    const hex = e.target.value;
    if (hexLabel) hexLabel.textContent = hex;
    const { h, s } = hexToHSL(hex);
    document.documentElement.style.setProperty('--accent-h', h);
    document.documentElement.style.setProperty('--accent-s', s + '%');
  });
}

// Spacing rows
const spacings = [
  {n:'--space-1', px:'4px',  r:'0.25rem'}, {n:'--space-2', px:'8px',  r:'0.5rem'},
  {n:'--space-3', px:'12px', r:'0.75rem'}, {n:'--space-4', px:'16px', r:'1rem'},
  {n:'--space-5', px:'20px', r:'1.25rem'}, {n:'--space-6', px:'24px', r:'1.5rem'},
  {n:'--space-8', px:'32px', r:'2rem'},    {n:'--space-10',px:'40px', r:'2.5rem'},
  {n:'--space-12',px:'48px', r:'3rem'},    {n:'--space-16',px:'64px', r:'4rem'},
];
const sr = document.getElementById('spacingRows');
if (sr) spacings.forEach(s => {
  sr.innerHTML += '<div class="spacing-row"><div class="spacing-bar" style="width:' + s.px + '"></div>'
    + '<div class="spacing-meta">' + s.n + ' · ' + s.px + ' · ' + s.r + '</div></div>';
});

// Active nav on scroll — 스크롤 위치 기준으로 가장 가까운 섹션 감지
const sections = document.querySelectorAll('.gl-section');
const navLinks = document.querySelectorAll('.gl-nav-link');

function updateActiveNav() {
  const scrollY     = window.scrollY;
  const viewportH   = window.innerHeight;
  const threshold   = viewportH * 0.25; // 화면 상단 25% 지점 기준

  let current = null;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top + scrollY;
    if (scrollY + threshold >= top) current = sec.id;
  });

  if (current) {
    navLinks.forEach(l => l.classList.remove('active'));
    const a = document.querySelector('.gl-nav-link[href="#' + current + '"]');
    if (a) a.classList.add('active');
  }
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// 스크롤·리사이즈 시 열린 드롭다운 닫기
window.addEventListener('scroll', () => {
  closeDropdowns();
  closeCalendars();
}, true);
window.addEventListener('wheel', () => {
  closeDropdowns();
  closeCalendars();
}, { passive: true });
window.addEventListener('resize', () => {
  closeDropdowns();
  closeCalendars();
});

// Dropdown 외부 클릭 닫기
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown, .dropdown-menu')) {
    closeDropdowns();
  }
});

document.addEventListener('keydown', e => {
  const openMenu = document.querySelector('.dropdown-menu.open');
  const trigger = e.target.closest ? e.target.closest('.custom-select-btn, .table-title-menu, .dropdown > .btn') : null;
  const triggerMenu = getDropdownForTrigger(trigger);

  if (e.key === 'Escape') {
    if (openMenu) {
      const returnTrigger = getDropdownForTrigger(document.activeElement) || openMenu.__dropdownTrigger;
      closeDropdowns();
      if (returnTrigger && returnTrigger.focus) returnTrigger.focus();
    }
    closeCalendars();
    return;
  }

  if (triggerMenu && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    e.preventDefault();
    if (!triggerMenu.classList.contains('open')) {
      toggleDropdown(triggerMenu.id, { focus: e.key === 'ArrowUp' ? 'last' : 'first' });
      return;
    }
    focusDropdownItem(triggerMenu, e.key === 'ArrowUp' ? 'last' : 'first');
    return;
  }

  const activeMenu = e.target.closest ? e.target.closest('.dropdown-menu.open') : null;
  if (!activeMenu) return;

  const items = getDropdownItems(activeMenu);
  const index = items.indexOf(document.activeElement);
  if (!items.length || index < 0) return;

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const nextIndex = e.key === 'ArrowDown'
      ? (index + 1) % items.length
      : (index - 1 + items.length) % items.length;
    items[nextIndex].focus();
  } else if (e.key === 'Home') {
    e.preventDefault();
    items[0].focus();
  } else if (e.key === 'End') {
    e.preventDefault();
    items[items.length - 1].focus();
  }
});

// Modal ESC 닫기
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

function selectOption(dropdownId, value, label, isPlaceholder) {
  const valueEl = document.getElementById(dropdownId + '-value');
  if (valueEl) {
    valueEl.textContent = label;
    valueEl.style.color = isPlaceholder ? 'var(--color-text-disabled)' : 'var(--color-text-primary)';
  }
  // 오류 상태 해제
  const btn = document.getElementById(dropdownId + '-btn');
  if (btn) btn.classList.remove('is-error');
  // 선택된 항목 체크 표시
  const menu = document.getElementById(dropdownId);
  if (menu) {
    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.style.fontWeight = item.textContent.trim() === label ? 'var(--font-weight-semibold)' : '';
      item.style.color = item.textContent.trim() === label ? 'var(--color-accent)' : '';
    });
  }
  toggleDropdown(dropdownId); // 선택 후 닫기
}

/* ── Pagination 공통 빌더 ── */
// windowStart: 현재 보이는 5개 윈도우 시작 페이지 (화살표로만 변경)
// current: 선택된 페이지 (숫자 버튼으로만 변경)
function pageIcon(name) {
  const icons = {
    first: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>',
    prev: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    next: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    last: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>'
  };
  return icons[name] || '';
}

function buildPagination(current, total, windowStart, onPageClick, onWindowClick) {
  if (total <= 0) return '';
  const WIN = 5;
  const ws  = windowStart || 1;
  const we  = Math.min(ws + WIN - 1, total);
  const lastWs = Math.max(1, total - WIN + 1);
  let html  = '';

  // 첫 윈도우로
  html += `<button class="page-btn arrow" ${ws === 1 ? 'disabled' : `onclick="${onWindowClick}(1)"`} title="처음" aria-label="처음">${pageIcon('first')}</button>`;

  // 이전 윈도우
  const prevWs = Math.max(1, ws - WIN);
  html += `<button class="page-btn arrow" ${ws === 1 ? 'disabled' : `onclick="${onWindowClick}(${prevWs})"`} title="이전" aria-label="이전">${pageIcon('prev')}</button>`;

  // 윈도우 내 페이지 번호
  for (let i = ws; i <= we; i++) {
    html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="${onPageClick}(${i})">${i}</button>`;
  }

  // 다음 윈도우
  const nextWs = ws + WIN;
  html += `<button class="page-btn arrow" ${nextWs > total ? 'disabled' : `onclick="${onWindowClick}(${nextWs})"`} title="다음" aria-label="다음">${pageIcon('next')}</button>`;
  html += `<button class="page-btn arrow" ${ws >= lastWs ? 'disabled' : `onclick="${onWindowClick}(${lastWs})"`} title="마지막" aria-label="마지막">${pageIcon('last')}</button>`;

  return html;
}

// 페이지네이션 데모
let demoPg1 = 1, demoWin1 = 1;
let demoPg2 = 1, demoWin2 = 1;

function demoPg1Go(p)  { demoPg1 = p; renderDemoPg1(); }
function demoWin1Go(w) { demoWin1 = w; demoPg1 = w; renderDemoPg1(); }
function renderDemoPg1() {
  document.getElementById('demo-pg1').innerHTML = buildPagination(demoPg1, 5, demoWin1, 'demoPg1Go', 'demoWin1Go');
}

function demoPg2Go(p)  { demoPg2 = p; renderDemoPg2(); }
function demoWin2Go(w) { demoWin2 = w; demoPg2 = w; renderDemoPg2(); }
function renderDemoPg2() {
  document.getElementById('demo-pg2').innerHTML = buildPagination(demoPg2, 100, demoWin2, 'demoPg2Go', 'demoWin2Go');
}

window.demoPg1Go  = demoPg1Go;  window.demoWin1Go = demoWin1Go;
window.demoPg2Go  = demoPg2Go;  window.demoWin2Go = demoWin2Go;
setTimeout(() => { renderDemoPg1(); renderDemoPg2(); }, 0);

/* ── Table ── */
const TBL_DATA = [
  { name:'SPMS iOS',     platform:'APNs', status:'success', statusLabel:'Active',   send:12450, rate:98.2 },
  { name:'SPMS Android', platform:'FCM',  status:'success', statusLabel:'Active',   send:8320,  rate:97.8 },
  { name:'Marketing',    platform:'FCM',  status:'warning', statusLabel:'Paused',   send:3100,  rate:94.1 },
  { name:'Legacy SDK',   platform:'APNs', status:'neutral', statusLabel:'Inactive', send:0,     rate:0    },
  { name:'Push Alpha',   platform:'APNs', status:'success', statusLabel:'Active',   send:5210,  rate:99.1 },
  { name:'Push Beta',    platform:'FCM',  status:'danger',  statusLabel:'Error',    send:1200,  rate:82.3 },
  { name:'Web Push',     platform:'Web',  status:'success', statusLabel:'Active',   send:4100,  rate:96.5 },
  { name:'Test SDK',     platform:'APNs', status:'neutral', statusLabel:'Inactive', send:0,     rate:0    },
];
let tblSortState = { col:null, dir:'asc' };
let tblPage      = 1;
let tblWin       = 1;
const TBL_PER    = 4;
let tblSelected  = new Set();
let tblData      = [...TBL_DATA];

function tblRender() {
  const start = (tblPage-1)*TBL_PER;
  const rows  = tblData.slice(start, start+TBL_PER);
  const body  = document.getElementById('tbl-body');
  if (!body) return;

  body.innerHTML = rows.map((d,i) => {
    const idx     = start+i;
    const checked = tblSelected.has(idx);
    return `<tr class="${checked?'tbl-selected':''}" data-idx="${idx}">
      <td style="text-align:center">
        <label class="check-item" style="justify-content:center;margin:0">
          <input type="checkbox" ${checked?'checked':''} onchange="tblRowCheck(this,${idx})" />
          <span class="check-box" style="width:15px;height:15px">
            <svg width="9" height="9" viewBox="0 0 10 10"><path class="check-path" d="M1.5 5l2.5 2.5 4.5-5"/></svg>
          </span>
        </label>
      </td>
      <td>${d.name}</td>
      <td>${d.platform}</td>
      <td><span class="badge badge-${d.status}">${d.statusLabel}</span></td>
      <td>${d.send?d.send.toLocaleString():'—'}</td>
      <td>${d.rate?d.rate+'%':'—'}</td>
    </tr>`;
  }).join('');

  // 전체선택 박스 상태
  const allEl    = document.getElementById('tbl-all');
  const pageIdxs = rows.map((_,i)=>start+i);
  const allChk   = pageIdxs.length > 0 && pageIdxs.every(i=>tblSelected.has(i));
  const someChk  = pageIdxs.some(i=>tblSelected.has(i));
  if (allEl) {
    const box = allEl.nextElementSibling;
    allEl.checked       = allChk;
    allEl.indeterminate = !allChk && someChk;
    if (box) {
      box.classList.remove('check-box-indeterminate','check-box-checked');
      if (allChk) {
        box.classList.add('check-box-checked');
      } else if (someChk) {
        box.classList.add('check-box-indeterminate');
        const path = box.querySelector('.indeterminate-path');
        if (path) { path.style.animation='none'; void path.offsetWidth; path.style.animation=''; }
      }
    }
  }

  tblUpdateToolbar();
  tblRenderPagination();
  tblUpdatePageInfo();
}

function tblUpdateToolbar() {
  const info  = document.getElementById('tbl-info');
  const bulk  = document.getElementById('tbl-bulk');
  const count = document.getElementById('tbl-selected-count');
  if (tblSelected.size > 0) {
    if (info)  info.style.display = 'none';
    if (bulk)  bulk.style.display = 'flex';
    if (count) count.textContent  = tblSelected.size+'개 선택됨';
  } else {
    if (info)  { info.style.display='block'; info.textContent='전체 '+tblData.length+'개'; }
    if (bulk)  bulk.style.display = 'none';
  }
}

function tblUpdatePageInfo() {
  const el    = document.getElementById('tbl-page-info');
  const total = tblData.length;
  const start = (tblPage-1)*TBL_PER+1;
  const end   = Math.min(tblPage*TBL_PER, total);
  if (el) el.textContent = total ? start+'–'+end+' / 전체 '+total+'개' : '0개';
}

function tblRenderPagination() {
  const nav   = document.getElementById('tbl-pagination');
  if (!nav) return;
  const total = Math.ceil(tblData.length / TBL_PER);
  nav.innerHTML = buildPagination(tblPage, total, tblWin, 'tblGoPage', 'tblGoWin');
}

function tblGoPage(p) {
  const total = Math.ceil(tblData.length / TBL_PER);
  if (p < 1 || p > total) return;
  tblPage = p;
  tblRender();
}

function tblGoWin(w) {
  tblWin  = w;
  tblPage = w; // 새 윈도우의 첫 페이지로 자동 이동
  tblRender();
}
window.tblGoWin = tblGoWin;

function tblSort(col) {
  if (tblSortState.col===col) tblSortState.dir = tblSortState.dir==='asc'?'desc':'asc';
  else { tblSortState.col=col; tblSortState.dir='asc'; }
  ['name','platform','send','rate'].forEach(c => {
    const el = document.getElementById('si-'+c);
    if (el) { el.className='sort-icon'; el.textContent='↕'; }
  });
  const icon = document.getElementById('si-'+col);
  if (icon) { icon.className='sort-icon '+tblSortState.dir; icon.textContent=tblSortState.dir==='asc'?'↑':'↓'; }
  tblData.sort((a,b) => {
    const av=a[col], bv=b[col];
    return tblSortState.dir==='asc'
      ? (typeof av==='string' ? av.localeCompare(bv) : av-bv)
      : (typeof av==='string' ? bv.localeCompare(av) : bv-av);
  });
  tblPage = 1;
  tblRender();
}

let tblDropdownSortState = { col:null, dir:'none' };
let tblDropdownData = [...TBL_DATA];

function tblValue(row, col) {
  return col === 'status' ? row.statusLabel : row[col];
}

function tblCompare(a, b, col, dir) {
  const av = tblValue(a, col);
  const bv = tblValue(b, col);
  const result = typeof av === 'string'
    ? av.localeCompare(bv)
    : av - bv;
  return dir === 'asc' ? result : -result;
}

function tblDropdownRender() {
  const body = document.getElementById('tbl-dropdown-body');
  if (!body) return;

  body.innerHTML = tblDropdownData.map(d => `
    <tr>
      <td>${d.name}</td>
      <td>${d.platform}</td>
      <td><span class="badge badge-${d.status}">${d.statusLabel}</span></td>
      <td>${d.send ? d.send.toLocaleString() : '—'}</td>
      <td>${d.rate ? d.rate + '%' : '—'}</td>
    </tr>
  `).join('');
}

function tblDropdownResetSortUi() {
  document.querySelectorAll('.table-sort-menu .dropdown-item')
    .forEach(item => item.classList.remove('active'));
}

function tblDropdownSort(col, dir) {
  tblDropdownResetSortUi();

  if (dir === 'none') {
    tblDropdownSortState = { col:null, dir:'none' };
    tblDropdownData = [...TBL_DATA];
  } else {
    tblDropdownSortState = { col, dir };
    tblDropdownData = [...TBL_DATA].sort((a,b) => tblCompare(a,b,col,dir));
  }

  const active = document.querySelector('.table-sort-menu [data-sort-col="' + col + '"][data-sort-dir="' + dir + '"]');
  if (active) active.classList.add('active');
  tblDropdownRender();
  closeDropdowns();
}

function tblRowCheck(input, idx) {
  if (input.checked) tblSelected.add(idx);
  else               tblSelected.delete(idx);
  tblRender();
}

function tblSelectAll(input) {
  const start    = (tblPage-1)*TBL_PER;
  const pageIdxs = tblData.slice(start,start+TBL_PER).map((_,i)=>start+i);
  if (input.checked) pageIdxs.forEach(i=>tblSelected.add(i));
  else               pageIdxs.forEach(i=>tblSelected.delete(i));
  tblRender();
}

window.tblSort      = tblSort;
window.tblDropdownSort = tblDropdownSort;
window.tblGoPage    = tblGoPage;
window.tblRowCheck  = tblRowCheck;
window.tblSelectAll = tblSelectAll;
setTimeout(() => { tblRender(); tblDropdownRender(); }, 0);

/* ── Custom Calendar ── */
const calState = {}; // { calId: { year, month, targetInputId } }

function closeCalendars() {
  document.querySelectorAll('.cal-popup.open').forEach(calendar => calendar.classList.remove('open'));
  document.querySelectorAll('.date-input.is-open').forEach(input => {
    input.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
  });
}

function getCalendarTriggerData(trigger) {
  if (!trigger) return null;
  const onclick = trigger.getAttribute('onclick') || '';
  const match = onclick.match(/openCalendar\('([^']+)','([^']+)'\)/);
  if (!match) return null;
  return { calId: match[1], inputId: match[2] };
}

function focusCalendarDay(cal) {
  const target = cal.querySelector('.cal-day-selected:not(:disabled)')
    || cal.querySelector('.cal-day-today:not(:disabled)')
    || cal.querySelector('.cal-day:not(:disabled)');
  if (target) target.focus();
}

function openCalendar(calId, inputId, focusDay) {
  let cal = document.getElementById(calId);
  if (!cal) {
    cal = document.createElement('div');
    cal.className = 'cal-popup';
    cal.id = calId;
    cal.addEventListener('click', e => e.stopPropagation()); // 내부 클릭 전파 차단
    document.body.appendChild(cal);
  }

  const isOpen = cal.classList.contains('open');
  closeCalendars();

  if (cal.classList.contains('open')) {
    return;
  }
  if (isOpen) return;

  const now = new Date();
  const input = document.getElementById(inputId);
  let year = now.getFullYear(), month = now.getMonth();

  // 이미 값이 있으면 해당 달로
  if (input && input.value) {
    const d = new Date(input.value);
    if (!isNaN(d)) { year = d.getFullYear(); month = d.getMonth(); }
  }

  calState[calId] = { year, month, targetInputId: inputId };
  renderCalendar(calId);

  // 위치 계산
  const trigger = input;
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    cal.style.left = rect.left + 'px';
    if (spaceBelow < 320 && rect.top > 320) {
      cal.style.top = (rect.top - 316) + 'px';
    } else {
      cal.style.top = (rect.bottom + 4) + 'px';
    }
  }

  if (input) {
    input.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }
  cal.classList.add('open');
  if (focusDay) {
    requestAnimationFrame(() => focusCalendarDay(cal));
  }
}

function renderCalendar(calId) {
  const cal = document.getElementById(calId);
  if (!cal) return;
  const { year, month, targetInputId } = calState[calId];

  const input = document.getElementById(targetInputId);
  const selectedStr = input ? input.value : '';
  const today = new Date();
  today.setHours(0,0,0,0);

  // 범위 제한
  let minDate = null, maxDate = null;
  if (targetInputId === 'datePicker2') {
    const endVal = document.getElementById('datePicker3');
    if (endVal && endVal.value) maxDate = endVal.value;
  }
  if (targetInputId === 'datePicker3') {
    const startVal = document.getElementById('datePicker2');
    if (startVal && startVal.value) minDate = startVal.value;
  }

  const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  let daysHtml = '';
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, 1 - firstDay + i);
    const dow = date.getDay();
    const cellYear = date.getFullYear();
    const cellMonth = date.getMonth();
    const cellDay = date.getDate();
    const dateStr = cellYear + '-' + String(cellMonth + 1).padStart(2,'0') + '-' + String(cellDay).padStart(2,'0');
    const isAdjacent = cellYear !== year || cellMonth !== month;
    const isToday = date.getTime() === today.getTime();
    const isSelected = dateStr === selectedStr;
    const isSun = dow === 0, isSat = dow === 6;
    const isDisabled = (minDate && dateStr < minDate) || (maxDate && dateStr > maxDate);

    const cls = [
      'cal-day',
      isDisabled ? 'cal-day-disabled' : '',
      isAdjacent ? 'cal-day-adjacent' : '',
      isToday && !isSelected && !isDisabled ? 'cal-day-today' : '',
      isSelected ? 'cal-day-selected' : '',
      isSun && !isSelected && !isDisabled && !isAdjacent ? 'cal-day-sunday' : '',
      isSat && !isSelected && !isDisabled && !isAdjacent ? 'cal-day-saturday' : '',
    ].filter(Boolean).join(' ');

    const onclick = isDisabled ? '' : 'onclick="selectDate(\'' + calId + '\',\'' + dateStr + '\')"';
    daysHtml += '<button type="button" class="' + cls + '" aria-label="' + dateStr + '" ' + onclick + ' ' + (isDisabled ? 'disabled' : '') + '>' + cellDay + '</button>';
  }

  cal.innerHTML =
    '<div class="cal-header">' +
      '<button type="button" class="cal-nav" aria-label="이전 달" onclick="shiftMonth(\'' + calId + '\',-1)">‹</button>' +
      '<span class="cal-title">' + year + '년 ' + monthNames[month] + '</span>' +
      '<button type="button" class="cal-nav" aria-label="다음 달" onclick="shiftMonth(\'' + calId + '\',1)">›</button>' +
    '</div>' +
    '<div class="cal-weekdays"><div class="cal-weekday">일</div><div class="cal-weekday">월</div><div class="cal-weekday">화</div><div class="cal-weekday">수</div><div class="cal-weekday">목</div><div class="cal-weekday">금</div><div class="cal-weekday">토</div></div>' +
    '<div class="cal-days">' + daysHtml + '</div>';
}

function shiftMonth(calId, delta) {
  const s = calState[calId];
  s.month += delta;
  if (s.month < 0)  { s.month = 11; s.year--; }
  if (s.month > 11) { s.month = 0;  s.year++; }
  renderCalendar(calId);
}

function selectDate(calId, dateStr) {
  const { targetInputId } = calState[calId];
  const input = document.getElementById(targetInputId);
  if (!input) return;

  // 날짜 범위 유효성 검사
  if (targetInputId === 'datePicker2') {
    // 시작일 선택 — 종료일보다 늦으면 조정
    const endInput = document.getElementById('datePicker3');
    if (endInput && endInput.value && dateStr > endInput.value) {
      input.value = endInput.value;
      closeCalendars();
      showToast('warning', '날짜 범위 오류', '시작일이 종료일을 초과해 종료일로 조정했습니다.');
      return;
    }
  }

  if (targetInputId === 'datePicker3') {
    // 종료일 선택 — 시작일보다 이르면 조정
    const startInput = document.getElementById('datePicker2');
    if (startInput && startInput.value && dateStr < startInput.value) {
      input.value = startInput.value;
      closeCalendars();
      showToast('warning', '날짜 범위 오류', '종료일이 시작일보다 이전이어서 시작일로 조정했습니다.');
      return;
    }
  }

  input.value = dateStr;
  closeCalendars();
}

// 달력 외부 클릭 닫기 (cal 내부는 stopPropagation으로 차단됨)
document.addEventListener('click', e => {
  if (!e.target.closest('.date-input, .date-icon-btn, .cal-popup, [onclick*="openCalendar"]')) {
    closeCalendars();
  }
});

document.addEventListener('keydown', e => {
  const triggerData = e.target.classList && e.target.classList.contains('date-input')
    ? getCalendarTriggerData(e.target)
    : null;

  if (triggerData && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
    e.preventDefault();
    openCalendar(triggerData.calId, triggerData.inputId, true);
    return;
  }

  const openCal = e.target.closest ? e.target.closest('.cal-popup.open') : null;
  if (!openCal) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    const state = calState[openCal.id];
    const input = state ? document.getElementById(state.targetInputId) : null;
    closeCalendars();
    if (input) input.focus();
    return;
  }

  if (!e.target.classList || !e.target.classList.contains('cal-day')) return;
  const days = Array.from(openCal.querySelectorAll('.cal-day:not(:disabled)'));
  const index = days.indexOf(e.target);
  if (index < 0) return;

  const moves = { ArrowLeft:-1, ArrowRight:1, ArrowUp:-7, ArrowDown:7 };
  if (Object.prototype.hasOwnProperty.call(moves, e.key)) {
    e.preventDefault();
    const next = Math.min(Math.max(index + moves[e.key], 0), days.length - 1);
    days[next].focus();
  } else if (e.key === 'Home') {
    e.preventDefault();
    days[0].focus();
  } else if (e.key === 'End') {
    e.preventDefault();
    days[days.length - 1].focus();
  }
});

window.openCalendar = openCalendar;
window.shiftMonth   = shiftMonth;
window.selectDate   = selectDate;
window.closeCalendars = closeCalendars;

/* ── Custom Calendar ── */
function doSearch(inputId) {
  const val = document.getElementById(inputId).value.trim();
  if (!val) { showToast('warning', '검색어 없음', '검색어를 입력해주세요.'); return; }
  showToast('info', '검색 중', '"' + val + '" 검색 결과를 불러옵니다.');
}

function toggleClearBtn(input) {
  const btn = document.getElementById('clearBtn');
  if (btn) btn.style.display = input.value.length > 0 ? 'flex' : 'none';
}

function spinRefreshButton(button) {
  if (!button) return;
  button.classList.remove('is-spinning');
  void button.offsetWidth;
  button.classList.add('is-spinning');
  button.addEventListener('animationend', () => {
    button.classList.remove('is-spinning');
  }, { once: true });
}

function clearSearch(inputId, trigger) {
  spinRefreshButton(trigger && trigger.classList ? trigger.closest('.refresh-btn') : null);
  const input = document.getElementById(inputId);
  if (input) { input.value = ''; input.focus(); }
  const btn = document.getElementById('clearBtn');
  if (btn) btn.style.display = 'none';
  showToast('success', '초기화 완료', '검색 필터가 초기화되었습니다.');
}

window.doSearch       = doSearch;
window.toggleClearBtn = toggleClearBtn;
window.spinRefreshButton = spinRefreshButton;
window.clearSearch    = clearSearch;

const currencyInput = document.getElementById('currencyInput');
if (currencyInput) {
  currencyInput.addEventListener('input', () => {
    const pos = currencyInput.selectionStart;
    const prevLen = currencyInput.value.length;
    const raw = currencyInput.value.replace(/[^0-9]/g, '');
    const formatted = raw ? Number(raw).toLocaleString('ko-KR') : '';
    currencyInput.value = formatted;
    // 커서 위치 보정
    const diff = formatted.length - prevLen;
    currencyInput.setSelectionRange(pos + diff, pos + diff);
  });
}

// 전화번호 — 자동 하이픈
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    const raw = phoneInput.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length <= 3) {
      formatted = raw;
    } else if (raw.length <= 7) {
      formatted = raw.slice(0, 3) + '-' + raw.slice(3);
    } else {
      formatted = raw.slice(0, 3) + '-' + raw.slice(3, 7) + '-' + raw.slice(7, 11);
    }
    phoneInput.value = formatted;
  });
  // 백스페이스로 하이픈 앞에서 누르면 숫자까지 같이 지우기
  phoneInput.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      const pos = phoneInput.selectionStart;
      if (phoneInput.value[pos - 1] === '-') {
        e.preventDefault();
        phoneInput.value = phoneInput.value.slice(0, pos - 2) + phoneInput.value.slice(pos);
        phoneInput.setSelectionRange(pos - 2, pos - 2);
        phoneInput.dispatchEvent(new Event('input'));
      }
    }
  });
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('mobileDrawer').classList.toggle('open');
  });
}
