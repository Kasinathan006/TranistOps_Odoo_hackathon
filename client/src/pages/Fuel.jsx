import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const today = () => new Date().toISOString().slice(0, 10);

const EXPENSE_TYPE_COLORS = {
  Toll: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Maintenance: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  Insurance: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Other: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
};

export default function Fuel() {
  const [tab, setTab] = useState('fuel');
  const [fuelLogs, setFuelLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [fuelForm, setFuelForm] = useState({ vehicle_id: '', liters: '', cost: '', date: today() });
  const [expenseForm, setExpenseForm] = useState({ vehicle_id: '', type: 'Toll', amount: '', description: '', date: today() });

  const load = async () => {
    try {
      const [f, e, v] = await Promise.all([
        api.get('/fuel'),
        api.get('/fuel/expenses'),
        api.get('/vehicles'),
      ]);
      setFuelLogs(f.data);
      setExpenses(e.data);
      setVehicles(v.data);
    } catch {
      toast.error('Failed to load fuel data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submitFuel = async (e) => {
    e.preventDefault();
    try {
      await api.post('/fuel', fuelForm);
      toast.success('Fuel log added');
      setShowForm(false);
      setFuelForm({ vehicle_id: '', liters: '', cost: '', date: today() });
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error adding fuel log');
    }
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    try {
      await api.post('/fuel/expense', expenseForm);
      toast.success('Expense added');
      setShowForm(false);
      setExpenseForm({ vehicle_id: '', type: 'Toll', amount: '', description: '', date: today() });
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error adding expense');
    }
  };

  // Summary stats
  const totalFuelCost = fuelLogs.reduce((s, f) => s + Number(f.cost || 0), 0);
  const totalLiters = fuelLogs.reduce((s, f) => s + Number(f.liters || 0), 0);
  const totalExpenses = expenses.reduce((s, x) => s + Number(x.amount || 0), 0);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-4">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#737686] dark:text-[#64748b] mb-1 font-medium">
              <span>Fleet Operations</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#121c2a] dark:text-[#f1f5f9]">Fuel & Expenses</span>
            </div>
            <h2 className="text-xl font-bold text-[#121c2a] dark:text-[#f1f5f9]">Fuel & Operational Expenses</h2>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <span className="material-symbols-outlined text-sm">add</span>
            Add {tab === 'fuel' ? 'Fuel Log' : 'Expense'}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">local_gas_station</span>
              Fuel Logs
            </p>
            <p className="text-2xl font-bold text-[#121c2a] dark:text-[#f1f5f9]">{fuelLogs.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">water_drop</span>
              Total Liters
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalLiters.toFixed(1)} L</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">currency_rupee</span>
              Fuel Cost
            </p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{totalFuelCost.toLocaleString('en-IN')}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              Other Expenses
            </p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">₹{totalExpenses.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-[#f0f2fc] dark:bg-[#0f172a] rounded-lg p-1 w-fit border border-[#e2e5f1] dark:border-[#334155]">
          <button
            onClick={() => setTab('fuel')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              tab === 'fuel'
                ? 'bg-white dark:bg-[#1e293b] text-[#0d47a1] dark:text-blue-400 shadow-sm'
                : 'text-[#737686] dark:text-[#64748b] hover:text-[#121c2a] dark:hover:text-[#f1f5f9]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_gas_station</span>
            Fuel Logs
          </button>
          <button
            onClick={() => setTab('expenses')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              tab === 'expenses'
                ? 'bg-white dark:bg-[#1e293b] text-[#0d47a1] dark:text-blue-400 shadow-sm'
                : 'text-[#737686] dark:text-[#64748b] hover:text-[#121c2a] dark:hover:text-[#f1f5f9]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            Expenses
          </button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {tab === 'fuel' ? (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e5f1] dark:border-[#334155]">
                <h3 className="text-sm font-semibold text-[#121c2a] dark:text-[#f1f5f9]">Fuel Logs</h3>
                <span className="text-xs text-[#737686] dark:text-[#64748b]">{fuelLogs.length} records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead className="bg-[#f8f9ff] dark:bg-[#0f172a]">
                    <tr>
                      {['#ID', 'Vehicle', 'Liters', 'Cost (₹)', 'Rate/L', 'Trip', 'Date'].map(h => (
                        <th key={h} className="px-4 py-2.5 text-xs font-semibold text-[#737686] dark:text-[#64748b] border-b border-[#e2e5f1] dark:border-[#334155]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#121c2a] dark:text-[#f1f5f9] divide-y divide-[#e2e5f1] dark:divide-[#334155]">
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          {[...Array(7)].map((_, j) => (
                            <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded w-full" /></td>
                          ))}
                        </tr>
                      ))
                    ) : fuelLogs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-16">
                          <span className="material-symbols-outlined text-4xl text-[#c3c6d7] dark:text-[#334155] block mb-2">local_gas_station</span>
                          <p className="text-sm text-[#737686] dark:text-[#64748b]">No fuel logs recorded yet</p>
                        </td>
                      </tr>
                    ) : fuelLogs.map(f => (
                      <tr key={f.id} className="table-row-hover">
                        <td className="px-4 py-3 font-mono text-xs text-[#737686] dark:text-[#64748b]">#{f.id}</td>
                        <td className="px-4 py-3 font-medium">{f.vehicle_name}</td>
                        <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">{Number(f.liters).toFixed(1)} L</td>
                        <td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">₹{Number(f.cost).toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs text-[#737686] dark:text-[#64748b]">
                          ₹{f.liters ? (Number(f.cost) / Number(f.liters)).toFixed(2) : '—'}/L
                        </td>
                        <td className="px-4 py-3">{f.trip_id ? <span className="status-chip bg-[#e8f0fe] dark:bg-[#1e293b] text-[#0d47a1] dark:text-blue-400">#{f.trip_id}</span> : <span className="text-[#737686] dark:text-[#64748b]">—</span>}</td>
                        <td className="px-4 py-3 text-[#737686] dark:text-[#64748b]">{f.date?.slice(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e5f1] dark:border-[#334155]">
                <h3 className="text-sm font-semibold text-[#121c2a] dark:text-[#f1f5f9]">Operational Expenses</h3>
                <span className="text-xs text-[#737686] dark:text-[#64748b]">{expenses.length} records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead className="bg-[#f8f9ff] dark:bg-[#0f172a]">
                    <tr>
                      {['#ID', 'Vehicle', 'Category', 'Amount (₹)', 'Description', 'Date'].map(h => (
                        <th key={h} className="px-4 py-2.5 text-xs font-semibold text-[#737686] dark:text-[#64748b] border-b border-[#e2e5f1] dark:border-[#334155]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#121c2a] dark:text-[#f1f5f9] divide-y divide-[#e2e5f1] dark:divide-[#334155]">
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          {[...Array(6)].map((_, j) => (
                            <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded w-full" /></td>
                          ))}
                        </tr>
                      ))
                    ) : expenses.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16">
                          <span className="material-symbols-outlined text-4xl text-[#c3c6d7] dark:text-[#334155] block mb-2">receipt_long</span>
                          <p className="text-sm text-[#737686] dark:text-[#64748b]">No expenses recorded yet</p>
                        </td>
                      </tr>
                    ) : expenses.map(x => (
                      <tr key={x.id} className="table-row-hover">
                        <td className="px-4 py-3 font-mono text-xs text-[#737686] dark:text-[#64748b]">#{x.id}</td>
                        <td className="px-4 py-3 font-medium">{x.vehicle_name}</td>
                        <td className="px-4 py-3">
                          <span className={`status-chip ${EXPENSE_TYPE_COLORS[x.type] || EXPENSE_TYPE_COLORS.Other}`}>
                            {x.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">₹{Number(x.amount).toLocaleString()}</td>
                        <td className="px-4 py-3 text-[#737686] dark:text-[#64748b] max-w-[200px] truncate" title={x.description}>{x.description || '—'}</td>
                        <td className="px-4 py-3 text-[#737686] dark:text-[#64748b]">{x.date?.slice(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-panel max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">{tab === 'fuel' ? 'local_gas_station' : 'receipt_long'}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#121c2a] dark:text-[#f1f5f9]">{tab === 'fuel' ? 'Add Fuel Log' : 'Add Expense'}</h3>
                  <p className="text-xs text-[#737686] dark:text-[#64748b]">Record a new {tab === 'fuel' ? 'fuel fill-up' : 'operational expense'}</p>
                </div>
              </div>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f2fc] dark:hover:bg-[#334155] text-[#737686] dark:text-[#64748b] transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {tab === 'fuel' ? (
              <form onSubmit={submitFuel} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Vehicle *</label>
                  <select required value={fuelForm.vehicle_id}
                    onChange={e => setFuelForm({ ...fuelForm, vehicle_id: e.target.value })}
                    className="form-select">
                    <option value="">Select a vehicle...</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.registration_number} — {v.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Liters *</label>
                    <input type="number" min="0" step="0.01" required placeholder="0.00"
                      value={fuelForm.liters}
                      onChange={e => setFuelForm({ ...fuelForm, liters: e.target.value })}
                      className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Cost (₹) *</label>
                    <input type="number" min="0" required placeholder="0"
                      value={fuelForm.cost}
                      onChange={e => setFuelForm({ ...fuelForm, cost: e.target.value })}
                      className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Date *</label>
                  <input type="date" required
                    value={fuelForm.date}
                    onChange={e => setFuelForm({ ...fuelForm, date: e.target.value })}
                    className="form-input" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
                  <button type="submit" className="btn-primary">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Fuel Log
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={submitExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Vehicle *</label>
                  <select required value={expenseForm.vehicle_id}
                    onChange={e => setExpenseForm({ ...expenseForm, vehicle_id: e.target.value })}
                    className="form-select">
                    <option value="">Select a vehicle...</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.registration_number} — {v.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Category</label>
                    <select value={expenseForm.type}
                      onChange={e => setExpenseForm({ ...expenseForm, type: e.target.value })}
                      className="form-select">
                      <option>Toll</option>
                      <option>Maintenance</option>
                      <option>Insurance</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Amount (₹) *</label>
                    <input type="number" min="0" required placeholder="0"
                      value={expenseForm.amount}
                      onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Description</label>
                  <input placeholder="Optional description..."
                    value={expenseForm.description}
                    onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Date *</label>
                  <input type="date" required
                    value={expenseForm.date}
                    onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="form-input" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
                  <button type="submit" className="btn-primary">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Expense
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
