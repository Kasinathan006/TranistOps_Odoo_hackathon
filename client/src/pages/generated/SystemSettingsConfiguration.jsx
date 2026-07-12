import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../../components/SettingsSidebar';

const SystemSettingsConfiguration = () => {
    const [config, setConfig] = useState({
        companyName: 'Bharat Logistics Ltd',
        gstin: '29ABCDE1234F1Z5',
        registeredAddress: '123, Logistics Park, Mumbai-Pune Highway, Pune, Maharashtra 411033',
        supportEmail: 'support@bharatlogistics.in',
        supportPhone: '+91 1800-123-4567',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        currency: 'INR (₹)'
    });

    const handleSave = () => {
        toast.success(`Company Profile saved successfully!`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });
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
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-4 py-2 bg-surface text-on-surface border border-outline rounded-lg hover:bg-surface-container-high transition-colors font-label-md flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="flex-1 sm:flex-none px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-label-md flex items-center justify-center gap-2 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto bg-surface rounded-xl border border-outline shadow-sm flex flex-col md:flex-row min-h-[600px]">
                    
                    <SettingsSidebar />

                    {/* Tab Content */}
                    <div className="flex-1 p-6 md:p-8 bg-surface">
                        <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface mb-6 pb-4 border-b border-outline">Company Profile</h2>

                        <form className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-surface-container-highest border-2 border-dashed border-outline flex items-center justify-center overflow-hidden relative group cursor-pointer">
                                    <span className="material-symbols-outlined text-[32px] text-secondary group-hover:scale-110 transition-transform">add_photo_alternate</span>
                                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center backdrop-blur-sm transition-all">
                                        <span className="text-white text-label-sm font-bold">Upload Logo</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-title-md font-bold text-on-surface">Company Logo</h3>
                                    <p className="text-body-sm text-secondary mt-1">PNG, JPG up to 2MB. Recommended size: 256x256px.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-label-md font-bold text-on-surface">Company Name</label>
                                    <input name="companyName" value={config.companyName} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-label-md font-bold text-on-surface">GSTIN Number</label>
                                    <input name="gstin" value={config.gstin} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-label-md font-bold text-on-surface">Registered Address</label>
                                    <textarea name="registeredAddress" value={config.registeredAddress} onChange={handleChange} className="p-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[80px] resize-y"></textarea>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Support Email</label>
                                    <input name="supportEmail" value={config.supportEmail} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="email" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Support Phone</label>
                                    <input name="supportPhone" value={config.supportPhone} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="tel" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Timezone</label>
                                    <select name="timezone" value={config.timezone} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                                        <option>Asia/Kolkata (IST)</option>
                                        <option>UTC</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Date Format</label>
                                    <select name="dateFormat" value={config.dateFormat} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                                        <option>DD/MM/YYYY</option>
                                        <option>MM/DD/YYYY</option>
                                        <option>YYYY-MM-DD</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsConfiguration;
