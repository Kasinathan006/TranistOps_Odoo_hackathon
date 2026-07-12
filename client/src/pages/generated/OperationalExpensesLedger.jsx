
import React from 'react';

const OperationalExpensesLedger = () => {
    return (
        <div className="w-full h-full">
            

<nav className="fixed left-0 top-0 h-full w-[260px] bg-surface dark:bg-surface-dim border-r border-outline-variant dark:border-outline flex flex-col z-50">

<div className="h-header-height flex items-center px-gutter border-b border-outline-variant dark:border-outline">
<div className="flex items-center gap-3">
<img className="h-8 w-8 rounded-full object-cover shadow-sm bg-primary-container p-1" data-alt="A minimalist logo for a global logistics company, featuring a stylized globe intersecting with forward-pointing arrows. The design uses deep blue and bright white colors to project reliability and speed. The logo is clean, modern, and highly legible, suitable for an enterprise software interface header." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1sk23IjZdtYOY8ARbRyogTvwF-HwCINwAns0XZu2lGhrF61keiP997pde1DfAvABYYidBNRdf3G0aJJQxwoDcQm5WBTH5sH79dk5pBTHfBlMDibmIzCFFq1cLiO2jbLHgosSoRwFUkvNI9vZ_5v6U05O0414ZN2K0stJS7NeWvfDATmaVTouPKmBDno0yxuuzxnBSnYvGEvStlKfUcOyIEtZAqysPRhvMoCD3Cvy59mfHHEMLdtvT"/>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed-dim">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary">Fleet Management</p>
</div>
</div>
</div>

<div className="p-gutter">
<button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-2 px-4 rounded shadow-sm hover:bg-primary/90 transition-colors duration-150 text-label-md font-label-md scale-98 hover:scale-100">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Entry
            </button>
</div>

<div className="flex-1 overflow-y-auto py-2">
<ul className="flex flex-col gap-1 px-2">
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-md font-label-md">Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">local_shipping</span>
<span className="text-label-md font-label-md">Vehicles</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-label-md font-label-md">Drivers</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">route</span>
<span className="text-label-md font-label-md">Trips</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">build</span>
<span className="text-label-md font-label-md">Maintenance</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">local_gas_station</span>
<span className="text-label-md font-label-md">Fuel</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-primary border-l-4 border-primary bg-secondary-container/50" href="#">
<span className="material-symbols-outlined" style={{fontVariationSettings: `'FILL' 1`}}>payments</span>
<span className="text-label-md font-label-md">Expenses</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">assessment</span>
<span className="text-label-md font-label-md">Reports</span>
</a>
</li>
</ul>
</div>

<div className="p-4 border-t border-outline-variant dark:border-outline mt-auto">
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
</div>
</nav>

<div className="flex-1 flex flex-col ml-sidebar-width h-full bg-surface-bright relative w-[calc(100%-260px)]">

<header className="docked full-width top-0 h-[56px] bg-surface-bright dark:bg-surface-dim shadow-sm flex items-center justify-between px-gutter w-full sticky z-40">

<div className="flex items-center gap-2 text-on-surface-variant">
<span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">Finance</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="text-headline-sm font-headline-sm font-bold text-primary">Expenses</span>
</div>

<div className="flex-1 max-w-md mx-8">
<div className="relative focus-within:ring-2 focus-within:ring-primary rounded">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">search</span>
<input className="w-full h-9 pl-10 pr-4 bg-surface border border-outline-variant rounded text-body-sm focus:outline-none focus:border-primary transition-colors" placeholder="Search expenses..." type="text"/>
</div>
</div>

<div className="flex items-center gap-4">
<button className="text-secondary hover:text-primary transition-colors duration-150 relative">
<span className="material-symbols-outlined text-[24px]">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="text-secondary hover:text-primary transition-colors duration-150 hidden sm:block">
<span className="material-symbols-outlined text-[24px]">help_outline</span>
</button>
<div className="h-6 w-px bg-outline-variant hidden sm:block"></div>
<button className="text-label-md font-label-md text-secondary hover:text-primary transition-colors duration-150 hidden sm:block">
                    Support
                </button>
<button className="w-8 h-8 rounded-full border border-outline-variant overflow-hidden focus:ring-2 focus:ring-primary">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a female fleet coordinator in her 30s. She is smiling confidently, wearing business casual attire, against a clean, light-colored background. The image is brightly lit, suitable for a user profile avatar in an enterprise application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADcUosYhjIyVSjkVvL7rZ4Zz1KJcsV1qKd6yC28OmSrlgMAzSjXx2U8B3ivYtHBxxNe2roFNzkgkaOUReTlBtHnCLbSJ_fZUf99QcleQKoFDc8kHipAU8QCXwK19EOtkjelJom5Lmob248cbZn1ZTdS5Sg-lGYKraLQt3UI8fEd-mvMAaZeBYHsR6mZIaWFQ9XILz9D0HYUpqprq6Bp1U-F_ll8UOxJONU7rVcmzxRxmDkNljnU6To"/>
</button>
</div>
</header>

<main className="flex-1 overflow-y-auto p-container-padding bg-surface-bright">
<div className="max-w-[1440px] mx-auto space-y-6">

<div className="flex items-center justify-between">
<div>
<h2 className="text-headline-md font-headline-md text-on-surface">Expense Management</h2>
<p className="text-body-sm text-secondary mt-1">Track and manage operational fleet costs.</p>
</div>
</div>

<div className="grid grid-cols-12 gap-component-gap-dense">

<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm self-start">
<div className="flex items-center gap-2 mb-6 border-b border-outline-variant pb-4">
<span className="material-symbols-outlined text-primary">receipt_long</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface">Add Expense</h3>
</div>
<form className="space-y-4">

<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-1">Expense Type</label>
<select className="w-full h-[36px] bg-surface-bright border border-outline-variant rounded text-body-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-on-surface">
<option>Toll</option>
<option>Fine</option>
<option>Repair</option>
<option>Salary</option>
<option>Fuel</option>
<option>Other</option>
</select>
</div>

<div className="grid grid-cols-2 gap-4">
<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-1">Amount ($)</label>
<input className="w-full h-[36px] bg-surface-bright border border-outline-variant rounded text-body-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="0.00" step="0.01" type="number"/>
</div>
<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-1">Date</label>
<input className="w-full h-[36px] bg-surface-bright border border-outline-variant rounded text-body-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-on-surface" type="date"/>
</div>
</div>

<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-1">Vehicle (Optional)</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-secondary text-[18px]">local_shipping</span>
<input className="w-full h-[36px] pl-8 pr-3 bg-surface-bright border border-outline-variant rounded text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="e.g. TRK-204" type="text"/>
</div>
</div>

<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-1">Description</label>
<textarea className="w-full bg-surface-bright border border-outline-variant rounded text-body-sm p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Brief details about the expense..." rows="3"></textarea>
</div>

<div className="border-2 border-dashed border-outline-variant rounded bg-surface-container-low p-4 text-center cursor-pointer hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-secondary mb-1">upload_file</span>
<p className="text-label-sm font-label-sm text-secondary">Click to upload receipt (PDF/JPG)</p>
</div>
<div className="pt-4 flex justify-end gap-2">
<button className="px-4 h-[36px] rounded bg-surface-bright border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors" type="button">Clear</button>
<button className="px-4 h-[36px] rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-sm" type="submit">Submit Expense</button>
</div>
</form>
</div>

<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col shadow-sm">

<div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface/50 rounded-t-lg">
<h3 className="text-headline-sm font-headline-sm text-on-surface">Recent Expenses</h3>
<div className="flex gap-2">
<button className="h-8 px-3 text-label-sm font-label-sm border border-outline-variant rounded bg-surface-bright flex items-center gap-1 hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
                                </button>
<button className="h-8 px-3 text-label-sm font-label-sm border border-outline-variant rounded bg-surface-bright flex items-center gap-1 hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[16px]">download</span> Export
                                </button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface sticky top-0 z-10 border-b border-outline-variant">
<tr>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium w-12">ID</th>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium">Date</th>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium">Type</th>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium">Description</th>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium text-right">Amount</th>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium text-center">Status</th>
<th className="py-2 px-4 text-label-sm font-label-sm text-secondary font-medium w-12"></th>
</tr>
</thead>
<tbody className="text-body-sm divide-y divide-outline-variant bg-surface-container-lowest">
<tr className="hover:bg-surface-container-low transition-colors group h-[40px]">
<td className="px-4 py-2 font-code text-secondary">#4092</td>
<td className="px-4 py-2 text-on-surface">Oct 24, 2023</td>
<td className="px-4 py-2">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">toll</span> Toll
                                            </div>
</td>
<td className="px-4 py-2 text-secondary truncate max-w-[200px]">I-95 Northbound Toll - TRK-102</td>
<td className="px-4 py-2 text-right font-medium text-on-surface">$14.50</td>
<td className="px-4 py-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-label-sm font-label-sm">Approved</span>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group h-[40px] bg-surface/30">
<td className="px-4 py-2 font-code text-secondary">#4091</td>
<td className="px-4 py-2 text-on-surface">Oct 23, 2023</td>
<td className="px-4 py-2">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">build</span> Repair
                                            </div>
</td>
<td className="px-4 py-2 text-secondary truncate max-w-[200px]">Tire replacement - TRK-405</td>
<td className="px-4 py-2 text-right font-medium text-on-surface">$450.00</td>
<td className="px-4 py-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm">Pending</span>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group h-[40px]">
<td className="px-4 py-2 font-code text-secondary">#4090</td>
<td className="px-4 py-2 text-on-surface">Oct 22, 2023</td>
<td className="px-4 py-2">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">gavel</span> Fine
                                            </div>
</td>
<td className="px-4 py-2 text-secondary truncate max-w-[200px]">Parking violation - City Center</td>
<td className="px-4 py-2 text-right font-medium text-on-surface">$75.00</td>
<td className="px-4 py-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-label-sm font-label-sm">Reimbursed</span>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group h-[40px] bg-surface/30">
<td className="px-4 py-2 font-code text-secondary">#4089</td>
<td className="px-4 py-2 text-on-surface">Oct 20, 2023</td>
<td className="px-4 py-2">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">payments</span> Salary
                                            </div>
</td>
<td className="px-4 py-2 text-secondary truncate max-w-[200px]">Driver Bonus - Q3 Performance</td>
<td className="px-4 py-2 text-right font-medium text-on-surface">$500.00</td>
<td className="px-4 py-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container/50 text-error text-label-sm font-label-sm">Rejected</span>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group h-[40px]">
<td className="px-4 py-2 font-code text-secondary">#4088</td>
<td className="px-4 py-2 text-on-surface">Oct 19, 2023</td>
<td className="px-4 py-2">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">local_gas_station</span> Fuel
                                            </div>
</td>
<td className="px-4 py-2 text-secondary truncate max-w-[200px]">Diesel refill Station 42 - TRK-102</td>
<td className="px-4 py-2 text-right font-medium text-on-surface">$320.45</td>
<td className="px-4 py-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-label-sm font-label-sm">Approved</span>
</td>
<td className="px-4 py-2 text-right">
<button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-3 border-t border-outline-variant flex items-center justify-between bg-surface/50 rounded-b-lg">
<span className="text-label-sm font-label-sm text-secondary">Showing 1-5 of 142 entries</span>
<div className="flex gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container disabled:opacity-50" disabled="">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-primary text-on-primary text-label-sm font-label-sm">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container text-label-sm font-label-sm">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container text-label-sm font-label-sm">3</button>
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

        </div>
    );
};

export default OperationalExpensesLedger;
