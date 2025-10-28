import { Users, Clock } from "lucide-react";

export default function Header({ activeView, onChangeView }) {
  const tabs = [
    { id: "guest", label: "Guest", icon: Users },
    { id: "owner", label: "Owner", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">WL</div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">WaitList Manager</h1>
            <p className="text-xs text-gray-500">Streamlined seating for restaurants</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeView === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChangeView(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
