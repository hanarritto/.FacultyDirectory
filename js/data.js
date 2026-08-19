// ===============================
// Fatoni University Faculty Directory
// ===============================
// Verified university leadership/faculty records are listed first.
// Additional records are clearly marked as DEMO data so the project can
// demonstrate search, filtering, pagination, favorites and profiles.

const FACULTIES = [
  ['Faculty of Science and Technology', 'คณะวิทยาศาสตร์และเทคโนโลยี'],
  ['Faculty of Education', 'คณะศึกษาศาสตร์'],
  ['Faculty of Liberal Arts and Social Sciences', 'คณะศิลปศาสตร์และสังคมศาสตร์'],
  ['Faculty of Islamic Studies and Law', 'คณะอิสลามศึกษาและนิติศาสตร์'],
  ['International College', 'วิทยาลัยนานาชาติ'],
  ['Graduate School', 'บัณฑิตวิทยาลัย']
];

const PROGRAMS = [
  { faculty: 0, en: 'Information Technology (International Program)', th: 'เทคโนโลยีสารสนเทศ (หลักสูตรนานาชาติ)' },
  { faculty: 0, en: 'Digital Technology and Science (International Program)', th: 'เทคโนโลยีและวิทยาการดิจิทัล (หลักสูตรนานาชาติ)' },
  { faculty: 0, en: 'Data Science and Analytics', th: 'วิทยาการข้อมูลและการวิเคราะห์' },
  { faculty: 0, en: 'General Science', th: 'วิทยาศาสตร์ทั่วไป' },

  { faculty: 1, en: 'English Education', th: 'ภาษาอังกฤษ' },
  { faculty: 1, en: 'Malay Language and Educational Technology', th: 'ภาษามลายูและเทคโนโลยีการศึกษา' },
  { faculty: 1, en: 'Islamic Studies Education', th: 'อิสลามศึกษา' },
  { faculty: 1, en: 'Arabic Education', th: 'ภาษาอาหรับ' },
  { faculty: 1, en: 'Early Childhood Education', th: 'การศึกษาปฐมวัย' },
  { faculty: 1, en: 'Chemistry Education', th: 'เคมี' },

  { faculty: 2, en: 'English Language', th: 'ภาษาอังกฤษ' },
  { faculty: 2, en: 'Malay Language', th: 'ภาษามลายู' },
  { faculty: 2, en: 'Arabic Language and Literature', th: 'ภาษาและวรรณคดีอาหรับ' },
  { faculty: 2, en: 'Political Science', th: 'รัฐศาสตร์' },

  { faculty: 3, en: 'Islamic Studies', th: 'อิสลามศึกษา' },
  { faculty: 3, en: 'Shariah and Law', th: 'ชะรีอะฮ์และนิติศาสตร์' },
  { faculty: 3, en: 'Quran and Sunnah', th: 'อัลกุรอานและซุนนะฮ์' },

  { faculty: 4, en: 'English Language Center', th: 'ศูนย์ภาษาอังกฤษ' },
  { faculty: 4, en: 'Arabic Language Center', th: 'ศูนย์ภาษาอาหรับ' },

  { faculty: 5, en: 'Graduate Studies', th: 'บัณฑิตศึกษา' }
];

const UNIVERSITY_PHONE = '073 418 613';
const DEFAULT_IMAGE = 'https://ui-avatars.com/api/?background=EEF2FF&color=3730A3&size=300&name=';

function avatar(name) {
  return DEFAULT_IMAGE + encodeURIComponent(name);
}

function makeFacultyRecord({
  id, nameEN, nameTH, facultyIndex, departmentEN, departmentTH,
  positionEN, positionTH, email = '', phone = UNIVERSITY_PHONE,
  building = 'Fatoni University', buildingTH = 'มหาวิทยาลัยฟาฏอนี',
  room = '-', interests = [], image = ''
}) {
  return {
    id,
    nameEN,
    nameTH,
    facultyEN: FACULTIES[facultyIndex][0],
    facultyTH: FACULTIES[facultyIndex][1],
    departmentEN,
    departmentTH,
    positionEN,
    positionTH,
    email,
    phone,
    building,
    buildingTH,
    room,
    officeHoursEN: 'Please contact the faculty office for an appointment.',
    officeHoursTH: 'กรุณาติดต่อสำนักงานคณะเพื่อนัดหมาย',
    interests,
    image: image || avatar(nameEN || nameTH)
  };
}

