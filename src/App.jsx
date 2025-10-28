import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import GuestJoin from "./components/GuestJoin.jsx";
import GuestStatus from "./components/GuestStatus.jsx";
import OwnerDashboard from "./components/OwnerDashboard.jsx";
import { Clock } from "lucide-react";

function App() {
  const [activeView, setActiveView] = useState("guest");
  const [waitlist, setWaitlist] = useState(() => {
    try {
      const raw = localStorage.getItem("waitlist:data");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [averageWaitPerParty, setAverageWaitPerParty] = useState(() => {
    const v = Number(localStorage.getItem("waitlist:avg"));
    return Number.isFinite(v) && v > 0 ? v : 10;
  });

  useEffect(() => {
    localStorage.setItem("waitlist:data", JSON.stringify(waitlist));
  }, [waitlist]);

  useEffect(() => {
    localStorage.setItem("waitlist:avg", String(averageWaitPerParty));
  }, [averageWaitPerParty]);

  const addToWaitlist = (data) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const joinedAt = new Date().toISOString();
    setWaitlist((prev) => [...prev, { id, joinedAt, status: "waiting", ...data }]);
    setActiveView("guest");
  };

  const stats = useMemo(() => {
    const count = waitlist.length;
    const nextEta = count > 0 ? 0 : 0;
    const etaForNewParty = count * averageWaitPerParty;
    return { count, etaForNewParty };
  }, [waitlist, averageWaitPerParty]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Header activeView={activeView} onChangeView={setActiveView} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeView === "guest" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GuestJoin onJoin={addToWaitlist} />
              <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current queue</p>
                  <p className="text-2xl font-semibold">{stats.count} party{stats.count === 1 ? "" : "ies"}</p>
                </div>
                <div className="flex items-center gap-2 text-indigo-700">
                  <Clock size={18} />
                  <p className="text-sm">New party wait ~ {stats.etaForNewParty} min</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <GuestStatus waitlist={waitlist} averageWaitPerParty={averageWaitPerParty} />
            </div>
          </div>
        ) : (
          <OwnerDashboard
            waitlist={waitlist}
            setWaitlist={setWaitlist}
            averageWaitPerParty={averageWaitPerParty}
            setAverageWaitPerParty={setAverageWaitPerParty}
          />
        )}
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        Built for restaurants to keep guests happy and hosts in control.
      </footer>
    </div>
  );
}

export default App;
