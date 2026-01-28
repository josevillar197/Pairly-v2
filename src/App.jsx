import { Routes, Route, useLocation } from "react-router-dom";
import { SignupProvider } from "./context/SignupContext";


import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SignupTastesPage from "./pages/SignupTastesPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import MatchesPage from "./pages/MatchesPage";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ProfilePage from "./pages/ProfilePage";
import UsersDetailsPage from "./pages/UsersDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupTasteStepPage from "./pages/SignupTasteStepPage";
import SignupProfilePage from "./pages/SignupProfilePage";
import LikedPage from "./pages/LikedPage";
import EditTastesPage from "./pages/EditTastesPage";



import BottomNav from "./components/BottomNav";


function App() {
  const location = useLocation();

  const hideNav =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/signup/tastes";

  return (
    <SignupProvider>
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/tastes" element={<SignupTastesPage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/chats/:id" element={<ChatRoomPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users/:id" element={<UsersDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup/tastes/movie" element={<SignupTasteStepPage />} />
        <Route path="/signup/tastes/show" element={<SignupTasteStepPage />} />
        <Route path="/signup/tastes/game" element={<SignupTasteStepPage />} />
        <Route path="/signup/tastes/artist" element={<SignupTasteStepPage />} />
        <Route path="/signup/profile" element={<SignupProfilePage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/profile/tastes" element={<EditTastesPage />} />



      </Routes>

      {!hideNav && <BottomNav />}
    </div>
    </SignupProvider>
  );
}

export default App;
