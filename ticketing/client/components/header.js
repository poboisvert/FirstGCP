import Link from "next/link";

const header = ({ currentUser }) => {
  // Hard Coded pages
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand" href="">
          BonnetHood
        </a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex aligne-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default header