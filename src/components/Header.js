import logoAroundTheUs from "../images/logo_around-the-us.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        src={logoAroundTheUs}
        alt="Around The US logo"
        className="header__logo"
      />
    </header>
  );
}
