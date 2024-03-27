import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/login', formData); // Adjust the endpoint accordingly
      console.log(res.data); // Handle response as needed
      // Optionally, you can redirect the user or perform other actions after successful login
    } catch (err) {
      console.error(err.response.data); // Handle errors
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center ">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 border-4 border-sky-200 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
            <input className="w-full border rounded-md px-3 py-2" type="email" name="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
            <input className="w-full border rounded-md px-3 py-2" type="password" name="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
