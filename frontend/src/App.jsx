import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import CompanyListPage from './pages/CompanyListPage';
import CompanyCreatePage from './pages/CompanyCreatePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import CompanyEditPage from './pages/CompanyEditPage';
import ProfilePage from './pages/ProfilePage';
import { useContext } from 'react';

function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ padding:'10px', borderBottom:'1px solid #ddd' }}>
      <Link to="/">홈</Link> {' | '}
      <Link to="/companies">회사목록</Link> {' | '}
      {' | '}
      {user
        ? <Link to="/me">{user.name}님(내 정보)</Link>
        : <Link to="/login">로그인</Link>}
       {' | '}
       {user
         ? <button onClick={logout}>로그아웃</button>
         : <Link to="/register">회원가입</Link>}
     </nav>
   );
 }


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/" element={<h1 style={{padding:'20px'}}>홈</h1>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login"    element={<LoginPage    />} />
          <Route path="/companies"       element={<CompanyListPage   />} />
          <Route path="/companies/new"   element={<CompanyCreatePage />} />
          <Route path="/companies/:id"   element={<CompanyDetailPage />} />
          <Route path="/companies/:id/edit" element={<CompanyEditPage />} />
          <Route path="/me" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
