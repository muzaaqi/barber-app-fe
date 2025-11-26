import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-border flex justify-center fixed py-4">
      <div className="flex justify-between container">
        <div className="text-primary text-2xl font-extrabold">
          <h1>BERGAS</h1>
        </div>
        <div className="text-lg font-medium">
          <ul className="flex gap-5">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/crew">Crew</Link></li>
            <li><Link href="/vibe">Vibe</Link></li>
            <li><Link href="/location">Location</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;