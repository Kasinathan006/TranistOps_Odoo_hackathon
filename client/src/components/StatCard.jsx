export default function StatCard({ title, value, subtitle, icon, trend, isPositive = true }) {
  return (
    <div className="card p-5 group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined icon-fill">{icon || 'insert_chart'}</span>
        </div>
        {trend && (
          <span className={`text-label-sm flex items-center font-medium px-2 py-0.5 rounded-full ${isPositive ? 'text-tertiary bg-tertiary/10' : 'text-error bg-error/10'}`}>
            <span className="material-symbols-outlined text-[14px] mr-1">
              {isPositive ? 'trending_up' : 'trending_down'}
            </span> 
            {trend}
          </span>
        )}
      </div>
      <p className="text-label-md text-on-surface-variant mb-1">{title}</p>
      <h3 className="font-display-sm text-on-surface">{value ?? '—'}</h3>
      {subtitle && <p className="text-body-sm text-on-surface-variant mt-2 opacity-75">{subtitle}</p>}
    </div>
  );
}
