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

  // Find the current week (the one containing today)
  var todayWeek = null;
  var todayDay = null;
  for (var weekKey in WEEKS) {
    var weekData = WEEKS[weekKey];
    for (var dayLabel in weekData.days) {
      if (weekData.days[dayLabel].isoDate === isoToday) {
        todayWeek = weekKey;
        todayDay = dayLabel;
      }
    }
  }

  // Find the first incomplete day (up to and including today)
  var weekKeys = getWeekKeys();
  for (var w = 0; w < weekKeys.length; w++) {
    var wk = weekKeys[w];
    var days = getDayKeys(wk);
    for (var d = 0; d < days.length; d++) {
      var dy = days[d];
      var dayDate = WEEKS[wk].days[dy].isoDate;
      // Don't go past today
      if (dayDate > isoToday) break;
      // Check if this day is incomplete (any pillar not done)
      if (dayCompletionCount(wk, dy) < PILLAR_COUNT) {
        state.currentWeek = wk;
        state.currentDay = dy;
        return;
      }
    }
  }

  // All days complete up to today — show today
  if (todayWeek) {
    state.currentWeek = todayWeek;
    state.currentDay = todayDay;
  } else {
    var firstWeek = weekKeys[0];
    state.currentWeek = firstWeek;
    state.currentDay = getDayKeys(firstWeek)[0];
  }
}

// ============================================================
// HELPERS
// ============================================================
function getWeekKeys() { return Object.keys(WEEKS); }
function getDayKeys(weekKey) { return Object.keys(WEEKS[weekKey].days); }
function taskKey(week, day, pillar) { return week + ':' + day + ':' + pillar; }
function isComplete(week, day, pillar) { return !!state.completions[taskKey(week, day, pillar)]; }

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
// NOTE INPUT STATE
// ============================================================
var activeNoteCard = null;

function openNoteInput(week, day, pillar) {
  activeNoteCard = taskKey(week, day, pillar);
  render();
  setTimeout(function() {
    var ta = document.getElementById('note-input-' + pillar);
    if (ta) ta.focus();
  }, 50);
}

function cancelNote() {
  activeNoteCard = null;
  render();
}

function submitNote(week, day, pillar) {
  var key = taskKey(week, day, pillar);
  var ta = document.getElementById('note-input-' + pillar);
  var note = ta ? ta.value.trim() : '';
  state.completions[key] = {
    done: true,
    timestamp: new Date().toISOString(),
    note: note
  };
  activeNoteCard = null;
  saveCompletions();
  render();
}

function uncompleteTask(week, day, pillar) {
  var key = taskKey(week, day, pillar);
  delete state.completions[key];
  activeNoteCard = null;
  saveCompletions();
  render();
}

// ============================================================
// VOICE INPUT (Web Speech API)
// ============================================================
var speechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
var activeRecognition = null;

