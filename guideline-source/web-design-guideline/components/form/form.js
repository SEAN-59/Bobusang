function updateCharCount() {
  const textarea = document.getElementById('charTextarea');
  const count = document.getElementById('charCount');
  if (!textarea || !count) return;

  const length = textarea.value.length;
  count.textContent = length + ' / 200';
  count.style.color = length > 180 ? 'var(--color-danger)' : length > 150 ? 'var(--color-warning)' : 'var(--color-text-muted)';
}

function closeDropdowns() {
  document.querySelectorAll('.dropdown-menu.open').forEach(menu => menu.classList.remove('open'));
  document.querySelectorAll('.custom-select-btn.is-open, .table-title-menu.is-open').forEach(button => {
    button.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  });
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

function toggleDropdown(id) {
  const menu = document.getElementById(id);
  if (!menu) return;

  const isOpen = menu.classList.contains('open');
  closeDropdowns();
  if (isOpen) return;

  const trigger = document.getElementById(id + '-btn') || menu.__dropdownTrigger || menu.previousElementSibling;
  if (!trigger) return;

  menu.__dropdownTrigger = trigger;
  trigger.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  positionDropdown(menu, trigger);
  menu.classList.add('open');
}

function selectOption(dropdownId, value, label, isPlaceholder) {
  const valueElement = document.getElementById(dropdownId + '-value');
  if (valueElement) {
    valueElement.textContent = label;
    valueElement.style.color = isPlaceholder ? 'var(--color-text-disabled)' : 'var(--color-text-primary)';
  }

  const button = document.getElementById(dropdownId + '-btn');
  if (button) button.classList.remove('is-error');

  closeDropdowns();
}

const calState = {};

function closeCalendars() {
  document.querySelectorAll('.cal-popup.open').forEach(calendar => calendar.classList.remove('open'));
  document.querySelectorAll('.date-input.is-open').forEach(input => {
    input.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
  });
}

function openCalendar(calId, inputId) {
  let calendar = document.getElementById(calId);
  if (!calendar) {
    calendar = document.createElement('div');
    calendar.className = 'cal-popup';
    calendar.id = calId;
    calendar.addEventListener('click', event => event.stopPropagation());
    document.body.appendChild(calendar);
  }

  const isOpen = calendar.classList.contains('open');
  closeCalendars();
  if (isOpen) return;

  const input = document.getElementById(inputId);
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  if (input && input.value) {
    const selectedDate = new Date(input.value);
    if (!Number.isNaN(selectedDate.getTime())) {
      year = selectedDate.getFullYear();
      month = selectedDate.getMonth();
    }
  }

  calState[calId] = { year, month, targetInputId: inputId };
  renderCalendar(calId);

  if (input) {
    const rect = input.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    calendar.style.left = rect.left + 'px';
    calendar.style.top = spaceBelow < 320 && rect.top > 320 ? (rect.top - 316) + 'px' : (rect.bottom + 4) + 'px';
    input.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }

  calendar.classList.add('open');
}

function renderCalendar(calId) {
  const calendar = document.getElementById(calId);
  const state = calState[calId];
  if (!calendar || !state) return;

  const { year, month, targetInputId } = state;
  const input = document.getElementById(targetInputId);
  const selectedValue = input ? input.value : '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let minDate = null;
  let maxDate = null;
  if (targetInputId === 'datePicker2') {
    const endInput = document.getElementById('datePicker3');
    if (endInput && endInput.value) maxDate = endInput.value;
  }
  if (targetInputId === 'datePicker3') {
    const startInput = document.getElementById('datePicker2');
    if (startInput && startInput.value) minDate = startInput.value;
  }

  const firstDay = new Date(year, month, 1).getDay();
  let daysHtml = '';

  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, 1 - firstDay + i);
    const dow = date.getDay();
    const cellYear = date.getFullYear();
    const cellMonth = date.getMonth();
    const cellDay = date.getDate();
    const dateStr = cellYear + '-' + String(cellMonth + 1).padStart(2, '0') + '-' + String(cellDay).padStart(2, '0');
    const isAdjacent = cellYear !== year || cellMonth !== month;
    const isDisabled = (minDate && dateStr < minDate) || (maxDate && dateStr > maxDate);
    const isSelected = dateStr === selectedValue;
    const isToday = date.getTime() === today.getTime();
    const classes = [
      'cal-day',
      isDisabled ? 'cal-day-disabled' : '',
      isAdjacent ? 'cal-day-adjacent' : '',
      isToday && !isSelected && !isDisabled ? 'cal-day-today' : '',
      isSelected ? 'cal-day-selected' : '',
      dow === 0 && !isSelected && !isDisabled && !isAdjacent ? 'cal-day-sunday' : '',
      dow === 6 && !isSelected && !isDisabled && !isAdjacent ? 'cal-day-saturday' : ''
    ].filter(Boolean).join(' ');
    const onclick = isDisabled ? '' : "onclick=\"selectDate('" + calId + "','" + dateStr + "')\"";
    daysHtml += '<button class="' + classes + '" ' + onclick + ' ' + (isDisabled ? 'disabled' : '') + '>' + cellDay + '</button>';
  }

  calendar.innerHTML =
    '<div class="cal-header">' +
      '<button class="cal-nav" onclick="shiftMonth(\'' + calId + '\',-1)">‹</button>' +
      '<span class="cal-title">' + year + '년 ' + (month + 1) + '월</span>' +
      '<button class="cal-nav" onclick="shiftMonth(\'' + calId + '\',1)">›</button>' +
    '</div>' +
    '<div class="cal-weekdays"><div class="cal-weekday">일</div><div class="cal-weekday">월</div><div class="cal-weekday">화</div><div class="cal-weekday">수</div><div class="cal-weekday">목</div><div class="cal-weekday">금</div><div class="cal-weekday">토</div></div>' +
    '<div class="cal-days">' + daysHtml + '</div>';
}

