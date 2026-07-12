
import React from 'react';

const FleetOverviewDashboard = () => {
    return (
        <div className="w-full h-full">
            

<nav className="hidden md:flex flex-col h-full border-r border-outline-variant fixed left-0 top-0 h-full w-[260px] bg-surface z-50">
<div className="flex items-center px-gutter py-4 border-b border-outline-variant">
<div className="h-10 w-10 rounded bg-primary-container text-on-primary flex items-center justify-center mr-3 font-bold text-lg">GL</div>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary">Fleet Management</p>
</div>
</div>
<div className="p-gutter">
<button className="w-full bg-primary-container text-on-primary py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-primary transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-[18px]">add</span>
<span className="text-label-md font-label-md">New Entry</span>
</button>
</div>
<div className="flex-1 overflow-y-auto py-2">

<a className="flex items-center px-gutter py-3 text-primary border-l-4 border-primary bg-secondary-container/50" href="#">
<span className="material-symbols-outlined mr-3 icon-fill">dashboard</span>
<span className="text-label-md font-label-md">Dashboard</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">local_shipping</span>
<span className="text-label-md font-label-md">Vehicles</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">person</span>
<span className="text-label-md font-label-md">Drivers</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">route</span>
<span className="text-label-md font-label-md">Trips</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">build</span>
<span className="text-label-md font-label-md">Maintenance</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">local_gas_station</span>
<span className="text-label-md font-label-md">Fuel</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">payments</span>
<span className="text-label-md font-label-md">Expenses</span>
</a>
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">assessment</span>
<span className="text-label-md font-label-md">Reports</span>
</a>
</div>
<div className="mt-auto border-t border-outline-variant py-2">
<a className="flex items-center px-gutter py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 border-l-4 border-transparent hover:border-outline-variant" href="#">
<span className="material-symbols-outlined mr-3">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
</div>
</nav>

<main className="flex-1 flex flex-col md:ml-[260px] h-screen overflow-hidden">

<header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 docked full-width h-[56px] bg-surface-bright shadow-sm border-b border-outline-variant flex-shrink-0">
<div className="flex items-center gap-4">
<button className="md:hidden text-on-surface-variant p-2 rounded hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="text-headline-sm font-headline-sm font-bold text-primary hidden md:block">TMS Core</div>

<div className="relative ml-4 hidden md:flex items-center bg-surface-container-low border border-outline-variant rounded focus-within:ring-2 focus-within:ring-primary h-8 px-2 w-64 transition-all duration-150">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant mr-2">search</span>
<input className="bg-transparent border-none p-0 text-body-sm font-body-sm focus:ring-0 w-full text-on-surface outline-none" placeholder="Search vehicle, driver, or trip..." type="text"/>
</div>
</div>
<div className="flex items-center gap-2">
<button className="text-on-surface-variant p-2 rounded hover:text-primary transition-colors duration-150 relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="text-on-surface-variant p-2 rounded hover:text-primary transition-colors duration-150 hidden sm:block">
<span className="material-symbols-outlined">help_outline</span>
</button>
<button className="text-label-md font-label-md text-secondary border border-outline-variant px-3 py-1.5 rounded hover:bg-surface-variant transition-colors duration-150 ml-2 hidden sm:block">
                    Support
                </button>
<div className="ml-4 h-8 w-8 rounded-full bg-secondary-container border border-outline overflow-hidden cursor-pointer shadow-sm">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a logistics manager in a bright, modern corporate office environment. Soft natural lighting, shallow depth of field. Light mode aesthetic with cool blue undertones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTa_2G-VZbS9rPOqVpARygoivghfhS9OHiYn47ljoWn-qu43ayk9XnzxpiFY2_tCCB_bcA3gyfguKMWM-Oxzb9JbeprUvOmScAkan-rAbgt8_ejcbCdH8unfLa5b4mozM4JWag1nH_cDpUfTRDsCpcf7cUfd8ueEBJAZRHceIp1IW4xHK_vcviNkQftnikQga7FRj_4WWUNdKrAILTH5BMdtR57x68CdnrMPSiH72HkWoyhSD05VUO"/>
</div>
</div>
</header>

<div className="flex-1 overflow-y-auto p-container-padding bg-background">
<div className="max-w-[1440px] mx-auto">

<div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
<div>
<div className="text-label-sm font-label-sm text-secondary mb-1 flex items-center gap-1">
<span>TMS Core</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-medium">Dashboard</span>
</div>
<h2 className="text-display-lg font-display-lg text-on-background">Fleet Overview</h2>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded flex items-center gap-2 text-label-md font-label-md hover:bg-surface-container-high transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            Today
                        </button>
<button className="px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded flex items-center gap-2 text-label-md font-label-md hover:bg-surface-container-high transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                            Filter
                        </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-component-gap-dense mb-component-gap-dense">

<div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-component-gap-dense">

<div className="bg-surface-container-lowest border border-outline-variant rounded p-4 shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-label-md text-secondary">Total Vehicles</span>
<span className="material-symbols-outlined text-primary bg-surface-container p-1.5 rounded">local_shipping</span>
</div>
<div>
<div className="text-display-lg font-display-lg text-on-background">248</div>
<div className="text-label-sm font-label-sm text-tertiary-container flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
<span>+12 this month</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded p-4 shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-label-md text-secondary">Active Trips</span>
<span className="material-symbols-outlined text-surface-tint bg-surface-container p-1.5 rounded">route</span>
</div>
<div>
<div className="text-display-lg font-display-lg text-on-background">86</div>
<div className="text-label-sm font-label-sm text-secondary flex items-center gap-1 mt-1">
<span>3 delayed</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded p-4 shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-label-md text-secondary">Fuel Consumed</span>
<span className="material-symbols-outlined text-on-secondary-container bg-secondary-container p-1.5 rounded">local_gas_station</span>
</div>
<div>
<div className="text-headline-md font-headline-md text-on-background">14.2k <span className="text-body-sm font-body-sm text-secondary">Gal</span></div>
<div className="text-label-sm font-label-sm text-error flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
<span>+5% vs avg</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded p-4 shadow-sm flex flex-col justify-between border-l-4 border-l-error">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-label-md text-secondary">Maint. Alerts</span>
<span className="material-symbols-outlined text-error bg-error-container p-1.5 rounded">build</span>
</div>
<div>
<div className="text-display-lg font-display-lg text-on-background">14</div>
<div className="text-label-sm font-label-sm text-error flex items-center gap-1 mt-1">
<span>5 critical</span>
</div>
</div>
</div>
</div>

<div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded shadow-sm overflow-hidden flex flex-col relative h-[184px]">
<div className="p-3 border-b border-outline-variant bg-surface flex justify-between items-center z-10 absolute top-0 w-full bg-white/90 backdrop-blur-sm">
<h3 className="text-label-md font-label-md text-on-surface font-semibold">Fleet Distribution</h3>
<button className="text-primary hover:bg-surface-variant p-1 rounded transition-colors">
<span className="material-symbols-outlined text-[16px]">open_in_full</span>
</button>
</div>
<div className="flex-1 bg-surface-variant relative mt-[45px]">

<img alt="Map showing fleet distribution across North America" className="w-full h-full object-cover" data-location="North America" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Su31xJ0plIOyLoPZmcIFF33DJlt6K3P9zwwlvAL0zAw9C0cTVwr0XK3vjjPKxh15igcHvygeXhsLWj-idpyT29XEGbwSNNN4WLRO9BiMmVqV5soOJMoa_vYxmXx96tQ08AYU3ygQbjTuUoHAkkfKHP9mxVAMaDmWPHaYR3awO_hQNFoo3lfVe_zh2awvpC5CrkGQEQ_gG1r0mpw518_xIyyAvJzYFpeTru9U5du1NCRqnmg5JPiy"/>

<div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm"></div>
<div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm"></div>
<div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-error rounded-full border-2 border-white shadow-sm animate-pulse"></div>
<div className="absolute top-2/3 left-1/4 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm"></div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-component-gap-dense">

<div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded shadow-sm flex flex-col h-[500px]">
<div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface sticky top-0 z-20">
<h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">route</span>
                                Recent Trips
                            </h3>
<button className="text-label-sm font-label-sm text-primary hover:underline font-semibold">View All</button>
</div>
<div className="flex-1 overflow-auto">
<table className="w-full dense-table text-body-sm font-body-sm">
<thead>
<tr>
<th className="text-label-sm font-label-sm text-secondary font-semibold uppercase tracking-wider">Trip ID</th>
<th className="text-label-sm font-label-sm text-secondary font-semibold uppercase tracking-wider">Vehicle</th>
<th className="text-label-sm font-label-sm text-secondary font-semibold uppercase tracking-wider">Route</th>
<th className="text-label-sm font-label-sm text-secondary font-semibold uppercase tracking-wider">Status</th>
<th className="text-label-sm font-label-sm text-secondary font-semibold uppercase tracking-wider text-right">ETA</th>
</tr>
</thead>
<tbody>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
<td className="font-medium text-primary group-hover:underline">TRP-8902</td>
<td>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px] font-bold">V12</div>
                                                Volvo FH16
                                            </div>
</td>
<td><span className="text-secondary">LAX</span> <span className="material-symbols-outlined text-[12px] align-middle mx-1 text-outline">arrow_forward</span> <span className="text-on-surface">JFK</span></td>
<td><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim">IN TRANSIT</span></td>
<td className="text-right">14:30 Today</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer bg-surface/50">
<td className="font-medium text-primary group-hover:underline">TRP-8901</td>
<td>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px] font-bold">V08</div>
                                                Freightliner
                                            </div>
