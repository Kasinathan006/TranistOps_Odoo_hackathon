
import React from 'react';

const SystemSettingsConfiguration = () => {
    return (
        <div className="w-full h-full">
            



<main className="min-h-screen flex flex-col items-center justify-start p-container-padding">

<div className="w-full max-w-[1024px] mb-8">
<nav aria-label="Breadcrumb" className="flex text-secondary text-label-md font-label-md mb-2">
<ol className="inline-flex items-center space-x-1 md:space-x-2">
<li className="inline-flex items-center">
<a className="inline-flex items-center hover:text-primary transition-colors duration-150" href="#">
                            Dashboard
                        </a>
</li>
<li>
<div className="flex items-center">
<span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
<span className="text-on-surface">Settings</span>
</div>
</li>
</ol>
</nav>
<div className="flex justify-between items-center">
<h1 className="text-display-lg font-display-lg text-on-surface">System Settings</h1>
<div className="flex gap-component-gap-dense">
<button className="px-4 py-2 bg-surface text-on-surface-variant border border-outline-variant rounded hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">close</span>
                        Cancel
                    </button>
<button className="px-4 py-2 bg-primary-container text-on-primary rounded hover:bg-primary transition-colors duration-150 text-label-md font-label-md flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">save</span>
                        Save Changes
                    </button>
</div>
</div>
</div>

<div className="w-full max-w-[1024px] bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex overflow-hidden flex-col md:flex-row">

<aside className="w-full md:w-[240px] bg-surface-bright border-b md:border-b-0 md:border-r border-outline-variant flex-shrink-0">
<nav className="flex flex-row md:flex-col p-4 gap-2 overflow-x-auto md:overflow-visible">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-container/50 text-primary border-l-4 border-primary font-label-md text-label-md shrink-0" href="#">
<span className="material-symbols-outlined icon-fill">domain</span>
                        Company Profile
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 font-label-md text-label-md shrink-0" href="#">
<span className="material-symbols-outlined">group</span>
                        User Management
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 font-label-md text-label-md shrink-0" href="#">
<span className="material-symbols-outlined">local_shipping</span>
                        Fleet Parameters
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 font-label-md text-label-md shrink-0" href="#">
<span className="material-symbols-outlined">api</span>
                        System Integrations
                    </a>
</nav>
</aside>

<div className="flex-1 p-8 bg-surface-container-lowest">
<div className="max-w-[600px]">
<h2 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-4 mb-6">Company Profile</h2>
<form className="space-y-6">

<div className="flex items-center gap-6 pb-6 border-b border-outline-variant/50">
<div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
<span className="material-symbols-outlined text-[32px] text-secondary">image</span>
</div>
<div>
<h3 className="text-label-md font-label-md text-on-surface mb-1">Company Logo</h3>
<p className="text-body-sm font-body-sm text-secondary mb-3">Recommended size 256x256px. PNG or JPG.</p>
<button className="px-3 py-1.5 bg-surface text-on-surface-variant border border-outline-variant rounded hover:bg-surface-container-high transition-colors duration-150 text-label-sm font-label-sm" type="button">
                                    Upload New
                                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="flex flex-col gap-1">
<label className="text-label-sm font-label-sm text-on-surface">Company Name <span className="text-error">*</span></label>
<input className="h-[36px] px-3 border border-outline-variant rounded bg-surface-container-lowest text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="text" value="Global Logistics"/>
</div>
<div className="flex flex-col gap-1">
<label className="text-label-sm font-label-sm text-on-surface">Registration Number</label>
<input className="h-[36px] px-3 border border-outline-variant rounded bg-surface-container-lowest text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="text" value="REG-993821"/>
</div>
<div className="flex flex-col gap-1 md:col-span-2">
<label className="text-label-sm font-label-sm text-on-surface">Primary Contact Email</label>
<input className="h-[36px] px-3 border border-outline-variant rounded bg-surface-container-lowest text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="email" value="admin@globallogistics.com"/>
</div>
</div>

<div className="pt-6 border-t border-outline-variant/50 space-y-4">
<h3 className="text-label-md font-label-md text-on-surface">Regional Preferences</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="flex flex-col gap-1">
<label className="text-label-sm font-label-sm text-on-surface">Base Currency</label>
<select className="h-[36px] px-3 border border-outline-variant rounded bg-surface-container-lowest text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
<option>USD ($)</option>
<option>EUR (€)</option>
<option>GBP (£)</option>
</select>
</div>
<div className="flex flex-col gap-1">
<label className="text-label-sm font-label-sm text-on-surface">Timezone</label>
<select className="h-[36px] px-3 border border-outline-variant rounded bg-surface-container-lowest text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
<option>UTC (Coordinated Universal Time)</option>
<option>EST (Eastern Standard Time)</option>
<option>PST (Pacific Standard Time)</option>
</select>
</div>
<div className="flex flex-col gap-1">
<label className="text-label-sm font-label-sm text-on-surface">Distance Unit</label>
<select className="h-[36px] px-3 border border-outline-variant rounded bg-surface-container-lowest text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
<option>Miles (mi)</option>
<option>Kilometers (km)</option>
</select>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
</main>

        </div>
    );
};

export default SystemSettingsConfiguration;