function shiftMonth(calId, delta) {
  const state = calState[calId];
  if (!state) return;
  state.month += delta;
  if (state.month < 0) {
    state.month = 11;
    state.year--;
  }
  if (state.month > 11) {
    state.month = 0;
    state.year++;
  }
  renderCalendar(calId);
}

function selectDate(calId, dateStr) {
  const state = calState[calId];
  if (!state) return;

  const input = document.getElementById(state.targetInputId);
  if (!input) return;

  if (state.targetInputId === 'datePicker2') {
    const endInput = document.getElementById('datePicker3');
    if (endInput && endInput.value && dateStr > endInput.value) {
      input.value = endInput.value;
      closeCalendars();
      if (typeof showToast === 'function') showToast('warning', '날짜 범위 오류', '시작일이 종료일을 초과해 종료일로 조정했습니다.');
      return;
    }
  }

  if (state.targetInputId === 'datePicker3') {
    const startInput = document.getElementById('datePicker2');
    if (startInput && startInput.value && dateStr < startInput.value) {
      input.value = startInput.value;
      closeCalendars();
      if (typeof showToast === 'function') showToast('warning', '날짜 범위 오류', '종료일이 시작일보다 이전이어서 시작일로 조정했습니다.');
      return;
    }
  }

  input.value = dateStr;
  closeCalendars();
}

document.addEventListener('click', event => {
  if (!event.target.closest('.date-input, .date-icon-btn, .cal-popup, [onclick*="openCalendar"]')) {
    closeCalendars();
  }
});

function doSearch(inputId) {
  const input = document.getElementById(inputId);
  const value = input ? input.value.trim() : '';
  if (typeof showToast !== 'function') return;
  if (!value) {
    showToast('warning', '검색어 없음', '검색어를 입력해주세요.');
    return;
  }
  showToast('info', '검색 중', '"' + value + '" 검색 결과를 불러옵니다.');
}

function toggleClearBtn(input) {
  const button = document.getElementById('clearBtn');
  if (button) button.style.display = input.value.length > 0 ? 'flex' : 'none';
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
  if (input) {
    input.value = '';
    input.focus();
  }

  const clearButton = document.getElementById('clearBtn');
  if (clearButton) clearButton.style.display = 'none';

  if (typeof showToast === 'function') {
    showToast('success', '초기화 완료', '검색 필터가 초기화되었습니다.');
  }
}

window.updateCharCount = updateCharCount;
window.closeDropdowns = closeDropdowns;
window.toggleDropdown = toggleDropdown;
window.selectOption = selectOption;
window.closeCalendars = closeCalendars;
window.openCalendar = openCalendar;
window.renderCalendar = renderCalendar;
window.shiftMonth = shiftMonth;
window.selectDate = selectDate;
window.doSearch = doSearch;
window.toggleClearBtn = toggleClearBtn;
window.spinRefreshButton = spinRefreshButton;
window.clearSearch = clearSearch;
