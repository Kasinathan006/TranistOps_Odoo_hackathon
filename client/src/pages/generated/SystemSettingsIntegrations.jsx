import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../../components/SettingsSidebar';

const SystemSettingsIntegrations = () => {
    const [integrations, setIntegrations] = useState({
        gpsEnabled: true,
        gpsApiKey: '************************',
        gpsServerUrl: 'https://gps.bharatlogistics.in',
        fastagProvider: 'ICICI Bank',
        fastagCorporateId: 'BL-ICICI-4921',
        vahanEnabled: true,
        vahanApiKey: 'VAHAN-API-**********'
    });

    const handleSave = () => {
        toast.success(`System integrations saved successfully!`);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setIntegrations({
            ...integrations,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const toggleGps = () => setIntegrations({...integrations, gpsEnabled: !integrations.gpsEnabled});
    const toggleVahan = () => setIntegrations({...integrations, vahanEnabled: !integrations.vahanEnabled});

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
                        <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface mb-6 pb-4 border-b border-outline">System Integrations</h2>

                        <form className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* GPS Integration */}
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <h3 className="text-title-md font-bold text-on-surface border-b border-outline pb-2 mb-2">GPS Tracking API</h3>
                                    <div className="flex items-center gap-3 mb-2" onClick={toggleGps}>
                                        <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${integrations.gpsEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                                            <div className={`w-5 h-5 bg-on-primary rounded-full absolute top-0.5 transition-all ${integrations.gpsEnabled ? 'right-0.5' : 'left-0.5 bg-secondary'}`}></div>
                                        </div>
                                        <span className="text-body-md text-on-surface font-medium">Enable Traccar / AIS-140 GPS Integration</span>
                                    </div>
                                </div>
                                {integrations.gpsEnabled && (
                                    <>
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-label-md font-bold text-on-surface">API Key</label>
                                            <input name="gpsApiKey" value={integrations.gpsApiKey} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="password" />
                                        </div>
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-label-md font-bold text-on-surface">Server URL</label>
                                            <input name="gpsServerUrl" value={integrations.gpsServerUrl} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="url" />
                                        </div>
                                    </>
                                )}

                                {/* VAHAN Integration */}
                                <div className="flex flex-col gap-1.5 md:col-span-2 mt-4">
                                    <h3 className="text-title-md font-bold text-on-surface border-b border-outline pb-2 mb-2">Parivahan / VAHAN Integration</h3>
                                    <div className="flex items-center gap-3 mb-2" onClick={toggleVahan}>
                                        <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${integrations.vahanEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                                            <div className={`w-5 h-5 bg-on-primary rounded-full absolute top-0.5 transition-all ${integrations.vahanEnabled ? 'right-0.5' : 'left-0.5 bg-secondary'}`}></div>
                                        </div>
                                        <span className="text-body-md text-on-surface font-medium">Enable VAHAN RTO details auto-fetch</span>
                                    </div>
                                </div>
                                {integrations.vahanEnabled && (
                                    <div className="flex flex-col gap-1.5 md:col-span-2">
                                        <label className="text-label-md font-bold text-on-surface">VAHAN API Key</label>
                                        <input name="vahanApiKey" value={integrations.vahanApiKey} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="password" />
                                    </div>
                                )}

                                {/* FASTag Integration */}
                                <div className="flex flex-col gap-1.5 md:col-span-2 mt-4">
                                    <h3 className="text-title-md font-bold text-on-surface border-b border-outline pb-2 mb-2">FASTag Integration (NETC)</h3>
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-label-md font-bold text-on-surface">Provider</label>
                                    <select name="fastagProvider" value={integrations.fastagProvider} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                                        <option>ICICI Bank</option>
                                        <option>HDFC Bank</option>
                                        <option>Paytm Payments Bank</option>
                                        <option>IDFC First Bank</option>
                                        <option>Axis Bank</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-label-md font-bold text-on-surface">Corporate ID</label>
                                    <input name="fastagCorporateId" value={integrations.fastagCorporateId} onChange={handleChange} className="h-10 px-3 border border-outline rounded-lg bg-surface text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsIntegrations;
