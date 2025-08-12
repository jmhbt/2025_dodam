import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function CompanyListPage() {
  const { user } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [error, setError]       = useState('');
  const navigate                 = useNavigate();

  useEffect(() => {
    // 1) 로그인 상태가 아니면 로그인 페이지로
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    // 2) 전역 헤더에 token 이 자동 세팅되어 있으므로
    //    단순히 GET 호출만 하면 됩니다.
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/companies`)
      .then(res => {
        // res.data = { total, page, limit, companies }
        setCompanies(res.data.companies || []);
      })
      .catch(err => {
        const status = err.response?.status;
        if (status === 401) {
          // 토큰 만료 등 인증 문제
          setError('세션이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login', { replace: true });
        } else {
          setError(err.response?.data?.message || '회사 목록을 불러오는 중 오류가 발생했습니다.');
        }
      });
  }, [user, navigate]);

  // 에러가 있으면 에러만 보여 주고 렌더링 종료
  if (error) {
    return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>회사 목록</h1>

      {companies.length === 0 ? (
        <p>등록된 회사가 없습니다.</p>
      ) : (
        <ul>
          {companies.map(c => (
            <li key={c.id} style={{ marginBottom: '8px' }}>
              <strong>{c.name}</strong><br/>
              <small>{c.address}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
