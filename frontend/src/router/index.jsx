import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/companies" element={<CompanyList />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
