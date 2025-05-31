import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const NutritionPanel = () => {
  const [nutrition, setNutrition] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ calories_target: '', water_target: '' });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    };
    fetchUser();
  }, []);

  const fetchNutrition = async () => {
    if (!userId) return;
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('nutrition_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();
    if (!error && data) {
      setNutrition(data);
      setForm({
        calories_target: data.calories_target || '',
        water_target: data.water_target || '',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) fetchNutrition();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    await supabase.from('nutrition_logs').upsert({
      user_id: userId,
      date: today,
      calories_target: Number(form.calories_target),
      water_target: Number(form.water_target),
    });
    setShowForm(false);
    fetchNutrition();
    setLoading(false);
  };

  const calculateEnergyPercentage = (dailyCalories, recommendedCalories) => {
    return ((dailyCalories / recommendedCalories) * 100).toFixed(2);
  };

  return (
    <div className="relative bg-white border rounded-xl p-6 shadow-sm mb-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Objectifs nutritionnels</h3>
        <button
          className="absolute top-4 right-4 z-10 text-gray-500 hover:bg-gray-100 rounded-full p-2 transition"
          onClick={() => setShowForm((v) => !v)}
          aria-label="Modifier les objectifs"
        >
          <span role="img" aria-label="modifier">⚙️</span>
        </button>
      </div>
      {!showForm && (
        <div className="space-y-2">
          <div>
            <span className="font-medium text-gray-700">Calories&nbsp;:</span>
            <span className="ml-2 text-gray-900">{nutrition?.calories_target || '—'} kcal</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Eau&nbsp;:</span>
            <span className="ml-2 text-gray-900">{nutrition?.water_target || '—'} ml</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Énergie&nbsp;:</span>
            <span className="ml-2 text-gray-900">
              {calculateEnergyPercentage(nutrition?.calories_target, 2000)}%
            </span>
          </div>
        </div>
      )}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-2 animate-fade-in"
        >
          <label className="flex flex-col text-left">
            <span className="text-gray-700 font-medium mb-1">Objectif calories (kcal)</span>
            <input
              type="number"
              className="border rounded px-3 py-2"
              value={form.calories_target}
              onChange={e => setForm(f => ({ ...f, calories_target: e.target.value }))}
              min={0}
              required
            />
          </label>
          <label className="flex flex-col text-left">
            <span className="text-gray-700 font-medium mb-1">Objectif eau (ml)</span>
            <input
              type="number"
              className="border rounded px-3 py-2"
              value={form.water_target}
              onChange={e => setForm(f => ({ ...f, water_target: e.target.value }))}
              min={0}
              required
            />
          </label>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1"
              disabled={loading}
            >
              Enregistrer
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition flex-1"
              onClick={() => setShowForm(false)}
              disabled={loading}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
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

export default NutritionPanel;