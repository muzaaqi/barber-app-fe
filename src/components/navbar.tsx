import Link from "next/link";
import ThemeSwitch from "./theme-switch";

const Navbar = () => {
  return (
    <nav className="bg-background border-border fixed z-50 flex w-full justify-center border-b py-4">
      <div className="container flex justify-between items-center font-mono px-5">
        <div className="text-primary text-2xl font-extrabold">
          <h1>BERGAS</h1>
        </div>
        <div className="text-lg font-medium flex items-center gap-6">
          <ul className="hidden md:flex gap-5 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/crew">Crew</Link>
            </li>
            <li>
              <Link href="/vibe">Vibe</Link>
            </li>
            <li>
              <Link href="/location">Location</Link>
            </li>
          </ul>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
