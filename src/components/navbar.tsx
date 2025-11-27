import Link from "next/link";
import ThemeSwitch from "./theme-switch";

const Navbar = () => {
  const liClass = "hover:text-primary transition-color duration-300"
  const navItems = [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Menu',
      url: '/#menu'
    },
    {
      name: 'Crew',
      url: '/#crew'
    },
    {
      name: 'Vibe',
      url: '/#vibe'
    },
    {
      name: 'Location',
      url: '/#location'
    },
  ]
  return (
    <nav className="bg-background border-border fixed z-50 flex w-full justify-center border-b py-4">
      <div className="container flex justify-between items-center font-mono px-5">
        <div className="text-primary text-2xl font-extrabold">
          <h1>BERGAS</h1>
        </div>
        <div className="text-lg font-medium flex items-center gap-6">
          <ul className="hidden md:flex gap-5 ">
            {
              navItems.map(({name, url}) => (
                <li key={name} className={liClass}>
                  <Link href={url}>{name}</Link>
                </li>
              ))
            }
          </ul>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
