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