</td>
<td><span className="text-secondary">ORD</span> <span className="material-symbols-outlined text-[12px] align-middle mx-1 text-outline">arrow_forward</span> <span className="text-on-surface">DFW</span></td>
<td><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container border border-error/20">DELAYED</span></td>
<td className="text-right text-error font-medium">18:45 Today</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
<td className="font-medium text-primary group-hover:underline">TRP-8899</td>
<td>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px] font-bold">V45</div>
                                                Peterbilt 579
                                            </div>
</td>
<td><span className="text-secondary">MIA</span> <span className="material-symbols-outlined text-[12px] align-middle mx-1 text-outline">arrow_forward</span> <span className="text-on-surface">ATL</span></td>
<td><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant border border-outline-variant">COMPLETED</span></td>
<td className="text-right text-secondary">09:15 Today</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer bg-surface/50">
<td className="font-medium text-primary group-hover:underline">TRP-8898</td>
<td>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px] font-bold">V19</div>
                                                Kenworth T680
                                            </div>
</td>
<td><span className="text-secondary">SEA</span> <span className="material-symbols-outlined text-[12px] align-middle mx-1 text-outline">arrow_forward</span> <span className="text-on-surface">DEN</span></td>
<td><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim">IN TRANSIT</span></td>
<td className="text-right">08:00 Tmrw</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
<td className="font-medium text-primary group-hover:underline">TRP-8895</td>
<td>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px] font-bold">V32</div>
                                                Volvo VNL
                                            </div>
