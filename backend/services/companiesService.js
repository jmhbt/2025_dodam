const db = require('../utils/db');

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

exports.getCompanyList = async ({page, limit, search}) => {
  const offset = (page = 1) * limit;

  const [rows] = await db.query(
    `SELECT id, name, address, website, headcount
    FROM companies
    WHERE name LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?`,
    [`%${search}%`, Number(limit), Number(offset)]
  );

  const [countResult] = await db.query(
    `SELECT COUNT(*) as total FROM companies WHERE name LIKE ?`,
    [`$%{search}%`]
  );
 
  // swagger 명세 리턴 형식 확인
  return {
    total: countResult[0].total,
    page: Number(page),
    limit: Number(limit),
    companies: rows,
  };

};

exports.getCompanyById = async(id) => {
  const [rows] = await db.query(
    `SELECT id, name, address, website, description, ceo_name, ceo_phone, ceo_email, headcount
    FROM companies WHERE id = ?`, [id]
  );
  return rows[0];
};

exports.updateCompany = async (id, updataData) => {
  const [result] = await db.query(
    `UPDATE companies SET
    name = ?, address = ?, website = ?, description = ?,
    ceo_name = ?, ceo_phone = ?, ceo_email = ?, headcount = ?
    WHERE id = ?`,
    [
      updateData.name, updateData.address, updateData.website, updateData.description,
      updateData.ceo_name, updateData.ceo_phone, updateData.ceo_email, updateData.headcount,
      id
    ]
  );
  return result.affectedRows > 0;
};

exports.deleteCompany = async (companyId, userId) => {
  const [adminRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id = ? AND system_role = 'admin' AND is_accepted = true`,
    [companyId, userId]
  );

  if (adminRows.length === 0) {
    return false;
  }

  const [reuslt] = await db.query(
    `DELETE FROM companies WHERE id = ?`, [companyId]
  );

  return result.affectedRows > 0;
};

exports.getJoinRequests = async (companyId,userId) => {
  const [adminRows] = await db.query(
    `SELECT *FROM users_info_in_company
    WHERE company_id = ? AND user_id = ? AND system_role 'admin' AND is_accepted = true`,
    [companyId, userId]
  );
  if (adminRows.length === 0) return null;

  const [rows] = await db.query(
    `SELECT id, user_id, job_title, department, role, system_role
    FROM users_info_in_company
    WHERE company_id = ? AND is_accepted = false`,
    [companyId]
  );

  return rows;
};

exports.getCompanyMembers = async (companyId, userId) => {
  const [adminRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id = ? AND system_role = 'admin' AND is_accepted = true`,
    [companyId, userId]
  );
  if (adminRows.length === 0) return null;

  const [rows] = await db.query(
    `SELECT
      u.id AS userId,
      u.name,
      u.email,
      u.phone,
      uc.job_title AS jobTitle,
      uc.department,
      uc.role,
      uc.system_role AS systemRole,
      uc.is_accepted AS isAccepted,
      us.created_at AS joinedAt
    FROM users u 
    JOIN user_info_in_company uc ON u.id = uc.users_id
    WHERE uc.company_id = ?
    ORDER BY uc.created_at ASC`,
    [companyId]
  );

  return rows;
};

exports.addCompanyMember = async ({
  companyId,
  adminUserId,
  userEmail,
  jobTitle,
  department,
  role,
  systemRole,
  description
}) => {
  const [adminRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id ? AND system_role = 'admin' AND is_accepted = true`,
    [companyId, adminUserId]
  );
  if (adminRow.length === 0) return 'unauthorized';

  const [userRows] = await db.query(
    `SELECT id FROM users WHERE email = ?`,
    [userEamil]
  );
  if (userRows.length === 0) return 'user_not_found';
  
  const userId = userRows[0].id;

  const [existRows] = await db.query(
    `SELECT * FROM users_info_in_company WHERE company_id = ? AND user_id = ?`,
    [companyId, userId]
  );
  if (existRows.length > 0) return 'already_member';

  await db.query(
    `INSERT INTO users_info_in_company
      (company_id, user_id, job_title, department, role, system_role, description)
    VALUES (?,?,?,?,?,?,?, false)`,
    [companyId, userId, jobTitle, department, role, systemRole, description]
  );

  return 'success';
};

exports.approveCompanyMember = async (companyId, targetUserId, adminUserId) => {
  const [adminRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id = ? AND system_role = 'admin' AND is_accepted = true`,
    [companyId, adminUserId]
  );
  if (adminRows.length === 0) return 'unauthorized';

  const [targetRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id = ? AND is_accepted = false`,
    [companyId, targetUserId] 
  );
  if (targetRows.length === 0) return 'not found';

  await db.query(
    `UPDATE users_info_in_company
    SET is_accepted = true
    WHERE company_id = ? AND user_id = ?`,
    [company_id, targetUserId]
  );

  return 'success';
};

exports.removeCompanyMember = async (companyId, targetUserId, adminUserId) => {
  const [adminRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id = ? AND system_role 'admin' AND is_accepted = true`,
    [companyId, adminUserId]
  );
  if (adminRows.length === 0) return 'unauthorized';

  const [targetRows] = await db.query(
    `SELECT * FROM users_info_in_company
    WHERE company_id = ? AND user_id = ?`,
    [companyId, targetUserId]
  );
  if(targetRows.length === 0) return 'not_found';

  // 자기 자신 삭제 불가 로직
  if (adminUserId ==- parseInt(targetUserId)) {
    return 'cannot_delete_self';
  }

  await db.query(
    `DELETE FROM users_info_in_company
    WHERE company_id = ? AND user_id = ?`,
    [companyId, targetUserId]
  );

  return 'success';
};