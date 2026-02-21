/* ═══════════════════════════════════════════════════
   12-Week Gym Plan — Application Logic
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── STATE ── */
let currentUnit       = localStorage.getItem('gym_unit') || 'kg';
let goalTab           = 'active';
let currentWeekPage   = 1;
let volWeek           = 1;
let calYear           = new Date().getFullYear();
let calMonth          = new Date().getMonth();
let _activePage       = 'home';
let warmupActiveMuscle = null;
let hiitActiveGoal    = null;
let hiitGoalInterval  = null;
let hiitGoalRunning   = false;
let hiitGoalSecs      = 0;
let hiitGoalTotal     = 0;
let hiitGoalPhase     = 'work';
let hiitGoalRound     = 0;
let hiitGoalTargetRounds = 0;
let hiitGoalWorkSecs  = 30;
let hiitGoalRestSecs  = 15;

/* ── XSS HELPER ── */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── STORAGE HELPERS ── */
const ls   = (k, v) => v === undefined ? localStorage.getItem(k) : (localStorage.setItem(k, v), v);
const lsj  = (k)    => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
const lssj = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/* ── WORKOUT STORAGE ── */
function isChecked(w, di, ei)      { return ls(`gym_w${w}_d${di}_e${ei}`) === '1'; }
function setChecked(w, di, ei, v)  { v ? ls(`gym_w${w}_d${di}_e${ei}`, '1') : localStorage.removeItem(`gym_w${w}_d${di}_e${ei}`); }

function getWeekProgress(w) {
  let done = 0;
  DAYS.forEach((d, di) => d.exercises.forEach((_, ei) => { if (isChecked(w, di, ei)) done++; }));
  return { done, total: TOTAL_PER_WEEK, pct: Math.round(done / TOTAL_PER_WEEK * 100), complete: done === TOTAL_PER_WEEK };
}

function getGlobalProgress() {
  let done = 0;
  for (let w = 1; w <= 12; w++) DAYS.forEach((d, di) => d.exercises.forEach((_, ei) => { if (isChecked(w, di, ei)) done++; }));
  return Math.round(done / TOTAL_ALL * 100);
}

function getCompletedWeeksCount() {
  let c = 0;
  for (let w = 1; w <= 12; w++) if (getWeekProgress(w).complete) c++;
  return c;
}

function getTotalExDone() {
  let d = 0;
  for (let w = 1; w <= 12; w++) DAYS.forEach((dd, di) => dd.exercises.forEach((_, ei) => { if (isChecked(w, di, ei)) d++; }));
  return d;
}

function getStreak() {
  let last = 0;
  for (let w = 1; w <= 12; w++) if (getWeekProgress(w).complete) last = w;
  if (last === 0) return 0;
  let s = 0;
  for (let w = last; w >= 1; w--) { if (getWeekProgress(w).complete) s++; else break; }
  return s;
}

/* ── WEIGHT STORAGE ── */
function getWeights()        { return lsj('gym_weights') || {}; }
function setBodyWeight(w, v) { const d = getWeights(); if (v === null) delete d[w]; else d[w] = parseFloat(v); lssj('gym_weights', d); }
function getBodyWeight(w)    { const d = getWeights(); return d[w] !== undefined ? d[w] : null; }
function toDisp(kg)          { return currentUnit === 'kg' ? +kg.toFixed(1) : +(kg * 2.20462).toFixed(1); }
function toKg(v)             { return currentUnit === 'kg' ? parseFloat(v) : +(parseFloat(v) / 2.20462).toFixed(2); }

function setUnit(u) {
  currentUnit = u;
  ls('gym_unit', u);
  renderWeightSection();
  renderWeeksGrid();
  document.getElementById('btn-kg').classList.toggle('active', u === 'kg');
  document.getElementById('btn-lbs').classList.toggle('active', u === 'lbs');
}

/* ── EXERCISE WEIGHT STORAGE ── */
function getExWeightKey(week, dayIdx, exIdx, setNum) { return `exw_w${week}_d${dayIdx}_e${exIdx}_s${setNum}`; }
function getExWeight(week, dayIdx, exIdx, setNum)    { return ls(getExWeightKey(week, dayIdx, exIdx, setNum)) || ''; }
function setExWeight(week, dayIdx, exIdx, setNum, val) {
  const key = getExWeightKey(week, dayIdx, exIdx, setNum);
  if (val) ls(key, val); else localStorage.removeItem(key);
  checkAutoPR(week, dayIdx, exIdx, val);
}

/* ── NOTES STORAGE ── */
function getNoteKey(week, dayIdx)         { return `note_w${week}_d${dayIdx}`; }
function getNote(week, dayIdx)            { return ls(getNoteKey(week, dayIdx)) || ''; }
function setNote(week, dayIdx, txt)       { ls(getNoteKey(week, dayIdx), txt); }

/* ── CUSTOM EXERCISE OVERRIDES ── */
// Returns the effective override for week+day+exercise.
// Week-specific override takes priority over global (all-weeks) override.
function getCustomExercise(week, dayIdx, exIdx) {
  return lsj(`cex_w${week}_d${dayIdx}_e${exIdx}`) || lsj(`cex_all_d${dayIdx}_e${exIdx}`) || null;
}
// Returns true if ANY override (global or per-week) exists for this slot
function hasAnyCustomExercise(dayIdx, exIdx) {
  if (lsj(`cex_all_d${dayIdx}_e${exIdx}`)) return true;
  for (let w = 1; w <= 12; w++) if (lsj(`cex_w${w}_d${dayIdx}_e${exIdx}`)) return true;
  return false;
}

/* ── PR STORAGE ── */
function getPRs()           { return lsj('gym_prs') || {}; }
function savePRs(d)         { lssj('gym_prs', d); }
function getPRHistory()     { return lsj('gym_pr_history') || []; }
function savePRHistory(d)   { lssj('gym_pr_history', d); }

function logPR(lift, kg, reps) {
  const prs  = getPRs();
  const hist = getPRHistory();
  const isNew = !prs[lift] || kg > prs[lift].kg || (kg === prs[lift].kg && reps > prs[lift].reps);
  if (isNew) {
    prs[lift] = { kg, reps, date: new Date().toLocaleDateString() };
    savePRs(prs);
    hist.unshift({ lift, kg, reps, date: new Date().toLocaleDateString(), isNew: true });
    savePRHistory(hist.slice(0, 50));
    showToast('🔥', `New PR: ${lift} ${kg}kg × ${reps} reps!`);
    return true;
  }
  hist.unshift({ lift, kg, reps, date: new Date().toLocaleDateString(), isNew: false });
  savePRHistory(hist.slice(0, 50));
  return false;
}

function checkAutoPR(week, dayIdx, exIdx, val) {
  if (!val) return;
  const exName   = DAYS[dayIdx]?.exercises[exIdx]?.name || '';
  const liftMatch = PR_LIFTS.find(l => exName.toLowerCase().includes(l.split('/')[0].toLowerCase().trim()));
  if (!liftMatch) return;
  const kg = parseFloat(val);
  if (isNaN(kg)) return;
  const prs = getPRs();
  if (!prs[liftMatch] || kg > prs[liftMatch].kg) {
    prs[liftMatch] = { kg, reps: 0, date: new Date().toLocaleDateString() };
    savePRs(prs);
    const hist = getPRHistory();
    hist.unshift({ lift: liftMatch, kg, reps: 0, date: new Date().toLocaleDateString(), isNew: true });
    savePRHistory(hist.slice(0, 50));
    showToast('🔥', `Auto PR detected: ${liftMatch} ${kg}${currentUnit}!`);
  }
}

/* ── GOALS STORAGE ── */
function getGoals()   { return lsj('gym_goals') || []; }
function saveGoals(g) { lssj('gym_goals', g); }

function addGoal() {
  const txt = document.getElementById('goal-txt-inp').value.trim();
  if (!txt) return;
  const type  = document.getElementById('goal-type-inp').value;
  const goals = getGoals();
  goals.push({ id: Date.now(), text: txt, type, done: false, created: new Date().toLocaleDateString(), doneDate: null });
  saveGoals(goals);
  document.getElementById('goal-txt-inp').value = '';
  renderGoals();
  showToast('🎯', 'New goal added!');
}

function toggleGoal(id) {
  const goals = getGoals();
  const g = goals.find(x => x.id === id);
  if (!g) return;
  g.done = !g.done;
  g.doneDate = g.done ? new Date().toLocaleDateString() : null;
  saveGoals(goals);
  renderGoals();
  updateStats();
  if (g.done) showToast('🎉', 'Goal achieved!');
}

function deleteGoal(id) {
  saveGoals(getGoals().filter(x => x.id !== id));
  renderGoals();
  updateStats();
}

function switchGoalTab(tab) {
  goalTab = tab;
  document.getElementById('tab-active').classList.toggle('active', tab === 'active');
  document.getElementById('tab-done').classList.toggle('active', tab === 'done');
  renderGoals();
}

/* ── THEME ── */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  ls('gym_theme', next);
  document.getElementById('theme-btn').textContent = isDark ? '☀️' : '🌙';
}

/* ── NOTIFICATIONS ── */
function requestNotifications() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') showToast('🔔', 'Reminders enabled!');
    });
  }
}

