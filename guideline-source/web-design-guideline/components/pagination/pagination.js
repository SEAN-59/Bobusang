let demoPg1 = 1;
let demoPg2 = 1;
let demoWin1 = 1;
let demoWin2 = 1;

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
  const win = 5;
  const ws = windowStart || 1;
  const we = Math.min(ws + win - 1, total);
  const lastWs = Math.max(1, total - win + 1);
  let html = '';

  html += `<button class="page-btn arrow" ${ws === 1 ? 'disabled' : `onclick="${onWindowClick}(1)"`} title="처음" aria-label="처음">${pageIcon('first')}</button>`;
  html += `<button class="page-btn arrow" ${ws === 1 ? 'disabled' : `onclick="${onWindowClick}(${Math.max(1, ws - win)})"`} title="이전" aria-label="이전">${pageIcon('prev')}</button>`;

  for (let i = ws; i <= we; i++) {
    html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="${onPageClick}(${i})">${i}</button>`;
  }

  html += `<button class="page-btn arrow" ${we >= total ? 'disabled' : `onclick="${onWindowClick}(${we + 1})"`} title="다음" aria-label="다음">${pageIcon('next')}</button>`;
  html += `<button class="page-btn arrow" ${ws >= lastWs ? 'disabled' : `onclick="${onWindowClick}(${lastWs})"`} title="마지막" aria-label="마지막">${pageIcon('last')}</button>`;

  return html;
}

function demoPg1Go(page) {
  demoPg1 = page;
  renderDemoPg1();
}

function demoWin1Go(win) {
  demoWin1 = win;
  demoPg1 = win;
  renderDemoPg1();
}

function renderDemoPg1() {
  const nav = document.getElementById('demo-pg1');
  if (nav) nav.innerHTML = buildPagination(demoPg1, 5, demoWin1, 'demoPg1Go', 'demoWin1Go');
}

function demoPg2Go(page) {
  demoPg2 = page;
  renderDemoPg2();
}

function demoWin2Go(win) {
  demoWin2 = win;
  demoPg2 = win;
  renderDemoPg2();
}

function renderDemoPg2() {
  const nav = document.getElementById('demo-pg2');
  if (nav) nav.innerHTML = buildPagination(demoPg2, 100, demoWin2, 'demoPg2Go', 'demoWin2Go');
}

window.demoPg1Go = demoPg1Go;
window.demoWin1Go = demoWin1Go;
window.demoPg2Go = demoPg2Go;
window.demoWin2Go = demoWin2Go;

setTimeout(() => {
  renderDemoPg1();
  renderDemoPg2();
}, 0);