// -------------------------------------------------
// Publicly listed university/faculty management data
// -------------------------------------------------
window.FACULTY_DATA = [
  makeFacultyRecord({
    id: 1,
    nameEN: 'Assoc. Prof. Dr. Ismail Lutfi Japakiya',
    nameTH: 'รองศาสตราจารย์ ดร.อิสมาอีลลุตฟี จะปะกียา',
    facultyIndex: 3,
    departmentEN: 'University Administration',
    departmentTH: 'ผู้บริหารมหาวิทยาลัย',
    positionEN: 'President of Fatoni University',
    positionTH: 'อธิการบดีมหาวิทยาลัยฟาฏอนี',
    interests: ['University Administration', 'Islamic Higher Education']
  }),
  makeFacultyRecord({
    id: 2,
    nameEN: 'Asst. Prof. Dr. Anuwat Walee',
    nameTH: 'ผู้ช่วยศาสตราจารย์ ดร. อนุวัตร วอลี',
    facultyIndex: 0,
    departmentEN: 'Faculty Administration',
    departmentTH: 'บริหารคณะ',
    positionEN: 'Dean, Faculty of Science and Technology',
    positionTH: 'คณบดีคณะวิทยาศาสตร์และเทคโนโลยี',
    interests: ['Science and Technology', 'Digital Technology']
  }),
  makeFacultyRecord({
    id: 3,
    nameEN: 'Asst. Prof. Dr. Ahmad Yeesunthong',
    nameTH: 'ผู้ช่วยศาสตราจารย์ ดร.อะห์มัด ยี่สุ่นทรง',
    facultyIndex: 1,
    departmentEN: 'Faculty Administration',
    departmentTH: 'บริหารคณะ',
    positionEN: 'Dean, Faculty of Education',
    positionTH: 'คณบดีคณะศึกษาศาสตร์',
    email: 'edu@ftu.ac.th',
    interests: ['Education', 'Teacher Development']
  }),
  makeFacultyRecord({
    id: 4,
    nameEN: 'Asst. Prof. Sorat Abdulsata',
    nameTH: 'ผู้ช่วยศาสตราจารย์ โสรัตน์ อับดุลสตา',
    facultyIndex: 2,
    departmentEN: 'Faculty Administration',
    departmentTH: 'บริหารคณะ',
    positionEN: 'Dean, Faculty of Liberal Arts and Social Sciences',
    positionTH: 'คณบดีคณะศิลปศาสตร์และสังคมศาสตร์',
    email: 'lasc@ftu.ac.th',
    phone: '073 420 416',
    interests: ['Liberal Arts', 'Social Sciences']
  }),
  makeFacultyRecord({
    id: 5,
    nameEN: 'Asst. Prof. Dr. Prachya Benmadni',
    nameTH: 'ผู้ช่วยศาสตราจารย์ ดร. ปรัชญา เบ็ญหมัดหนี',
    facultyIndex: 4,
    departmentEN: 'International College Administration',
    departmentTH: 'บริหารวิทยาลัยนานาชาติ',
    positionEN: 'Dean, International College',
    positionTH: 'คณบดีวิทยาลัยนานาชาติ',
    email: 'ic@ftu.ac.th',
    phone: '073 361 559',
    interests: ['International Education', 'Language Education']
  }),
  makeFacultyRecord({
    id: 6,
    nameEN: 'Asst. Prof. Dr. Ibrahim Tehha',
    nameTH: 'ผู้ช่วยศาสตราจารย์ ดร. อิบรอเฮม เต๊ะแห',
    facultyIndex: 5,
    departmentEN: 'Graduate School Administration',
    departmentTH: 'บริหารบัณฑิตวิทยาลัย',
    positionEN: 'Dean, Graduate School',
    positionTH: 'คณบดีบัณฑิตวิทยาลัย',
    interests: ['Graduate Studies', 'Research']
  })
];

// -------------------------------------------------
// DEMO lecturer records
// -------------------------------------------------
// These entries are intentionally labeled DEMO. They keep the project rich
// enough to demonstrate 400+ searchable records without pretending that
// generated names/contact details are official university information.
const DEMO_FIRST_NAMES = [
  'Ahmad','Muhammad','Abdullah','Yusuf','Ibrahim','Hasan','Omar','Farid','Rahim','Karim',
  'Amina','Nurul','Siti','Fatimah','Nadia','Zainab','Salma','Huda','Safiya','Mariam'
];

