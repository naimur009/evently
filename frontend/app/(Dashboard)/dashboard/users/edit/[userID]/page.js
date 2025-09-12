"use client"
import api from '@/app/libs/axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// The main App component that renders the user info page.
export default function App({ params }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState('');

  let userData = {};

  // Simulate fetching user data from an API and initializing form data.
  useEffect(() => {
    // Mock user data
    const fetchUserdata = async () => {
      const { userID } = await params
      const response = await api.get(`/users/${userID}`)
      const data = response.data.data;
      setUser(data);
      setFormData(data);

    }
    fetchUserdata();

  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(
      `/users/${formData._id}`,
      {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        status: formData.status
      }
    )
    setMessage('User profile saved successfully!');
    setTimeout(() => {
      router.push("/dashboard/users");
    }, 1000); 
    router.push("/dashboard/users");
  };
  const router = useRouter();
  // Handle form cancellation
  const handleCancel = () => {
    setFormData(user); 
    setMessage('Changes have been cancelled.');
    setTimeout(() => {
      setMessage('')
      router.push("/dashboard/users");
    }, 1000); 
  };

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  // Icons used in the component.
  const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const MailIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );

  const EditIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
      <path d="m15 5 4 4"></path>
    </svg>
  );

  const SaveIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  const CancelIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m15 9-6 6"></path>
      <path d="m9 9 6 6"></path>
    </svg>
  );

  return (
    <div className="font-sans antialiased bg-gray-50 text-gray-900 min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-tight mb-4 sm:mb-0">
            Edit Profile
          </h1>
          <div className="flex flex-row space-x-2 w-full sm:w-auto">
            <button onClick={handleSubmit} className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors">
              <SaveIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>
            <button onClick={handleCancel} className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow-lg hover:bg-gray-300 transition-colors">
              <CancelIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Cancel</span>
            </button>
          </div>
        </header>

        {/* Status Message */}
        {message && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-gray-900 text-white rounded-full shadow-lg text-sm transition-all duration-300 ease-in-out">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 space-y-6 sm:space-y-8">

          {/* Profile Header and Image */}
          <div className="flex flex-col items-center">
            <img
              src={`https://placehold.co/1200x600/60a5fa/ffffff?text=${formData.name[0]}`}
              alt={`${formData.name}'s profile`}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md transform hover:scale-105 transition-transform"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">Click on the image to upload a new one.</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-colors"
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                defaultValue={userData.role}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-colors"
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>

            {/* Status Field */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Read-only fields */}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              type="text"
              id="id"
              value={formData._id}
              disabled
              className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-500 bg-gray-100 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
