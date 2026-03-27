// ============================================================
// STATE
// ============================================================
var state = {
  currentWeek: null,
  currentDay: null,
  completions: {},
  portfolioStatus: {}
};

// ============================================================
// PERSISTENCE
// ============================================================
function loadState() {
  try {
    var saved = localStorage.getItem('goalos-completions');
    if (saved) state.completions = JSON.parse(saved);
    var portfolio = localStorage.getItem('goalos-portfolio');
    if (portfolio) state.portfolioStatus = JSON.parse(portfolio);
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function saveCompletions() {
  try {
    localStorage.setItem('goalos-completions', JSON.stringify(state.completions));
  } catch (e) {
    console.warn('Failed to save completions:', e);
  }
}

function savePortfolio() {
  try {
    localStorage.setItem('goalos-portfolio', JSON.stringify(state.portfolioStatus));
  } catch (e) {
    console.warn('Failed to save portfolio:', e);
  }
}

// ============================================================
// EXPORT / IMPORT
// ============================================================
function exportData() {
  var data = {
    version: 1,
    exported: new Date().toISOString(),
    completions: state.completions,
    portfolioStatus: state.portfolioStatus
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  var dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = 'goal-os-backup-' + dateStr + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (data.completions) {
        state.completions = data.completions;
        saveCompletions();
      }
      if (data.portfolioStatus) {
        state.portfolioStatus = data.portfolioStatus;
        savePortfolio();
      }
      render();
    } catch (err) {
      alert('Invalid backup file');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ============================================================
// AUTO-DETECT TODAY
// ============================================================
function initToday() {
  var today = new Date();
  var isoToday = today.toISOString().split('T')[0];

  for (var weekKey in WEEKS) {
    var weekData = WEEKS[weekKey];
    for (var dayLabel in weekData.days) {
      if (weekData.days[dayLabel].isoDate === isoToday) {
        state.currentWeek = weekKey;
        state.currentDay = dayLabel;
        return;
      }
    }
  }

  // Default to first week/day
  var firstWeek = Object.keys(WEEKS)[0];
  state.currentWeek = firstWeek;
  state.currentDay = Object.keys(WEEKS[firstWeek].days)[0];
}

// ============================================================
// HELPERS
// ============================================================
function getWeekKeys() { return Object.keys(WEEKS); }
function getDayKeys(weekKey) { return Object.keys(WEEKS[weekKey].days); }
function taskKey(week, day, pillar) { return week + ':' + day + ':' + pillar; }
function isComplete(week, day, pillar) { return !!state.completions[taskKey(week, day, pillar)]; }

function toggleTask(week, day, pillar) {
  var key = taskKey(week, day, pillar);
  if (state.completions[key]) {
    delete state.completions[key];
  } else {
    state.completions[key] = { done: true, timestamp: new Date().toISOString() };
  }
  saveCompletions();
  render();
}

function dayCompletionCount(week, day) {
  var count = 0;
  PILLARS.forEach(function(p) { if (isComplete(week, day, p)) count++; });
  return count;
}

function weekCompletionCount(week) {
  var count = 0;
  getDayKeys(week).forEach(function(d) {
    PILLARS.forEach(function(p) { if (isComplete(week, d, p)) count++; });
  });
  return count;
}

function calculateStreak() {
  var allDays = [];
  getWeekKeys().forEach(function(wk) {
    getDayKeys(wk).forEach(function(d) { allDays.push({ week: wk, day: d }); });
  });

  var todayIdx = allDays.findIndex(function(x) {
    return x.week === state.currentWeek && x.day === state.currentDay;
  });

  var best = 0;
  var tempStreak = 0;

  for (var i = 0; i <= todayIdx && i < allDays.length; i++) {
    if (dayCompletionCount(allDays[i].week, allDays[i].day) === PILLAR_COUNT) {
      tempStreak++;
      if (tempStreak > best) best = tempStreak;
    } else {
      tempStreak = 0;
    }
  }
  return { current: tempStreak, best: best };
}

function changeWeek(delta) {
  var keys = getWeekKeys();
  var idx = keys.indexOf(state.currentWeek);
  var newIdx = idx + delta;
  if (newIdx >= 0 && newIdx < keys.length) {
    state.currentWeek = keys[newIdx];
    state.currentDay = getDayKeys(state.currentWeek)[0];
    render();
  }
}

function getNextMilestone() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  for (var i = 0; i < MILESTONES.length; i++) {
    var mDate = new Date(MILESTONES[i].date + 'T00:00:00');
    if (mDate >= today) return MILESTONES[i];
  }
  return MILESTONES[MILESTONES.length - 1];
}

function getWeedFreeDays() {
  var quitDate = new Date('2026-02-25T00:00:00');
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today - quitDate) / (1000 * 60 * 60 * 24));
}

// ============================================================
// PORTFOLIO
// ============================================================
var PORTFOLIO_CYCLE = ['not-started', 'in-progress', 'done'];
var PORTFOLIO_LABELS = { 'not-started': 'Not Started', 'in-progress': 'In Progress', 'done': 'Done' };

function getPortfolioStatus(id) {
  if (state.portfolioStatus[id]) return state.portfolioStatus[id];
  var item = PORTFOLIO_ITEMS.find(function(p) { return p.id === id; });
  return item ? item.defaultStatus : 'not-started';
}

function cyclePortfolio(id) {
  var current = getPortfolioStatus(id);
  var idx = PORTFOLIO_CYCLE.indexOf(current);
  var next = PORTFOLIO_CYCLE[(idx + 1) % PORTFOLIO_CYCLE.length];
  state.portfolioStatus[id] = next;
  savePortfolio();
  render();
}

// ============================================================
// RENDER
// ============================================================
function render() {
  var week = WEEKS[state.currentWeek];
  var dayData = week.days[state.currentDay];

  // Date
  document.getElementById('currentDate').textContent = dayData.date + ', 2026';

  // Phase tag
  var phaseTag = document.getElementById('phaseTag');
  if (week.phase === 1) {
    phaseTag.textContent = 'Month 1: Build the Arsenal';
    phaseTag.className = 'phase-tag phase-1';
  } else if (week.phase === 2) {
    phaseTag.textContent = 'Month 2: Deploy the Network';
    phaseTag.className = 'phase-tag phase-2';
  } else {
    phaseTag.textContent = 'Month 3: Apply with Advantage';
    phaseTag.className = 'phase-tag phase-3';
  }

  // Weed counter
  document.getElementById('weedDays').textContent = getWeedFreeDays();

  // Week label
  document.getElementById('weekLabel').textContent = week.label.split(':')[0].trim();

  // Day tabs
  var tabsEl = document.getElementById('dayTabs');
  tabsEl.innerHTML = '';
  getDayKeys(state.currentWeek).forEach(function(d) {
    var tab = document.createElement('div');
    var dc = dayCompletionCount(state.currentWeek, d);
    var cls = 'day-tab';
    if (d === state.currentDay) cls += ' active';
    if (dc === PILLAR_COUNT) cls += ' perfect';
    else if (dc > 0) cls += ' has-completions';
    tab.className = cls;
    tab.textContent = d;
    tab.onclick = function() { state.currentDay = d; render(); };
    tabsEl.appendChild(tab);
  });

  // Scores
  document.getElementById('todayScore').textContent =
    dayCompletionCount(state.currentWeek, state.currentDay) + '/' + PILLAR_COUNT;

  var weekTotal = getDayKeys(state.currentWeek).length * PILLAR_COUNT;
  document.getElementById('weekScore').textContent =
    weekCompletionCount(state.currentWeek) + '/' + weekTotal;

  var streaks = calculateStreak();
  document.getElementById('bestStreak').textContent = streaks.best + 'd';
  document.getElementById('currentStreak').textContent = streaks.current + 'd';

  // Milestone
  var milestone = getNextMilestone();
  document.getElementById('milestoneText').textContent = milestone.text;
  var mDate = new Date(milestone.date + 'T00:00:00');
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var daysUntil = Math.ceil((mDate - today) / (1000 * 60 * 60 * 24));
  var dateStr = mDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (daysUntil === 0) {
    document.getElementById('milestoneDate').textContent = dateStr + ' (today)';
  } else if (daysUntil === 1) {
    document.getElementById('milestoneDate').textContent = dateStr + ' (tomorrow)';
  } else if (daysUntil < 0) {
    document.getElementById('milestoneDate').textContent = dateStr + ' (overdue)';
  } else {
    document.getElementById('milestoneDate').textContent = dateStr + ' (' + daysUntil + ' days)';
  }

  // Pillar cards
  var cardsEl = document.getElementById('pillarCards');
  cardsEl.innerHTML = '';

  PILLARS.forEach(function(p) {
    var task = dayData.tasks[p];
    var done = isComplete(state.currentWeek, state.currentDay, p);

    // Pillar streak
    var pillarStreak = 0;
    var allDays = [];
    getWeekKeys().forEach(function(wk) {
      getDayKeys(wk).forEach(function(d) { allDays.push({ week: wk, day: d }); });
    });
    var todayIdx = allDays.findIndex(function(x) {
      return x.week === state.currentWeek && x.day === state.currentDay;
    });
    for (var i = todayIdx; i >= 0; i--) {
      if (isComplete(allDays[i].week, allDays[i].day, p)) {
        pillarStreak++;
      } else {
        break;
      }
    }

    var card = document.createElement('div');
    card.className = 'pillar-card ' + p;
    card.innerHTML =
      '<div class="pillar-header">' +
        '<div class="pillar-name">' + PILLAR_NAMES[p] + '</div>' +
        (pillarStreak > 0 ? '<div class="pillar-streak">' + pillarStreak + 'd streak</div>' : '') +
      '</div>' +
      '<div class="task-text">' + task.text + '</div>' +
      '<div class="task-context">' + task.context + '</div>' +
      '<div class="task-check ' + (done ? 'checked' : '') + '" onclick="toggleTask(\'' + state.currentWeek + '\', \'' + state.currentDay + '\', \'' + p + '\')">' +
        '<div class="checkbox">' +
          '<svg width="14" height="14" viewBox="0 0 14 14" fill="none">' +
            '<path d="M2.5 7L5.5 10L11.5 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
        '</div>' +
        '<span class="check-label">' + (done ? 'Done' : 'Mark complete') + '</span>' +
      '</div>';
    cardsEl.appendChild(card);
  });

  // Weekly grid
  var gridEl = document.getElementById('weeklyGrid');
  gridEl.innerHTML = '';
  getDayKeys(state.currentWeek).forEach(function(d) {
    var dayEl = document.createElement('div');
    dayEl.className = 'week-day' + (d === state.currentDay ? ' today' : '');

    var dotsHtml = '';
    PILLARS.forEach(function(p, idx) {
      var doneD = isComplete(state.currentWeek, d, p);
      dotsHtml += '<div class="dot ' + (doneD ? 'done-' + (idx + 1) : '') + '"></div>';
    });

    dayEl.innerHTML =
      '<div class="day-label">' + d + '</div>' +
      '<div class="dots">' + dotsHtml + '</div>';
    dayEl.onclick = function() { state.currentDay = d; render(); };
    gridEl.appendChild(dayEl);
  });

  // Portfolio items
  var portfolioEl = document.getElementById('portfolioItems');
  portfolioEl.innerHTML = '';
  PORTFOLIO_ITEMS.forEach(function(item) {
    var status = getPortfolioStatus(item.id);
    var div = document.createElement('div');
    div.className = 'portfolio-item';
    div.onclick = function() { cyclePortfolio(item.id); };
    div.innerHTML =
      '<span class="pi-name">' + item.name + '</span>' +
      '<span class="pi-status ' + status + '">' + PORTFOLIO_LABELS[status] + '</span>';
    portfolioEl.appendChild(div);
  });
}

// ============================================================
// SERVICE WORKER
// ============================================================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

// ============================================================
// INIT
// ============================================================
loadState();
initToday();
render();