function startVoiceInput(pillar) {
  if (!speechSupported) return;
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  var ta = document.getElementById('note-input-' + pillar);
  var micBtn = document.getElementById('mic-btn-' + pillar);
  if (!ta || !micBtn) return;

  micBtn.classList.add('recording');
  micBtn.textContent = '...';
  activeRecognition = recognition;

  recognition.onresult = function(event) {
    var transcript = '';
    for (var i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    // Append to existing text
    var existing = ta.value.trim();
    if (existing && !event.results[event.resultIndex].isFinal) {
      // Interim: show preview
      ta.value = existing + ' ' + transcript;
    } else if (event.results[event.resultIndex].isFinal) {
      ta.value = (existing ? existing + ' ' : '') + transcript;
    }
  };

  recognition.onend = function() {
    micBtn.classList.remove('recording');
    micBtn.textContent = 'Mic';
    activeRecognition = null;
  };

  recognition.onerror = function() {
    micBtn.classList.remove('recording');
    micBtn.textContent = 'Mic';
    activeRecognition = null;
  };

  recognition.start();
}

function stopVoiceInput(pillar) {
  if (activeRecognition) {
    activeRecognition.stop();
    activeRecognition = null;
  }
  var micBtn = document.getElementById('mic-btn-' + pillar);
  if (micBtn) {
    micBtn.classList.remove('recording');
    micBtn.textContent = 'Mic';
  }
}

function toggleVoice(pillar) {
  if (activeRecognition) {
    stopVoiceInput(pillar);
  } else {
    startVoiceInput(pillar);
  }
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
// DOM HELPERS — proper event binding for iOS Safari
// ============================================================
function el(tag, attrs, children) {
  var node = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach(function(k) {
      if (k === 'className') node.className = attrs[k];
      else if (k === 'textContent') node.textContent = attrs[k];
      else if (k === 'onclick') node.addEventListener('click', attrs[k]);
      else if (k === 'ontouchend') node.addEventListener('touchend', attrs[k]);
      else if (k === 'innerHTML') node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
  }
  if (children) {
    children.forEach(function(c) {
      if (typeof c === 'string') node.appendChild(document.createTextNode(c));
      else if (c) node.appendChild(c);
    });
  }
  return node;
}

function tap(handler) {
  // Returns onclick that works on both mobile and desktop
  return function(e) {
    e.preventDefault();
    e.stopPropagation();
    handler();
  };
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
    var dc = dayCompletionCount(state.currentWeek, d);
    var cls = 'day-tab';
    if (d === state.currentDay) cls += ' active';
    if (dc === PILLAR_COUNT) cls += ' perfect';
    else if (dc > 0) cls += ' has-completions';
    var tab = el('div', { className: cls, textContent: d, onclick: tap(function() { state.currentDay = d; render(); }) });
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

  // ---- Pillar cards (proper DOM, no innerHTML onclick) ----
  var cardsEl = document.getElementById('pillarCards');
  cardsEl.innerHTML = '';

  PILLARS.forEach(function(p) {
    var task = dayData.tasks[p];
    var done = isComplete(state.currentWeek, state.currentDay, p);
    var key = taskKey(state.currentWeek, state.currentDay, p);
    var completion = state.completions[key];
    var existingNote = completion ? (completion.note || '') : '';
    var isNoteOpen = activeNoteCard === key;

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
      if (isComplete(allDays[i].week, allDays[i].day, p)) pillarStreak++;
      else break;
    }

    var card = el('div', { className: 'pillar-card ' + p });

    // Header
    var header = el('div', { className: 'pillar-header' }, [
      el('div', { className: 'pillar-name', textContent: PILLAR_NAMES[p] }),
      pillarStreak > 0 ? el('div', { className: 'pillar-streak', textContent: pillarStreak + 'd streak' }) : null
    ]);
    card.appendChild(header);

    // Task text + context
    card.appendChild(el('div', { className: 'task-text', textContent: task.text }));
    card.appendChild(el('div', { className: 'task-context', textContent: task.context }));

    // Checkbox row — use closure for correct pillar binding
    (function(pp, wk, dy) {
      var checkDiv = el('div', {
        className: 'task-check' + (done ? ' checked' : ''),
        onclick: tap(function() {
          if (isComplete(wk, dy, pp)) {
            // Already done — open edit
            activeNoteCard = taskKey(wk, dy, pp);
            render();
            setTimeout(function() {
              var ta = document.getElementById('note-input-' + pp);
              if (ta) ta.focus();
            }, 50);
          } else {
            // Not done — open note input
            openNoteInput(wk, dy, pp);
          }
        })
      });

      var checkbox = el('div', { className: 'checkbox' });
      checkbox.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      checkDiv.appendChild(checkbox);
      checkDiv.appendChild(el('span', { className: 'check-label', textContent: done ? 'Done' : 'Mark complete' }));
      card.appendChild(checkDiv);
    })(p, state.currentWeek, state.currentDay);

    // Note area
    if (isNoteOpen) {
      (function(pp, wk, dy) {
        var noteArea = el('div', { className: 'note-area' });

        var textarea = document.createElement('textarea');
        textarea.className = 'note-input';
        textarea.id = 'note-input-' + pp;
        textarea.placeholder = 'What did you do? Be specific...';
        textarea.value = existingNote;
        noteArea.appendChild(textarea);

        var actions = el('div', { className: 'note-actions' });

        // Voice input button (if supported)
        if (speechSupported) {
          var micBtn = el('button', {
            className: 'note-btn mic',
            id: 'mic-btn-' + pp,
            textContent: 'Mic',
            onclick: tap(function() { toggleVoice(pp); })
          });
          actions.appendChild(micBtn);
        }

        if (done) {
          actions.appendChild(el('button', {
            className: 'note-btn uncomplete',
            textContent: 'Undo',
            onclick: tap(function() { uncompleteTask(wk, dy, pp); })
          }));
        }

        actions.appendChild(el('button', {
          className: 'note-btn cancel',
          textContent: 'Cancel',
          onclick: tap(function() { cancelNote(); })
        }));

        actions.appendChild(el('button', {
          className: 'note-btn submit',
          textContent: done ? 'Update' : 'Done',
          onclick: tap(function() { submitNote(wk, dy, pp); })
        }));

        noteArea.appendChild(actions);
        card.appendChild(noteArea);
      })(p, state.currentWeek, state.currentDay);
    } else if (done && existingNote) {
      (function(pp, wk, dy) {
        var noteDisplay = el('div', {
          className: 'note-display',
          onclick: tap(function() {
            activeNoteCard = taskKey(wk, dy, pp);
            render();
            setTimeout(function() {
              var ta = document.getElementById('note-input-' + pp);
              if (ta) ta.focus();
            }, 50);
          })
        });
        noteDisplay.appendChild(el('div', { className: 'note-label', textContent: 'What I did' }));
        noteDisplay.appendChild(document.createTextNode(existingNote));
        card.appendChild(noteDisplay);
      })(p, state.currentWeek, state.currentDay);
    } else if (done && !existingNote) {
      // Completed without a note — show hint to add one
      (function(pp, wk, dy) {
        var addNote = el('div', {
          className: 'note-display',
          onclick: tap(function() {
            activeNoteCard = taskKey(wk, dy, pp);
            render();
            setTimeout(function() {
              var ta = document.getElementById('note-input-' + pp);
              if (ta) ta.focus();
            }, 50);
          })
        });
        addNote.appendChild(el('div', { className: 'note-label', textContent: 'Tap to add notes' }));
        card.appendChild(addNote);
      })(p, state.currentWeek, state.currentDay);
    }

    cardsEl.appendChild(card);
  });

  // Weekly grid
  var gridEl = document.getElementById('weeklyGrid');
  gridEl.innerHTML = '';
  getDayKeys(state.currentWeek).forEach(function(d) {
    var dayEl = el('div', {
      className: 'week-day' + (d === state.currentDay ? ' today' : ''),
      onclick: tap(function() { state.currentDay = d; render(); })
    });

    dayEl.appendChild(el('div', { className: 'day-label', textContent: d }));
    var dots = el('div', { className: 'dots' });
    PILLARS.forEach(function(p, idx) {
      var doneD = isComplete(state.currentWeek, d, p);
      dots.appendChild(el('div', { className: 'dot' + (doneD ? ' done-' + (idx + 1) : '') }));
    });
    dayEl.appendChild(dots);
    gridEl.appendChild(dayEl);
  });

  // Portfolio items
  var portfolioEl = document.getElementById('portfolioItems');
  portfolioEl.innerHTML = '';
  PORTFOLIO_ITEMS.forEach(function(item) {
    var status = getPortfolioStatus(item.id);
    var div = el('div', {
      className: 'portfolio-item',
      onclick: tap(function() { cyclePortfolio(item.id); })
    }, [
      el('span', { className: 'pi-name', textContent: item.name }),
      el('span', { className: 'pi-status ' + status, textContent: PORTFOLIO_LABELS[status] })
    ]);
    portfolioEl.appendChild(div);
  });
}

// ============================================================
// SYNC LOG — generates execution-log.md for Cowork pipeline
// ============================================================
function generateLogContent() {
  var lines = [];
  lines.push('# Execution Log');
  lines.push('');
  lines.push('Generated: ' + new Date().toISOString());
  lines.push('');

  var weekKeys = getWeekKeys();
  var hasAnyCompletions = false;

  weekKeys.forEach(function(wk) {
    var week = WEEKS[wk];
    var dayKeys = getDayKeys(wk);
    var weekHasCompletions = false;
    var weekLines = [];

    dayKeys.forEach(function(d) {
      var dayData = week.days[d];
      var dayHasCompletions = false;
      var dayLines = [];

      PILLARS.forEach(function(p) {
        var key = taskKey(wk, d, p);
        var completion = state.completions[key];
        if (completion && completion.done) {
          if (!dayHasCompletions) {
            dayLines.push('### ' + d + ', ' + dayData.date + ' (' + dayData.isoDate + ')');
            dayLines.push('');
            dayHasCompletions = true;
          }
          var task = dayData.tasks[p];
          dayLines.push('**' + PILLAR_NAMES[p] + '** — ' + task.text);
          if (completion.note) {
            dayLines.push('> ' + completion.note.split('\n').join('\n> '));
          } else {
            dayLines.push('> _(completed, no notes)_');
          }
          dayLines.push('');
          dayLines.push('_Completed: ' + new Date(completion.timestamp).toLocaleString() + '_');
          dayLines.push('');
        }
      });

      if (dayHasCompletions) {
        weekHasCompletions = true;
        weekLines = weekLines.concat(dayLines);
      }
    });

    if (weekHasCompletions) {
      hasAnyCompletions = true;
      lines.push('## ' + week.label);
      lines.push('');
      lines = lines.concat(weekLines);
      var wc = weekCompletionCount(wk);
      var wt = dayKeys.length * PILLAR_COUNT;
      lines.push('**Week score: ' + wc + '/' + wt + '**');
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  });

  if (!hasAnyCompletions) {
    lines.push('_No completions recorded yet._');
  }

  // Summary
  lines.push('## Summary');
  lines.push('');
  var totalDone = 0;
  var streaks = calculateStreak();
  weekKeys.forEach(function(wk) { totalDone += weekCompletionCount(wk); });
  var totalPossible = 91 * PILLAR_COUNT;
  lines.push('- Total completed: ' + totalDone + '/' + totalPossible);
  lines.push('- Current streak: ' + streaks.current + ' days');
  lines.push('- Best streak: ' + streaks.best + ' days');
  lines.push('- Weed-free: ' + getWeedFreeDays() + ' days');
  lines.push('');

  // Portfolio
  lines.push('## Portfolio Status');
  lines.push('');
  PORTFOLIO_ITEMS.forEach(function(item) {
    var status = getPortfolioStatus(item.id);
    lines.push('- ' + item.name + ': **' + PORTFOLIO_LABELS[status] + '**');
  });
  lines.push('');

  // Next milestone
  var milestone = getNextMilestone();
  var md = new Date(milestone.date + 'T00:00:00');
  var td = new Date(); td.setHours(0,0,0,0);
  var du = Math.ceil((md - td) / (1000*60*60*24));
  lines.push('## Next Milestone');
  lines.push('');
  lines.push('**' + milestone.text + '** — ' + milestone.date + ' (' + du + ' days)');
  lines.push('');

  return lines.join('\n');
}

function syncLog() {
  var content = generateLogContent();
  var blob = new Blob([content], { type: 'text/markdown' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'execution-log.md';
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
// GITHUB AUTO-SYNC — pushes execution-log.md to repo on completion
// ============================================================
var GITHUB_REPO = 'tedddb-ai/goal-os';
var GITHUB_FILE = 'execution-log.md';
var syncDebounceTimer = null;

function getGitHubToken() {
  return localStorage.getItem('goalos-github-token') || '';
}

function setGitHubToken(token) {
  localStorage.setItem('goalos-github-token', token.trim());
}

function getSyncStatus() {
  return localStorage.getItem('goalos-sync-status') || 'never';
}

function setSyncStatus(status) {
  localStorage.setItem('goalos-sync-status', status);
  localStorage.setItem('goalos-last-sync', new Date().toISOString());
  updateSyncIndicator();
}

function updateSyncIndicator() {
  var el = document.getElementById('syncStatus');
  if (!el) return;
  var status = getSyncStatus();
  var lastSync = localStorage.getItem('goalos-last-sync');
  if (status === 'synced' && lastSync) {
    var ago = Math.round((Date.now() - new Date(lastSync).getTime()) / 60000);
    el.textContent = ago < 1 ? 'Synced just now' : 'Synced ' + ago + 'm ago';
    el.className = 'sync-status synced';
  } else if (status === 'syncing') {
    el.textContent = 'Syncing...';
    el.className = 'sync-status syncing';
  } else if (status === 'error') {
    el.textContent = 'Sync failed — tap to retry';
    el.className = 'sync-status error';
  } else if (status === 'no-token') {
    el.textContent = 'Tap to set up auto-sync';
    el.className = 'sync-status setup';
  } else {
    el.textContent = '';
    el.className = 'sync-status';
  }
}

function pushToGitHub() {
  var token = getGitHubToken();
  if (!token) {
    setSyncStatus('no-token');
    return;
  }

  var content = generateLogContent();
  var encoded = btoa(unescape(encodeURIComponent(content)));

  setSyncStatus('syncing');

  // First get the current file SHA (needed for updates)
  fetch('https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + GITHUB_FILE, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(function(res) {
    if (res.status === 404) return { sha: null };
    if (!res.ok) throw new Error('GitHub API error: ' + res.status);
    return res.json();
  })
  .then(function(data) {
    var body = {
      message: 'Update execution log — ' + new Date().toLocaleDateString(),
      content: encoded
    };
    if (data.sha) body.sha = data.sha;

    return fetch('https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + GITHUB_FILE, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  })
  .then(function(res) {
    if (!res.ok) throw new Error('Push failed: ' + res.status);
    setSyncStatus('synced');
  })
  .catch(function(err) {
    console.warn('GitHub sync failed:', err);
    setSyncStatus('error');
  });
}

// Debounced sync — waits 5 seconds after last completion before pushing
function debouncedSync() {
  if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(function() {
    pushToGitHub();
  }, 5000);
}

function autoSyncLog() {
  try {
    var content = generateLogContent();
    localStorage.setItem('goalos-execution-log', content);
    localStorage.setItem('goalos-last-sync', new Date().toISOString());
  } catch (e) {
    // Silent fail on localStorage
  }
  // Push to GitHub (debounced)
  debouncedSync();
}

// Auto-sync on every completion
var _origSaveCompletions = saveCompletions;
saveCompletions = function() {
  _origSaveCompletions();
  autoSyncLog();
};

// ============================================================
// SETTINGS PANEL — GitHub token setup
// ============================================================
function showSettings() {
  var overlay = document.getElementById('settingsOverlay');
  if (overlay) { overlay.style.display = 'flex'; return; }

  overlay = el('div', { className: 'settings-overlay', id: 'settingsOverlay' });
  var panel = el('div', { className: 'settings-panel' });

  panel.appendChild(el('h3', { textContent: 'Settings', className: 'settings-title' }));

  // GitHub token
  panel.appendChild(el('label', { className: 'settings-label', textContent: 'GitHub Token (for auto-sync)' }));
  panel.appendChild(el('p', { className: 'settings-hint', textContent: 'Create at github.com/settings/tokens → Fine-grained → Scope to goal-os repo → Contents: Read and write' }));

  var tokenInput = document.createElement('input');
  tokenInput.type = 'password';
  tokenInput.className = 'settings-input';
  tokenInput.id = 'settings-token';
  tokenInput.placeholder = 'github_pat_...';
  tokenInput.value = getGitHubToken();
  panel.appendChild(tokenInput);

  var actions = el('div', { className: 'settings-actions' });

  actions.appendChild(el('button', {
    className: 'note-btn cancel',
    textContent: 'Cancel',
    onclick: tap(function() { overlay.style.display = 'none'; })
  }));

  actions.appendChild(el('button', {
    className: 'note-btn submit',
    textContent: 'Save & Sync',
    onclick: tap(function() {
      var token = document.getElementById('settings-token').value;
      setGitHubToken(token);
      overlay.style.display = 'none';
      if (token) pushToGitHub();
      else setSyncStatus('no-token');
    })
  }));

  panel.appendChild(actions);
  overlay.appendChild(panel);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.style.display = 'none';
  });

  document.body.appendChild(overlay);
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

// Wire up footer buttons (proper event listeners for iOS)
document.getElementById('settingsBtn').addEventListener('click', function(e) { e.preventDefault(); showSettings(); });
document.getElementById('exportBtn').addEventListener('click', function(e) { e.preventDefault(); exportData(); });
document.getElementById('importBtn').addEventListener('click', function(e) { e.preventDefault(); document.getElementById('importFile').click(); });

// Sync status tap — open settings if no token, retry if error
document.getElementById('syncStatus').addEventListener('click', function(e) {
  e.preventDefault();
  var status = getSyncStatus();
  if (status === 'no-token' || status === 'never') showSettings();
  else if (status === 'error') pushToGitHub();
});

// Initial sync status
if (!getGitHubToken()) {
  setSyncStatus('no-token');
} else {
  updateSyncIndicator();
  autoSyncLog();
}