/* ── TODAY BANNER ── */
function renderTodayBanner() {
  const wrap = document.getElementById('today-banner-wrap');
  if (!wrap) return;
  const todayIdx = new Date().getDay();
  const dayData  = DAYS[todayIdx];
  let suggestWeek = 1;
  for (let w = 1; w <= 12; w++) { if (!getWeekProgress(w).complete) { suggestWeek = w; break; } }
  wrap.innerHTML = `
    <div class="today-banner" onclick="goToTodayWorkout(${suggestWeek},${todayIdx})">
      <div class="tb-icon">${DAY_ICONS[todayIdx]}</div>
      <div class="tb-text">
        <div class="tb-title">Today's Workout · Week ${suggestWeek}</div>
        <div class="tb-sub">${dayData.day}: ${dayData.focus} · ${dayData.exercises.length} exercises</div>
      </div>
      <div class="tb-arrow">›</div>
    </div>`;
}

function goToTodayWorkout(week, dayIdx) {
  currentWeekPage = week;
  showPage('week');
  setTimeout(() => {
    const block = document.getElementById(`day-block-${dayIdx}`);
    if (block) block.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
}

/* ── HOME ── */
function renderHome() {
  updateStats();
  renderWeightSection();
  renderWeeksGrid();
  renderTodayBanner();
  renderNotifSettings();
  document.getElementById('btn-kg').classList.toggle('active', currentUnit === 'kg');
  document.getElementById('btn-lbs').classList.toggle('active', currentUnit === 'lbs');
}

function updateStats() {
  const gPct = getGlobalProgress();
  document.getElementById('stat-wks').textContent        = getCompletedWeeksCount();
  document.getElementById('stat-ex').textContent         = getTotalExDone();
  document.getElementById('stat-goals-cnt').textContent  = getGoals().filter(g => g.done).length;
  document.getElementById('stat-pct').textContent        = gPct + '%';
  document.getElementById('prog-pct-big').textContent    = gPct + '%';
  document.getElementById('prog-fill').style.width       = gPct + '%';
  document.getElementById('streak-num').textContent      = getStreak();
  document.getElementById('prog-sub').textContent =
    gPct === 0   ? 'Just getting started' :
    gPct < 25    ? 'Early days — stay consistent!' :
    gPct < 50    ? 'Building momentum 🔥' :
    gPct < 75    ? 'Past halfway! 💪' :
    gPct < 100   ? 'Almost there! 🚀' : '🏆 Program Complete!';

  const dots = document.getElementById('prog-dots');
  dots.innerHTML = '';
  for (let w = 1; w <= 12; w++) {
    const p = getWeekProgress(w);
    const d = document.createElement('div');
    d.className = 'prog-dot' + (p.complete ? ' done' : p.done > 0 ? ' partial' : '');
    d.title     = `Week ${w}: ${p.pct}%`;
    d.onclick   = () => { currentWeekPage = w; showPage('week'); };
    dots.appendChild(d);
  }
}

/* ── WEIGHT SECTION ── */
function renderWeightSection() {
  const weights = getWeights();
  const entries = [];
  for (let w = 1; w <= 12; w++) if (weights[w] !== undefined) entries.push({ week: w, kg: weights[w] });
  const unit = currentUnit;

  if (entries.length > 0) {
    const first = entries[0], last = entries[entries.length - 1];
    const sv = toDisp(first.kg), lv = toDisp(last.kg);
    document.getElementById('wt-start').textContent     = sv + ' ' + unit;
    document.getElementById('wt-start-sub').textContent = 'Week ' + first.week;
    document.getElementById('wt-cur').textContent       = lv + ' ' + unit;
    document.getElementById('wt-cur-sub').textContent   = 'Week ' + last.week;
    if (entries.length > 1) {
      const diff = +(lv - sv).toFixed(1);
      const sign = diff < 0 ? '' : diff > 0 ? '+' : '';
      document.getElementById('wt-chg').textContent  = sign + diff + ' ' + unit;
      document.getElementById('wt-chg').className    = 'wstat-val ' + (diff < 0 ? 'loss' : diff > 0 ? 'gain' : '');
      document.getElementById('wt-chg-sub').textContent = `W${first.week}→W${last.week}`;
    } else {
      document.getElementById('wt-chg').textContent     = '—';
      document.getElementById('wt-chg').className       = 'wstat-val';
      document.getElementById('wt-chg-sub').textContent = 'Log 2+ weeks';
    }
  } else {
    ['wt-start', 'wt-cur', 'wt-chg'].forEach(id => { document.getElementById(id).textContent = '—'; document.getElementById(id).className = 'wstat-val'; });
    ['wt-start-sub', 'wt-cur-sub'].forEach(id => document.getElementById(id).textContent = 'No data');
    document.getElementById('wt-chg-sub').textContent = 'Log 2+ weeks';
  }

  const ca = document.getElementById('chart-area');
  if (entries.length < 2) {
    ca.innerHTML = `<div class="no-data-box"><div class="no-data-icon">📉</div><div class="no-data-txt">Open any week and log your Saturday weight.<br>Need 2+ entries to draw the chart.</div></div>`;
  } else {
    ca.innerHTML = '';
    ca.appendChild(buildWeightChart(entries));
  }
  renderWeightLog(entries);
}

function buildWeightChart(entries) {
  const W = 700, H = 200, P = { t: 22, r: 20, b: 36, l: 50 };
  const iW = W - P.l - P.r, iH = H - P.t - P.b;
  const vals = entries.map(e => toDisp(e.kg));
  const minV = Math.min(...vals), maxV = Math.max(...vals);
  const range = maxV - minV || 1, pad = range * 0.3;
  const yMin = minV - pad, yMax = maxV + pad;
  const xS = i => P.l + (entries[i].week - 1) / 11 * iW;
  const yS = v => P.t + (1 - (v - yMin) / (yMax - yMin)) * iH;
  const pts = entries.map((_, i) => `${xS(i).toFixed(1)},${yS(vals[i]).toFixed(1)}`);
  const line = 'M' + pts.join(' L');
  const area = `M${xS(0).toFixed(1)},${(P.t + iH).toFixed(1)} L${pts.join(' L')} L${xS(entries.length - 1).toFixed(1)},${(P.t + iH).toFixed(1)} Z`;

  let yticks = '';
  for (let i = 0; i <= 4; i++) {
    const v = yMin + (yMax - yMin) * i / 4;
    yticks += `<line x1="${P.l}" y1="${yS(v).toFixed(1)}" x2="${P.l + iW}" y2="${yS(v).toFixed(1)}" stroke="var(--border2)" stroke-width="1"/>` +
              `<text x="${(P.l - 6).toFixed(1)}" y="${(yS(v) + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="var(--muted)" font-family="Plus Jakarta Sans">${v.toFixed(1)}</text>`;
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'wt-chart');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.innerHTML = `
    <defs>
      <linearGradient id="wtg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${yticks}
    <path d="${area}" fill="url(#wtg)"/>
    <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${entries.map((_, i) => `
      <circle cx="${xS(i).toFixed(1)}" cy="${yS(vals[i]).toFixed(1)}" r="5" fill="var(--accent)" stroke="var(--bg)" stroke-width="2"/>
      <text x="${xS(i).toFixed(1)}" y="${(yS(vals[i]) - 11).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--accent)" font-weight="700" font-family="Plus Jakarta Sans">${vals[i]}</text>
      <text x="${xS(i).toFixed(1)}" y="${(P.t + iH + 18).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="Plus Jakarta Sans">W${entries[i].week}</text>
    `).join('')}`;
  return svg;
}

function renderWeightLog(entries) {
  const wrap = document.getElementById('wlog-wrap');
  if (entries.length === 0) { wrap.innerHTML = ''; return; }
  const unit = currentUnit;
  let html = `<div class="wlog-hd"><span>Week</span><span>Weight</span><span>Change</span><span></span></div>`;
  entries.forEach((e, i) => {
    const val = toDisp(e.kg);
    let ch = '—', cls = 'zero';
    if (i > 0) {
      const prev = toDisp(entries[i - 1].kg);
      const d = +(val - prev).toFixed(1);
      ch = (d < 0 ? '' : d > 0 ? '+' : '') + d + ' ' + unit;
      cls = d < 0 ? 'neg' : d > 0 ? 'pos' : 'zero';
    }
    html += `<div class="wlog-row"><span class="wlog-wk">Week ${e.week}</span><span class="wlog-wt">${val} <small style="font-size:10px;color:var(--muted)">${unit}</small></span><span class="wlog-ch ${cls}">${ch}</span><button class="wlog-del" onclick="delBodyWeight(${e.week})">✕</button></div>`;
  });
  wrap.innerHTML = html;
}

function delBodyWeight(w) { setBodyWeight(w, null); renderWeightSection(); }

/* ── WEEKS GRID ── */
function renderWeeksGrid() {
  const grid = document.getElementById('weeks-grid');
  grid.innerHTML = '';
  for (let w = 1; w <= 12; w++) {
    const prog  = getWeekProgress(w);
    const wt    = getBodyWeight(w);
    const wtTag = wt !== null ? `<div class="wc-wt">⚖ ${toDisp(wt)} ${currentUnit}</div>` : '<div style="height:16px"></div>';
    const trophy = prog.complete ? '<div class="wc-trophy">🏆</div>' : '<div style="width:24px"></div>';
    const card  = document.createElement('div');
    card.className = 'week-card' + (prog.complete ? ' complete' : '');
    card.innerHTML = `
      <div class="wc-top"><div class="wc-badge ${PHASE_CLS[w]}">${PHASE_NAMES[w]}</div>${trophy}</div>
      <div class="wc-num">${String(w).padStart(2, '0')}</div>
      <div class="wc-label">Week ${w}</div>
      ${wtTag}
      <div class="wc-bar-track"><div class="wc-bar-fill ${prog.complete ? 'comp' : ''}" style="width:${prog.pct}%"></div></div>
      <div class="wc-prog"><strong>${prog.done}</strong>/${prog.total} · <strong>${prog.pct}%</strong></div>`;
    card.onclick = () => { currentWeekPage = w; showPage('week'); };
    grid.appendChild(card);
  }
}

/* ── WEEK PAGE ── */
function renderWeekPage(week) {
  document.getElementById('wk-num-title').textContent   = week;
  document.getElementById('wk-phase-badge').textContent = PHASE_NAMES[week];
  document.getElementById('wk-phase-badge').className   = 'wk-phase ' + PHASE_CLS[week];
  document.getElementById('wk-guidance-txt').textContent = PHASES[week];
  const prog = getWeekProgress(week);
  document.getElementById('wk-prog-pct').textContent = prog.pct + '%';

  const body = document.getElementById('week-body');
  body.innerHTML = '';

  // Body weight card
  const wt     = getBodyWeight(week);
  const dispWt = wt !== null ? toDisp(wt) : '';
  const wi     = document.createElement('div');
  wi.className = 'wi-card';
  wi.innerHTML = `
    <div class="wi-icon">⚖️</div>
    <div class="wi-label">Saturday Weigh-In<span>Log end-of-week weight</span></div>
    <div class="wi-field">
      <input class="wi-inp" id="wi-inp" type="number" step="0.1" min="20" max="500"
        placeholder="${currentUnit === 'kg' ? '70.0' : '154'}" value="${dispWt}">
      <span class="wi-unit">${currentUnit}</span>
    </div>
    <button class="wi-btn" onclick="saveBodyWt(${week})">Save</button>
    <span class="wi-ok" id="wi-ok">✓ Saved!</span>
    ${wt !== null ? `<span style="font-size:11px;color:var(--blue);font-weight:600">${dispWt} ${currentUnit}</span>` : ''}`;
  body.appendChild(wi);

  // Complete banner
  const banner = document.createElement('div');
  banner.className = 'comp-banner' + (prog.complete ? ' show' : '');
  banner.id = 'comp-banner';
  banner.innerHTML = `
    <div class="cb-icon">🏆</div>
    <div class="cb-text">
      <strong>Week ${week} Complete!</strong>
      <span>${week < 12 ? 'Move on to Week ' + (week + 1) + ' when ready!' : 'You finished the full 12 weeks — LEGENDARY! 🎊'}</span>
    </div>`;
  body.appendChild(banner);

  // Day blocks
  DAYS.forEach((dayData, dayIdx) => {
    const block = document.createElement('div');
    block.className = 'day-block';
    block.id = `day-block-${dayIdx}`;
    block.innerHTML = `
      <div class="day-hd">
        <div class="day-hd-left">
          <span class="day-icon2">${DAY_ICONS[dayIdx]}</span>
          <div>
            <div class="day-name">${dayData.day}</div>
            <div class="day-focus">${dayData.focus}</div>
          </div>
        </div>
        <div class="day-right">
          <button class="day-done-all" onclick="checkAllDay(${week},${dayIdx})">✓ All</button>
        </div>
      </div>
      <div id="exlist-${dayIdx}"></div>
      <div class="day-notes-wrap">
        <div class="day-notes-lbl">📝 Notes</div>
        <textarea class="day-notes-inp" id="note-${dayIdx}"
          placeholder="How did this session feel? Any soreness, PRs, energy levels…"
          onchange="saveNote(${week},${dayIdx},this.value)">${getNote(week, dayIdx)}</textarea>
      </div>`;
    body.appendChild(block);

    const list = block.querySelector(`#exlist-${dayIdx}`);
    dayData.exercises.forEach((ex, exIdx) => {
      const row            = document.createElement('div');
      row.className        = 'ex-row' + (isChecked(week, dayIdx, exIdx) ? ' done' : '');
      row.id               = `exr-${dayIdx}-${exIdx}`;
      const hasWeightInputs = !ex.cardio && ex.numSets > 0;
      let setsHtml = '';
      if (hasWeightInputs) {
        setsHtml = `<div class="ex-sets-inputs" id="si-${dayIdx}-${exIdx}">`;
        for (let s = 0; s < Math.min(ex.numSets, 4); s++) {
          const curVal  = getExWeight(week, dayIdx, exIdx, s);
          const prevVal = week > 1 ? getExWeight(week - 1, dayIdx, exIdx, s) : '';
          setsHtml += `
            <div class="set-input-wrap">
              <div class="set-lbl">Set ${s + 1}</div>
              <input class="set-inp" type="number" step="0.5" min="0" max="500"
                placeholder="${currentUnit === 'kg' ? 'kg' : 'lbs'}" value="${curVal}"
                data-week="${week}" data-day="${dayIdx}" data-ex="${exIdx}" data-set="${s}"
                oninput="onSetWeightChange(this)">
              <div class="set-prev-hint">${prevVal ? 'Prev: ' + prevVal : '—'}</div>
            </div>`;
        }
        setsHtml += '</div>';
      }
      const imgUrl = EX_IMAGES[ex.name];
      const imgHtml = imgUrl
        ? `<img class="ex-thumb" src="${imgUrl}" alt="${esc(ex.name)}" loading="lazy" onerror="this.style.display='none'">`
        : '';
      const customEx = getCustomExercise(week, dayIdx, exIdx);
      const displayName = customEx ? customEx.name : ex.name;
      const displaySets = customEx ? customEx.sets : ex.sets;
      const displayAlt  = customEx ? (customEx.alt || ex.alt || '') : (ex.alt || '');
      const altHtml = displayAlt ? `<div class="ex-alt">Alt: ${esc(displayAlt)}</div>` : '';
      row.innerHTML = `
        <div class="ex-main" onclick="toggleEx(${week},${dayIdx},${exIdx})">
          <div class="ex-cb"><svg viewBox="0 0 12 10"><polyline points="1 5 4.5 9 11 1"/></svg></div>
          ${imgHtml}
          <div class="ex-name-wrap"><div class="ex-nm${ex.cardio ? ' cardio' : ''}">${esc(displayName)}</div>${altHtml}</div>
          <div class="ex-sets-lbl">${esc(displaySets)}</div>
          ${hasWeightInputs ? `<button class="ex-expand-btn" onclick="event.stopPropagation();toggleSetInputs('si-${dayIdx}-${exIdx}')" title="Log weights">📊</button>` : ''}
        </div>
        ${setsHtml}`;
      list.appendChild(row);
    });
  });
}

function saveNote(week, dayIdx, txt)  { setNote(week, dayIdx, txt); }

function saveBodyWt(week) {
  const inp = document.getElementById('wi-inp');
  const val = parseFloat(inp.value);
  if (isNaN(val) || val < 20 || val > 500) {
    inp.style.borderColor = 'rgba(248,113,113,0.5)';
    setTimeout(() => inp.style.borderColor = '', 1200);
    return;
  }
  setBodyWeight(week, toKg(val));
  const ok = document.getElementById('wi-ok');
  ok.classList.add('show');
  setTimeout(() => ok.classList.remove('show'), 2000);
  showToast('⚖️', `Week ${week} weight: ${val} ${currentUnit}`);
}

function toggleSetInputs(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function onSetWeightChange(inp) {
  const week = +inp.dataset.week, dayIdx = +inp.dataset.day, exIdx = +inp.dataset.ex, setNum = +inp.dataset.set;
  setExWeight(week, dayIdx, exIdx, setNum, inp.value);
}

function toggleEx(week, dayIdx, exIdx) {
  const wasComp = getWeekProgress(week).complete;
  const val     = !isChecked(week, dayIdx, exIdx);
  setChecked(week, dayIdx, exIdx, val);
  if (val) markTodayWorkedPartial();
  const row = document.getElementById(`exr-${dayIdx}-${exIdx}`);
  val ? row.classList.add('done') : row.classList.remove('done');
  const prog   = getWeekProgress(week);
  document.getElementById('wk-prog-pct').textContent = prog.pct + '%';
  const banner = document.getElementById('comp-banner');
  if (banner) prog.complete ? banner.classList.add('show') : banner.classList.remove('show');
  if (!wasComp && prog.complete) showToast('🏆', `Week ${week} COMPLETE! Trophy earned! 🎉`);
}

function checkAllDay(week, dayIdx) {
  DAYS[dayIdx].exercises.forEach((_, exIdx) => {
    setChecked(week, dayIdx, exIdx, true);
    const r = document.getElementById(`exr-${dayIdx}-${exIdx}`);
    if (r) r.classList.add('done');
  });
  const prog   = getWeekProgress(week);
  document.getElementById('wk-prog-pct').textContent = prog.pct + '%';
  const banner = document.getElementById('comp-banner');
  if (banner && prog.complete) banner.classList.add('show');
  if (prog.complete) showToast('🔥', `Week ${week} complete!`);
}

/* ── GOALS PAGE ── */
function renderGoals() {
  const goals  = getGoals();
  const active = goals.filter(g => !g.done);
  const done   = goals.filter(g => g.done);
  document.getElementById('cnt-active').textContent = active.length;
  document.getElementById('cnt-done').textContent   = done.length;
  const list = document.getElementById('goals-list');
  const show = goalTab === 'active' ? active : done;
  if (show.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">${goalTab === 'active' ? '🎯' : '✅'}</div><div class="empty-txt">${goalTab === 'active' ? 'No active goals yet.' : 'No completed goals yet.'}</div></div>`;
    return;
  }
  const TYPE_LABELS = { workout: '💪 Workout', weight: '⚖️ Weight', strength: '🏋️ Strength', other: '⭐ Other' };
  list.innerHTML = show.map(g => `
    <div class="goal-item${g.done ? ' done' : ''}">
      <div class="goal-chk" onclick="toggleGoal(${g.id})"><svg viewBox="0 0 12 10"><polyline points="1 5 4.5 9 11 1"/></svg></div>
      <div class="goal-info">
        <div class="goal-txt">${esc(g.text)}</div>
        <div class="goal-meta2">
          <span class="goal-type-tag ${esc(g.type)}">${TYPE_LABELS[g.type] || esc(g.type)}</span>
          <span class="goal-date">${g.done ? 'Achieved ' + esc(g.doneDate || '') : 'Added ' + esc(g.created || '')}</span>
        </div>
      </div>
      <button class="goal-del" onclick="deleteGoal(${g.id})">✕</button>
    </div>`).join('');
}

/* ── PR PAGE ── */
function renderPRPage() {
  const prs    = getPRs();
  const hist   = getPRHistory();
  const grid   = document.getElementById('pr-grid');
  grid.innerHTML = PR_LIFTS.map(lift => {
    const pr = prs[lift];
    const safeId = lift.replace(/\//g, '_').replace(/ /g, '_');
    return `
      <div class="pr-card">
        <div class="pr-card-top"><div class="pr-card-name">${lift}</div><div class="pr-card-icon">🏋️</div></div>
        <div class="pr-card-val">${pr ? pr.kg + currentUnit : '—'}</div>
        <div class="pr-card-sub">${pr ? pr.reps + ' reps' : ''}</div>
        <div class="pr-card-date">${pr ? 'Set on ' + pr.date : ''}</div>
        <div class="pr-input-row">
          <input class="pr-inp" type="number" step="0.5" min="0" placeholder="${currentUnit}" id="pr-kg-${safeId}">
          <input class="pr-inp pr-reps-inp" type="number" min="1" placeholder="reps" id="pr-reps-${safeId}">
          <button class="pr-save-btn" onclick="savePR('${lift}')">Log</button>
        </div>
      </div>`;
  }).join('');

  const histEl = document.getElementById('pr-hist-list');
  if (hist.length === 0) {
    histEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-txt">No PR history yet.</div></div>`;
    return;
  }
  histEl.innerHTML = hist.slice(0, 20).map(h => `
    <div class="pr-hist-item ${h.isNew ? 'pr-hist-new' : ''}">
      <div class="pr-hist-icon">${h.isNew ? '🔥' : '💪'}</div>
      <div class="pr-hist-info">
        <div class="pr-hist-lift">${h.lift}</div>
        <div class="pr-hist-sub">${h.kg}${currentUnit} × ${h.reps || '—'} reps · ${h.date}</div>
      </div>
      <div class="pr-hist-badge">${h.isNew ? 'NEW PR' : 'Logged'}</div>
    </div>`).join('');
}

function savePR(lift) {
  const safeId  = lift.replace(/\//g, '_').replace(/ /g, '_');
  const kgInp   = document.getElementById(`pr-kg-${safeId}`);
  const repsInp = document.getElementById(`pr-reps-${safeId}`);
  const kg      = parseFloat(kgInp.value);
  const reps    = parseInt(repsInp.value) || 0;
  if (isNaN(kg) || kg <= 0) {
    kgInp.style.borderColor = 'rgba(248,113,113,0.5)';
    setTimeout(() => kgInp.style.borderColor = '', 1200);
    return;
  }
  logPR(lift, kg, reps);
  kgInp.value = ''; repsInp.value = '';
  renderPRPage();
}

/* ── VOLUME PAGE ── */
function renderVolPage() {
  const sel = document.getElementById('vol-week-select');
  sel.innerHTML = '';
  for (let w = 1; w <= 12; w++) {
    const b = document.createElement('button');
    b.className = 'vol-week-btn' + (w === volWeek ? ' active' : '');
    b.textContent = 'Wk ' + w;
    b.onclick = () => { volWeek = w; renderVolPage(); };
    sel.appendChild(b);
  }

  const muscleSets = {};
  DAYS.forEach((d, di) => {
    d.exercises.forEach((ex, ei) => {
      if (ex.cardio || !ex.numSets || !isChecked(volWeek, di, ei)) return;
      const muscle = MUSCLE_MAP[ex.name] || 'Other';
      muscleSets[muscle] = (muscleSets[muscle] || 0) + ex.numSets;
    });
  });

  if (Object.keys(muscleSets).length === 0) {
    document.getElementById('vol-grid').innerHTML = `<div class="empty-state"><div class="empty-icon">💪</div><div class="empty-txt">No exercises completed in Week ${volWeek} yet.<br>Check off exercises to see your volume.</div></div>`;
    document.getElementById('vol-chart-area').innerHTML = '';
    return;
  }

  const muscles = Object.keys(muscleSets).sort((a, b) => muscleSets[b] - muscleSets[a]);
  const maxSets = Math.max(...Object.values(muscleSets));

  document.getElementById('vol-grid').innerHTML = muscles.map(m => `
    <div class="vol-card">
      <div class="vol-card-name">${m}</div>
      <div class="vol-card-sets" style="color:${MUSCLE_COLORS[m] || 'var(--purple)'}">${muscleSets[m]}</div>
      <div class="vol-card-lbl">sets / week</div>
      <div class="vol-bar-track"><div class="vol-bar-fill" style="width:${Math.round(muscleSets[m] / maxSets * 100)}%;background:${MUSCLE_COLORS[m] || 'var(--purple)'}"></div></div>
    </div>`).join('');

  // Bar chart
  const W = 700, H = 160, P = { t: 16, r: 16, b: 36, l: 40 };
  const iW = W - P.l - P.r, iH = H - P.t - P.b;
  const barW = Math.floor(iW / muscles.length) - 4;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.style.width   = '100%';
  svg.style.display = 'block';

  let bars = '';
  muscles.forEach((m, i) => {
    const x    = P.l + i * (iW / muscles.length);
    const barH = Math.round(muscleSets[m] / maxSets * iH);
    const y    = P.t + iH - barH;
    const col  = MUSCLE_COLORS[m] || 'var(--purple)';
    bars += `<rect x="${x + 2}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${col}" opacity="0.8"/>`;
    bars += `<text x="${(x + 2 + barW / 2).toFixed(1)}" y="${(P.t + iH + 16).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--muted)" font-family="Plus Jakarta Sans">${m.substring(0, 5)}</text>`;
    bars += `<text x="${(x + 2 + barW / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="${col}" font-family="Plus Jakarta Sans" font-weight="700">${muscleSets[m]}</text>`;
  });

  svg.innerHTML = `
    <line x1="${P.l}" y1="${P.t}" x2="${P.l}" y2="${P.t + iH}" stroke="var(--border2)" stroke-width="1"/>
    <line x1="${P.l}" y1="${P.t + iH}" x2="${P.l + iW}" y2="${P.t + iH}" stroke="var(--border2)" stroke-width="1"/>
    ${bars}`;
  const chartArea = document.getElementById('vol-chart-area');
  chartArea.innerHTML = '';
  chartArea.appendChild(svg);
}

/* ── CALENDAR ── */
function todayISO() {
  const n = new Date();
  return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
}

function getCalDates()      { return lsj('gym_cal_dates') || []; }
function saveCalDates(arr)  { lssj('gym_cal_dates', arr); }

function markTodayWorked() {
  const dates = getCalDates(), t = todayISO();
  if (!dates.includes(t)) { dates.push(t); saveCalDates(dates); }
}

function markTodayWorkedPartial() {
  const t       = todayISO();
  const partial = lsj('gym_cal_partial') || [];
  if (!partial.includes(t)) { partial.push(t); lssj('gym_cal_partial', partial); }
  const todayDow = new Date().getDay();
  const prog     = DAYS[todayDow]?.exercises?.reduce((s, _, ei) => s + (isChecked(currentWeekPage, todayDow, ei) ? 1 : 0), 0) || 0;
  const total    = DAYS[todayDow]?.exercises?.length || 0;
  if (prog === total && total > 0) markTodayWorked();
}

function renderCalendar() {
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-month-title').textContent = `${monthNames[calMonth]} ${calYear}`;
  const grid   = document.getElementById('cal-grid');
  grid.innerHTML = '';

  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const el = document.createElement('div');
    el.className   = 'cal-day-name';
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay     = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate();
  const today        = new Date();
  const workedDates  = getCalDates();
  const partialDates = lsj('gym_cal_partial') || [];

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const iso     = calYear + '-' + String(calMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    const date    = new Date(calYear, calMonth, d);
    const isToday = date.toDateString() === today.toDateString();
    const isFuture = date > today;
    const el = document.createElement('div');
    let cls = 'rest', icon = '';
    if (workedDates.includes(iso))        { cls = 'worked';  icon = '✓'; }
    else if (partialDates.includes(iso))  { cls = 'partial'; icon = '~'; }
    else if (isToday)                     { cls = 'today'; }
    else if (isFuture)                    { cls = 'future'; }
    el.className = `cal-day ${cls}`;
    el.innerHTML = `<div class="cal-day-num">${d}</div><div class="cal-day-icon">${icon}</div>`;
    grid.appendChild(el);
  }
}

function calPrev() { calMonth--; if (calMonth < 0)  { calMonth = 11; calYear--; } renderCalendar(); }
function calNext() { calMonth++; if (calMonth > 11) { calMonth = 0;  calYear++; } renderCalendar(); }

/* ── TIMER ── */
let timerSeconds = 90, timerTotal = 90, timerInterval = null, timerRunning = false;
let hiitMode = false, hiitPhase = 'work', hiitWorkTime = 30, hiitRestTime = 30, hiitRounds = 0;

function toggleTimer() { document.getElementById('timer-panel').classList.toggle('open'); }

function setTimerPreset(secs, label) {
  hiitMode = false;
  timerSeconds = secs; timerTotal = secs; timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('hiit-status').style.display = 'none';
  document.getElementById('timer-label').textContent   = label;
  document.getElementById('timer-start-btn').textContent = '▶ Start';
  updateTimerDisplay();
  document.querySelectorAll('.timer-preset').forEach(b => b.classList.remove('active'));
}

function startHIIT() {
  hiitMode = true; hiitPhase = 'work'; hiitRounds = 0;
  timerSeconds = hiitWorkTime; timerTotal = hiitWorkTime;
  timerRunning = false; clearInterval(timerInterval);
  const statusEl = document.getElementById('hiit-status');
  statusEl.style.display = 'block';
  statusEl.className     = 'hiit-status work';
  statusEl.textContent   = 'WORK';
  document.getElementById('timer-label').textContent     = 'HIIT 30s/30s';
  document.getElementById('timer-start-btn').textContent = '▶ Start';
  updateTimerDisplay();
}

function timerStartStop() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timer-start-btn').textContent = '▶ Start';
  } else {
    timerRunning = true;
    document.getElementById('timer-start-btn').textContent = '⏸ Pause';
    document.getElementById('timer-display').className     = 'timer-display running';
    timerInterval = setInterval(() => {
      timerSeconds--;
      if (timerSeconds <= 0) {
        if (hiitMode) {
          hiitRounds++;
          hiitPhase = hiitPhase === 'work' ? 'rest' : 'work';
          timerSeconds = hiitPhase === 'work' ? hiitWorkTime : hiitRestTime;
          timerTotal   = timerSeconds;
          const s = document.getElementById('hiit-status');
          s.className   = 'hiit-status ' + hiitPhase;
          s.textContent = hiitPhase === 'work' ? 'WORK' : 'REST';
          if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
        } else {
          clearInterval(timerInterval);
          timerRunning = false; timerSeconds = 0;
          document.getElementById('timer-display').className     = 'timer-display expired';
          document.getElementById('timer-start-btn').textContent = '▶ Start';
          if ('vibrate' in navigator) navigator.vibrate([300, 200, 300, 200, 300]);
          showToast('⏰', "Rest time's up! Back to work 💪");
        }
      }
      updateTimerDisplay();
    }, 1000);
  }
}

function timerReset() {
  clearInterval(timerInterval);
  timerRunning = false;
  if (hiitMode) {
    hiitPhase = 'work'; timerSeconds = hiitWorkTime; timerTotal = hiitWorkTime;
    const s = document.getElementById('hiit-status');
    s.className = 'hiit-status work'; s.textContent = 'WORK';
  } else {
    timerSeconds = timerTotal;
  }
  document.getElementById('timer-display').className     = 'timer-display';
  document.getElementById('timer-start-btn').textContent = '▶ Start';
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60), s = timerSeconds % 60;
  document.getElementById('timer-display').textContent = m + ':' + (s < 10 ? '0' + s : s);
}

/* ── TOAST ── */
let toastTimer = null;
function showToast(icon, msg) {
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent  = msg;
  const t = document.getElementById('toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── PAGE ROUTING ── */
function showPage(page, pushState = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('timer-fab').style.display = 'flex';

  const pageMap = {
    home:      () => { renderHome(); document.getElementById('nav-week').style.display = 'none'; },
    week:      () => { renderWeekPage(currentWeekPage); document.getElementById('nav-week').style.display = 'flex'; },
    warmup:    () => renderWarmupPage(),
    hiit:      () => renderHIITPage(),
    goals:     () => renderGoals(),
    pr:        () => renderPRPage(),
    vol:       () => renderVolPage(),
    cal:       () => renderCalendar(),
    nutr:      () => renderNutrPage(),
    customize: () => renderCustomizePage(),
  };

  const pageEl  = document.getElementById(`page-${page}`);
  const navEl   = document.getElementById(`nav-${page}`);
  if (pageEl) pageEl.classList.add('active');
  if (navEl)  navEl.classList.add('active');
  if (pageMap[page]) pageMap[page]();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pushState) {
    if (page === 'home') history.replaceState({ page: 'home' }, '', '');
    else history.pushState({ page, week: currentWeekPage }, '', '');
  }
  _activePage = page;
}

window.addEventListener('popstate', () => {
  if (_activePage !== 'home') { showPage('home', false); history.pushState({ page: 'home' }, '', ''); }
});

/* ── NUTRITION ── */
let nutrDay = new Date().getDay();

function getNutrKey(day)  { return `nutr_eaten_${day}_${new Date().toDateString()}`; }
function getWaterKey()    { return `nutr_water_${new Date().toDateString()}`; }
function getCalGoal()     { return parseInt(ls('nutr_cal_goal') || '1800'); }

function getNutrEaten(day) {
  try { return JSON.parse(localStorage.getItem(getNutrKey(day)) || '{}'); } catch { return {}; }
}

function setNutrEaten(day, key, qty) {
  const d = getNutrEaten(day);
  if (qty > 0) d[key] = qty; else delete d[key];
  localStorage.setItem(getNutrKey(day), JSON.stringify(d));
}

function getNutrQty(day, key) {
  const d = getNutrEaten(day);
  const v = d[key];
  if (v === true) return 1;   // legacy boolean → treat as 1 serving
  return (typeof v === 'number' && v > 0) ? v : 0;
}

function getWater()   { return parseInt(ls(getWaterKey()) || '0'); }
function setWater(n)  {
  ls(getWaterKey(), n);
  // persist to history so past days are recorded
  const hist = lsj('nutr_water_hist') || {};
  hist[new Date().toDateString()] = n;
  lssj('nutr_water_hist', hist);
}
function getWaterHistory() { return lsj('nutr_water_hist') || {}; }

function setCalGoal() {
  const v = parseInt(document.getElementById('cal-goal-inp').value);
  if (v >= 800 && v <= 5000) { ls('nutr_cal_goal', v); renderNutrPage(); showToast('🎯', 'Calorie goal updated!'); }
}

function computeDayNutr(day) {
  const plan = MEAL_PLAN[day];
  let cal = 0, protein = 0, carbs = 0, fat = 0;
  const qPre = getNutrQty(day, 'preGym');
  if (qPre > 0) {
    cal     += plan.preGym.cal     * qPre;
    protein += plan.preGym.protein * qPre;
    carbs   += plan.preGym.carbs   * qPre;
    fat     += plan.preGym.fat     * qPre;
  }
  ['breakfast', 'snack', 'dinner'].forEach(meal => {
    (plan[meal] || []).forEach((item, i) => {
      const q = getNutrQty(day, meal + '_' + i);
      if (q > 0) {
        cal     += item.cal     * q;
        protein += item.protein * q;
        carbs   += item.carbs   * q;
        fat     += item.fat     * q;
      }
    });
  });
  return {
    cal:     Math.round(cal),
    protein: Math.round(protein),
    carbs:   Math.round(carbs),
    fat:     Math.round(fat),
  };
}

function renderNutrPage() {
  const plan   = MEAL_PLAN[nutrDay];
  const eaten  = getNutrEaten(nutrDay);
  const goal   = getCalGoal();
  const totals = computeDayNutr(nutrDay);
  const water  = getWater();

  document.getElementById('cal-goal-inp').value = goal;

  // Ring
  const pct  = Math.min(1, totals.cal / goal);
  const circ = 264;
  document.getElementById('cal-ring-fill').style.strokeDashoffset = circ - (pct * circ);
  document.getElementById('cal-eaten').textContent           = totals.cal;
  document.getElementById('macro-protein-val').textContent   = totals.protein + 'g';
  document.getElementById('macro-carbs-val').textContent     = totals.carbs + 'g';
  document.getElementById('macro-fat-val').textContent       = totals.fat + 'g';
  const rem = Math.max(0, goal - totals.cal);
  document.getElementById('cal-remaining-lbl').textContent   = rem > 0 ? rem + ' kcal remaining' : '🎯 Goal reached!';

  // Macro bars
  document.getElementById('mb-protein').style.width = Math.min(100, Math.round(totals.protein / MACRO_GOALS.protein * 100)) + '%';
  document.getElementById('mb-carbs').style.width   = Math.min(100, Math.round(totals.carbs   / MACRO_GOALS.carbs   * 100)) + '%';
  document.getElementById('mb-fat').style.width     = Math.min(100, Math.round(totals.fat     / MACRO_GOALS.fat     * 100)) + '%';
  document.getElementById('mb-protein-val').textContent = totals.protein + ' / ' + MACRO_GOALS.protein + 'g';
  document.getElementById('mb-carbs-val').textContent   = totals.carbs   + ' / ' + MACRO_GOALS.carbs   + 'g';
  document.getElementById('mb-fat-val').textContent     = totals.fat     + ' / ' + MACRO_GOALS.fat     + 'g';

  // Water
  document.getElementById('water-val').textContent = water + ' / 8 glasses';
  const cups = document.getElementById('water-cups');
  cups.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const c = document.createElement('span');
    c.className   = 'water-cup' + (i < water ? ' filled' : '');
    c.textContent = '💧';
    c.onclick     = () => { setWater(i < water ? i : i + 1); renderNutrPage(); };
    cups.appendChild(c);
  }

  // Water history (last 7 days excluding today)
  const histEl = document.getElementById('water-hist-wrap');
  if (histEl) {
    const hist = getWaterHistory();
    const today = new Date().toDateString();
    // build last 7 days
    const rows = [];
    for (let d = 1; d <= 7; d++) {
      const dt  = new Date(); dt.setDate(dt.getDate() - d);
      const key = dt.toDateString();
      if (hist[key] !== undefined) {
        rows.push({ label: key, glasses: hist[key] });
      }
    }
    if (rows.length > 0) {
      histEl.innerHTML = `<div class="water-hist-title">Past 7 days</div>` +
        rows.map(r => `
          <div class="water-hist-row">
            <span class="water-hist-date">${r.label}</span>
            <span class="water-hist-cups">${'💧'.repeat(r.glasses)}${r.glasses === 0 ? '—' : ''}</span>
            <span class="water-hist-num">${r.glasses}/8</span>
          </div>`).join('');
    } else {
      histEl.innerHTML = '';
    }
  }

  // Day tabs
  const tabs = document.getElementById('nutr-day-tabs');
  tabs.innerHTML = '';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach((lbl, i) => {
    const b = document.createElement('button');
    b.className   = 'nutr-day-tab' + (i === nutrDay ? ' active' : '');
    b.textContent = lbl;
    b.onclick     = () => { nutrDay = i; renderNutrPage(); };
    tabs.appendChild(b);
  });

  // Meals
  const mealsEl = document.getElementById('nutr-meals');
  mealsEl.innerHTML = '';
  const MEAL_SECTIONS = [
    { key: 'preGym',     icon: '☕',  label: 'Pre-Gym',   items: [plan.preGym]   },
    { key: 'breakfast',  icon: '🍽️', label: 'Breakfast', items: plan.breakfast  },
    { key: 'snack',      icon: '🍎',  label: 'Snack',     items: plan.snack      },
    { key: 'dinner',     icon: '🌙',  label: 'Dinner',    items: plan.dinner     },
  ];

  MEAL_SECTIONS.forEach(sec => {
    const secCal = sec.items.reduce((s, item, i) => {
      const k = sec.key === 'preGym' ? 'preGym' : sec.key + '_' + i;
      const q = getNutrQty(nutrDay, k);
      return s + item.cal * q;
    }, 0);
    const totalSecCal = sec.items.reduce((s, item) => s + item.cal, 0);
    const div = document.createElement('div');
    div.className = 'meal-section';
    div.innerHTML = `<div class="meal-section-hd"><div class="meal-section-name">${sec.icon} ${sec.label}</div><div class="meal-section-cals">${Math.round(secCal)} / ${totalSecCal} kcal</div></div>`;
    sec.items.forEach((item, i) => {
      const k   = sec.key === 'preGym' ? 'preGym' : sec.key + '_' + i;
      const qty = getNutrQty(nutrDay, k);
      const row = document.createElement('div');
      row.className = 'meal-item' + (qty > 0 ? ' eaten' : '');
      const dispCal = Math.round(item.cal * (qty || 1));
      row.innerHTML = `
        <div class="meal-cb" style="cursor:pointer"><svg viewBox="0 0 12 10"><polyline points="1 5 4.5 9 11 1"/></svg></div>
        <div class="meal-item-info">
          <div class="meal-item-name">${esc(item.name)}</div>
          <div class="meal-item-macros">P: ${item.protein}g · C: ${item.carbs}g · F: ${item.fat}g <span style="color:var(--text2)">(per serving)</span></div>
          <div class="meal-item-qty-row">
            <span class="meal-qty-lbl">Servings:</span>
            <input class="meal-qty-inp" type="number" min="0" max="10" step="0.25"
              value="${qty > 0 ? qty : ''}" placeholder="0"
              data-day="${nutrDay}" data-key="${k}" data-base-cal="${item.cal}"
              oninput="onMealQtyChange(this)" onclick="event.stopPropagation()">
            <span class="meal-qty-cal">= <span>${qty > 0 ? Math.round(item.cal * qty) : 0}</span> kcal</span>
          </div>
        </div>
        <div class="meal-item-cal">${item.cal} kcal</div>`;
      // Clicking checkbox area toggles 0 ↔ 1
      row.querySelector('.meal-cb').addEventListener('click', (e) => {
        e.stopPropagation();
        const newQty = qty > 0 ? 0 : 1;
        setNutrEaten(nutrDay, k, newQty);
        renderNutrPage();
      });
      div.appendChild(row);
    });
    mealsEl.appendChild(div);
  });
}

function onMealQtyChange(inp) {
  const day  = parseInt(inp.dataset.day);
  const key  = inp.dataset.key;
  const qty  = parseFloat(inp.value) || 0;
  setNutrEaten(day, key, qty);
  // Update the kcal span inline without re-rendering full page
  const baseCal = parseFloat(inp.dataset.baseCal) || 0;
  const span = inp.closest('.meal-item-qty-row').querySelector('.meal-qty-cal span');
  if (span) span.textContent = Math.round(baseCal * qty);
  // Update totals
  const totals = computeDayNutr(day);
  const goal   = getCalGoal();
  const pct    = Math.min(1, totals.cal / goal);
  const circ   = 264;
  const fillEl = document.getElementById('cal-ring-fill');
  if (fillEl) fillEl.style.strokeDashoffset = circ - (pct * circ);
  const eatEl = document.getElementById('cal-eaten');
  if (eatEl) eatEl.textContent = totals.cal;
  const protEl = document.getElementById('macro-protein-val');
  if (protEl) protEl.textContent = totals.protein + 'g';
  const carbEl = document.getElementById('macro-carbs-val');
  if (carbEl) carbEl.textContent = totals.carbs + 'g';
  const fatEl = document.getElementById('macro-fat-val');
  if (fatEl) fatEl.textContent = totals.fat + 'g';
  const rem = Math.max(0, goal - totals.cal);
  const remEl = document.getElementById('cal-remaining-lbl');
  if (remEl) remEl.textContent = rem > 0 ? rem + ' kcal remaining' : '🎯 Goal reached!';
  const mbP = document.getElementById('mb-protein');
  if (mbP) mbP.style.width = Math.min(100, Math.round(totals.protein / MACRO_GOALS.protein * 100)) + '%';
  const mbC = document.getElementById('mb-carbs');
  if (mbC) mbC.style.width = Math.min(100, Math.round(totals.carbs / MACRO_GOALS.carbs * 100)) + '%';
  const mbF = document.getElementById('mb-fat');
  if (mbF) mbF.style.width = Math.min(100, Math.round(totals.fat / MACRO_GOALS.fat * 100)) + '%';
  const mbPV = document.getElementById('mb-protein-val');
  if (mbPV) mbPV.textContent = totals.protein + ' / ' + MACRO_GOALS.protein + 'g';
  const mbCV = document.getElementById('mb-carbs-val');
  if (mbCV) mbCV.textContent = totals.carbs + ' / ' + MACRO_GOALS.carbs + 'g';
  const mbFV = document.getElementById('mb-fat-val');
  if (mbFV) mbFV.textContent = totals.fat + ' / ' + MACRO_GOALS.fat + 'g';
  // Update item styling
  const row = inp.closest('.meal-item');
  if (row) qty > 0 ? row.classList.add('eaten') : row.classList.remove('eaten');
}

/* ── WARMUP PAGE ── */
function renderWarmupPage() {
  const grid = document.getElementById('warmup-grid');
  const container = document.getElementById('warmup-detail-container');
  if (!grid || !container) return;

  grid.innerHTML = Object.keys(WARMUP_DATA).map(muscle => {
    const d = WARMUP_DATA[muscle];
    const isActive = warmupActiveMuscle === muscle;
    return `
      <div class="warmup-card${isActive ? ' active' : ''}" onclick="openWarmupMuscle('${esc(muscle)}')"
           style="${isActive ? `border-color:${d.color}` : ''}">
        <div class="warmup-card-icon">${d.icon}</div>
        <div class="warmup-card-name">${esc(muscle)}</div>
        <div class="warmup-card-count">${d.exercises.length} exercises</div>
      </div>`;
  }).join('');

  if (warmupActiveMuscle && WARMUP_DATA[warmupActiveMuscle]) {
    const d = WARMUP_DATA[warmupActiveMuscle];
    container.innerHTML = `
      <div class="warmup-detail open">
        <div class="warmup-detail-header">
          <div class="warmup-detail-icon">${d.icon}</div>
          <div class="warmup-detail-title" style="color:${d.color}">${esc(warmupActiveMuscle)} Warm-Up</div>
        </div>
        ${d.exercises.map((ex, i) => `
          <div class="warmup-ex-row">
            <div class="warmup-ex-num" style="background:${d.color}22;color:${d.color}">${i + 1}</div>
            <div class="warmup-ex-info">
              <div class="warmup-ex-name">${esc(ex.name)}</div>
              <div class="warmup-ex-sets">${esc(ex.sets)}</div>
              <div class="warmup-ex-tip">${esc(ex.tip)}</div>
            </div>
          </div>`).join('')}
      </div>`;
  } else {
    container.innerHTML = '';
  }
}

function openWarmupMuscle(muscle) {
  warmupActiveMuscle = warmupActiveMuscle === muscle ? null : muscle;
  renderWarmupPage();
  if (warmupActiveMuscle) {
    setTimeout(() => {
      const detail = document.querySelector('.warmup-detail.open');
      if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

/* ── HIIT PAGE ── */
function renderHIITPage() {
  const grid = document.getElementById('hiit-goal-grid');
  const container = document.getElementById('hiit-detail-container');
  if (!grid || !container) return;

  grid.innerHTML = HIIT_PROGRAMS.map(prog => `
    <div class="hiit-goal-card${hiitActiveGoal === prog.id ? ' active' : ''}"
         onclick="openHIITGoal('${esc(prog.id)}')"
         style="--card-accent:${prog.color};border-color:${hiitActiveGoal === prog.id ? prog.color : 'var(--border)'}">
      <div class="hiit-goal-icon">${prog.icon}</div>
      <div class="hiit-goal-name" style="color:${prog.color}">${esc(prog.name)}</div>
      <div class="hiit-goal-tagline">${esc(prog.tagline)}</div>
    </div>`).join('');

  if (hiitActiveGoal) {
    const prog = HIIT_PROGRAMS.find(p => p.id === hiitActiveGoal);
    if (!prog) { container.innerHTML = ''; return; }

    // Sync custom inputs with current state
    const workSecs = hiitGoalWorkSecs;
    const restSecs = hiitGoalRestSecs;
    const rounds   = hiitGoalTargetRounds || prog.rounds;

    container.innerHTML = `
      <div class="hiit-detail open">
        <div class="hiit-detail-header">
          <div class="hiit-detail-top">
            <div class="hiit-detail-icon">${prog.icon}</div>
            <div class="hiit-detail-title" style="color:${prog.color}">${esc(prog.name)}</div>
          </div>
          <div class="hiit-detail-desc">${esc(prog.description)}</div>
          <div class="hiit-params-row">
            <div class="hiit-param-chip">Work: <span id="chip-work">${workSecs}s</span></div>
            <div class="hiit-param-chip">Rest: <span id="chip-rest">${restSecs}s</span></div>
            <div class="hiit-param-chip">Rounds: <span id="chip-rounds">${rounds}</span></div>
            <div class="hiit-param-chip">Total: ~<span id="chip-total">${Math.round((workSecs + restSecs) * rounds / 60)}min</span></div>
          </div>
        </div>
        <div class="hiit-timer-inline">
          <div class="hiit-timer-phase idle" id="hiit-g-phase">READY</div>
          <div class="hiit-timer-display" id="hiit-g-display">
            ${fmtTimerSecs(workSecs)}
          </div>
          <div class="hiit-timer-rounds">Round <span id="hiit-g-round">${hiitGoalRound}</span> / <span id="hiit-g-max">${rounds}</span></div>
          <div class="hiit-timer-controls">
            <button class="hiit-ctrl-btn primary" id="hiit-g-start" onclick="hiitGoalStartStop()">▶ Start</button>
            <button class="hiit-ctrl-btn secondary" onclick="hiitGoalReset()">Reset</button>
          </div>
          <div class="hiit-custom-row">
            <div class="hiit-custom-field">
              <div class="hiit-custom-lbl">Work (s)</div>
              <input class="hiit-custom-inp" id="hiit-inp-work" type="number" min="5" max="300" value="${workSecs}"
                oninput="hiitCustomChange()">
            </div>
            <div class="hiit-custom-field">
              <div class="hiit-custom-lbl">Rest (s)</div>
              <input class="hiit-custom-inp" id="hiit-inp-rest" type="number" min="5" max="300" value="${restSecs}"
                oninput="hiitCustomChange()">
            </div>
            <div class="hiit-custom-field">
              <div class="hiit-custom-lbl">Rounds</div>
              <input class="hiit-custom-inp" id="hiit-inp-rounds" type="number" min="1" max="30" value="${rounds}"
                oninput="hiitCustomChange()">
            </div>
          </div>
        </div>
        <div class="hiit-ex-section">
          <div class="hiit-ex-section-title">Exercises</div>
          <div class="hiit-ex-list">
            ${prog.exercises.map((ex, i) => {
              const img = EX_IMAGES[ex.name]
                ? `<img class="hiit-ex-thumb" src="${EX_IMAGES[ex.name]}" alt="${esc(ex.name)}" loading="lazy" onerror="this.style.display='none'">`
                : '';
              return `
              <div class="hiit-ex-item">
                <div class="hiit-ex-num" style="background:${prog.color}22;color:${prog.color}">${i + 1}</div>
                ${img}
                <div>
                  <div class="hiit-ex-name">${esc(ex.name)}</div>
                  <div class="hiit-ex-tip">${esc(ex.tip)}</div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>`;

    // Restore running state display if timer is running
    if (hiitGoalRunning) {
      updateHIITGoalDisplay();
    }
  } else {
    container.innerHTML = '';
  }
}

function openHIITGoal(id) {
  if (hiitActiveGoal === id) {
    hiitActiveGoal = null;
    hiitGoalStopTimer();
  } else {
    hiitGoalStopTimer();
    hiitActiveGoal = id;
    const prog = HIIT_PROGRAMS.find(p => p.id === id);
    if (prog) {
      hiitGoalWorkSecs    = prog.workSecs;
      hiitGoalRestSecs    = prog.restSecs;
      hiitGoalTargetRounds = prog.rounds;
      hiitGoalSecs        = prog.workSecs;
      hiitGoalTotal       = prog.workSecs;
      hiitGoalPhase       = 'work';
      hiitGoalRound       = 0;
      hiitGoalRunning     = false;
    }
  }
  renderHIITPage();
  if (hiitActiveGoal) {
    setTimeout(() => {
      const detail = document.querySelector('.hiit-detail.open');
      if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

function hiitCustomChange() {
  const wInp = document.getElementById('hiit-inp-work');
  const rInp = document.getElementById('hiit-inp-rest');
  const rdInp = document.getElementById('hiit-inp-rounds');
  if (!wInp) return;
  const w  = Math.max(5, parseInt(wInp.value) || hiitGoalWorkSecs);
  const r  = Math.max(5, parseInt(rInp.value) || hiitGoalRestSecs);
  const rd = Math.max(1, parseInt(rdInp.value) || hiitGoalTargetRounds);
  hiitGoalWorkSecs     = w;
  hiitGoalRestSecs     = r;
  hiitGoalTargetRounds = rd;
  // Update chips
  const cw = document.getElementById('chip-work');   if (cw) cw.textContent = w + 's';
  const cr = document.getElementById('chip-rest');   if (cr) cr.textContent = r + 's';
  const crds = document.getElementById('chip-rounds'); if (crds) crds.textContent = rd;
  const ct = document.getElementById('chip-total');  if (ct) ct.textContent = Math.round((w + r) * rd / 60) + 'min';
  const mx = document.getElementById('hiit-g-max');  if (mx) mx.textContent = rd;
  // If timer not running, reset to new work time
  if (!hiitGoalRunning) {
    hiitGoalSecs  = w;
    hiitGoalTotal = w;
    hiitGoalPhase = 'work';
    hiitGoalRound = 0;
    updateHIITGoalDisplay();
  }
}

function hiitGoalStartStop() {
  if (hiitGoalRunning) {
    hiitGoalStopTimer();
    const btn = document.getElementById('hiit-g-start');
    if (btn) btn.textContent = '▶ Resume';
  } else {
    hiitGoalRunning = true;
    const btn = document.getElementById('hiit-g-start');
    if (btn) btn.textContent = '⏸ Pause';
    hiitGoalInterval = setInterval(() => {
      hiitGoalSecs--;
      if (hiitGoalSecs <= 0) {
        if (hiitGoalPhase === 'work') {
          hiitGoalPhase = 'rest';
          hiitGoalSecs  = hiitGoalRestSecs;
          hiitGoalTotal = hiitGoalRestSecs;
          if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
        } else {
          hiitGoalRound++;
          if (hiitGoalRound >= hiitGoalTargetRounds) {
            hiitGoalStopTimer();
            hiitGoalRound = hiitGoalTargetRounds;
            updateHIITGoalDisplay();
            showToast('🏆', `HIIT complete! ${hiitGoalTargetRounds} rounds done!`);
            if ('vibrate' in navigator) navigator.vibrate([300, 200, 300, 200, 300]);
            return;
          }
          hiitGoalPhase = 'work';
          hiitGoalSecs  = hiitGoalWorkSecs;
          hiitGoalTotal = hiitGoalWorkSecs;
          if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
        }
      }
      updateHIITGoalDisplay();
    }, 1000);
  }
}

function hiitGoalStopTimer() {
  clearInterval(hiitGoalInterval);
  hiitGoalInterval = null;
  hiitGoalRunning  = false;
}

function hiitGoalReset() {
  hiitGoalStopTimer();
  hiitGoalPhase = 'work';
  hiitGoalSecs  = hiitGoalWorkSecs;
  hiitGoalTotal = hiitGoalWorkSecs;
  hiitGoalRound = 0;
  const btn = document.getElementById('hiit-g-start');
  if (btn) btn.textContent = '▶ Start';
  updateHIITGoalDisplay();
}

function updateHIITGoalDisplay() {
  const dispEl   = document.getElementById('hiit-g-display');
  const phaseEl  = document.getElementById('hiit-g-phase');
  const roundEl  = document.getElementById('hiit-g-round');
  if (!dispEl) return;
  dispEl.textContent = fmtTimerSecs(hiitGoalSecs);
  dispEl.className   = 'hiit-timer-display' + (hiitGoalRunning ? (hiitGoalPhase === 'work' ? ' work-phase' : ' rest-phase') : '');
  if (phaseEl) {
    phaseEl.textContent = hiitGoalPhase === 'work' ? 'WORK' : 'REST';
    phaseEl.className   = `hiit-timer-phase ${hiitGoalRunning ? hiitGoalPhase : 'idle'}`;
  }
  if (roundEl) roundEl.textContent = hiitGoalRound;
}

function fmtTimerSecs(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m + ':' + (sec < 10 ? '0' + sec : sec);
}

/* ── NOTIFICATIONS ── */
function saveNotifSettings() {
  const enabled = document.getElementById('notif-toggle-inp')?.checked || false;
  const time    = document.getElementById('notif-time-inp')?.value || '07:00';
  ls('gym_notif_enabled', enabled ? '1' : '0');
  ls('gym_notif_time', time);
  updateNotifStatus();
  if (enabled && Notification.permission === 'default') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') showToast('🔔', 'Notifications enabled!');
      updateNotifStatus();
    });
  }
}

function testNotification() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') { triggerWorkoutNotification(); }
      else showToast('❌', 'Notification permission denied');
      updateNotifStatus();
    });
    return;
  }
  triggerWorkoutNotification();
}

function triggerWorkoutNotification() {
  new Notification('12WK Grind 💪', {
    body: "Time for your workout! Let's crush it today.",
    icon: './icon-192.png',
    badge: './icon-192.png',
  });
  showToast('🔔', 'Test notification sent!');
}

function updateNotifStatus() {
  const el   = document.getElementById('notif-status');
  if (!el) return;
  const perm = Notification.permission;
  if (!('Notification' in window)) {
    el.textContent = 'Notifications not supported in this browser.';
    return;
  }
  if (perm === 'denied') {
    el.textContent = '⚠️ Notifications blocked. Enable in browser settings.';
  } else if (perm === 'granted') {
    const enabled = ls('gym_notif_enabled') === '1';
    const time    = ls('gym_notif_time') || '07:00';
    el.textContent = enabled ? `✓ Reminder set for ${time} daily (app must be open).` : 'Notifications allowed — enable the toggle to schedule.';
  } else {
    el.textContent = 'Tap Test to request notification permission.';
  }
}

function initNotificationScheduler() {
  if (!('Notification' in window)) return;
  setInterval(() => {
    if (Notification.permission !== 'granted') return;
    if (ls('gym_notif_enabled') !== '1') return;
    const savedTime = ls('gym_notif_time') || '07:00';
    const now       = new Date();
    const [hh, mm]  = savedTime.split(':').map(Number);
    if (now.getHours() === hh && now.getMinutes() === mm) {
      const sentKey = `gym_notif_sent_${now.toDateString()}`;
      if (!ls(sentKey)) {
        ls(sentKey, '1');
        triggerWorkoutNotification();
      }
    }
  }, 30000); // check every 30s
}

function renderNotifSettings() {
  const toggleInp = document.getElementById('notif-toggle-inp');
  const timeInp   = document.getElementById('notif-time-inp');
  if (toggleInp) toggleInp.checked = ls('gym_notif_enabled') === '1';
  if (timeInp)   timeInp.value     = ls('gym_notif_time') || '07:00';
  updateNotifStatus();
}

/* ── CUSTOMIZE PAGE ── */
let customizeEditState = null; // { dayIdx, exIdx, week }

function renderCustomizePage() {
  const wrap = document.getElementById('customize-body');
  if (!wrap) return;
  let html = '';
  DAYS.forEach((dayData, dayIdx) => {
    html += `<div class="cust-day-block">
      <div class="cust-day-hd">
        <span class="cust-day-icon">${DAY_ICONS[dayIdx]}</span>
        <div>
          <div class="cust-day-name">${dayData.day}</div>
          <div class="cust-day-focus">${dayData.focus}</div>
        </div>
      </div>
      <div class="cust-ex-list">`;
    dayData.exercises.forEach((ex, exIdx) => {
      const hasCustom = hasAnyCustomExercise(dayIdx, exIdx);
      // Show effective name (global override for display since no week context here)
      const globalOvr = lsj(`cex_all_d${dayIdx}_e${exIdx}`);
      const displayName = globalOvr ? globalOvr.name : ex.name;
      const displaySets = globalOvr ? globalOvr.sets : ex.sets;
      const displayAlt  = globalOvr ? (globalOvr.alt || ex.alt || '') : (ex.alt || '');
      html += `<div class="cust-ex-row ${hasCustom ? 'has-custom' : ''}">
        <div class="cust-ex-info">
          <div class="cust-ex-name">${esc(displayName)} <span class="cust-ex-sets">${esc(displaySets)}</span></div>
          ${displayAlt ? `<div class="cust-ex-alt">Alt: ${esc(displayAlt)}</div>` : ''}
          ${hasCustom ? `<div class="cust-ex-badge">✏️ Customized</div>` : ''}
        </div>
        <button class="cust-edit-btn" onclick="openCustomizeModal(${dayIdx},${exIdx})">Edit</button>
      </div>`;
    });
    html += `</div></div>`;
  });
  wrap.innerHTML = html;
}

function openCustomizeModal(dayIdx, exIdx) {
  const ex = DAYS[dayIdx].exercises[exIdx];
  customizeEditState = { dayIdx, exIdx };
  document.getElementById('cust-modal-title').textContent = `Edit: ${ex.name}`;
  document.getElementById('cust-modal-day').textContent = `${DAYS[dayIdx].day} · ${DAYS[dayIdx].focus}`;

  // Populate week selector
  const weekSel = document.getElementById('cust-week-sel');
  let opts = '<option value="all">All Weeks (global)</option>';
  for (let w = 1; w <= 12; w++) opts += `<option value="${w}">Week ${w} only</option>`;
  weekSel.innerHTML = opts;
  weekSel.value = 'all';

  // Load existing values (try global first)
  const globalOvr = lsj(`cex_all_d${dayIdx}_e${exIdx}`);
  if (globalOvr) {
    document.getElementById('cust-name-inp').value = globalOvr.name || ex.name;
    document.getElementById('cust-sets-inp').value = globalOvr.sets || ex.sets;
    document.getElementById('cust-alt-inp').value  = globalOvr.alt  !== undefined ? globalOvr.alt : (ex.alt || '');
  } else {
    document.getElementById('cust-name-inp').value = ex.name;
    document.getElementById('cust-sets-inp').value = ex.sets;
    document.getElementById('cust-alt-inp').value  = ex.alt || '';
  }

  // When week changes, load that week's override if any
  weekSel.onchange = function() {
    if (this.value === 'all') {
      const ovr = lsj(`cex_all_d${dayIdx}_e${exIdx}`);
      document.getElementById('cust-name-inp').value = ovr ? ovr.name : ex.name;
      document.getElementById('cust-sets-inp').value = ovr ? ovr.sets : ex.sets;
      document.getElementById('cust-alt-inp').value  = ovr ? (ovr.alt || '') : (ex.alt || '');
    } else {
      const w = parseInt(this.value);
      const weekOvr = lsj(`cex_w${w}_d${dayIdx}_e${exIdx}`) || lsj(`cex_all_d${dayIdx}_e${exIdx}`);
      document.getElementById('cust-name-inp').value = weekOvr ? weekOvr.name : ex.name;
      document.getElementById('cust-sets-inp').value = weekOvr ? weekOvr.sets : ex.sets;
      document.getElementById('cust-alt-inp').value  = weekOvr ? (weekOvr.alt || '') : (ex.alt || '');
    }
  };

  document.getElementById('cust-modal').classList.add('open');
}

function saveCustomizeModal() {
  if (!customizeEditState) return;
  const { dayIdx, exIdx } = customizeEditState;
  const weekVal = document.getElementById('cust-week-sel').value;
  const name    = document.getElementById('cust-name-inp').value.trim();
  const sets    = document.getElementById('cust-sets-inp').value.trim();
  const alt     = document.getElementById('cust-alt-inp').value.trim();

  if (!name) {
    document.getElementById('cust-name-inp').style.borderColor = 'rgba(248,113,113,0.5)';
    setTimeout(() => document.getElementById('cust-name-inp').style.borderColor = '', 1200);
    return;
  }

  const data = { name, sets: sets || DAYS[dayIdx].exercises[exIdx].sets, alt };

  if (weekVal === 'all') {
    lssj(`cex_all_d${dayIdx}_e${exIdx}`, data);
    for (let w = 1; w <= 12; w++) localStorage.removeItem(`cex_w${w}_d${dayIdx}_e${exIdx}`);
    showToast('✏️', 'Updated for all 12 weeks!');
  } else {
    const w = parseInt(weekVal);
    lssj(`cex_w${w}_d${dayIdx}_e${exIdx}`, data);
    showToast('✏️', `Updated for Week ${w} only!`);
  }

  closeCustomizeModal();
  renderCustomizePage();
}

function resetCustomizeModal() {
  if (!customizeEditState) return;
  const { dayIdx, exIdx } = customizeEditState;
  const weekVal = document.getElementById('cust-week-sel').value;
  if (weekVal === 'all') {
    localStorage.removeItem(`cex_all_d${dayIdx}_e${exIdx}`);
    for (let w = 1; w <= 12; w++) localStorage.removeItem(`cex_w${w}_d${dayIdx}_e${exIdx}`);
    showToast('🔄', 'Reset to original for all weeks');
  } else {
    const w = parseInt(weekVal);
    localStorage.removeItem(`cex_w${w}_d${dayIdx}_e${exIdx}`);
    showToast('🔄', `Reset to original for Week ${w}`);
  }
  const ex = DAYS[dayIdx].exercises[exIdx];
  document.getElementById('cust-name-inp').value = ex.name;
  document.getElementById('cust-sets-inp').value = ex.sets;
  document.getElementById('cust-alt-inp').value  = ex.alt || '';
  closeCustomizeModal();
  renderCustomizePage();
}

function closeCustomizeModal() {
  document.getElementById('cust-modal').classList.remove('open');
  customizeEditState = null;
}

/* ── INIT ── */
(function init() {
  const savedTheme = ls('gym_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-btn').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  history.replaceState({ page: 'home' }, '', '');
  requestNotifications();
  renderHome();
  renderNotifSettings();
  initNotificationScheduler();

  // PWA service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.error('SW error:', err));
    });
  }

  // PWA install prompt
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.createElement('button');
    btn.textContent = '📲 Install App';
    btn.style.cssText = 'position:fixed;bottom:84px;left:20px;z-index:400;background:var(--accent);border:none;color:var(--accent-text);font-family:"Plus Jakarta Sans",sans-serif;font-size:12px;font-weight:700;padding:10px 16px;border-radius:10px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.2);';
    btn.onclick = () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => { btn.remove(); deferredPrompt = null; });
    };
    document.body.appendChild(btn);
  });
})();
