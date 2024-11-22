import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

export default function Registry() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password, confirmPassword } = formData;

    if (formData.password !== formData.confirmPassword) {
      message.error('The passwords must match');
      return;
    }

    if (formData.password.length < 6) {
      message.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/register', {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      const { token, username: user } = data;

      console.log('Success registration');

      dispatch(loginSuccess({ token, username: user }));

      message.success('Success registration! 🎉', 3);

      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.log('Server response:', error.response?.data); // Посмотри на сообщение сервера
      const errMsg = error.response?.data?.message || 'Ошибка регистрации!';
      message.error(errMsg); // Показывай ошибку, которую отправил сервер
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        <form onSubmit={handleSubmit}>
          {/* Your Name */}
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="First and last name"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />

          {/* Mobile number or email */}
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">
            Mobile number or email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          /> */}

          {/* Password */}
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />

          {/* Re-enter password */}
          <label htmlFor="reenterPassword" className="block text-sm font-medium text-gray-700 mt-4">
            Re-enter password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />

          {/* Continue button */}
          <button
            type="submit"
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Continue
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          By creating an account, you agree to Amazon's{' '}
          <a href="#" className="text-blue-600">
            Conditions of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600">
            Privacy Notice
          </a>
          .
        </p>

        <a href="#" className="block mt-3 text-sm text-blue-600">
          Buying for work? Create a free business account
        </a>

        <hr className="my-4" />

        <div className="text-center">
          <p className="text-sm text-gray-500">Already have an account?</p>
          <Link to="/registry">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
