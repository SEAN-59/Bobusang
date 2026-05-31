(() => {
  const TABLE_DATA = [
    { name:'SPMS iOS',     platform:'APNs', status:'success', statusLabel:'Active',   send:12450, rate:98.2 },
    { name:'SPMS Android', platform:'FCM',  status:'success', statusLabel:'Active',   send:8320,  rate:97.8 },
    { name:'Marketing',    platform:'FCM',  status:'warning', statusLabel:'Paused',   send:3100,  rate:94.1 },
    { name:'Legacy SDK',   platform:'APNs', status:'neutral', statusLabel:'Inactive', send:0,     rate:0    },
    { name:'Push Alpha',   platform:'APNs', status:'success', statusLabel:'Active',   send:5210,  rate:99.1 },
    { name:'Push Beta',    platform:'FCM',  status:'danger',  statusLabel:'Error',    send:1200,  rate:82.3 },
    { name:'Web Push',     platform:'Web',  status:'success', statusLabel:'Active',   send:4100,  rate:96.5 },
    { name:'Test SDK',     platform:'APNs', status:'neutral', statusLabel:'Inactive', send:0,     rate:0    },
  ];

  let tableSortState = { col:null, dir:'asc' };
  let tablePage = 1;
  let tableWindow = 1;
  let tableSelected = new Set();
  let tableData = [...TABLE_DATA];
  let dropdownData = [...TABLE_DATA];
  const PAGE_SIZE = 4;

  function valueOf(row, col) {
    return col === 'status' ? row.statusLabel : row[col];
  }

  function compareRows(a, b, col, dir) {
    const av = valueOf(a, col);
    const bv = valueOf(b, col);
    const result = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return dir === 'asc' ? result : -result;
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

  function pageIcon(name) {
    const icons = {
      first: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>',
      prev: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
      next: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
      last: '<svg class="page-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>'
    };
    return icons[name] || '';
  }

  function renderMainTable() {
    const body = document.getElementById('tbl-body');
    if (!body) return;

    const start = (tablePage - 1) * PAGE_SIZE;
    const rows = tableData.slice(start, start + PAGE_SIZE);
    body.innerHTML = rows.map((row, offset) => {
      const idx = start + offset;
      const checked = tableSelected.has(idx);
      return `<tr class="${checked ? 'tbl-selected' : ''}" data-idx="${idx}">
        <td>
          <label class="check-item" style="justify-content:center;margin:0">
            <input type="checkbox" ${checked ? 'checked' : ''} onchange="tblRowCheck(this,${idx})" />
            <span class="check-box" style="width:15px;height:15px">
              <svg width="9" height="9" viewBox="0 0 10 10"><path class="check-path" d="M1.5 5l2.5 2.5 4.5-5"/></svg>
            </span>
          </label>
        </td>
        <td>${row.name}</td>
        <td>${row.platform}</td>
        <td><span class="badge badge-${row.status}">${row.statusLabel}</span></td>
        <td>${row.send ? row.send.toLocaleString() : '—'}</td>
        <td>${row.rate ? row.rate + '%' : '—'}</td>
      </tr>`;
    }).join('');

    const allInput = document.getElementById('tbl-all');
    const pageIdxs = rows.map((_, index) => start + index);
    if (allInput) {
      const allChecked = pageIdxs.length > 0 && pageIdxs.every(index => tableSelected.has(index));
      const someChecked = pageIdxs.some(index => tableSelected.has(index));
      allInput.checked = allChecked;
      allInput.indeterminate = !allChecked && someChecked;
    }

    updateToolbar();
    renderPagination();
  }

  function updateToolbar() {
    const info = document.getElementById('tbl-info');
    const bulk = document.getElementById('tbl-bulk');
    const count = document.getElementById('tbl-selected-count');
    if (tableSelected.size > 0) {
      if (info) info.style.display = 'none';
      if (bulk) bulk.style.display = 'flex';
      if (count) count.textContent = tableSelected.size + '개 선택됨';
    } else {
      if (info) {
        info.style.display = 'block';
        info.textContent = '전체 ' + tableData.length + '개';
      }
      if (bulk) bulk.style.display = 'none';
    }
  }

  function renderPagination() {
    const nav = document.getElementById('tbl-pagination');
    const info = document.getElementById('tbl-page-info');
    if (!nav) return;
    const total = Math.ceil(tableData.length / PAGE_SIZE);
    nav.innerHTML = buildPagination(tablePage, total, tableWindow, 'tblGoPage', 'tblGoWin');
    if (info) {
      const start = (tablePage - 1) * PAGE_SIZE + 1;
      const end = Math.min(tablePage * PAGE_SIZE, tableData.length);
      info.textContent = tableData.length ? start + '–' + end + ' / 전체 ' + tableData.length + '개' : '0개';
    }
  }

  function tblGoPage(page) {
    const total = Math.ceil(tableData.length / PAGE_SIZE);
    if (page < 1 || page > total) return;
    tablePage = page;
    renderMainTable();
  }

  function tblGoWin(win) {
    tableWindow = win;
    tablePage = win;
    renderMainTable();
  }

  function tblSort(col) {
    tableSortState = tableSortState.col === col
      ? { col, dir: tableSortState.dir === 'asc' ? 'desc' : 'asc' }
      : { col, dir: 'asc' };

    ['name','platform','send','rate'].forEach(key => {
      const icon = document.getElementById('si-' + key);
      if (icon) {
        icon.className = 'sort-icon';
        icon.textContent = '↕';
      }
    });

    const icon = document.getElementById('si-' + col);
    if (icon) {
      icon.className = 'sort-icon ' + tableSortState.dir;
      icon.textContent = tableSortState.dir === 'asc' ? '↑' : '↓';
    }

    tableData.sort((a, b) => compareRows(a, b, col, tableSortState.dir));
    tablePage = 1;
    renderMainTable();
  }

  function tblRowCheck(input, idx) {
    if (input.checked) tableSelected.add(idx);
    else tableSelected.delete(idx);
    renderMainTable();
  }

  function tblSelectAll(input) {
    const start = (tablePage - 1) * PAGE_SIZE;
    const pageIdxs = tableData.slice(start, start + PAGE_SIZE).map((_, index) => start + index);
    if (input.checked) pageIdxs.forEach(index => tableSelected.add(index));
    else pageIdxs.forEach(index => tableSelected.delete(index));
    renderMainTable();
  }

  function renderDropdownTable() {
    const body = document.getElementById('tbl-dropdown-body');
    if (!body) return;
    body.innerHTML = dropdownData.map(row => `
      <tr>
        <td>${row.name}</td>
        <td>${row.platform}</td>
        <td><span class="badge badge-${row.status}">${row.statusLabel}</span></td>
        <td>${row.send ? row.send.toLocaleString() : '—'}</td>
        <td>${row.rate ? row.rate + '%' : '—'}</td>
      </tr>
    `).join('');
  }

  function resetDropdownSortUi() {
    document.querySelectorAll('.table-sort-menu .dropdown-item')
      .forEach(item => item.classList.remove('active'));
  }

  function closeDropdowns() {
    document.querySelectorAll('.dropdown-menu.open').forEach(menu => menu.classList.remove('open'));
    document.querySelectorAll('.table-title-menu.is-open').forEach(button => {
      button.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    });
  }

  function positionDropdown(menu, trigger) {
    const margin = 8;
    const rect = trigger.getBoundingClientRect();
    const availableWidth = Math.max(120, window.innerWidth - margin * 2);
    const menuWidth = Math.min(Math.max(rect.width, 180), availableWidth);
    const preferredLeft = rect.left + rect.width / 2 - menuWidth / 2;
    const maxLeft = Math.max(margin, window.innerWidth - menuWidth - margin);
    const left = Math.min(Math.max(preferredLeft, margin), maxLeft);

    if (menu.parentElement !== document.body) document.body.appendChild(menu);

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

    const trigger = document.getElementById(id + '-btn') || menu.previousElementSibling;
    if (!trigger) return;
    positionDropdown(menu, trigger);
    menu.classList.add('open');
    trigger.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function tblDropdownSort(col, dir) {
    resetDropdownSortUi();
    if (dir === 'none') {
      dropdownData = [...TABLE_DATA];
    } else {
      dropdownData = [...TABLE_DATA].sort((a, b) => compareRows(a, b, col, dir));
    }

    const active = document.querySelector('.table-sort-menu [data-sort-col="' + col + '"][data-sort-dir="' + dir + '"]');
    if (active) active.classList.add('active');
    renderDropdownTable();
    closeDropdowns();
  }

  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdown, .dropdown-menu')) closeDropdowns();
  });

  window.tblGoPage = window.tblGoPage || tblGoPage;
  window.tblGoWin = window.tblGoWin || tblGoWin;
  window.tblSort = window.tblSort || tblSort;
  window.tblRowCheck = window.tblRowCheck || tblRowCheck;
  window.tblSelectAll = window.tblSelectAll || tblSelectAll;
  window.tblDropdownSort = window.tblDropdownSort || tblDropdownSort;
  window.toggleDropdown = window.toggleDropdown || toggleDropdown;

  setTimeout(() => {
    renderMainTable();
    renderDropdownTable();
  }, 0);
})();
