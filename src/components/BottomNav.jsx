import { NavLink } from "react-router-dom";


function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/discover" className={({ isActive }) => isActive ? "active" : ""}>
        Discover
      </NavLink>

      <NavLink to="/matches" className={({ isActive }) => isActive ? "active" : ""}>
        Matches
      </NavLink>

      <NavLink to="/chats" className={({ isActive }) => isActive ? "active" : ""}>
        Chats
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
        Profile
      </NavLink>
    </nav>
  );
}

export default BottomNav;
