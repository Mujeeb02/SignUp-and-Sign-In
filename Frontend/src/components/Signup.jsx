import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });

  const { name, email, password, role } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/createUser', formData); // Adjust the endpoint accordingly
      toast.success("Successfully created user");
      toast.success("Succesfully")
      console.log(res.data); // Handle response as needed
      // Optionally, you can reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Student'
      });
    } catch (err) {
      console.error(err.response.data); // Handle errors
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto bg-white rounded-md shadow-md p-8 border-4 border-sky-200 shadow-md">
  <h2 className="text-2xl font-semibold mb-6 text-center">Create User</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="name">Name:</label>
      <input className="w-full border rounded-md px-3 py-2" type="text" name="name" id="name" value={name} onChange={handleChange} required />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
      <input className="w-full border rounded-md px-3 py-2" type="email" name="email" id="email" value={email} onChange={handleChange} required />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
      <input className="w-full border rounded-md px-3 py-2" type="password" name="password" id="password" value={password} onChange={handleChange} required />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="role">Role:</label>
      <select className="w-full border rounded-md px-3 py-2" name="role" id="role" value={role} onChange={handleChange}>
        <option value="Admin">Admin</option>
        <option value="Student">Student</option>
        <option value="Tutor">Tutor</option>
      </select>
    </div>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full" type="submit">Submit</button>
  </form>
</div>

  );
};

export default Signup;
