
import React from 'react';

const MaintenanceServiceScheduler = () => {
    return (
        <div className="w-full h-full">
            

<nav className="bg-surface fixed left-0 top-0 h-full w-[260px] border-r border-outline-variant flex flex-col z-50 hidden md:flex shrink-0">
<div className="p-4 border-b border-outline-variant flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm">GL</div>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary">Fleet Management</p>
</div>
</div>
<div className="p-4">
<button className="w-full bg-primary text-on-primary rounded-DEFAULT py-2 px-4 text-label-md font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors duration-150">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Entry
            </button>
</div>
<ul className="flex-1 overflow-y-auto py-2">
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-md font-label-md">Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">local_shipping</span>
<span className="text-label-md font-label-md">Vehicles</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-label-md font-label-md">Drivers</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">route</span>
<span className="text-label-md font-label-md">Trips</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-primary border-l-4 border-primary bg-secondary-container/50" href="#">
<span className="material-symbols-outlined">build</span>
<span className="text-label-md font-label-md">Maintenance</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">local_gas_station</span>
<span className="text-label-md font-label-md">Fuel</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="text-label-md font-label-md">Expenses</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">assessment</span>
<span className="text-label-md font-label-md">Reports</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
</li>
</ul>
</nav>

<div className="flex-1 flex flex-col md:ml-[260px] h-full overflow-hidden w-full">

<header className="bg-surface-bright flex items-center justify-between px-gutter w-full sticky top-0 z-40 border-b border-outline-variant shadow-sm h-[56px] shrink-0">
<div className="flex items-center gap-4 flex-1">
<div className="text-headline-sm font-headline-sm font-bold text-primary">TMS Core</div>
<div className="relative w-64 max-w-sm hidden md:block">
<span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input className="w-full h-8 pl-8 pr-3 text-body-sm bg-surface rounded-DEFAULT border border-outline-variant focus-within:ring-2 focus-within:ring-primary outline-none transition-all duration-150" placeholder="Search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-on-surface-variant hover:text-primary transition-colors duration-150 flex items-center gap-1 text-label-md">
<span className="material-symbols-outlined text-[20px]">help_outline</span>
<span className="hidden md:inline">Support</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-colors duration-150 relative">
<span className="material-symbols-outlined text-[20px]">notifications</span>
<span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<div className="w-8 h-8 rounded-full bg-secondary-container border border-outline-variant overflow-hidden cursor-pointer">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="A professional portrait of a fleet manager in a crisp white shirt, medium shot, modern brightly lit office setting, sharp focus, realistic corporate photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjKSsScgzN7h_gPYeZa1eZMXIFQ4wmvUs1nUtGFLF1ICW3evKjAYpHYlHjV3yXBUsSftpV6BfyejMzJ14AbPPalNKpygkdOO5ndLFuaJpW42SPtYxMUWyGoZ328hnqntH9y9bePvGYRR2_OZ9ATrTMGh--22pVpgeRhWY5ORbv5bhw0PGhkoMDTcbW2fqanjMArmhlUx3ghJ-nAvkLGqXz3t6e8_PXXcBhv7AnVBuQ_Ubm91P70Ma7"/>
</div>
</div>
</header>

<main className="flex-1 overflow-y-auto p-container-padding bg-background w-full max-w-[1440px] mx-auto">
<div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<nav className="text-label-sm font-label-sm text-secondary mb-1 flex items-center gap-1">
<a className="hover:text-primary" href="#">Home</a>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<a className="hover:text-primary" href="#">Fleet Operations</a>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-on-surface">Maintenance Scheduling</span>
</nav>
<h2 className="text-display-lg font-display-lg text-on-surface">Maintenance Scheduling</h2>
</div>
<div className="flex gap-2">
<button className="bg-surface text-on-surface border border-outline-variant px-4 py-2 rounded-DEFAULT text-label-md font-label-md flex items-center gap-2 hover:bg-surface-variant transition-colors duration-150">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter
                    </button>
<button className="bg-primary text-on-primary px-4 py-2 rounded-DEFAULT text-label-md font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
                        Schedule Service
                    </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-4 flex flex-col gap-6">
<div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-5 shadow-sm flex-1">
<div className="flex items-center justify-between mb-4">
<h3 className="text-headline-md font-headline-md text-on-surface">Service Calendar</h3>
<button className="text-primary hover:bg-surface-variant p-1 rounded transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div className="bg-surface-container-low rounded-DEFAULT p-3 mb-4 border border-outline-variant/50">
<div className="flex items-center justify-between text-label-md text-on-surface-variant mb-2">
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
<span className="font-bold">October 2023</span>
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
</div>
<div className="grid grid-cols-7 gap-1 text-center text-label-sm text-secondary mb-1">
<div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
</div>
<div className="grid grid-cols-7 gap-1 text-center text-body-sm">
<div className="text-outline">29</div><div className="text-outline">30</div>
<div className="p-1">1</div><div className="p-1">2</div><div className="p-1">3</div><div className="p-1">4</div><div className="p-1">5</div>
<div className="p-1">6</div><div className="p-1">7</div><div className="p-1">8</div><div className="p-1 bg-error-container text-on-error-container font-bold rounded-sm border border-error">9</div><div className="p-1">10</div><div className="p-1">11</div><div className="p-1">12</div>
<div className="p-1">13</div><div className="p-1">14</div><div className="p-1 bg-surface-variant font-bold rounded-sm border border-outline-variant">15</div><div className="p-1">16</div><div className="p-1">17</div><div className="p-1">18</div><div className="p-1">19</div>
<div className="p-1">20</div><div className="p-1">21</div><div className="p-1">22</div><div className="p-1">23</div><div className="p-1">24</div><div className="p-1 bg-primary-container text-on-primary font-bold rounded-sm">25</div><div className="p-1">26</div>
</div>
</div>
<div className="space-y-3">
<h4 className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Upcoming This Week</h4>
<div className="flex items-start gap-3 p-3 rounded-DEFAULT hover:bg-surface-variant transition-colors border border-transparent hover:border-outline-variant cursor-pointer group">
<div className="w-10 h-10 rounded bg-error-container text-on-error-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined">warning</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<p className="text-label-md font-label-md text-on-surface truncate">Truck #402 - Brake Pad Replacement</p>
<span className="text-label-sm text-error font-bold">Oct 9</span>
</div>
<p className="text-body-sm text-on-surface-variant truncate">Assigned to: Internal Shop</p>
</div>
</div>
<div className="flex items-start gap-3 p-3 rounded-DEFAULT hover:bg-surface-variant transition-colors border border-transparent hover:border-outline-variant cursor-pointer group">
<div className="w-10 h-10 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined">oil_barrel</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<p className="text-label-md font-label-md text-on-surface truncate">Van #118 - Oil Change &amp; Filter</p>
<span className="text-label-sm text-on-surface-variant">Oct 15</span>
</div>
<p className="text-body-sm text-on-surface-variant truncate">Assigned to: QuickLube Pro</p>
</div>
</div>
<div className="flex items-start gap-3 p-3 rounded-DEFAULT hover:bg-surface-variant transition-colors border border-transparent hover:border-outline-variant cursor-pointer group">
<div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined">tire_repair</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<p className="text-label-md font-label-md text-on-surface truncate">Truck #505 - Tire Rotation</p>
<span className="text-label-sm text-primary font-bold">Oct 25</span>
</div>
<p className="text-body-sm text-on-surface-variant truncate">Assigned to: Internal Shop</p>
</div>
</div>
</div>
<button className="w-full mt-4 py-2 text-label-md text-primary hover:bg-surface-container transition-colors rounded-DEFAULT border border-primary/20">View Full Schedule</button>
</div>
</div>

<div className="lg:col-span-8 flex flex-col gap-6">

<div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
<div className="p-4 border-b border-outline-variant bg-surface flex items-center justify-between">
<h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">calendar_month</span>
                                Upcoming Maintenance
                            </h3>
<div className="flex gap-2">
<div className="relative">
<span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
<input className="w-48 h-8 pl-8 pr-2 text-body-sm bg-surface-container-lowest rounded-DEFAULT border border-outline-variant focus:ring-1 focus:ring-primary outline-none" placeholder="Search vehicles..." type="text"/>
</div>
<button className="p-1.5 border border-outline-variant rounded bg-surface hover:bg-surface-variant text-secondary"><span className="material-symbols-outlined text-[18px]">download</span></button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold w-1/4">Vehicle ID</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold w-1/3">Service Type</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold w-1/6">Due Date</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold w-1/6">Priority</th>
<th className="p-3 text-center text-label-md font-label-md text-on-surface-variant font-semibold w-12">Act</th>
</tr>
</thead>
<tbody className="text-body-sm text-on-surface">
<tr className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors h-[40px]">
<td className="p-3 font-medium flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-error"></div>
                                            TRK-402 (Volvo VNL)
                                        </td>
<td className="p-3 text-on-surface-variant">Brake Pad Replacement</td>
<td className="p-3 text-error font-medium">Oct 09, 2023</td>
<td className="p-3">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm bg-error-container text-on-error-container border border-error/30 font-semibold">High</span>
</td>
<td className="p-3 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
</td>
</tr>
<tr className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors h-[40px] bg-surface/30">
<td className="p-3 font-medium flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-surface-tint"></div>
                                            VAN-118 (Ford Transit)
                                        </td>
<td className="p-3 text-on-surface-variant">Oil Change &amp; Filter</td>
<td className="p-3">Oct 15, 2023</td>
<td className="p-3">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm bg-secondary-container text-on-secondary-container border border-outline-variant font-medium">Medium</span>
</td>
<td className="p-3 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
</td>
</tr>
<tr className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors h-[40px]">
<td className="p-3 font-medium flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-surface-tint"></div>
                                            TRK-505 (Peterbilt 579)
                                        </td>
<td className="p-3 text-on-surface-variant">Tire Rotation &amp; Alignment</td>
<td className="p-3">Oct 25, 2023</td>
<td className="p-3">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm bg-surface-variant text-on-surface-variant border border-outline-variant font-medium">Low</span>
</td>
<td className="p-3 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container transition-colors h-[40px] bg-surface/30">
<td className="p-3 font-medium flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-error"></div>
                                            TRK-210 (Freightliner)
                                        </td>
<td className="p-3 text-on-surface-variant">Transmission Inspection</td>
<td className="p-3 text-error font-medium">Oct 28, 2023</td>
<td className="p-3">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm bg-error-container text-on-error-container border border-error/30 font-semibold">High</span>
</td>
<td className="p-3 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-3 border-t border-outline-variant bg-surface flex items-center justify-between text-label-sm text-secondary">
<span>Showing 4 of 24 scheduled services</span>
<div className="flex items-center gap-1">
<button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant disabled:opacity-50">Prev</button>
<button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant bg-primary-container text-on-primary">1</button>
<button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant">2</button>
<button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant">Next</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col flex-1">
<div className="p-4 border-b border-outline-variant bg-surface flex items-center justify-between">
<h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">history</span>
                                Maintenance History
                            </h3>
<button className="text-label-md text-primary hover:underline">View All Records</button>
</div>
<div className="overflow-x-auto flex-1">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold">Date Completed</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold">Vehicle</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold">Service Description</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold">Cost</th>
<th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold">Status</th>
</tr>
</thead>
<tbody className="text-body-sm text-on-surface">
<tr className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors h-[40px]">
<td className="p-3 text-on-surface-variant">Sep 28, 2023</td>
<td className="p-3 font-medium">TRK-105</td>
<td className="p-3">Annual DOT Inspection</td>
<td className="p-3 font-medium font-code">$150.00</td>
<td className="p-3">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm bg-tertiary-container/20 text-tertiary border border-tertiary/30">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                                            </span>
</td>
</tr>
<tr className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors h-[40px] bg-surface/30">
<td className="p-3 text-on-surface-variant">Sep 25, 2023</td>
<td className="p-3 font-medium">VAN-092</td>
<td className="p-3">Battery Replacement</td>
<td className="p-3 font-medium font-code">$210.50</td>
<td className="p-3">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm bg-tertiary-container/20 text-tertiary border border-tertiary/30">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                                            </span>
</td>
</tr>
<tr className="hover:bg-surface-container transition-colors h-[40px]">
<td className="p-3 text-on-surface-variant">Sep 18, 2023</td>
<td className="p-3 font-medium">TRK-334</td>
<td className="p-3">AC System Recharge</td>
<td className="p-3 font-medium font-code">$345.00</td>
<td className="p-3">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm bg-tertiary-container/20 text-tertiary border border-tertiary/30">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                                            </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</main>
</div>

        </div>
    );
};

export default MaintenanceServiceScheduler;
