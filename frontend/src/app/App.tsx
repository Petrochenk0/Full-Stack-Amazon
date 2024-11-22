import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';

import NavBar from '../widgets/NavBar';

import SearchResult from '../pages/SearchResult';

import Cart from '../pages/Cart';

import Registry from '../pages/Registry';

import Login from '../pages/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from '../redux/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const username = getUsername();
      if (username) {
        console.log('Имя пользователя:', username);
      } else {
        console.warn('Имя пользователя отсутствует');
      }
    } catch (error) {
      console.error('Ошибка в App.tsx:', error);
    }
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
