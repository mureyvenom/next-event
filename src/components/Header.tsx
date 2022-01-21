import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Home</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link href="/events">Broswe All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
