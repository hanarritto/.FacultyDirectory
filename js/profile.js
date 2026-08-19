const user = requireLogin();

let teacher = null;
try {
  teacher = JSON.parse(localStorage.getItem('selectedTeacher'));
} catch {}

const facultyData = Array.isArray(window.FACULTY_DATA) ? window.FACULTY_DATA : [];

if (!teacher) {
  teacher = facultyData[0] || null;
}

const FACULTY_CONTACT_EMAILS = {
  'Faculty of Education': 'edu.ftu@ftu.ac.th',
  'Faculty of Liberal Arts and Social Sciences': 'lasc@ftu.ac.th',
  'International College': 'ic@ftu.ac.th',
  'Graduate School': 'grad@ftu.ac.th',
  'Faculty of Science and Technology': 'info@ftu.ac.th',
  'Faculty of Islamic Studies and Law': 'info@ftu.ac.th'
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '-';
}

function getProfileEmail(t) {
  const directEmail = String(t?.email || '').trim();
  if (directEmail) return directEmail;

  return FACULTY_CONTACT_EMAILS[t?.facultyEN] || 'info@ftu.ac.th';
}

function renderProfile() {
  if (!teacher) return;

  const image = document.getElementById('profileImage');
  if (image) {
    image.src = teacher.image || `https://ui-avatars.com/api/?background=EEF2FF&color=3730A3&size=300&name=${encodeURIComponent(teacher.nameEN || 'Faculty')}`;
    image.alt = teacher.nameEN || 'Faculty Photo';
    image.onerror = function () {
      this.onerror = null;
      this.src = `https://ui-avatars.com/api/?background=EEF2FF&color=3730A3&size=300&name=${encodeURIComponent(teacher.nameEN || 'Faculty')}`;
    };
  }

  setText('profileNameEN', teacher.nameEN);
  setText('profileNameTH', teacher.nameTH);
  setText('profilePosition', `${teacher.positionEN || '-'} | ${teacher.positionTH || '-'}`);
  setText('profileFaculty', `${teacher.facultyEN || '-'} | ${teacher.facultyTH || '-'}`);
  setText('profileDepartment', `${teacher.departmentEN || '-'} | ${teacher.departmentTH || '-'}`);
  setText('profileOffice', `${teacher.building || 'Fatoni University'}, Room ${teacher.room || '-'} | ${teacher.buildingTH || 'มหาวิทยาลัยฟาฏอนี'} ห้อง ${teacher.room || '-'}`);
  setText('profileHoursEN', teacher.officeHoursEN || 'Please contact the faculty office for an appointment.');
  setText('profileHoursTH', teacher.officeHoursTH || 'กรุณาติดต่อสำนักงานคณะเพื่อนัดหมาย');

  const profileEmail = getProfileEmail(teacher);
  const email = document.getElementById('profileEmail');
  if (email) {
    email.textContent = profileEmail;
    email.href = `mailto:${profileEmail}?subject=Faculty%20Contact`;
  }

  const emailButton = document.getElementById('profileEmailButton');
  if (emailButton) {
    emailButton.href = `mailto:${profileEmail}?subject=Faculty%20Contact`;
    emailButton.onclick = null;
  }

  const phoneValue = String(teacher.phone || '073 418 613').trim();
  const phone = document.getElementById('profilePhone');
  if (phone) {
    phone.textContent = phoneValue;
    phone.href = `tel:${phoneValue.replace(/\s/g, '')}`;
  }

  const interests = document.getElementById('profileInterests');
  if (interests) {
    const values = Array.isArray(teacher.interests) ? teacher.interests : [];
    interests.innerHTML = values.length
      ? values.map(item => `<span class="badge bg-primary-subtle text-primary-emphasis px-3 py-2">${item}</span>`).join('')
      : '<span class="text-muted">No specialization information available | ไม่มีข้อมูลความเชี่ยวชาญ</span>';
  }
}

if (user) renderProfile();
