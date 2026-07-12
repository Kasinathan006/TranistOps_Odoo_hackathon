
import React, { useState } from 'react';

const VehicleFleetRegistry = () => {
    const [showNewEntryModal, setShowNewEntryModal] = useState(false);
    return (
        <div className="w-full h-full">
            

<aside className="hidden md:flex flex-col h-full border-r border-outline-variant bg-surface fixed left-0 top-0 w-sidebar-width z-50">
<div className="h-header-height flex items-center px-gutter border-b border-outline-variant shrink-0">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-lg" data-icon="local_shipping" data-weight="fill" style={{fontVariationSettings: `'FILL' 1`}}>local_shipping</span>
</div>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary truncate">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary truncate">Fleet Management</p>
</div>
</div>
</div>
<div className="flex-1 overflow-y-auto py-4">
<div className="px-3 pb-4">
<button 
    onClick={() => setShowNewEntryModal(true)}
    className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary rounded h-9 px-4 text-label-md font-label-md hover:bg-surface-tint transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-sm">add</span>
                    New Entry
                </button>
</div>
<nav className="px-3 space-y-1">
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-primary border-l-4 border-primary bg-secondary-container/50 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="local_shipping">local_shipping</span>
<span>Vehicles</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="person">person</span>
<span>Drivers</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="route">route</span>
<span>Trips</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="build">build</span>
<span>Maintenance</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="local_gas_station">local_gas_station</span>
<span>Fuel</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="payments">payments</span>
<span>Expenses</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined text-lg" data-icon="assessment">assessment</span>
<span>Reports</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high transition-colors duration-150 text-label-md font-label-md mt-6" href="#">
<span className="material-symbols-outlined text-lg" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</nav>
</div>
</aside>

<main className="flex-1 flex flex-col md:ml-sidebar-width w-full md:w-[calc(100%-260px)] h-full overflow-hidden bg-background">

<header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 bg-surface-bright h-header-height border-b border-outline-variant shadow-sm shrink-0">
<div className="flex items-center gap-4 flex-1">
<button className="md:hidden text-on-surface-variant p-2 rounded hover:bg-surface-container-high">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="text-headline-sm font-headline-sm font-bold text-primary truncate hidden md:block">
                    TMS Core
                </div>

<div className="flex-1 max-w-md ml-4">
<div className="relative flex items-center w-full h-9 rounded bg-surface border border-outline-variant focus-within:ring-2 focus-within:ring-primary transition-all duration-150">
<span className="material-symbols-outlined text-secondary ml-3 text-sm">search</span>
<input className="w-full h-full bg-transparent border-none text-body-sm font-body-sm text-on-surface placeholder-secondary focus:ring-0 px-2" placeholder="Search vehicles, VIN, plates..." type="text"/>
<div className="pr-2 flex gap-1">
<span className="bg-surface-container-high text-secondary px-1.5 rounded text-[10px] font-code border border-outline-variant">⌘</span>
<span className="bg-surface-container-high text-secondary px-1.5 rounded text-[10px] font-code border border-outline-variant">K</span>
</div>
</div>
</div>
</div>
<div className="flex items-center gap-2 shrink-0 ml-4">
<button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-150 relative">
<span className="material-symbols-outlined text-[20px]" data-icon="notifications">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface-bright"></span>
</button>
<button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-150 hidden sm:flex">
<span className="material-symbols-outlined text-[20px]" data-icon="help_outline">help_outline</span>
</button>
<button className="h-9 px-3 flex items-center gap-1.5 rounded border border-outline-variant text-body-sm font-body-sm text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150 hidden sm:flex">
                    Support
                </button>
<div className="ml-2 w-8 h-8 rounded-full bg-secondary-container overflow-hidden border border-outline-variant cursor-pointer">
<img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUiQQd_5Lzv1QlHUU7voQWziDk4Hsc5fCEUxPcTT6HllKegfh62l0MNVol2sZYDImSO3As7Z2suOis0ctYmqVl2JYuE4S-kKCgb9zotM4Ac9DFQl4tPQrYhFEKp2fwj0FEV1SPhzJvYnDppuUz8YPWRip3XimILJaptt99Hfkf2NyRBqmfO-5o7hTyaQoKGLcCoHBe6thKz2X_NmKKIQaJ225JkCtjqjTItaXEzhg6b3Ei08sxIrol"/>
</div>
</div>
</header>

<div className="flex-1 overflow-auto p-container-padding">
<div className="max-w-[1440px] mx-auto h-full flex flex-col gap-4">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
<div>
<div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary mb-1">
<span>Fleet Operations</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-on-surface">Vehicles</span>
</div>
<h2 className="text-headline-md font-headline-md text-on-surface">Vehicles Management</h2>
</div>
<div className="flex items-center gap-3">
<button className="h-9 px-4 flex items-center gap-2 rounded bg-surface border border-outline-variant text-label-md font-label-md text-on-surface hover:bg-surface-container-high transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-sm">filter_list</span>
                            Filter
                        </button>
<button 
    onClick={() => setShowNewEntryModal(true)}
    className="h-9 px-4 flex items-center gap-2 rounded bg-primary-container text-on-primary text-label-md font-label-md hover:bg-surface-tint transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-sm">add</span>
                            Add Vehicle
                        </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">

<div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant bg-surface shrink-0">
<div className="flex items-center gap-4 text-body-sm font-body-sm text-secondary">
<span>Total Vehicles: <strong className="text-on-surface">248</strong></span>
<div className="h-4 w-px bg-outline-variant"></div>
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-tertiary-container"></span> Active (192)</span>
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-error"></span> Maintenance (34)</span>
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary"></span> Idle (22)</span>
</div>
<div className="flex items-center gap-2">
<button className="p-1.5 rounded text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[18px]">view_column</span>
</button>
<button className="p-1.5 rounded text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[18px]">download</span>
</button>
</div>
</div>

<div className="flex-1 overflow-auto">
<table className="w-full text-left border-collapse whitespace-nowrap">
<thead className="sticky top-0 z-10 bg-surface shadow-[0_1px_0_0_#c3c6d7]">
<tr>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary w-12 text-center border-b border-outline-variant">
<input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 bg-surface-container-lowest" type="checkbox"/>
</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary cursor-pointer hover:text-on-surface border-b border-outline-variant">
<div className="flex items-center gap-1">Plate Number <span className="material-symbols-outlined text-[14px]">arrow_downward</span></div>
</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Model / Make</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Type</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">VIN</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Status</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant text-right">Odometer (km)</th>
<th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary w-16 border-b border-outline-variant text-center">Actions</th>
</tr>
</thead>
<tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-outline-variant/50">
<tr className="table-row-hover h-[40px]">
<td className="px-4 py-1 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 bg-surface-container-lowest" type="checkbox"/>
</td>
<td className="px-4 py-1 font-medium">CA-9482X</td>
<td className="px-4 py-1">Freightliner Cascadia 126</td>
<td className="px-4 py-1 text-secondary">Heavy Truck</td>
<td className="px-4 py-1 font-code text-[11px] text-secondary">1FUJGJCA4ML39XXXX</td>
<td className="px-4 py-1">
<span className="status-chip bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20">Active</span>
</td>
<td className="px-4 py-1 text-right font-code">245,092</td>
<td className="px-4 py-1 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr className="table-row-hover h-[40px] bg-surface/50">
<td className="px-4 py-1 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 bg-surface-container-lowest" type="checkbox"/>
</td>
<td className="px-4 py-1 font-medium">NY-1024B</td>
<td className="px-4 py-1">Volvo VNL 860</td>
<td className="px-4 py-1 text-secondary">Heavy Truck</td>
<td className="px-4 py-1 font-code text-[11px] text-secondary">4V4NC9EJ8MN82XXXX</td>
<td className="px-4 py-1">
<span className="status-chip bg-error/10 text-error border border-error/20">Maintenance</span>
</td>
<td className="px-4 py-1 text-right font-code">412,870</td>
<td className="px-4 py-1 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr className="table-row-hover h-[40px]">
<td className="px-4 py-1 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 bg-surface-container-lowest" type="checkbox"/>
</td>
<td className="px-4 py-1 font-medium">TX-5519M</td>
<td className="px-4 py-1">Ford Transit 350</td>
<td className="px-4 py-1 text-secondary">Cargo Van</td>
<td className="px-4 py-1 font-code text-[11px] text-secondary">1FTBR3X83LKA1XXXX</td>
<td className="px-4 py-1">
<span className="status-chip bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20">Active</span>
</td>
<td className="px-4 py-1 text-right font-code">89,230</td>
<td className="px-4 py-1 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr className="table-row-hover h-[40px] bg-surface/50">
<td className="px-4 py-1 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 bg-surface-container-lowest" type="checkbox"/>
</td>
<td className="px-4 py-1 font-medium">IL-7721C</td>
<td className="px-4 py-1">Kenworth T680</td>
<td className="px-4 py-1 text-secondary">Heavy Truck</td>
<td className="px-4 py-1 font-code text-[11px] text-secondary">1XKAD49X5KJ77XXXX</td>
<td className="px-4 py-1">
<span className="status-chip bg-secondary-container text-on-secondary-container border border-outline-variant">Idle</span>
</td>
<td className="px-4 py-1 text-right font-code">156,900</td>
<td className="px-4 py-1 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr className="table-row-hover h-[40px]">
<td className="px-4 py-1 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 bg-surface-container-lowest" type="checkbox"/>
</td>
<td className="px-4 py-1 font-medium">FL-8839Z</td>
<td className="px-4 py-1">Ram ProMaster 2500</td>
<td className="px-4 py-1 text-secondary">Cargo Van</td>
<td className="px-4 py-1 font-code text-[11px] text-secondary">3C6TRVDG3KE54XXXX</td>
<td className="px-4 py-1">
<span className="status-chip bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20">Active</span>
</td>
<td className="px-4 py-1 text-right font-code">45,120</td>
<td className="px-4 py-1 text-center">
<button className="text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-4 py-2 border-t border-outline-variant bg-surface flex items-center justify-between shrink-0">
<div className="text-label-sm font-label-sm text-secondary">
                            Showing 1 to 5 of 248 entries
                        </div>
<div className="flex items-center gap-1">
<button className="p-1 rounded text-secondary hover:bg-surface-container-high hover:text-on-surface disabled:opacity-50" disabled="">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-7 h-7 rounded bg-primary-container text-on-primary text-label-sm font-label-sm flex items-center justify-center">1</button>
<button className="w-7 h-7 rounded hover:bg-surface-container-high text-on-surface text-label-sm font-label-sm flex items-center justify-center transition-colors">2</button>
<button className="w-7 h-7 rounded hover:bg-surface-container-high text-on-surface text-label-sm font-label-sm flex items-center justify-center transition-colors">3</button>
<span className="text-secondary px-1">...</span>
<button className="w-7 h-7 rounded hover:bg-surface-container-high text-on-surface text-label-sm font-label-sm flex items-center justify-center transition-colors">50</button>
<button className="p-1 rounded text-secondary hover:bg-surface-container-high hover:text-on-surface">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>

{showNewEntryModal && (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
        <div className="bg-surface rounded-xl shadow-lg w-full max-w-md flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant">
                <h3 className="text-title-md font-bold text-on-surface">Add New Vehicle</h3>
                <button onClick={() => setShowNewEntryModal(false)} className="text-secondary hover:text-on-surface">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
                <form className="space-y-4">
                    <div>
                        <label className="block text-label-sm font-medium text-on-surface mb-1">Plate Number</label>
                        <input type="text" className="w-full h-10 px-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. TN-01-AB-1234" />
                    </div>
                    <div>
                        <label className="block text-label-sm font-medium text-on-surface mb-1">Model / Make</label>
                        <input type="text" className="w-full h-10 px-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Tata Prima 5530.S" />
                    </div>
                    <div>
                        <label className="block text-label-sm font-medium text-on-surface mb-1">Type</label>
                        <select className="w-full h-10 px-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface">
                            <option>Heavy Truck</option>
                            <option>Cargo Van</option>
                            <option>Light Commercial</option>
                            <option>Refrigerated Truck</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-label-sm font-medium text-on-surface mb-1">VIN (Chassis No.)</label>
                        <input type="text" className="w-full h-10 px-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Enter VIN" />
                    </div>
                    <div>
                        <label className="block text-label-sm font-medium text-on-surface mb-1">Initial Odometer (km)</label>
                        <input type="number" className="w-full h-10 px-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="0" />
                    </div>
                </form>
            </div>
            <div className="p-4 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-lowest rounded-b-xl">
                <button onClick={() => setShowNewEntryModal(false)} className="px-4 py-2 text-label-md font-medium text-primary hover:bg-primary-container/20 rounded transition-colors">
                    Cancel
                </button>
                <button onClick={() => {
                    alert("Vehicle added successfully!");
                    setShowNewEntryModal(false);
                }} className="px-4 py-2 bg-primary text-on-primary text-label-md font-medium rounded hover:bg-primary/90 transition-colors">
                    Save Vehicle
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default VehicleFleetRegistry;
