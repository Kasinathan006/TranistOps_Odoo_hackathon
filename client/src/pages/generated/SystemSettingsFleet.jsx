import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../../components/SettingsSidebar';

const SystemSettingsFleet = () => {
    const [fleetData, setFleetData] = useState({
        maxSpeed: 80,
        idleAlert: 15,
        serviceInterval: 10000,
        tireReplacement: 40000,
        insuranceAlertDays: 30,
        fitnessAlertDays: 15,
        defaultFuelPrice: 95.50
    });

    const handleSave = () => {
        toast.success(`Fleet parameters saved successfully!`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFleetData({ ...fleetData, [name]: value });
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
                        <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface mb-6 pb-4 border-b border-outline">Fleet Parameters</h2>

                        <form className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <h3 className="text-title-md font-bold text-on-surface border-b border-outline pb-2 mb-2">General Policies</h3>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Max Allowed Speed (km/h)</label>
                                    <input name="maxSpeed" value={fleetData.maxSpeed} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Idle Time Alert (minutes)</label>
                                    <input name="idleAlert" value={fleetData.idleAlert} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Default Fuel Price (₹ / Litre)</label>
                                    <input name="defaultFuelPrice" value={fleetData.defaultFuelPrice} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" step="0.01" />
                                </div>

                                <div className="flex flex-col gap-1.5 md:col-span-2 mt-4">
                                    <h3 className="text-title-md font-bold text-on-surface border-b border-outline pb-2 mb-2">Maintenance & Compliance</h3>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Routine Service Interval (km)</label>
                                    <input name="serviceInterval" value={fleetData.serviceInterval} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Tire Replacement (km)</label>
                                    <input name="tireReplacement" value={fleetData.tireReplacement} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">Insurance Renewal Alert (Days before expiry)</label>
                                    <input name="insuranceAlertDays" value={fleetData.insuranceAlertDays} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-md font-bold text-on-surface">FC (Fitness Certificate) Alert (Days before expiry)</label>
                                    <input name="fitnessAlertDays" value={fleetData.fitnessAlertDays} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="number" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsFleet;
