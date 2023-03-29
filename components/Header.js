import Link from 'next/link';

function Header() {
  return (
    <header>
      <nav>
        <img />
        <Link href="/">Home</Link>
        <Link href="/about-us">About</Link>
        <Link href="/events">Events</Link>
      </nav>
    </header>
  );
}

export default Header;