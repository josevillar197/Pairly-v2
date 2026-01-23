import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/discover">Discover</Link>
      <Link to="/matches">Matches</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default BottomNav;
