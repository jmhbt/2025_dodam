const companyService = require('../services/companyService');

exports.createCompany = async (req, res) => {
  try {
    const { name, address, website, description, ceo_name, ceo_phone, ceo_email, headcount } = req.body;
    const userId = req.user.id; // auth 미들웨어를 통해 요청한 유저 ID 가져옴

    const result = await companyService.createCompanyWithOwner({
      companyData: { name, address, website, description, ceo_name, ceo_phone, ceo_email, headcount },
      ownerId: userId,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// 가입 신청
exports.requestJoin = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const userId = req.user.id;

    await companyService.requestJoinCompany(companyId, userId);
    res.status(200).json({ message: '가입 신청이 제출되었습니다.' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// 가입 승인/거절 (관리자 권한 필요)
exports.respondJoinRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { accept } = req.body; // boolean
    const adminId = req.user.id;

    await companyService.handleJoinRequest(requestId, adminId, accept);
    res.status(200).json({ message: accept ? '가입이 승인되었습니다.' : '가입이 거절되었습니다.' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// 회사 목록 조회
exports.getCompanyList = async (req, res) =>{
  try {
    const {page = 1, limit = 10, search = ''} = req.query;
    const result = await companyService.getCompanyList({page,limit,search});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({message : '회사 목록 조회 실패', error: err.message});
  }
};

// 회사 상세 정보 조회
exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyService.getCompanyById(companyId);
    if (!company) {
      return res.stauts(404).json({message: '회사를 찾을 수 없습니다.'});
    }
    res.status(200).json(company);
  } catch(err) {
    res.status(500).json({message: '회사 조회 실패', error: err.message});
  }
};

// 회사 정보 수정
exports.updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updataData = req.body;

    const updated = await companyService.updateCompany(companyId, updateData);

    if(!updated) {
      return res.status(404).json({ message: '회사 정보를 찾을 수 없습니다.'});
    }
    res.status(200).json({message: '회사 정보가 수정되었습니다.'});
  } catch (err) {
    res.status(500).json({message: '회사 정보 수정 실패', error: err.message});
    }
};

// 회사 정보 삭제
exports.deleteCompany = async (req, res) => {
  try{
    const companyId = req.params.id;
    const userId = req.user.id;

    const result = await companyService.deleteCompany(companyId, userId);

    if (!result) {
      return res.status(403).json({message: '권한이 없거나 회사를 찾을 수 없습니다.'});
    }

    res.status(200).json({message: '회사 삭제가 완료되었습니다.'});
  } catch (err) {
    res.status(err.status || 500),json({message: '회사 삭제 실패', error: err.message});
  }
};

// 회사 가입 신청자 조회
exports.getJoinRequests = async (req, res) => {
  try {
    const companyId = req.params.id;
    const userId = req.user.id;

    const requests = await companyService.getJoinRequests(companyId, userId);

    if(!requests) {
      return res.status(403).json({message: '권한이 없습니다.'});
    }

    res.stauts(200).json(requests);
  } catch(err) {
    res.status(err.status || 500).json({message: '가입 요청 목록 조회 실패', error: err.message});
  }
};

// 회사 직원 목록 조회
exports.getCompanyMembers = async (req,res) => {
  const companyId = req.params.companyId;

  try {
    const members = await companiesService.getCompanyMembers(companyId);
    res.status(200).json(members);
  } catch(error) {
    console.error('회사 직원 목록 조회 실패:', error);
    res.status(500).json({message: '회사 직원 목록을 불러오는 데 실패했습니다.'});
  }
};

// 회사 직원 추가 (초대/직접 등록)
exports.addCompanyService = async (req, res) => {
  const companyId = req.params.companyId;
  const adminUserId = req.user.id;
  const { userEmail, jobTitle, department, role, systemRole, description } = req.body;

  try {
    const result = await companiesService.addCompanyMember({
      companyId,
      adminUserId,
      userEmail,
      jobTitle,
      department,
      role,
      systemRole,
      description
    });
    
    if (result === 'unauthorized') {
      return res.status(403).json({message: '관리자 권한이 없습니다.'});
    } else if (result === 'user_not_fount'){
      return res.status(404).json({message: '해당 이메일의 유저가 존재하지 않습니다.'});
    } else if (result === 'already_member'){
      return res.status(409).json({message: '이미 회사에 등록된 유저입니다.'});
    }

    return res.status(201).json({message: '직원이 등록 요청되었습니다.'});
  } catch (err) {
    console.error('직원 추가 실패:', err);
    return res.status(500).json({message: '직원 추가에 실패했습니다.'});
  }
};

// 회사 직원 승인 처리 
exports.approveCompanyMember = async (req,res) => {
  const companyId = req.params.companyId;
  const targetUserId = req.params.userId;
  const adminUserId = req.user.id;

  try {
    const result = await companiesService.approveCompanyMeber(companyId, targetUserId, adminUserId);

    if (result === 'unauthorized'){
      return res.status(403).json({message: '권한이 없습니다.'});
    } else if (result === 'not found'){
      return res.status(404).json({message: '가입 요청이 존재하지 않습니다.'});
    }
    
    return res.status(200).json({message: '직원이 승인되었습니다.'});
  } catch (err) {
    console.error('직원 승인 실패:', err);
    return res.status(500).json({message: '직원 승인에 실패했습니다.'});
  }
};

// 회사 직원 삭제/탈퇴
exports.removeCompanyMember = async (req, res) => {
  const companyId = req.params.companyId;
  const targetUserId = req.params.userId;
  const adminUserId = req.user.id;

  try {
    const result = await companiesService.removeCompanyMember(companyId, targetUserId, adminUserId);
    
    if (result === 'unauthorized') {
      return res.status(404).json({message: '권한이 없습니다.'});
    }else if (result === 'not found'){
      return res.status(404).json({message: '해당 직원이 존재하지 않습니다.'});
    }
    return res.status(200).json({message:'직원이 삭제되었습니다.'});
  }catch (err) {
    console.error('직원 삭제 실패:', err);
    return res.status(500).json({message: '직원 삭제에 실패하였습니다.'});
  }
};