const DEMO_LAST_NAMES = [
  'Rahman','Hassan','Abdullah','Yusuf','Ismail','Karim','Latif','Mahmud','Salim','Hossain',
  'Ali','Usman','Hamid','Jamal','Nordin','Sulaiman','Daud','Ishak','Harun','Zakaria'
];

let facultyId = window.FACULTY_DATA.length + 1;

for (let p = 0; p < PROGRAMS.length; p++) {
  for (let i = 0; i < 20; i++) {
    const seed = (p * 20) + i;
    const first = DEMO_FIRST_NAMES[seed % DEMO_FIRST_NAMES.length];
    const last = DEMO_LAST_NAMES[(seed * 3 + p) % DEMO_LAST_NAMES.length];
    const program = PROGRAMS[p];
    const demoNumber = String(seed + 1).padStart(3, '0');
    const nameEN = `${first} ${last} (Demo ${demoNumber})`;

    window.FACULTY_DATA.push(makeFacultyRecord({
      id: facultyId++,
      nameEN,
      nameTH: `อาจารย์ตัวอย่าง ${demoNumber}`,
      facultyIndex: program.faculty,
      departmentEN: program.en,
      departmentTH: program.th,
      positionEN: ['Lecturer', 'Assistant Professor', 'Associate Professor'][seed % 3],
      positionTH: ['อาจารย์', 'ผู้ช่วยศาสตราจารย์', 'รองศาสตราจารย์'][seed % 3],
      email: `demo${demoNumber}@example.com`,
      phone: UNIVERSITY_PHONE,
      room: `D-${String(201 + (seed % 80))}`,
      interests: [
        program.en,
        ['Web Technology', 'Network Technology', 'Data Analysis', 'Digital Innovation'][seed % 4]
      ]
    }));
  }
}

// ===============================
// Student ID Prototype Structure
// ===============================
// Format used by this prototype: YY G PPP NNN
// This remains a project prototype and is not presented as the university's
// official complete student-ID codebook.

window.STUDENT_PROGRAM_CODES = {
  '430': { facultyEN: 'Faculty of Science and Technology', facultyTH: 'คณะวิทยาศาสตร์และเทคโนโลยี', programEN: 'Digital Technology and Science', programTH: 'เทคโนโลยีและวิทยาการดิจิทัล' },
  '431': { facultyEN: 'Faculty of Science and Technology', facultyTH: 'คณะวิทยาศาสตร์และเทคโนโลยี', programEN: 'Information Technology', programTH: 'เทคโนโลยีสารสนเทศ' },
  '432': { facultyEN: 'Faculty of Science and Technology', facultyTH: 'คณะวิทยาศาสตร์และเทคโนโลยี', programEN: 'Data Science and Analytics', programTH: 'วิทยาการข้อมูลและการวิเคราะห์' },
  '433': { facultyEN: 'Faculty of Science and Technology', facultyTH: 'คณะวิทยาศาสตร์และเทคโนโลยี', programEN: 'General Science', programTH: 'วิทยาศาสตร์ทั่วไป' },

  '440': { facultyEN: 'Faculty of Education', facultyTH: 'คณะศึกษาศาสตร์', programEN: 'English Education', programTH: 'ภาษาอังกฤษ' },
  '441': { facultyEN: 'Faculty of Education', facultyTH: 'คณะศึกษาศาสตร์', programEN: 'Malay Language and Educational Technology', programTH: 'ภาษามลายูและเทคโนโลยีการศึกษา' },
  '442': { facultyEN: 'Faculty of Education', facultyTH: 'คณะศึกษาศาสตร์', programEN: 'Islamic Studies Education', programTH: 'อิสลามศึกษา' },

  '450': { facultyEN: 'Faculty of Liberal Arts and Social Sciences', facultyTH: 'คณะศิลปศาสตร์และสังคมศาสตร์', programEN: 'English Language', programTH: 'ภาษาอังกฤษ' },
  '451': { facultyEN: 'Faculty of Liberal Arts and Social Sciences', facultyTH: 'คณะศิลปศาสตร์และสังคมศาสตร์', programEN: 'Malay Language', programTH: 'ภาษามลายู' },
  '452': { facultyEN: 'Faculty of Liberal Arts and Social Sciences', facultyTH: 'คณะศิลปศาสตร์และสังคมศาสตร์', programEN: 'Arabic Language and Literature', programTH: 'ภาษาและวรรณคดีอาหรับ' },

  '460': { facultyEN: 'Faculty of Islamic Studies and Law', facultyTH: 'คณะอิสลามศึกษาและนิติศาสตร์', programEN: 'Islamic Studies', programTH: 'อิสลามศึกษา' },
  '461': { facultyEN: 'Faculty of Islamic Studies and Law', facultyTH: 'คณะอิสลามศึกษาและนิติศาสตร์', programEN: 'Shariah and Law', programTH: 'ชะรีอะฮ์และนิติศาสตร์' },
  '462': { facultyEN: 'Faculty of Islamic Studies and Law', facultyTH: 'คณะอิสลามศึกษาและนิติศาสตร์', programEN: 'Quran and Sunnah', programTH: 'อัลกุรอานและซุนนะฮ์' },

  '424': { facultyEN: 'International College', facultyTH: 'วิทยาลัยนานาชาติ', programEN: 'English Preparatory Program', programTH: 'ภาษาอังกฤษ (เตรียมภาษาอังกฤษ)' }
};

