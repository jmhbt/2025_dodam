const db = require('../db');

async function findCompanyByName(name) {
  const [rows] = await db.query(
    'SELECT * FROM companies WHERE name = ?', [name]
  );
  return rows[0];
}

async function createCompany(data) {
  const [result] = await db.query(
    `INSERT INTO companies
      (name, address, website, description, ceo_name, ceo_phone, ceo_email, headcount)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name, data.address, data.website, data.description,
      data.ceo_name, data.ceo_phone, data.ceo_email, data.headcount
    ]
  );
  return { id: result.insertId, ...data };
}

async function findUserInfo(userId, companyId) {
  const [rows] = await db.query(
    'SELECT * FROM users_info_in_company WHERE user_id=? AND company_id=?',
    [userId, companyId]
  );
  return rows[0];
}

async function createUserInfo(data) {
  return db.query(
    `INSERT INTO users_info_in_company
      (user_id, company_id, job_title, department, role, system_role, description, is_accepted)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.user_id, data.company_id, data.job_title, 
      data.department, data.role, data.system_role,
      data.description || null, data.is_accepted
    ]
  );
}

async function updateUserInfo(id, fields) {
  const sets = [], vals = [];
  for (let k in fields) { sets.push(`${k}=?`); vals.push(fields[k]); }
  vals.push(id);
  return db.query(
    `UPDATE users_info_in_company SET ${sets.join(', ')} WHERE id=?`,
    vals
  );
}

exports.createCompanyWithOwner = async ({ companyData, ownerId }) => {
  const existing = await findCompanyByName(companyData.name);
  if (existing) throw { status: 409, message: '이미 존재하는 회사 이름입니다.' };

  const company = await createCompany(companyData);

  await createUserInfo({
    user_id: ownerId,
    company_id: company.id,
    job_title: '직업명',
    department: '부서',
    role: '직책',
    system_role: 'admin',
    is_accepted: true,
    description: '회사 생성자',
  });

  return company;
};

exports.requestJoinCompany = async (companyId, userId) => {
  const existing = await findUserInfo(userId, companyId);
  if (existing) throw { status: 400, message: '이미 신청했거나 소속되어 있습니다.' };

  await createUserInfo({
    user_id: userId,
    company_id: companyId,
    job_title: null,
    system_role: 'member',
    is_accepted: false,
  });
};

exports.handleJoinRequest = async (requestId, adminId, accept) => {
  const [rows] = await db.query(
    `SELECT ui.*, c.id AS company_id
     FROM users_info_in_company ui
     JOIN companies c ON ui.company_id = c.id
     WHERE ui.id = ?`, [requestId]
  );
  const reqInfo = rows[0];
  if (!reqInfo) throw { status: 404, message: '신청 정보가 존재하지 않습니다.' };

  const [adminRows] = await db.query(
    `SELECT * FROM users_info_in_company
     WHERE company_id = ? AND user_id = ? AND system_role = 'admin' AND is_accepted = true`,
    [reqInfo.company_id, adminId]
  );
  const adminRow = adminRows[0];
  if (!adminRow) throw { status: 403, message: '권한이 없습니다.' };

  await updateUserInfo(requestId, { is_accepted: accept });
};
