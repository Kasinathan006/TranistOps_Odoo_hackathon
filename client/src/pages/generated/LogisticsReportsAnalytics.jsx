
import React from 'react';

const LogisticsReportsAnalytics = () => {
    return (
        <div className="w-full h-full">
            

<nav className="fixed left-0 top-0 h-full w-[260px] bg-surface border-r border-outline-variant flex flex-col z-50 transition-transform duration-300 md:translate-x-0 -translate-x-full" id="sideNav">
<div className="p-4 border-b border-outline-variant flex items-center gap-3">
<div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg">GL</div>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary truncate">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary truncate">Fleet Management</p>
</div>
</div>
<div className="p-4">
<button className="erp-btn-primary w-full gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Entry
            </button>
</div>
<div className="flex-1 overflow-y-auto py-2">
<ul className="flex flex-col">
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">dashboard</span>
<span className="group-hover:text-on-surface">Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">local_shipping</span>
<span className="group-hover:text-on-surface">Vehicles</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">person</span>
<span className="group-hover:text-on-surface">Drivers</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">route</span>
<span className="group-hover:text-on-surface">Trips</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">build</span>
<span className="group-hover:text-on-surface">Maintenance</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">local_gas_station</span>
<span className="group-hover:text-on-surface">Fuel</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">payments</span>
<span className="group-hover:text-on-surface">Expenses</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-primary border-l-4 border-primary bg-secondary-container/50 text-body-sm font-body-sm" href="#">
<span className="material-symbols-outlined text-[20px] icon-fill">assessment</span>
<span className="font-medium">Reports</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150 text-body-sm font-body-sm group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-on-surface">settings</span>
<span className="group-hover:text-on-surface">Settings</span>
</a>
</li>
</ul>
</div>
</nav>

<div className="flex-1 flex flex-col ml-0 md:ml-[260px] h-full w-full md:w-[calc(100%-260px)] transition-all duration-300">

<header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 h-[56px] bg-surface-bright border-b border-outline-variant shadow-sm shrink-0">
<div className="flex items-center gap-4">
<button className="md:hidden text-on-surface p-1 rounded hover:bg-surface-container-high transition-colors duration-150" id="mobileMenuBtn">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="text-headline-sm font-headline-sm font-bold text-primary">TMS Core</div>

<div className="hidden sm:flex items-center ml-8 relative w-64">
<span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
<input className="erp-input pl-8 bg-surface w-full focus-within:ring-2 focus-within:ring-primary border-transparent" placeholder="Search reports..." type="text"/>
</div>
</div>
<div className="flex items-center gap-2">
<button aria-label="Notifications" className="erp-btn-ghost p-2 w-auto h-auto rounded-full text-secondary hover:text-primary transition-colors duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
<button aria-label="Help" className="erp-btn-ghost p-2 w-auto h-auto rounded-full text-secondary hover:text-primary transition-colors duration-150">
<span className="material-symbols-outlined">help_outline</span>
</button>
<button className="erp-btn-secondary hidden md:inline-flex ml-2">Support</button>
<div className="w-8 h-8 rounded-full bg-primary-fixed ml-4 flex items-center justify-center overflow-hidden border border-outline-variant shrink-0 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
<span className="material-symbols-outlined text-primary text-[20px]">person</span>

</div>
</div>
</header>

<main className="flex-1 overflow-y-auto p-container-padding bg-background relative">
<div className="max-w-[1440px] mx-auto">

<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
<div>
<nav aria-label="Breadcrumb" className="flex text-label-sm font-label-sm text-secondary mb-1">
<ol className="inline-flex items-center space-x-1 md:space-x-2">
<li className="inline-flex items-center">
<a className="hover:text-primary transition-colors" href="#">Home</a>
</li>
<li>
<div className="flex items-center">
<span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
<span className="text-on-surface">Reports</span>
</div>
</li>
</ol>
</nav>
<h2 className="text-headline-md font-headline-md text-on-surface">Report Templates</h2>
<p className="text-body-sm font-body-sm text-secondary mt-1">Select a template to generate operational and financial analytics.</p>
</div>
<div className="flex items-center gap-2">
<button className="erp-btn-secondary gap-2">
<span className="material-symbols-outlined text-[16px]">filter_list</span>
                            Filter
                        </button>
<button className="erp-btn-primary gap-2">
<span className="material-symbols-outlined text-[16px]">add</span>
                            Custom Report
                        </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-component-gap-dense">

<div className="erp-card p-4 flex flex-col group hover:shadow-sm transition-shadow duration-150 hover:border-primary/50 cursor-pointer">
<div className="flex items-start gap-3 mb-3">
<div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined">calendar_month</span>
</div>
<div className="flex-1 min-w-0">
<h3 className="text-label-md font-label-md text-on-surface truncate group-hover:text-primary transition-colors">Monthly Utilization</h3>
<p className="text-label-sm font-label-sm text-secondary mt-0.5 truncate">Last run: Today, 08:30 AM</p>
</div>
</div>
<p className="text-body-sm font-body-sm text-secondary mb-4 flex-1 line-clamp-2">Comprehensive overview of fleet utilization rates, idle times, and active deployment periods across all zones.</p>
<div className="flex items-center gap-2 mt-auto pt-3 border-t border-surface-variant">
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-primary">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                                PDF
                            </button>
<div className="w-[1px] h-4 bg-outline-variant"></div>
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-tertiary">
<span className="material-symbols-outlined text-[16px]">table_view</span>
                                Excel
                            </button>
</div>
</div>

<div className="erp-card p-4 flex flex-col group hover:shadow-sm transition-shadow duration-150 hover:border-primary/50 cursor-pointer">
<div className="flex items-start gap-3 mb-3">
<div className="w-10 h-10 rounded bg-error-container/30 flex items-center justify-center text-error shrink-0">
<span className="material-symbols-outlined">health_and_safety</span>
</div>
<div className="flex-1 min-w-0">
<h3 className="text-label-md font-label-md text-on-surface truncate group-hover:text-primary transition-colors">Driver Safety Score</h3>
<p className="text-label-sm font-label-sm text-secondary mt-0.5 truncate">Last run: Yesterday</p>
</div>
</div>
<p className="text-body-sm font-body-sm text-secondary mb-4 flex-1 line-clamp-2">Telematics-based scoring including harsh braking, speeding incidents, and overall compliance metrics.</p>
<div className="flex items-center gap-2 mt-auto pt-3 border-t border-surface-variant">
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-primary">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                                PDF
                            </button>
<div className="w-[1px] h-4 bg-outline-variant"></div>
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-tertiary">
<span className="material-symbols-outlined text-[16px]">table_view</span>
                                Excel
                            </button>
</div>
</div>

<div className="erp-card p-4 flex flex-col group hover:shadow-sm transition-shadow duration-150 hover:border-primary/50 cursor-pointer">
<div className="flex items-start gap-3 mb-3">
<div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<div className="flex-1 min-w-0">
<h3 className="text-label-md font-label-md text-on-surface truncate group-hover:text-primary transition-colors">Fuel Tax Report</h3>
<p className="text-label-sm font-label-sm text-secondary mt-0.5 truncate">Last run: Oct 01, 2023</p>
</div>
</div>
<p className="text-body-sm font-body-sm text-secondary mb-4 flex-1 line-clamp-2">IFTA compliant reporting detailing fuel consumption, mileage by jurisdiction, and tax liabilities.</p>
<div className="flex items-center gap-2 mt-auto pt-3 border-t border-surface-variant">
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-primary">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                                PDF
                            </button>
<div className="w-[1px] h-4 bg-outline-variant"></div>
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-tertiary">
<span className="material-symbols-outlined text-[16px]">table_view</span>
                                Excel
                            </button>
</div>
</div>

<div className="erp-card p-4 flex flex-col group hover:shadow-sm transition-shadow duration-150 hover:border-primary/50 cursor-pointer">
<div className="flex items-start gap-3 mb-3">
<div className="w-10 h-10 rounded bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined">build_circle</span>
</div>
<div className="flex-1 min-w-0">
<h3 className="text-label-md font-label-md text-on-surface truncate group-hover:text-primary transition-colors">Maintenance Costs</h3>
<p className="text-label-sm font-label-sm text-secondary mt-0.5 truncate">Last run: 2 weeks ago</p>
</div>
</div>
<p className="text-body-sm font-body-sm text-secondary mb-4 flex-1 line-clamp-2">Analysis of preventative vs. reactive maintenance expenditure, parts inventory, and labor costs.</p>
<div className="flex items-center gap-2 mt-auto pt-3 border-t border-surface-variant">
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-primary">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                                PDF
                            </button>
<div className="w-[1px] h-4 bg-outline-variant"></div>
<button className="erp-btn-ghost flex-1 gap-1 h-8 text-[11px] hover:bg-surface-container-low text-secondary hover:text-tertiary">
<span className="material-symbols-outlined text-[16px]">table_view</span>
                                Excel
                            </button>
</div>
</div>

<div className="erp-card p-4 flex flex-col group hover:shadow-sm transition-shadow duration-150 hover:border-primary/50 cursor-pointer border-dashed">
<div className="flex items-center justify-center h-full min-h-[140px] text-secondary group-hover:text-primary transition-colors flex-col gap-2">
<span className="material-symbols-outlined text-[32px]">add_circle</span>
<span className="text-label-md font-label-md">Create New Template</span>
</div>
</div>
</div>
</div>
</main>
</div>


        </div>
    );
};

export default LogisticsReportsAnalytics;
