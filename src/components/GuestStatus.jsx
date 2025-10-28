import { useMemo, useState } from "react";
import { Clock } from "lucide-react";

export default function GuestStatus({ waitlist, averageWaitPerParty }) {
  const [phone, setPhone] = useState("");

  const entry = useMemo(() => {
    if (!phone.trim()) return null;
    const normalized = phone.replace(/\D/g, "");
    // Match by last 4 digits for convenience
    return (
      waitlist.find((w) => w.phone.replace(/\D/g, "").endsWith(normalized.slice(-4))) || null
    );
  }, [phone, waitlist]);

  const position = useMemo(() => {
    if (!entry) return null;
    const idx = waitlist.findIndex((w) => w.id === entry.id);
    return idx >= 0 ? idx + 1 : null;
  }, [entry, waitlist]);

  const etaMins = position ? (position - 1) * averageWaitPerParty : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Check your status</h2>
      <div className="grid gap-3">
        <label className="text-sm text-gray-600">Enter your phone number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search by phone"
        />
      </div>

      {entry ? (
        <div className="mt-6 rounded-lg bg-indigo-50 border border-indigo-100 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{entry.name}</p>
              <p className="text-sm text-gray-600">Party of {entry.size}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-white border border-indigo-100 text-indigo-700">Waiting</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-indigo-700">
            <Clock size={16} />
            <p className="text-sm">{position ? `Position #${position} • ~${etaMins} min` : "Calculating..."}</p>
          </div>
        </div>
      ) : (
        phone && (
          <p className="mt-4 text-sm text-gray-500">No matching entry found.</p>
        )
      )}
    </div>
  );
}
