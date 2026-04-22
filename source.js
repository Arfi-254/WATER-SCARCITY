const ALL_WATER_POINTS = [
  { id:1,  name:"Balambala Borehole BH-001",  county:"Garissa", subLocation:"Balambala",     type:"Borehole",  status:"Working",      capacity:"5,000 L/day",  depth:"120m",  lastChecked:"2025-06-01" },
  { id:2,  name:"Dadaab Main Well",            county:"Garissa", subLocation:"Dadaab",        type:"Open Well", status:"Working",      capacity:"3,000 L/day",  depth:"35m",   lastChecked:"2025-05-28" },
  { id:3,  name:"Fafi Hand Pump FP-007",       county:"Garissa", subLocation:"Fafi",          type:"Hand Pump", status:"Not Working",  capacity:"800 L/day",    depth:"60m",   lastChecked:"2025-05-10" },
  { id:4,  name:"Ijara Borehole BH-012",       county:"Garissa", subLocation:"Ijara",         type:"Borehole",  status:"Working",      capacity:"8,000 L/day",  depth:"180m",  lastChecked:"2025-05-30" },
  { id:5,  name:"Hulugho Water Pan WP-03",     county:"Garissa", subLocation:"Hulugho",       type:"Water Pan", status:"Under Repair", capacity:"20,000 L",     depth:"N/A",   lastChecked:"2025-05-15" },
  { id:6,  name:"Garissa Town BH-Central",     county:"Garissa", subLocation:"Garissa Town",  type:"Borehole",  status:"Working",      capacity:"15,000 L/day", depth:"200m",  lastChecked:"2025-06-02" },
  { id:7,  name:"Modogashe Hand Pump FP-11",   county:"Garissa", subLocation:"Modogashe",     type:"Hand Pump", status:"Working",      capacity:"1,200 L/day",  depth:"55m",   lastChecked:"2025-05-29" },
  { id:8,  name:"Benane Borehole BH-019",      county:"Garissa", subLocation:"Benane",        type:"Borehole",  status:"Not Working",  capacity:"4,000 L/day",  depth:"140m",  lastChecked:"2025-04-20" },
  { id:9,  name:"Sankuri Water Pan WP-07",     county:"Garissa", subLocation:"Sankuri",       type:"Water Pan", status:"Working",      capacity:"12,000 L",     depth:"N/A",   lastChecked:"2025-05-22" },
  { id:10, name:"Lagdera Hand Pump FP-15",     county:"Garissa", subLocation:"Lagdera",       type:"Hand Pump", status:"Not Working",  capacity:"900 L/day",    depth:"48m",   lastChecked:"2025-04-05" },
  { id:11, name:"Masalani Borehole BH-022",    county:"Garissa", subLocation:"Masalani",      type:"Borehole",  status:"Working",      capacity:"6,500 L/day",  depth:"160m",  lastChecked:"2025-05-27" },
  { id:12, name:"Nanighi Open Well OW-04",     county:"Garissa", subLocation:"Nanighi",       type:"Open Well", status:"Under Repair", capacity:"2,000 L/day",  depth:"28m",   lastChecked:"2025-05-18" },
  { id:13, name:"Wajir Town BH-Main",          county:"Wajir",   subLocation:"Wajir Town",    type:"Borehole",  status:"Working",      capacity:"20,000 L/day", depth:"220m",  lastChecked:"2025-06-01" },
  { id:14, name:"Habaswein Borehole BH-08",    county:"Wajir",   subLocation:"Habaswein",     type:"Borehole",  status:"Working",      capacity:"7,000 L/day",  depth:"175m",  lastChecked:"2025-05-30" },
  { id:15, name:"Eldas Hand Pump FP-03",       county:"Wajir",   subLocation:"Eldas",         type:"Hand Pump", status:"Not Working",  capacity:"600 L/day",    depth:"40m",   lastChecked:"2025-04-28" },
  { id:16, name:"Bute Water Pan WP-01",        county:"Wajir",   subLocation:"Bute",          type:"Water Pan", status:"Working",      capacity:"18,000 L",     depth:"N/A",   lastChecked:"2025-05-25" },
  { id:17, name:"Griftu Borehole BH-14",       county:"Wajir",   subLocation:"Griftu",        type:"Borehole",  status:"Under Repair", capacity:"5,500 L/day",  depth:"145m",  lastChecked:"2025-05-12" },
  { id:18, name:"Tarbaj Hand Pump FP-09",      county:"Wajir",   subLocation:"Tarbaj",        type:"Hand Pump", status:"Working",      capacity:"1,100 L/day",  depth:"65m",   lastChecked:"2025-05-28" },
  { id:19, name:"Kutulo Open Well OW-02",      county:"Wajir",   subLocation:"Kutulo",        type:"Open Well", status:"Not Working",  capacity:"1,800 L/day",  depth:"22m",   lastChecked:"2025-03-15" },
  { id:20, name:"Wajir East BH-007",           county:"Wajir",   subLocation:"Wajir East",    type:"Borehole",  status:"Working",      capacity:"9,000 L/day",  depth:"195m",  lastChecked:"2025-05-31" },
  { id:21, name:"Diif Water Pan WP-05",        county:"Wajir",   subLocation:"Diif",          type:"Water Pan", status:"Not Working",  capacity:"10,000 L",     depth:"N/A",   lastChecked:"2025-04-10" },
  { id:22, name:"Lagbogol Hand Pump FP-18",    county:"Wajir",   subLocation:"Lagbogol",      type:"Hand Pump", status:"Working",      capacity:"750 L/day",    depth:"52m",   lastChecked:"2025-05-26" },
  { id:23, name:"Gurar Borehole BH-020",       county:"Wajir",   subLocation:"Gurar",         type:"Borehole",  status:"Working",      capacity:"4,200 L/day",  depth:"130m",  lastChecked:"2025-05-24" },
  { id:24, name:"Wajir North BH-011",          county:"Wajir",   subLocation:"Wajir North",   type:"Borehole",  status:"Under Repair", capacity:"6,000 L/day",  depth:"165m",  lastChecked:"2025-05-08" },
  { id:25, name:"Mandera Town BH-Central",     county:"Mandera", subLocation:"Mandera Town",  type:"Borehole",  status:"Working",      capacity:"18,000 L/day", depth:"210m",  lastChecked:"2025-06-01" },
  { id:26, name:"Banissa Borehole BH-05",      county:"Mandera", subLocation:"Banissa",       type:"Borehole",  status:"Working",      capacity:"5,000 L/day",  depth:"150m",  lastChecked:"2025-05-29" },
  { id:27, name:"Lafey Hand Pump FP-12",       county:"Mandera", subLocation:"Lafey",         type:"Hand Pump", status:"Not Working",  capacity:"900 L/day",    depth:"58m",   lastChecked:"2025-04-12" },
  { id:28, name:"Rhamu Borehole BH-009",       county:"Mandera", subLocation:"Rhamu",         type:"Borehole",  status:"Working",      capacity:"7,500 L/day",  depth:"185m",  lastChecked:"2025-05-30" },
  { id:29, name:"Takaba Water Pan WP-04",      county:"Mandera", subLocation:"Takaba",        type:"Water Pan", status:"Under Repair", capacity:"15,000 L",     depth:"N/A",   lastChecked:"2025-05-14" },
  { id:30, name:"Elwak Open Well OW-06",       county:"Mandera", subLocation:"Elwak",         type:"Open Well", status:"Working",      capacity:"2,200 L/day",  depth:"30m",   lastChecked:"2025-05-27" },
  { id:31, name:"Mandera North BH-016",        county:"Mandera", subLocation:"Mandera North", type:"Borehole",  status:"Not Working",  capacity:"4,800 L/day",  depth:"140m",  lastChecked:"2025-03-28" },
  { id:32, name:"Kutulo-M Hand Pump FP-21",    county:"Mandera", subLocation:"Kutulo",        type:"Hand Pump", status:"Working",      capacity:"1,050 L/day",  depth:"62m",   lastChecked:"2025-05-26" },
  { id:33, name:"Gamba Borehole BH-024",       county:"Mandera", subLocation:"Gamba",         type:"Borehole",  status:"Working",      capacity:"3,600 L/day",  depth:"120m",  lastChecked:"2025-05-23" },
  { id:34, name:"Shimbir Fatuma Open Well",    county:"Mandera", subLocation:"Shimbir Fatuma",type:"Open Well", status:"Not Working",  capacity:"1,500 L/day",  depth:"25m",   lastChecked:"2025-04-02" },
  { id:35, name:"Mandera East BH-013",         county:"Mandera", subLocation:"Mandera East",  type:"Borehole",  status:"Working",      capacity:"8,200 L/day",  depth:"190m",  lastChecked:"2025-05-31" },
  { id:36, name:"Arabia Water Pan WP-08",      county:"Mandera", subLocation:"Arabia",        type:"Water Pan", status:"Working",      capacity:"22,000 L",     depth:"N/A",   lastChecked:"2025-05-25" },
];

