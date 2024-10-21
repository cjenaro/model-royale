import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";

export default function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] dark:bg-slate-950">
      <header className="p-6 border-b-2 border-b-amber-700/50 flex justify-between">
        <Link
          to="/"
          className="skew-x-6 -skew-y-1 block w-fit bg-amber-700 text-white px-4 py-2  font-bold hover:text-white font-title hover:scale-105"
        >
          Model Royale
        </Link>

        <ThemeToggle />
      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="flex items-center justify-center p-8 border-t-2 border-t-amber-700/50">
        <p>
          made by <Link to="https://jenar.ooo">jenaro</Link>
        </p>
      </footer>
    </div>
  );
}
