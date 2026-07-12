import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const today = () => new Date().toISOString().slice(0, 10);

export default function Fuel() {
  const [tab, setTab] = useState('fuel');
  const [fuelLogs, setFuelLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [fuelForm, setFuelForm] = useState({ vehicle_id: '', liters: '', cost: '', date: today() });
  const [expenseForm, setExpenseForm] = useState({ vehicle_id: '', type: 'Toll', amount: '', description: '', date: today() });

  const load = async () => {
    const [f, e, v] = await Promise.all([
      api.get('/fuel'),
      api.get('/fuel/expenses'),
      api.get('/vehicles'),
    ]);
    setFuelLogs(f.data);
    setExpenses(e.data);
    setVehicles(v.data);
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
      toast.error(err.response?.data?.error || 'Error');
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
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Fuel & Expenses</h2>
        <button onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Add {tab === 'fuel' ? 'Fuel Log' : 'Expense'}
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('fuel')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'fuel' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
          Fuel Logs
        </button>
        <button onClick={() => setTab('expenses')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'expenses' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
          Expenses
        </button>
      </div>

      {tab === 'fuel' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Vehicle', 'Liters', 'Cost', 'Trip', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fuelLogs.map(f => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">#{f.id}</td>
                  <td className="px-4 py-3">{f.vehicle_name}</td>
                  <td className="px-4 py-3">{f.liters} L</td>
                  <td className="px-4 py-3">₹{Number(f.cost).toLocaleString()}</td>
                  <td className="px-4 py-3">{f.trip_id ? `#${f.trip_id}` : '—'}</td>
                  <td className="px-4 py-3">{f.date?.slice(0, 10)}</td>
                </tr>
              ))}
              {fuelLogs.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No fuel logs yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Vehicle', 'Type', 'Amount', 'Description', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map(x => (
                <tr key={x.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">#{x.id}</td>
                  <td className="px-4 py-3">{x.vehicle_name}</td>
                  <td className="px-4 py-3">{x.type}</td>
                  <td className="px-4 py-3">₹{Number(x.amount).toLocaleString()}</td>
                  <td className="px-4 py-3">{x.description || '—'}</td>
                  <td className="px-4 py-3">{x.date?.slice(0, 10)}</td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No expenses yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            {tab === 'fuel' ? (
              <>
                <h3 className="text-lg font-bold mb-4">Add Fuel Log</h3>
                <form onSubmit={submitFuel} className="space-y-3">
                  <select required value={fuelForm.vehicle_id}
                    onChange={e => setFuelForm({ ...fuelForm, vehicle_id: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="">Select Vehicle *</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.registration_number} — {v.name}</option>
                    ))}
                  </select>
                  <input placeholder="Liters *" type="number" min="0" step="0.01" required
                    value={fuelForm.liters}
                    onChange={e => setFuelForm({ ...fuelForm, liters: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input placeholder="Cost (₹) *" type="number" min="0" required
                    value={fuelForm.cost}
                    onChange={e => setFuelForm({ ...fuelForm, cost: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input type="date" required
                    value={fuelForm.date}
                    onChange={e => setFuelForm({ ...fuelForm, date: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">Add</button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-4">Add Expense</h3>
                <form onSubmit={submitExpense} className="space-y-3">
                  <select required value={expenseForm.vehicle_id}
                    onChange={e => setExpenseForm({ ...expenseForm, vehicle_id: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="">Select Vehicle *</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.registration_number} — {v.name}</option>
                    ))}
                  </select>
                  <select value={expenseForm.type}
                    onChange={e => setExpenseForm({ ...expenseForm, type: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option>Toll</option><option>Maintenance</option><option>Insurance</option><option>Other</option>
                  </select>
                  <input placeholder="Amount (₹) *" type="number" min="0" required
                    value={expenseForm.amount}
                    onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input placeholder="Description"
                    value={expenseForm.description}
                    onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input type="date" required
                    value={expenseForm.date}
                    onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">Add</button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