function getStatusLabel(status) {
  const settings = {
    "Working":      { className:"status-working", icon:"✅" },
    "Not Working":  { className:"status-broken",  icon:"❌" },
    "Under Repair": { className:"status-repair",  icon:"🔧" },
  };
  const config = settings[status] || { className:"", icon:"❓" };
  return `<span class="status-badge ${config.className}">${config.icon} ${status}</span>`;
}

function displayWaterSources(list) {
  const container = document.getElementById('sourcesGrid');
  const countLabel = document.getElementById('resultsCount');
  const noDataMsg = document.getElementById('emptyState');
  
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '';
    if (noDataMsg) noDataMsg.style.display = 'block';
    if (countLabel) countLabel.textContent = 'No sources found';
    return;
  }
  
  if (noDataMsg) noDataMsg.style.display = 'none';
  if (countLabel) countLabel.textContent = `Showing ${list.length} of ${ALL_WATER_POINTS.length} water sources`;

  container.innerHTML = list.map(item => `
    <div class="source-card">
      <div class="source-card-top">
        <h3>${item.name}</h3>
        ${getStatusLabel(item.status)}
      </div>
      <div class="source-card-body">
        <div class="source-meta">
          <div class="source-meta-row"><strong>📍 County</strong> ${item.county}</div>
          <div class="source-meta-row"><strong>🏘️ Location</strong> ${item.subLocation}</div>
          <div class="source-meta-row"><strong>💧 Capacity</strong> ${item.capacity}</div>
          <div class="source-meta-row"><strong>⛏️ Depth</strong> ${item.depth}</div>
        </div>
      </div>
      <div class="source-card-foot">
        <span class="source-type-tag">${item.type}</span>
        <span>Checked: ${item.lastChecked}</span>
      </div>
    </div>
  `).join('');
}

