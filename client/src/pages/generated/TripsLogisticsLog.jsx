
import React from 'react';

const TripsLogisticsLog = () => {
    return (
        <div className="w-full h-full">
            

<aside className="fixed left-0 top-0 h-full w-[260px] bg-surface border-r border-outline-variant flex flex-col z-50">
<div className="p-gutter flex items-center gap-3 border-b border-outline-variant/50 h-[56px]">
<div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center font-bold">
                GL
            </div>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary">Fleet Management</p>
</div>
</div>
<div className="p-4">
<button className="w-full bg-primary-container text-on-primary py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-label-md font-label-md hover:bg-primary transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Entry
            </button>
</div>
<nav className="flex-1 overflow-y-auto py-2">
<ul className="flex flex-col gap-1 px-3">
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">dashboard</span>
<span className="text-body-sm font-body-sm">Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">local_shipping</span>
<span className="text-body-sm font-body-sm">Vehicles</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">person</span>
<span className="text-body-sm font-body-sm">Drivers</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary border-l-4 border-primary bg-secondary-container/50" href="#">
<span className="material-symbols-outlined text-[20px] fill">route</span>
<span className="text-label-md font-label-md">Trips</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">build</span>
<span className="text-body-sm font-body-sm">Maintenance</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">local_gas_station</span>
<span className="text-body-sm font-body-sm">Fuel</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">payments</span>
<span className="text-body-sm font-body-sm">Expenses</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">assessment</span>
<span className="text-body-sm font-body-sm">Reports</span>
</a>
</li>
</ul>
</nav>
<div className="p-3 border-t border-outline-variant/50">
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors duration-150 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary">settings</span>
<span className="text-body-sm font-body-sm">Settings</span>
</a>
</div>
</aside>

<div className="flex-1 ml-[260px] flex flex-col">

<header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 h-[56px] bg-surface-bright shadow-sm border-b border-outline-variant">
<div className="flex items-center gap-4">
<h2 className="text-headline-sm font-headline-sm font-bold text-primary">TMS Core</h2>
</div>
<div className="flex-1 max-w-md mx-8">
<div className="relative focus-within:ring-2 focus-within:ring-primary rounded-lg transition-all duration-150 bg-surface-container">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant rounded-lg" placeholder="Search trips, drivers, vehicles..." type="text"/>
</div>
</div>
<div className="flex items-center gap-2">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-150 rounded-full hover:bg-surface-container-high">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-150 rounded-full hover:bg-surface-container-high">
<span className="material-symbols-outlined">help_outline</span>
</button>
<div className="h-6 w-px bg-outline-variant mx-2"></div>
<button className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors duration-150 px-2">Support</button>
<div className="ml-2 w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a logistics manager in a bright, modern office setting. The lighting is crisp white, highlighting a clean corporate aesthetic. Soft background blur." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFPXaqnw7WKQ9ZXcHs9mqeXYybg0F2SQle31wrCSCtg0FiQyNEMLWuKhDTIfmxxzkWwBteeFOE2wfAfFD6mQ5UEa7LczC2WeCNR8vOBtXfFoNy7tOKV5P3FP1AQ2mj8S26vIwdoJwCTjiYbcoP7xEUWuYc8vD3lSELnV_yq75QxvDddaBDhYtR40ZSEBQ0sUHdco10_kp697ljkyb8QT01i3QQqZImCWsOA0BSHWiwFWTsrMeyyA4N"/>
</div>
</div>
</header>

<main className="flex-1 p-container-padding overflow-y-auto">

<div className="mb-6">
<div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary mb-2">
<span>Logistics</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-medium">Active Trips</span>
</div>
<div className="flex items-center justify-between">
<h1 className="text-display-lg font-display-lg text-on-background">Trips &amp; Logistics Log</h1>
<div className="flex gap-2">
<button className="px-4 py-2 bg-surface-container-highest text-on-surface text-label-md font-label-md rounded border border-outline-variant hover:bg-surface-variant transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                            Filter
                        </button>
<button className="px-4 py-2 bg-primary-container text-on-primary text-label-md font-label-md rounded shadow-sm hover:bg-primary transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">download</span>
                            Export
                        </button>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
<div>
<p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Active Trips</p>
<p className="text-headline-md font-headline-md text-on-surface mt-1">42</p>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined fill">route</span>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
<div>
<p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Delayed</p>
<p className="text-headline-md font-headline-md text-error mt-1">3</p>
</div>
<div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error">
<span className="material-symbols-outlined fill">warning</span>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
<div>
<p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Completed Today</p>
<p className="text-headline-md font-headline-md text-on-surface mt-1">18</p>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined fill">check_circle</span>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
<div>
<p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Fleet Utilization</p>
<p className="text-headline-md font-headline-md text-on-surface mt-1">87%</p>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined fill">local_shipping</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface border-b border-outline-variant text-label-md font-label-md text-on-surface-variant h-[40px]">
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10 w-[100px]">Trip ID</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Status</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Vehicle / Driver</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Origin -&gt; Destination</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Departure Time</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Est. Arrival</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10 w-[180px]">Progress</th>
<th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10 w-[60px]"></th>
</tr>
</thead>
<tbody className="text-body-sm font-body-sm text-on-surface">

<tr className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors h-[56px]">
<td className="px-4 py-2 font-code text-primary font-medium">TR-8492-A</td>
<td className="px-4 py-2">
<span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-highest text-on-surface text-label-sm font-label-sm border border-outline-variant">
<span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
                                        In Transit
                                    </span>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-secondary border border-outline-variant">
<span className="material-symbols-outlined text-[16px]">local_shipping</span>
</div>
<div>
<p className="font-medium text-on-surface">Volvo FH16 (Unit 42)</p>
<p className="text-label-sm text-secondary">Sarah Jenkins</p>
</div>
</div>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<span className="font-medium">Rotterdam Port</span>
<span className="material-symbols-outlined text-secondary text-[16px]">arrow_right_alt</span>
<span className="font-medium">Munich Hub</span>
</div>
</td>
<td className="px-4 py-2 text-secondary">Oct 24, 08:30 AM</td>
<td className="px-4 py-2 text-on-surface font-medium">Oct 25, 14:00 PM</td>
<td className="px-4 py-2">
<div className="flex flex-col gap-1">
<div className="flex justify-between text-label-sm text-secondary">
<span>65%</span>
<span>~4h remaining</span>
</div>
<div className="w-full bg-surface-variant rounded-full h-1.5">
<div className="bg-primary h-1.5 rounded-full" style={{width: `65%`}}></div>
</div>
</div>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>

<tr className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors h-[56px] bg-error-container/10">
<td className="px-4 py-2 font-code text-primary font-medium">TR-8493-B</td>
<td className="px-4 py-2">
<span className="inline-flex items-center px-2 py-1 rounded bg-error-container text-on-error-container text-label-sm font-label-sm border border-error/20">
<span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                                        Delayed
                                    </span>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-secondary border border-outline-variant">
<span className="material-symbols-outlined text-[16px]">local_shipping</span>
</div>
<div>
<p className="font-medium text-on-surface">Scania R500 (Unit 18)</p>
<p className="text-label-sm text-secondary">Michael Chang</p>
</div>
</div>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<span className="font-medium">Hamburg</span>
<span className="material-symbols-outlined text-secondary text-[16px]">arrow_right_alt</span>
<span className="font-medium">Prague Facility</span>
</div>
</td>
<td className="px-4 py-2 text-secondary">Oct 24, 06:15 AM</td>
<td className="px-4 py-2 text-error font-medium">Oct 24, 19:30 PM <span className="text-label-sm">(+2h)</span></td>
<td className="px-4 py-2">
<div className="flex flex-col gap-1">
<div className="flex justify-between text-label-sm text-secondary">
<span>40%</span>
<span className="text-error">Traffic Hold</span>
</div>
<div className="w-full bg-surface-variant rounded-full h-1.5">
<div className="bg-error h-1.5 rounded-full" style={{width: `40%`}}></div>
</div>
</div>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>

<tr className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors h-[56px] opacity-75">
<td className="px-4 py-2 font-code text-secondary font-medium">TR-8490-C</td>
<td className="px-4 py-2">
<span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-low text-tertiary text-label-sm font-label-sm border border-outline-variant">
<span className="material-symbols-outlined text-[12px] mr-1">check</span>
                                        Completed
                                    </span>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-secondary border border-outline-variant">
<span className="material-symbols-outlined text-[16px]">local_shipping</span>
</div>
<div>
<p className="font-medium text-on-surface">Mercedes Actros (Unit 09)</p>
<p className="text-label-sm text-secondary">Elena Rodriguez</p>
</div>
</div>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<span className="font-medium text-secondary">Lyon</span>
<span className="material-symbols-outlined text-outline-variant text-[16px]">arrow_right_alt</span>
<span className="font-medium text-secondary">Milan DC</span>
</div>
</td>
<td className="px-4 py-2 text-outline">Oct 23, 22:00 PM</td>
<td className="px-4 py-2 text-outline">Oct 24, 07:15 AM</td>
<td className="px-4 py-2">
<div className="flex flex-col gap-1">
<div className="flex justify-between text-label-sm text-tertiary">
<span>100%</span>
<span>Arrived On Time</span>
</div>
<div className="w-full bg-surface-variant rounded-full h-1.5">
<div className="bg-tertiary h-1.5 rounded-full" style={{width: `100%`}}></div>
</div>
</div>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors h-[56px]">
<td className="px-4 py-2 font-code text-primary font-medium">TR-8495-D</td>
<td className="px-4 py-2">
<span className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface-variant text-label-sm font-label-sm border border-outline-variant">
<span className="material-symbols-outlined text-[12px] mr-1">schedule</span>
                                        Pending
                                    </span>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-secondary border border-outline-variant border-dashed">
<span className="material-symbols-outlined text-[16px]">local_shipping</span>
</div>
<div>
<p className="font-medium text-on-surface">Volvo FH16 (Unit 45)</p>
<p className="text-label-sm text-secondary">David Smith</p>
</div>
</div>
</td>
<td className="px-4 py-2">
<div className="flex items-center gap-2">
<span className="font-medium">Antwerp</span>
<span className="material-symbols-outlined text-secondary text-[16px]">arrow_right_alt</span>
<span className="font-medium">Frankfurt Hub</span>
</div>
</td>
<td className="px-4 py-2 text-secondary">Oct 24, 14:00 PM <span className="text-label-sm">(Scheduled)</span></td>
<td className="px-4 py-2 text-secondary font-medium">Oct 25, 02:00 AM</td>
<td className="px-4 py-2">
<div className="flex flex-col gap-1">
<div className="flex justify-between text-label-sm text-secondary">
<span>0%</span>
<span>Awaiting Dispatch</span>
</div>
<div className="w-full bg-surface-variant rounded-full h-1.5">
<div className="bg-secondary-container h-1.5 rounded-full" style={{width: `0%`}}></div>
</div>
</div>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="bg-surface border-t border-outline-variant p-3 flex items-center justify-between text-label-md font-label-md text-on-surface-variant">
<div>Showing 1 to 4 of 42 entries</div>
<div className="flex items-center gap-2">
<button className="p-1 rounded hover:bg-surface-variant disabled:opacity-50" disabled="">
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center font-medium">1</button>
<button className="w-8 h-8 rounded hover:bg-surface-variant flex items-center justify-center font-medium">2</button>
<button className="w-8 h-8 rounded hover:bg-surface-variant flex items-center justify-center font-medium">3</button>
<span className="px-1">...</span>
<button className="w-8 h-8 rounded hover:bg-surface-variant flex items-center justify-center font-medium">11</button>
<button className="p-1 rounded hover:bg-surface-variant">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
</div>

        </div>
    );
};

export default TripsLogisticsLog;
