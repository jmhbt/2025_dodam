import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  // 로그인 안 된 상태면 로그인 페이지로
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">마이페이지</h2>
      <div className="space-y-2">
        <p><strong>이름:</strong> {user.name}</p>
        <p><strong>이메일:</strong> {user.email}</p>
        <p><strong>전화번호:</strong> {user.phone || '등록 안 됨'}</p>
        <p><strong>역할:</strong> {user.role}</p>
      </div>
    </div>
  );
}
