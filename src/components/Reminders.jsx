import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    };
    fetchUser();
  }, []);

  const fetchReminders = async () => {
    if (!userId) return;
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .order('time', { ascending: true });
    if (!error) setReminders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) fetchReminders();
  }, [userId]);

  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!form.label || !form.time) return;
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase.from('reminders').insert({
      user_id: userId,
      label: form.label,
      time: form.time,
      status: 'En attente',
      date: today,
    });
    if (!error) {
      setForm({ label: '', time: '' });
      setShowForm(false);
      fetchReminders();
    }
    setLoading(false);
  };

  return (
    <div className="relative bg-white border rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Rappels</h3>
        <button
          className="absolute top-4 right-4 z-10 text-blue-600 hover:bg-blue-50 rounded-full p-2 transition"
          onClick={() => setShowForm((v) => !v)}
          aria-label="Ajouter un rappel"
        >
          <FaPlus />
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleAddReminder}
          className="mb-4 animate-fade-in"
        >
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <input
              type="text"
              placeholder="Label (ex : Vermifuge)"
              className="border rounded px-3 py-2 flex-1"
              value={form.label}
              onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              required
            />
            <input
              type="time"
              className="border rounded px-3 py-2"
              value={form.time}
              onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              Ajouter
            </button>
          </div>
        </form>
      )}
      <div className="space-y-2">
        {loading && <div className="text-gray-400">Chargement…</div>}
        {!loading && reminders.length === 0 && (
          <div className="text-gray-400">Aucun rappel pour aujourd'hui.</div>
        )}
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="border rounded-lg px-4 py-2 flex items-center justify-between bg-gray-50 animate-fade-in"
          >
            <div>
              <span className="font-medium text-gray-800">{reminder.label}</span>
              <span className="ml-2 text-gray-500">{reminder.time}</span>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
              {reminder.status}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
};

export default Reminders; 