function runFilters() {
  const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const selectedCounty = document.getElementById('filterCounty')?.value || '';
  const selectedStatus = document.getElementById('filterStatus')?.value || '';
  const selectedType = document.getElementById('filterType')?.value || '';

  const results = ALL_WATER_POINTS.filter(p =>
    (!query || p.name.toLowerCase().includes(query) || p.subLocation.toLowerCase().includes(query) || p.county.toLowerCase().includes(query)) &&
    (!selectedCounty || p.county === selectedCounty) &&
    (!selectedStatus || p.status === selectedStatus) &&
    (!selectedType || p.type === selectedType)
  );
  displayWaterSources(results);
}

function resetAll() {
  ['searchInput','filterCounty','filterStatus','filterType'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });
  runFilters();
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCounty = urlParams.get('county');
  
  if (initialCounty) {
    const countySelect = document.getElementById('filterCounty');
    if (countySelect) countySelect.value = initialCounty;
  }
  
  runFilters();

  document.getElementById('searchInput')?.addEventListener('input', runFilters);
  document.getElementById('filterCounty')?.addEventListener('change', runFilters);
  document.getElementById('filterStatus')?.addEventListener('change', runFilters);
  document.getElementById('filterType')?.addEventListener('change', runFilters);
  document.getElementById('clearFilters')?.addEventListener('click', resetAll);
});

window.clearAllFilters = resetAll;