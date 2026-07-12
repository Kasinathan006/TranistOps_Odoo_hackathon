
import React from 'react';

const DriverManagement = () => {
    return (
        <div className="w-full h-full">
            

<nav className="fixed left-0 top-0 h-full w-[260px] bg-surface dark:bg-surface-dim flex flex-col border-r border-outline-variant dark:border-outline z-50">
<div className="p-gutter flex items-center gap-3">
<img alt="Logistics Logo" className="w-8 h-8 rounded" data-alt="A minimalist logistics company logo featuring abstract geometric shapes forming a stylized truck in a modern, light-mode corporate aesthetic. The logo should use primary blue tones and clear white space, suitable for a professional fleet management system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADX2baTeTr3J3D9_PloUMhVckS8vOTfN6gfgVChWNTO1Yfx4_eU4UwleXJMLaSp5569v7IFX3OtSXKfpI7VktYdQzcmHasneRfpmZbQOvSmwd2AXjR480R_8J-ZzBwnuD7Q_Uplm034P6vDotbB7erEXILMwKKsKk4NpxJzEcQbTx4KAL-FD5ZKYluTJX1TJp9u0x4htratdsBttwxHrNXNT703bobQkGrz0wGKOghnlJ6XKSYlfL9"/>
<div>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed-dim">Global Logistics</h1>
<p className="text-label-sm font-label-sm text-secondary">Fleet Management</p>
</div>
</div>
<div className="px-4 py-2">
<button className="w-full bg-primary-container text-on-primary rounded py-2 flex items-center justify-center gap-2 hover:bg-primary transition-colors duration-150 shadow-sm text-label-md font-label-md">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Entry
            </button>
</div>
<ul className="flex-1 overflow-y-auto py-2">
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-md font-label-md">Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">local_shipping</span>
<span className="text-label-md font-label-md">Vehicles</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-primary dark:text-primary-fixed-dim border-l-4 border-primary dark:border-primary-fixed-dim bg-secondary-container/50" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-label-md font-label-md">Drivers</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">route</span>
<span className="text-label-md font-label-md">Trips</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">build</span>
<span className="text-label-md font-label-md">Maintenance</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">local_gas_station</span>
<span className="text-label-md font-label-md">Fuel</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="text-label-md font-label-md">Expenses</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">assessment</span>
<span className="text-label-md font-label-md">Reports</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-gutter py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors duration-150" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
</li>
</ul>
</nav>

<div className="ml-[260px] flex-1 flex flex-col h-full bg-background relative">

<header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 bg-surface-bright dark:bg-surface-dim h-[56px] border-b border-outline-variant dark:border-outline shadow-sm">
<div className="flex items-center gap-4">
<span className="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed-dim">TMS Core</span>
<div className="relative focus-within:ring-2 focus-within:ring-primary rounded-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input className="pl-9 pr-4 py-1.5 bg-surface-container-high border-none rounded-full text-body-sm font-body-sm w-64 focus:outline-none placeholder:text-on-surface-variant/70" placeholder="Search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary transition-colors duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary transition-colors duration-150">
<span className="material-symbols-outlined">help_outline</span>
</button>
<button className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors duration-150 border border-outline-variant px-3 py-1 rounded">Support</button>
<img alt="User Profile" className="w-8 h-8 rounded-full border border-outline-variant" data-alt="A small, professional headshot of a logistics coordinator or user in a modern corporate setting. Clear lighting, neutral background, suitable for a UI avatar in a professional web application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtiQE2bAeT5aP1b--OfccnylkxWqV8Tv7huSs7Tq7LUME6jnv0VCwOR1HbRA-RdYYb1SOqnRBZUNfjhPL781zCHlje4BTWIAS6wyR0zECQQb9Gfudj7YqWltG5AgRKUKjX06bwizpmsxXhukfRtSuncLOHbM4_Bvro7TDo4iWgEw-cvNsbnfe3pTegP_74sGcZrJVUFtN7lfgdDNq9rb_xC1pw6qbGjv5gPhDvhLvSGHnPuPZGZuTp"/>
</div>
</header>

<main className="flex-1 overflow-y-auto p-container-padding">

<div className="mb-6">
<div className="text-label-sm font-label-sm text-secondary mb-1 flex items-center gap-1">
<span>Operations</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="font-semibold text-primary">Drivers Directory</span>
</div>
<div className="flex justify-between items-end">
<div>
<h2 className="text-display-lg font-display-lg text-on-surface">Drivers</h2>
<p className="text-body-sm font-body-sm text-secondary mt-1">Manage fleet personnel, credentials, and current statuses.</p>
</div>
<div className="flex gap-2">
<button className="bg-surface border border-outline-variant text-on-surface px-4 py-2 rounded text-label-md font-label-md hover:bg-surface-container-low transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                        </button>
<button className="bg-primary-container text-on-primary px-4 py-2 rounded text-label-md font-label-md hover:bg-primary transition-colors flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">person_add</span> Add Driver
                        </button>
</div>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#F5F6F8] border-b border-outline-variant text-label-md font-label-md text-secondary">
<th className="py-3 px-4 font-semibold w-1/4">Driver Name</th>
<th className="py-3 px-4 font-semibold">License Number</th>
<th className="py-3 px-4 font-semibold">Experience</th>
<th className="py-3 px-4 font-semibold">Contact</th>
<th className="py-3 px-4 font-semibold">Status</th>
<th className="py-3 px-4 font-semibold text-right">Actions</th>
</tr>
</thead>
<tbody className="text-body-sm font-body-sm">

<tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors h-[48px]">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<img alt="Driver Avatar" className="w-8 h-8 rounded-full bg-surface-variant object-cover" data-alt="Professional headshot of a middle-aged male truck driver with a slight smile, wearing a casual work shirt. Neutral gray background, well-lit, suitable for a corporate directory avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1pmsKvYVHwmiVx0pxrU-IiIZ_4muK04bA0spukl0ygIw6IuDZaJbLO__X5RdHilmuhGBGm3ho7ZNwsO2wos1QwmcooIfQ6U-Q0Qu7apUfpTuxcl5LSUNQaxedkc0vuE5lVg_Ica1xwopGeMEgz6F_202gJ9xJgCkpW46Q7BWEXCup6xx9JhaTfva9AjzXmWoSjAa1h0MUjW97iIuJP6AcTvpQLaZiAvGEfQrLHlVYWWC5z0VUCUby"/>
<span className="font-medium text-on-surface">James Wilson</span>
</div>
</td>
<td className="py-2 px-4 text-secondary font-code">CDL-9842-A</td>
<td className="py-2 px-4 text-on-surface">8 Years</td>
<td className="py-2 px-4 text-secondary">+1 (555) 019-2834</td>
<td className="py-2 px-4">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-label-sm font-label-sm border border-primary/20">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Available
                                    </span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-primary hover:bg-surface-container-low p-1.5 rounded transition-colors mr-1" title="View File">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="text-secondary hover:bg-surface-container-low p-1.5 rounded transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>

<tr className="border-b border-outline-variant bg-[#F5F6F8]/50 hover:bg-surface-container-lowest transition-colors h-[48px]">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<img alt="Driver Avatar" className="w-8 h-8 rounded-full bg-surface-variant object-cover" data-alt="Professional headshot of a female logistics driver in her thirties, looking confident. Wearing a high-visibility vest over a dark shirt. Bright, clean corporate lighting, suitable for an enterprise user profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwMw-AYhPVnvpGainNk-lEcK95o7iniOVM_b2crreOxRoyd284n8bfaMO8cMdRp4VnZQHHkWh32OZpCkQbGk2uiAkE-Bo_RACmJ84uBmCwRvz_p6NkSNFjMqIQD_hzAPwReROS8IY8Ftp1C-VjYzyEmx8sWF73GihC9ymNqXiM4vRSNfkKpyymA8UM3ikXBQmTQuErcFxeNXuyqi92_ecbYh6vs0XNBfQg_n_qHr0LMS1dnQ0EuiKN"/>
<span className="font-medium text-on-surface">Maria Garcia</span>
</div>
</td>
<td className="py-2 px-4 text-secondary font-code">CDL-7721-B</td>
<td className="py-2 px-4 text-on-surface">12 Years</td>
<td className="py-2 px-4 text-secondary">+1 (555) 832-1190</td>
<td className="py-2 px-4">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-label-sm font-label-sm border border-tertiary/20">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> On Trip
                                    </span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-primary hover:bg-surface-container-low p-1.5 rounded transition-colors mr-1" title="View File">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="text-secondary hover:bg-surface-container-low p-1.5 rounded transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>

<tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors h-[48px]">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<img alt="Driver Avatar" className="w-8 h-8 rounded-full bg-surface-variant object-cover" data-alt="Professional headshot of an older male truck driver with a beard, wearing a casual button-down shirt. Calm expression, well-lit studio setting with a light gray background, designed for a modern app UI avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClssVfJjgPlD8o_ppzK7eiXFyVYdJoapKjxx3HQzX8tQS9Wu8sDddil0cVI2LGmGBoQ3sLuSAN1EtNB6ueEcRXZ8TPfN265Ty617S5wbyTpAB9v9NWDBi0mcL5X4-9Th362FfAAmX0XUOkvxCDOo1VA68ZQo7XEtK3zowYu19Jxz4yXTk8h7GIR9StWGiacm-RV1v1uURzMJrB-GHZ-pkNn4yRNJsseqsNgwC31sSfM_92_f5x4c1j"/>
<span className="font-medium text-on-surface">Robert Chen</span>
</div>
</td>
<td className="py-2 px-4 text-secondary font-code">CDL-4490-X</td>
<td className="py-2 px-4 text-on-surface">15 Years</td>
<td className="py-2 px-4 text-secondary">+1 (555) 443-8821</td>
<td className="py-2 px-4">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error-container/30 text-error text-label-sm font-label-sm border border-error/20">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> On Leave
                                    </span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-primary hover:bg-surface-container-low p-1.5 rounded transition-colors mr-1" title="View File">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="text-secondary hover:bg-surface-container-low p-1.5 rounded transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>

<tr className="bg-[#F5F6F8]/50 hover:bg-surface-container-lowest transition-colors h-[48px]">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<img alt="Driver Avatar" className="w-8 h-8 rounded-full bg-surface-variant object-cover" data-alt="Professional headshot of a young male driver in his twenties, clean-shaven, wearing a company polo shirt. Friendly expression, bright corporate lighting against a solid light background, perfect for a digital directory." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUfOeQMKHLz6O-wUrgN4EooFCi81Bn9Or6icYzNQdVrbSOo-jewelVkDhPrq8104p2DmHI64q5c7vy0PLcV_ZjzBtNjgGtjeEHDomzdVtuCV0CFAtXcoH4-CF2cWDmAQQ_Z_6HtrWq5Jvci7jwJQlc2FLDmteA0CyY7pThJbfg7ukO5-PKqITFqgLY0NK6KGinBlUIb3taqmND6pO43jUNu5t0SJ_NHJwsM90cryE1y0kBBLbVjW0h"/>
<span className="font-medium text-on-surface">David Miller</span>
</div>
</td>
<td className="py-2 px-4 text-secondary font-code">CDL-1102-Y</td>
<td className="py-2 px-4 text-on-surface">3 Years</td>
<td className="py-2 px-4 text-secondary">+1 (555) 765-0912</td>
<td className="py-2 px-4">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-label-sm font-label-sm border border-primary/20">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Available
                                    </span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-primary hover:bg-surface-container-low p-1.5 rounded transition-colors mr-1" title="View File">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="text-secondary hover:bg-surface-container-low p-1.5 rounded transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="border-t border-outline-variant bg-surface px-4 py-3 flex items-center justify-between text-body-sm font-body-sm text-secondary">
<div>Showing 1 to 4 of 24 entries</div>
<div className="flex items-center gap-1">
<button className="p-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors disabled:opacity-50"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
<button className="px-2.5 py-1 border border-primary bg-primary text-on-primary rounded text-label-sm font-label-sm">1</button>
<button className="px-2.5 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-label-sm font-label-sm">2</button>
<button className="px-2.5 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-label-sm font-label-sm">3</button>
<span className="px-1">...</span>
<button className="px-2.5 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-label-sm font-label-sm">6</button>
<button className="p-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
</div>
</div>
</div>
</main>
</div>

        </div>
    );
};

export default DriverManagement;
