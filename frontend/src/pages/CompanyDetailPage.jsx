import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/companies/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => setCompany(res.data))
    .catch(err => setError(err.response?.data?.message || '상세 조회 실패'));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('정말 이 회사를 삭제하시겠습니까?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/companies/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/companies');
    } catch (err) {
      alert(err.response?.data?.message || '삭제 실패');
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!company) return <p>로딩 중…</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{company.name}</h2>
      <p><strong>주소:</strong> {company.address}</p>
      <p><strong>웹사이트:</strong> <a href={company.website} target="_blank">{company.website}</a></p>
      <p><strong>대표:</strong> {company.ceo_name} ({company.ceo_email}, {company.ceo_phone})</p>
      <p><strong>직원 수:</strong> {company.headcount}</p>
      <p className="mt-4">{company.description}</p>

      <div className="mt-6 flex gap-4">
        <Link to={`/companies/${id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded">수정</Link>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
        <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">목록으로</button>
      </div>
    </div>
  );
}
