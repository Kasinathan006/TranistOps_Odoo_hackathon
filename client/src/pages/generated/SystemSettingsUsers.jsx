import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../../components/SettingsSidebar';

const SystemSettingsUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Rahul Sharma', email: 'rahul.s@bharatlogistics.in', mobile: '+91 9876543210', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Priya Patel', email: 'priya.p@bharatlogistics.in', mobile: '+91 8765432109', role: 'Fleet Manager', status: 'Active' },
        { id: 3, name: 'Amit Kumar', email: 'amit.k@bharatlogistics.in', mobile: '+91 7654321098', role: 'Dispatcher', status: 'Inactive' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '+91 ', role: 'Dispatcher', status: 'Active' });

    const handleOpenModal = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setFormData({ ...user });
        } else {
            setCurrentUser(null);
            setFormData({ name: '', email: '', mobile: '+91 ', role: 'Dispatcher', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleSaveUser = (e) => {
        e.preventDefault();
        if (currentUser) {
            setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
            toast.success('User updated successfully!');
        } else {
            setUsers([...users, { id: Date.now(), ...formData }]);
            toast.success('User added successfully!');
        }
        handleCloseModal();
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
            toast.success('User deleted successfully!');
        }
    };

    return (
        <div className="w-full h-full bg-background flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto mb-8">
                    <nav aria-label="Breadcrumb" className="flex text-secondary text-label-md font-label-md mb-2">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <Link className="inline-flex items-center hover:text-primary transition-colors duration-150" to="/">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
                                    <span className="text-on-surface">Settings</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-display-sm font-display-sm font-bold text-on-surface">System Settings</h1>
                            <p className="text-body-md text-secondary mt-1">Manage company details, users, fleet parameters, and integrations.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto bg-surface rounded-xl border border-outline shadow-sm flex flex-col md:flex-row min-h-[600px]">
                    
                    <SettingsSidebar />

                    {/* Tab Content */}
                    <div className="flex-1 p-6 md:p-8 bg-surface">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline">
                            <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">User Management</h2>
                            <button 
                                onClick={() => handleOpenModal()}
                                className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-label-md flex items-center gap-2 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add User
                            </button>
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-outline">
                                        <th className="py-3 px-4 text-label-md font-bold text-secondary">Name</th>
                                        <th className="py-3 px-4 text-label-md font-bold text-secondary">Email</th>
                                        <th className="py-3 px-4 text-label-md font-bold text-secondary">Mobile</th>
                                        <th className="py-3 px-4 text-label-md font-bold text-secondary">Role</th>
                                        <th className="py-3 px-4 text-label-md font-bold text-secondary">Status</th>
                                        <th className="py-3 px-4 text-label-md font-bold text-secondary text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id} className="border-b border-outline hover:bg-surface-container-lowest transition-colors">
                                            <td className="py-3 px-4 text-body-md text-on-surface font-medium">{user.name}</td>
                                            <td className="py-3 px-4 text-body-md text-secondary">{user.email}</td>
                                            <td className="py-3 px-4 text-body-md text-secondary">{user.mobile}</td>
                                            <td className="py-3 px-4 text-body-md text-on-surface">
                                                <span className="px-2 py-1 bg-surface-container-high rounded text-label-sm">{user.role}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded text-label-sm font-bold ${user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <button onClick={() => handleOpenModal(user)} className="text-primary hover:bg-primary/10 p-1 rounded transition-colors" title="Edit">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button onClick={() => handleDeleteUser(user.id)} className="text-error hover:bg-error/10 p-1 rounded transition-colors ml-2" title="Delete">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-outline flex justify-between items-center">
                            <h3 className="text-title-lg font-bold text-on-surface">{currentUser ? 'Edit User' : 'New User Entry'}</h3>
                            <button onClick={handleCloseModal} className="text-secondary hover:text-on-surface transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSaveUser} className="p-6 space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-md font-bold text-on-surface">Full Name <span className="text-error">*</span></label>
                                <input required type="text" className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Ramesh Kumar" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-md font-bold text-on-surface">Email Address <span className="text-error">*</span></label>
                                <input required type="email" className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="ramesh@bharatlogistics.in" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-md font-bold text-on-surface">Mobile Number</label>
                                <input type="text" className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="+91 9876543210" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Role</label>
                                    <select className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                                        <option value="Admin">Admin</option>
                                        <option value="Fleet Manager">Fleet Manager</option>
                                        <option value="Dispatcher">Dispatcher</option>
                                        <option value="Driver">Driver</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Status</label>
                                    <select className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4 mt-2 border-t border-outline">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2 bg-surface text-on-surface border border-outline rounded-lg hover:bg-surface-container-high transition-colors font-label-md">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-label-md shadow-sm">
                                    {currentUser ? 'Save Changes' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemSettingsUsers;
