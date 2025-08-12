import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
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
      const res = await axios.post('http://localhost:3000/auth/register', form);
      setSuccess('회원가입이 완료되었습니다!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="name" placeholder="이름" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="tel" name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">가입하기</button>
      </form>
    </div>
  );
}

export default RegisterPage;
