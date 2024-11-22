import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

import { message } from 'antd';

import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      const { success_token, username: user } = data;

      message.success('Успешный вход! 🏆');
      localStorage.setItem('token', success_token);
      dispatch(loginSuccess({ token: success_token, username: user }));

      setUsername('');
      setPassword('');
    } catch (error) {
      message.error('Login failed! Please check your credentials.');
      console.error('Error with login', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Continue
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          By continuing, you agree to Amazon's{' '}
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
          Need help?
        </a>

        <hr className="my-4" />

        <div className="text-center">
          <p className="text-sm text-gray-500">New to Amazon?</p>
          <button className="mt-2 w-full border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50">
            <Link to="/login">Create your Amazon account</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
