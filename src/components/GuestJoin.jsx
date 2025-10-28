import { useState } from "react";
import { Plus } from "lucide-react";

export default function GuestJoin({ onJoin }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(2);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onJoin({ name: name.trim(), size: Number(size), phone: phone.trim(), notes: notes.trim() });
    setName("");
    setSize(2);
    setPhone("");
    setNotes("");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Join the waitlist</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Party size</label>
            <input
              type="number"
              min={1}
              max={20}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-1234"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes (optional)</label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="High chair, allergy, etc."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} /> Join list
        </button>
      </form>
    </div>
  );
}
