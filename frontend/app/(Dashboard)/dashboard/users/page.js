"use client"
import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, SortAsc, SortDesc, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/app/libs/axios';


let mockUsers = []; // global variable in this file

// Fetch data globally
const fetchGlobalEvents = async () => {
  try {
    const response = await api.get("/users");
    mockUsers = response.data.data
    return response.data.data; // update the global variable
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Remove immediate fetch - will be called in useEffect

const fetchUsers = (filters) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredUsers = mockUsers.filter(user => {
        if (filters.searchQuery && !user.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
        if (filters.roleFilter && filters.roleFilter !== 'All' && user.role !== filters.roleFilter) return false;
        if (filters.statusFilter && filters.statusFilter !== 'All' && user.status !== filters.statusFilter) return false;
        return true;
      });

      if (filters.sortBy) {
        filteredUsers.sort((a, b) => {
          if (a[filters.sortBy] < b[filters.sortBy]) return filters.sortOrder === 'asc' ? -1 : 1;
          if (a[filters.sortBy] > b[filters.sortBy]) return filters.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      resolve(filteredUsers);
    }, 500);
  });
};

const StatusPill = ({ status }) => {
  let style = '';
  switch (status) {
    case 'Active': style = 'bg-emerald-50 text-emerald-600 border-emerald-100'; break;
    case 'Inactive': style = 'bg-rose-50 text-rose-600 border-rose-100'; break;
    case 'Pending': style = 'bg-amber-50 text-amber-600 border-amber-100'; break;
    default: style = 'bg-gray-50 text-gray-500 border-gray-100'; break;
  }
  return (
    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full ${style}`}>
      {status}
    </span>
  );
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchGlobalEvents();
      setUsers(res)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setLoading(true);
    const filters = { searchQuery, roleFilter, statusFilter, sortBy, sortOrder };
    fetchUsers(filters).then(data => { setUsers(data); setLoading(false); });
  }, [searchQuery, roleFilter, statusFilter, sortBy, sortOrder]);


  const handleDelete = async (id) => {
    const response = await api.delete(`/users/${id}`);
    window.location.reload();

  }


  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(column); setSortOrder('asc'); }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => { if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber); };

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Users Directory</h1>
          <p className="text-gray-500 font-medium">Manage user access, roles, and status across the platform.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="relative flex-1 md:w-40 min-w-[140px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <select
              className="w-full pl-12 pr-8 py-3 bg-gray-50/50 border-none rounded-2xl text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-100"
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="relative flex-1 md:w-40 min-w-[140px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <select
              className="w-full pl-12 pr-8 py-3 bg-gray-50/50 border-none rounded-2xl text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-100"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                {['name', 'email', 'role', 'status'].map(col => (
                  <th key={col} onClick={() => handleSort(col)} className="px-8 py-5 group cursor-pointer select-none">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {col}
                      {sortBy === col && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                    </div>
                  </th>
                ))}
                <th className="px-8 py-5 text-right">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse"><td colSpan="5" className="px-8 py-6 bg-gray-50/30"></td></tr>
                ))
              ) : currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user._id} className="group hover:bg-gray-50/50 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-black text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Mail size={16} className="text-gray-300" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6"><StatusPill status={user.status} /></td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-3 transition-opacity opacity-50 group-hover:opacity-100">
                        <Link href={`users/edit/${user._id}`} className="p-2 rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-medium">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 grid grid-cols-1 gap-4">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-white p-4 rounded-2xl border border-gray-50 h-32"></div>
            ))
          ) : currentUsers.length > 0 ? (
            currentUsers.map(user => (
              <div key={user._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-gray-900 leading-tight truncate">{user.name}</h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <StatusPill status={user.status} />
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-xl">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href={`users/edit/${user._id}`}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold transition-colors active:scale-95"
                  >
                    <Edit size={14} /> Edit User
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold transition-colors active:scale-95"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 font-medium">No users found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="bg-gray-50/30 px-8 py-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} Users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all border 
                        ${currentPage === i + 1 ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}
                    `}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <span className="sm:hidden text-xs font-bold text-gray-900">Page {currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
