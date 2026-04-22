function loadReports() {
  try {
    const rawData = localStorage.getItem('majiReports');
    return rawData ? JSON.parse(rawData) : [];
  } catch (err) {
    console.error("Failed to read reports", err);
    return [];
  }
}

function persistReports(list) {
  localStorage.setItem('majiReports', JSON.stringify(list));
}

function makeReportId() {
  return 'RPT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

function showRecentReports() {
  const box = document.getElementById('recentReports');
  if (!box) return;
  const list = loadReports();
  if (list.length === 0) {
    box.innerHTML = '<p class="no-reports">No reports yet. Be the first to report an issue.</p>';
    return;
  }

  box.innerHTML = [...list].reverse().slice(0, 5).map(item => `
    <div class="report-item">
      <div class="report-item-header">
        <span class="report-item-loc">${item.location}, ${item.county}</span>
        <span class="report-item-date">${new Date(item.timestamp).toLocaleDateString()}</span>
      </div>
      <div class="report-item-issue">${item.issueType}</div>
      <span class="report-item-sev sev-${item.severity}">${item.severity} Urgency</span>
    </div>
  `).join('');
}

const VALIDATION_RULES = {
  reporterName:  { check: v => v.trim().length >= 2,                                              msg: 'Name is required (min 2 chars).' },
  reporterPhone: { check: v => /^(\+?254|0)[17]\d{8}$/.test(v.replace(/\s/g,'')),                msg: 'Valid Kenyan phone number needed.' },
  county:        { check: v => v !== '',                                                           msg: 'Select a county.' },
  location:      { check: v => v.trim().length >= 3,                                              msg: 'Location is required.' },
  sourceType:    { check: v => v !== '',                                                           msg: 'Select source type.' },
  issueType:     { check: v => v !== '',                                                           msg: 'Select issue type.' },
  severity:      { check: () => !!document.querySelector('input[name="severity"]:checked'),       msg: 'Select urgency level.' },
  description:   { check: v => v.trim().length >= 20,                                             msg: 'Description is too short.' },
  consent:       { check: () => document.getElementById('consent')?.checked,                      msg: 'Consent required.' },
};

function displayError(id, message) {
  const errorLabel = document.getElementById('err-' + id);
  const inputField = document.getElementById(id) || (id === 'severity' ? document.getElementById('severityOptions') : null);
  if (errorLabel) errorLabel.textContent = message;
  if (inputField) inputField.classList.add('error');
}

function hideError(id) {
  const errorLabel = document.getElementById('err-' + id);
  const inputField = document.getElementById(id) || (id === 'severity' ? document.getElementById('severityOptions') : null);
  if (errorLabel) errorLabel.textContent = '';
  if (inputField) inputField.classList.remove('error');
}

function clearAllFeedback() {
  Object.keys(VALIDATION_RULES).forEach(hideError);
}

function isFormValid() {
  let isGood = true;
  clearAllFeedback();
  Object.entries(VALIDATION_RULES).forEach(([key, rule]) => {
    const field = document.getElementById(key);
    const val = field ? (field.type === 'checkbox' ? field.checked : field.value) : '';
    if (!rule.check(val)) {
      displayError(key, rule.msg);
      isGood = false;
    }
  });
  return isGood;
}

const textArea = document.getElementById('description');
const counter = document.getElementById('charCount');
if (textArea && counter) {
  textArea.addEventListener('input', () => {
    const currentLen = textArea.value.length;
    counter.textContent = `${currentLen} / 500 characters`;
    if (currentLen > 500) textArea.value = textArea.value.slice(0, 500);
  });
}

const gpsBtn = document.getElementById('getGPS');
const gpsField = document.getElementById('gpsCoords');
const gpsInfo = document.getElementById('gpsStatus');
if (gpsBtn) {
  gpsBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      gpsInfo.textContent = 'GPS not supported.';
      return;
    }
    gpsBtn.textContent = 'Locating...';
    gpsBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(
      pos => {
        gpsField.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        gpsInfo.textContent = 'Location captured';
        gpsBtn.textContent = 'Location Set';
        gpsBtn.disabled = false;
      },
      err => {
        gpsInfo.textContent = 'Error: ' + err.message;
        gpsBtn.textContent = 'Retry';
        gpsBtn.disabled = false;
      }
    );
  });
}

document.getElementById('reportForm')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!isFormValid()) return;
  
  const newReport = {
    id: makeReportId(),
    timestamp: new Date().toISOString(),
    reporterName: document.getElementById('reporterName').value.trim(),
    reporterPhone: document.getElementById('reporterPhone').value.trim(),
    county: document.getElementById('county').value,
    location: document.getElementById('location').value.trim(),
    sourceType: document.getElementById('sourceType').value,
    issueType: document.getElementById('issueType').value,
    severity: document.querySelector('input[name="severity"]:checked').value,
    description: document.getElementById('description').value.trim(),
    gpsCoords: document.getElementById('gpsCoords').value || 'Not provided',
  };
  
  const currentList = loadReports();
  currentList.push(newReport);
  persistReports(currentList);
  
  document.getElementById('reportRefId').textContent = newReport.id;
  document.getElementById('successModal').style.display = 'flex';
  document.getElementById('reportForm').reset();
  clearAllFeedback();
  showRecentReports();
});

function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
}
window.closeModal = closeSuccessModal;

document.getElementById('clearReports')?.addEventListener('click', () => {
  if (confirm('Wipe all reports?')) {
    localStorage.removeItem('majiReports');
    showRecentReports();
  }
});

showRecentReports();