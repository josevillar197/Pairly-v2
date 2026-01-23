import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import MatchesPage from "./pages/MatchesPage";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ProfilePage from "./pages/ProfilePage";
import UsersDetailsPage from "./pages/UsersDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import BottomNav from "./components/BottomNav";
import "./App.css";


function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/";

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chats/:id" element={<ChatRoomPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users/:id" element={<UsersDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </div>
  );
}

export default App;
