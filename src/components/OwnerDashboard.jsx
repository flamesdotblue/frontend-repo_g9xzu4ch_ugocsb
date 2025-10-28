import { useMemo, useState } from "react";
import { Clock, Check, Trash2, ArrowUp, Users } from "lucide-react";

export default function OwnerDashboard({ waitlist, setWaitlist, averageWaitPerParty, setAverageWaitPerParty }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return waitlist;
    return waitlist.filter((w) =>
      [w.name, w.phone, String(w.size)].some((f) => String(f).toLowerCase().includes(q))
    );
  }, [search, waitlist]);

  const seat = (id) => {
    setWaitlist((prev) => prev.filter((w) => w.id !== id));
  };

  const remove = (id) => {
    setWaitlist((prev) => prev.filter((w) => w.id !== id));
  };

  const prioritize = (id) => {
    setWaitlist((prev) => {
      const idx = prev.findIndex((w) => w.id === id);
      if (idx <= 0) return prev; // already first or not found
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.unshift(item);
      return copy;
    });
  };

  const clearAll = () => {
    if (waitlist.length === 0) return;
    if (confirm("Clear entire waitlist?")) setWaitlist([]);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold">Owner dashboard</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 bg-white">
            <Clock size={16} className="text-gray-500" />
            <input
              type="number"
              min={1}
              className="w-20 outline-none"
              value={averageWaitPerParty}
              onChange={(e) => setAverageWaitPerParty(Math.max(1, Number(e.target.value)))}
            />
            <span className="text-sm text-gray-600">min per party</span>
          </div>
          <button
            onClick={clearAll}
            className="text-sm text-gray-600 hover:text-red-600 px-3 py-2 border border-gray-200 rounded-lg"
          >
            Clear list
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, party size"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <ul className="mt-4 divide-y divide-gray-200">
        {filtered.length === 0 && (
          <li className="py-10 text-center text-sm text-gray-500">No guests in the queue.</li>
        )}
        {filtered.map((w, i) => (
          <li key={w.id} className="py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-10">#{i + 1}</span>
                <p className="font-medium truncate">{w.name}</p>
              </div>
              <div className="ml-12 text-xs text-gray-500 truncate">
                <span className="inline-flex items-center gap-1 mr-3"><Users size={14} /> {w.size}</span>
                <span>{w.phone}</span>
                <span className="mx-2">•</span>
                <span>~{i * averageWaitPerParty} min</span>
                {w.notes && <span className="ml-2 italic text-gray-600">({w.notes})</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => prioritize(w.id)}
                className="inline-flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                title="Move to top"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => seat(w.id)}
                className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                title="Seat"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => remove(w.id)}
                className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
