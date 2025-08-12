import { useState } from 'react';
import axios from 'axios';

function CompanyCreatePage() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    website: '',
    description: '',
    ceo_name: '',
    ceo_phone: '',
    ceo_email: '',
    headcount: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/companies`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(`회사 등록 완료: ${res.data.name}`);
      setForm({
        name: '',
        address: '',
        website: '',
        description: '',
        ceo_name: '',
        ceo_phone: '',
        ceo_email: '',
        headcount: '',
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '회사 등록 실패');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">회사 등록</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="회사명" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="address" placeholder="주소" value={form.address} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="website" placeholder="웹사이트" value={form.website} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="ceo_name" placeholder="대표 이름" value={form.ceo_name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="tel" name="ceo_phone" placeholder="대표 전화번호" value={form.ceo_phone} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="email" name="ceo_email" placeholder="대표 이메일" value={form.ceo_email} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" name="headcount" placeholder="총 인원수" value={form.headcount} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="회사 소개" value={form.description} onChange={handleChange} rows={4} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">등록하기</button>
      </form>
    </div>
  );
}

export default CompanyCreatePage;