const STUDENT_FIRST_NAMES = {
  1: ['Ahmad','Muhammad','Yusuf','Hasan','Omar','Farid','Niran','Somchai','Wei','Rajesh','Bounmy','Rahim'],
  2: ['Amina','Nurul','Siti','Fatimah','Nadia','Kanya','Siriporn','Mei','Priya','Neha','Zainab','Salma']
};

const STUDENT_LAST_NAMES = [
  'Ali','Yusuf','Rahman','Hassan','Abdullah','Sukjai','Thongdee','Zhang',
  'Wang','Sharma','Patel','Phommasane','Chowdhury','Hossain','Saelim'
];

window.parseStudentId = function(studentId) {
  const id = String(studentId || '').trim();

  if (!/^\d{9}$/.test(id)) {
    return { valid: false, reason: 'Student ID must contain 9 digits. | รหัสนักศึกษาต้องมี 9 หลัก' };
  }

  const year = id.slice(0, 2);
  const genderCode = id.slice(2, 3);
  const programCode = id.slice(3, 6);
  const runningNumber = id.slice(6, 9);

  if (!['64','65','66','67','68','69'].includes(year)) {
    return { valid: false, reason: 'Admission year must be 64-69. | ปีที่เข้าศึกษาต้องอยู่ระหว่าง 64-69' };
  }

  if (!['1','2'].includes(genderCode)) {
    return { valid: false, reason: 'Gender/section code must be 1 or 2. | รหัสกลุ่มเพศต้องเป็น 1 หรือ 2' };
  }

  const program = STUDENT_PROGRAM_CODES[programCode];
  if (!program) {
    return { valid: false, reason: 'Unknown program code. | ไม่พบรหัสสาขาวิชาในระบบต้นแบบ' };
  }

  const running = Number(runningNumber);
  if (running < 1 || running > 999) {
    return { valid: false, reason: 'Invalid running number. | ลำดับนักศึกษาไม่ถูกต้อง' };
  }

  return {
    valid: true,
    id,
    year,
    admissionYearBE: 2500 + Number(year),
    genderCode,
    genderEN: genderCode === '1' ? 'Male' : 'Female',
    genderTH: genderCode === '1' ? 'ชาย' : 'หญิง',
    programCode,
    runningNumber,
    running,
    ...program
  };
};

function deterministicStudentName(parsed) {
  const firstPool = STUDENT_FIRST_NAMES[Number(parsed.genderCode)];
  const seed = Number(parsed.year) * 100000 + Number(parsed.programCode) * 1000 + parsed.running;
  const first = firstPool[seed % firstPool.length];
  const last = STUDENT_LAST_NAMES[(seed * 7) % STUDENT_LAST_NAMES.length];
  return `${first} ${last}`;
}

window.getStudentById = function(studentId) {
  const parsed = parseStudentId(studentId);
  if (!parsed.valid) return null;

  return {
    id: parsed.id,
    name: deterministicStudentName(parsed),
    password: parsed.id,
    admissionYear: parsed.admissionYearBE,
    genderCode: parsed.genderCode,
    genderEN: parsed.genderEN,
    genderTH: parsed.genderTH,
    programCode: parsed.programCode,
    programEN: parsed.programEN,
    programTH: parsed.programTH,
    facultyEN: parsed.facultyEN,
    facultyTH: parsed.facultyTH,
    runningNumber: parsed.runningNumber
  };
};
