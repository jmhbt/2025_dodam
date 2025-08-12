import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CompanyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', website: '', description: '', ceo_name: '', ceo_phone: '', ceo_email: '', headcount: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/companies/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm(res.data))
      .catch(err => setError('불러오기 실패'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/companies/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      navigate(`/companies/${id}`);
    } catch {
      setError('수정 실패');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">회사 정보 수정</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','address','website','ceo_name','ceo_phone','ceo_email','headcount','description'].map(key => (
          key === 'description' ? (
            <textarea key={key} name={key} value={form[key]||''} onChange={handleChange} placeholder="설명" className="w-full border p-2 rounded" />
          ) : (
            <input key={key} name={key} value={form[key]||''} onChange={handleChange} placeholder={key} className="w-full border p-2 rounded" />
          )
        ))}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">수정 완료</button>
      </form>
    </div>
  );
}
