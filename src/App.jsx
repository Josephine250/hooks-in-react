import { useRef, useEffect, useState } from "react";
import {
  useToggle,
  useDebounce,
  useDocumentTitle,
  useLocalStorage,
  useWindowSize,
  useOnlineStatus,
  useKeyPress,
  useClickOutside,
} from "./hooks";

function Card({ title, hook, children }) {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mb-4 font-mono text-sm text-slate-600">{hook}</p>
      {children}
    </section>
  );
}

function ToggleDemo() {
  const [on, toggle] = useToggle(false);
  return (
    <Card title="Toggle" hook="useToggle(false)">
      <button
        onClick={toggle}
        aria-pressed={on}
        className={`rounded-md px-4 py-2 font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-700 ${
          on ? "bg-teal-700" : "bg-slate-600"
        }`}
      >
        {on ? "ON" : "OFF"}
      </button>
    </Card>
  );
}

function DebounceDemo() {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 600);
  return (
    <Card title="Live vs debounced input" hook="useDebounce(text, 600)">
      <label className="block text-sm text-slate-700" htmlFor="debounce">
        Type quickly
      </label>
      <input
        id="debounce"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-400 px-3 py-2"
      />
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 text-sm">
        <dt className="text-slate-600">Live</dt>
        <dd className="break-all font-medium">{text || "—"}</dd>
        <dt className="text-slate-600">Debounced</dt>
        <dd className="break-all font-medium">{debounced || "—"}</dd>
      </dl>
    </Card>
  );
}

function TitleAndStorageDemo() {
  const [name, setName] = useLocalStorage("toolkit:name", "");
  useDocumentTitle(name ? `Hi, ${name} | Hooks Toolkit` : "Hooks Toolkit");
  return (
    <>
      <Card title="Saved name" hook='useLocalStorage("toolkit:name", "")'>
        <label className="block text-sm text-slate-700" htmlFor="name">
          Your name (refresh the page to test)
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-400 px-3 py-2"
        />
        <p className="mt-3 text-sm">
          Saved: <strong>{name || "nothing yet"}</strong>
        </p>
      </Card>
      <Card title="Browser tab title" hook="useDocumentTitle(...)">
        <p className="text-sm text-slate-700">
          Look at the tab: it follows the saved name. Leaving the page restores
          the old title.
        </p>
        <p className="mt-2 rounded bg-slate-100 px-2 py-1 font-mono text-sm">
          {document.title}
        </p>
      </Card>
    </>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <Card title="Window size" hook="useWindowSize()">
      <p className="text-2xl font-semibold tabular-nums">
        {width} × {height}
      </p>
      <p className="mt-1 text-sm text-slate-600">Resize the window to watch it change.</p>
    </Card>
  );
}

function OnlineDemo() {
  const online = useOnlineStatus();
  return (
    <Card title="Connection" hook="useOnlineStatus()">
      <p
        role="status"
        className={`inline-block rounded-md px-3 py-1 font-medium ${
          online ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900"
        }`}
      >
        {online ? "Online" : "Offline"}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        DevTools → Network → set throttling to Offline.
      </p>
    </Card>
  );
}

function KeyDemo() {
  const space = useKeyPress(" ");
  const k = useKeyPress("k");
  return (
    <Card title="Key press / release" hook='useKeyPress(" ") and useKeyPress("k")'>
      <div className="flex gap-3">
        {[
          ["Space", space],
          ["K", k],
        ].map(([label, down]) => (
          <div
            key={label}
            className={`flex h-14 w-24 items-center justify-center rounded-md border-2 font-medium ${
              down
                ? "border-teal-700 bg-teal-700 text-white"
                : "border-slate-400 bg-white text-slate-800"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-600">Hold a key down, then release it.</p>
    </Card>
  );
}

function MenuDemo() {
  const [open, toggle, setOpen] = useToggle(false);
  const menuRef = useRef(null);
  const escape = useKeyPress("Escape");
  const [log, setLog] = useState("No clicks yet");

  useClickOutside(menuRef, () => {
    if (open) {
      setOpen(false);
      setLog("Clicked outside: menu closed");
    }
  });

  useEffect(() => {
    if (escape && open) setOpen(false);
  }, [escape, open, setOpen]);

  return (
    <Card title="Menu" hook="useClickOutside(menuRef, close)">
      <div ref={menuRef} className="relative inline-block">
        <button
          onClick={toggle}
          aria-expanded={open}
          className="rounded-md bg-slate-800 px-4 py-2 font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-700"
        >
          Menu
        </button>
        {open && (
          <ul className="absolute left-0 z-10 mt-1 w-44 rounded-md border border-slate-300 bg-white py-1 shadow-md">
            {["Profile", "Settings", "Sign out"].map((item) => (
              <li key={item}>
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => setLog(`Clicked inside: ${item}`)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-3 text-sm text-slate-700">{log}</p>
      <p className="text-sm text-slate-500">Escape also closes it.</p>
    </Card>
  );
}

export default function App() {
  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Hooks Toolkit</h1>
      <p className="mb-6 mt-1 text-slate-600">Eight custom Hooks, each in src/hooks.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <ToggleDemo />
        <DebounceDemo />
        <TitleAndStorageDemo />
        <WindowSizeDemo />
        <OnlineDemo />
        <KeyDemo />
        <MenuDemo />
      </div>
    </main>
  );
}