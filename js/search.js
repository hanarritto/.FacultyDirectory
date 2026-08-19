document.addEventListener('DOMContentLoaded', () => {
  const user = typeof window.requireLogin === 'function' ? window.requireLogin() : true;
  if (!user) return;

  const FACULTY_LIST = Array.isArray(window.FACULTY_DATA) ? window.FACULTY_DATA : [];

  const OFFICIAL_IMAGES = {
    'Assoc. Prof. Dr. Ismail Lutfi Japakiya': 'https://ftu.ac.th/wp-content/uploads/2024/11/IMG_7568-scaled-e1730664983474-228x300.jpg',
    'Asst. Prof. Dr. Ahmad Yeesunthong': 'https://ftu.ac.th/wp-content/uploads/2025/04/ahmad-235x300.png',
    'Asst. Prof. Sorat Abdulsata': 'https://ftu.ac.th/wp-content/uploads/2025/04/sorat-235x300.png',
    'Asst. Prof. Dr. Anuwat Walee': 'https://ftu.ac.th/wp-content/uploads/2024/11/4dfc49d3-68b0-48e9-a435-ee00a15d8449-1-235x300.png',
    'Asst. Prof. Dr. Prachya Benmadni': 'https://ftu.ac.th/wp-content/uploads/2024/11/IMG_7551-229x300.jpg',
    'Asst. Prof. Dr. Ibrahim Tehha': 'https://ftu.ac.th/wp-content/uploads/2024/11/4dfc49d3-68b0-48e9-a435-ee00a15d8449-1-1-1-3-235x300.png'
  };

  function cleanNameEN(name) {
    return String(name || '').replace(/\s*\(Demo\s*\d+\)\s*/gi, '').trim();
  }

  function cleanNameTH(name, fallbackEN) {
    const value = String(name || '').trim();
    if (/^อาจารย์ตัวอย่าง\s*\d+$/i.test(value)) return cleanNameEN(fallbackEN);
    return value;
  }

  function getDisplayImage(t) {
    if (OFFICIAL_IMAGES[t.nameEN]) return OFFICIAL_IMAGES[t.nameEN];
    const clean = cleanNameEN(t.nameEN);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(clean)}&size=300&background=EEF2FF&color=3730A3&bold=true`;
  }

  function displayTeacher(t) {
    return {
      ...t,
      nameEN: cleanNameEN(t.nameEN),
      nameTH: cleanNameTH(t.nameTH, t.nameEN),
      image: getDisplayImage(t)
    };
  }

  const searchInput = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('suggestions');
  const resultsBox = document.getElementById('results');
  const facultyFilter = document.getElementById('facultyFilter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfo = document.getElementById('pageInfo');
  const recentBox = document.getElementById('recentSearches');
  const popularBox = document.getElementById('popularSearches');
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const exportBtn = document.getElementById('exportBtn');
  const favoriteCount = document.getElementById('favoriteCount');

  let currentPage = 1;
  let itemsPerPage = 12;
  let currentView = localStorage.getItem('facultyView') || 'grid';
  let filteredTeachers = [...FACULTY_LIST];

  const normalize = value => String(value || '').trim().toLowerCase();

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem('favorites')) || []; }
    catch { return []; }
  }

  function saveFavorites(items) { localStorage.setItem('favorites', JSON.stringify(items)); }
  function isFavorite(name) { return getFavorites().includes(name); }
  function updateFavoriteCount() { if (favoriteCount) favoriteCount.textContent = getFavorites().length; }

  window.toggleFavorite = function(name) {
    let favorites = getFavorites();
    favorites = favorites.includes(name) ? favorites.filter(item => item !== name) : [...favorites, name];
    saveFavorites(favorites);
    updateFavoriteCount();
    renderResults(filteredTeachers);
  };

  function scoreTeacher(t, keyword) {
    const q = normalize(keyword);
    if (!q) return 0;
    const d = displayTeacher(t);
    const fields = [d.nameEN, d.nameTH, d.departmentEN, d.departmentTH, d.facultyEN, d.facultyTH, d.positionEN, d.positionTH, ...(Array.isArray(d.interests) ? d.interests : [])].map(normalize);
    let best = -1;
    fields.forEach(field => {
      if (field === q) best = Math.max(best, 100);
      else if (field.startsWith(q)) best = Math.max(best, 80);
      else if (field.split(/\s+/).some(word => word.startsWith(q))) best = Math.max(best, 70);
      else if (field.includes(q)) best = Math.max(best, 50);
    });
    return best;
  }

  function searchTeachers(keyword) {
    const q = normalize(keyword);
    if (!q) return [...FACULTY_LIST];
    return FACULTY_LIST.map(t => ({ teacher: t, score: scoreTeacher(t, q) }))
      .filter(item => item.score >= 0)
      .sort((a, b) => b.score - a.score || cleanNameEN(a.teacher.nameEN).localeCompare(cleanNameEN(b.teacher.nameEN)))
      .map(item => item.teacher);
  }

  function getFilteredResults() {
    let list = searchTeachers(searchInput ? searchInput.value : '');
    if (facultyFilter && facultyFilter.value) list = list.filter(t => t.facultyEN === facultyFilter.value);
    return list;
  }

  function updatePagination() {
    if (!pageInfo || !prevBtn || !nextBtn) return;
    const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / itemsPerPage));
    pageInfo.textContent = `Page ${currentPage} of ${totalPages} | หน้า ${currentPage} จาก ${totalPages}`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
  }

  function renderResults(list) {
    if (!resultsBox) return;
    filteredTeachers = Array.isArray(list) ? list : [];
    const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / itemsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredTeachers.slice(start, start + itemsPerPage);

    if (!pageItems.length) {
      resultsBox.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="bi bi-search display-5 d-block mb-3"></i>No faculty found | ไม่พบข้อมูลอาจารย์</div>';
      updatePagination();
      return;
    }

    resultsBox.innerHTML = pageItems.map(raw => {
      const t = displayTeacher(raw);
      const originalName = String(raw.nameEN || '').replace(/'/g, "\\'");
      return `
      <div class="${currentView === 'grid' ? 'col-md-6 col-xl-4' : 'col-12'}">
        <article class="card faculty-card h-100 p-4 fade-in position-relative ${currentView === 'list' ? 'faculty-list-card' : 'text-center'}">
          <button class="favorite-button btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm" onclick="toggleFavorite('${originalName}')" title="Favorite | รายการโปรด">
            <i class="bi ${isFavorite(raw.nameEN) ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}"></i>
          </button>
          <div class="${currentView === 'list' ? 'd-md-flex align-items-center gap-4' : ''}">
            <img src="${t.image}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.nameEN)}&size=300&background=EEF2FF&color=3730A3&bold=true'" class="faculty-img ${currentView === 'grid' ? 'mx-auto mb-3' : 'mb-3 mb-md-0'}" alt="${t.nameEN}">
            <div class="${currentView === 'list' ? 'flex-grow-1' : ''}">
              <h5 class="fw-bold mb-1">${t.nameEN || '-'}</h5>
              <div class="text-muted mb-2">${t.nameTH || '-'}</div>
              <div class="small text-primary fw-semibold mb-1">${t.facultyEN || '-'}</div>
              <div class="small text-muted mb-1">${t.facultyTH || '-'}</div>
              <div class="small fw-semibold mb-1">${t.departmentEN || '-'}</div>
              <div class="small text-muted mb-3">${t.departmentTH || '-'}</div>
              <button class="btn btn-outline-primary btn-sm" onclick="openProfileByName('${originalName}')">View Profile | ดูโปรไฟล์</button>
            </div>
          </div>
        </article>
      </div>`;
    }).join('');
    updatePagination();
  }

  function showSuggestions(list) {
    if (!suggestionsBox || !searchInput) return;
    if (!searchInput.value.trim() || !list.length) {
      suggestionsBox.innerHTML = '';
      suggestionsBox.style.display = 'none';
      return;
    }
    suggestionsBox.innerHTML = list.slice(0, 7).map(raw => {
      const t = displayTeacher(raw);
      return `<button class="suggestion-item w-100 text-start border-0 bg-transparent" data-name="${String(raw.nameEN || '').replace(/"/g, '&quot;')}"><div class="suggestion-name">${t.nameEN || '-'}</div><div class="suggestion-dept">${t.departmentEN || '-'} | ${t.departmentTH || '-'}</div></button>`;
    }).join('');
    suggestionsBox.style.display = 'block';
    suggestionsBox.querySelectorAll('.suggestion-item').forEach(button => button.addEventListener('click', () => {
      const raw = FACULTY_LIST.find(t => t.nameEN === button.dataset.name);
      searchInput.value = raw ? cleanNameEN(raw.nameEN) : button.dataset.name;
      suggestionsBox.style.display = 'none';
      currentPage = 1;
      renderResults(getFilteredResults());
    }));
  }

  function renderRecentSearches() {
    if (recentBox) recentBox.innerHTML = '<span class="text-muted small">Search history is stored on this device | ประวัติการค้นหาจะเก็บในเครื่องนี้</span>';
  }

  function renderPopularSearches() {
    if (popularBox) popularBox.innerHTML = '<span class="text-muted small">Try searching by name, faculty, department, or specialization | ค้นหาได้จากชื่อ คณะ สาขา หรือความเชี่ยวชาญ</span>';
  }

  window.clearRecentSearches = function() {
    localStorage.removeItem('recentSearches');
    localStorage.removeItem('popularSearchCounts');
    renderRecentSearches();
    renderPopularSearches();
  };

  window.openProfileByName = function(name) {
    const raw = FACULTY_LIST.find(t => t.nameEN === name);
    if (!raw) return;
    localStorage.setItem('selectedTeacher', JSON.stringify(displayTeacher(raw)));
    window.location.href = 'profile.html';
  };

  function exportFacultyCSV() {
    const rows = filteredTeachers.map(raw => {
      const t = displayTeacher(raw);
      return [t.id, t.nameEN, t.nameTH, t.facultyEN, t.facultyTH, t.departmentEN, t.departmentTH, t.email, t.phone];
    });
    const headers = ['ID','Name (English)','Name (Thai)','Faculty (English)','Faculty (Thai)','Department (English)','Department (Thai)','Email','Phone'];
    const csv = [headers, ...rows].map(row => row.map(value => `"${String(value || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'faculty-directory.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function populateFacultyFilter() {
    if (!facultyFilter) return;
    const map = new Map();
    FACULTY_LIST.forEach(t => { if (t.facultyEN && !map.has(t.facultyEN)) map.set(t.facultyEN, t.facultyTH || ''); });
    [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).forEach(([en, th]) => {
      const option = document.createElement('option');
      option.value = en;
      option.textContent = `${en} | ${th}`;
      facultyFilter.appendChild(option);
    });
  }

  if (searchInput) searchInput.addEventListener('input', () => { currentPage = 1; const list = getFilteredResults(); renderResults(list); showSuggestions(list); });
  if (facultyFilter) facultyFilter.addEventListener('change', () => { currentPage = 1; renderResults(getFilteredResults()); });
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderResults(filteredTeachers); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { const total = Math.ceil(filteredTeachers.length / itemsPerPage); if (currentPage < total) { currentPage++; renderResults(filteredTeachers); } });
  if (gridViewBtn) gridViewBtn.addEventListener('click', () => { currentView = 'grid'; localStorage.setItem('facultyView', currentView); renderResults(filteredTeachers); });
  if (listViewBtn) listViewBtn.addEventListener('click', () => { currentView = 'list'; localStorage.setItem('facultyView', currentView); renderResults(filteredTeachers); });
  if (exportBtn) exportBtn.addEventListener('click', exportFacultyCSV);

  populateFacultyFilter();
  renderRecentSearches();
  renderPopularSearches();
  updateFavoriteCount();
  if (!FACULTY_LIST.length && resultsBox) resultsBox.innerHTML = '<div class="alert alert-danger">Faculty data failed to load | โหลดข้อมูลอาจารย์ไม่สำเร็จ</div>';
  else renderResults(FACULTY_LIST);
});