</td>
<td><span className="text-secondary">PHX</span> <span className="material-symbols-outlined text-[12px] align-middle mx-1 text-outline">arrow_forward</span> <span className="text-on-surface">LAS</span></td>
<td><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed border border-primary-fixed-dim">LOADING</span></td>
<td className="text-right text-secondary">--</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer bg-surface/50">
<td className="font-medium text-primary group-hover:underline">TRP-8890</td>
<td>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px] font-bold">V03</div>
                                                Mack Anthem
                                            </div>
</td>
<td><span className="text-secondary">HOU</span> <span className="material-symbols-outlined text-[12px] align-middle mx-1 text-outline">arrow_forward</span> <span className="text-on-surface">MSY</span></td>
<td><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant border border-outline-variant">COMPLETED</span></td>
<td className="text-right text-secondary">Yesterday</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-component-gap-dense">

<div className="bg-surface-container-lowest border border-outline-variant border-t-4 border-t-error rounded shadow-sm p-4 flex-1">
<h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-error text-[20px]">warning</span>
                                Critical Alerts
                            </h3>
<div className="space-y-3">
<div className="p-3 bg-error-container/20 border border-error-container rounded flex gap-3 items-start">
<div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px]">oil_barrel</span>
</div>
<div>
<div className="text-label-md font-label-md text-on-surface font-semibold">Engine Oil Pressure Low</div>
<div className="text-body-sm font-body-sm text-secondary">Vehicle V12 • Route TRP-8902</div>
<button className="mt-2 text-label-sm font-label-sm text-primary font-semibold hover:underline">Schedule Service</button>
</div>
</div>
<div className="p-3 bg-surface-variant/50 border border-outline-variant rounded flex gap-3 items-start">
<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center flex-shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px]">tire_repair</span>
</div>
<div>
<div className="text-label-md font-label-md text-on-surface font-semibold">Tire Wear Imbalance</div>
<div className="text-body-sm font-body-sm text-secondary">Vehicle V08 • Delayed Trip</div>
<button className="mt-2 text-label-sm font-label-sm text-primary font-semibold hover:underline">View Diagnostics</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm p-4 relative overflow-hidden h-[200px] flex flex-col justify-between group cursor-pointer">

<div className="absolute right-[-20px] bottom-[-20px] opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
<span className="material-symbols-outlined text-[120px]">monitoring</span>
</div>
<div>
<h3 className="text-label-md font-label-md text-secondary font-semibold uppercase tracking-wider">Fleet Efficiency Score</h3>
<div className="text-display-lg font-display-lg text-primary mt-1">92.4%</div>
<div className="text-label-sm font-label-sm text-tertiary-container flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>
<span>1.2% improvement vs last week</span>
</div>
</div>
<div className="w-full bg-surface-variant rounded-full h-2 mt-4 overflow-hidden">
<div className="bg-primary h-2 rounded-full" style={{width: `92.4%`}}></div>
</div>
<div className="flex justify-between mt-2 text-[10px] font-label-sm text-secondary">
<span>Target: 90%</span>
<span>Max: 100%</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

        </div>
    );
};

export default FleetOverviewDashboard;
