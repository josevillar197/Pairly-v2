import {useContext, useState, useEffect} from 'react';
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";


function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US");
}

function ProfilePage() {
  const {user, isLoading: authLoading} = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    const loadProfile = async () => {
      setError("");
      setLoading(true);

      try {
        const res = await api.get("/api/auth/verify");
        setProfile(res.data);
      } catch (err) {
        setError("You can`t loading your profile.See the token.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [authLoading]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (!user) return <p>You are not log in</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!profile) return <p>No data on the profile</p>;

  const fullName = [profile.firstName, profile.name].filter(Boolean).join(" ");

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {fullName || profile.name || "-"}</p>
        <p><strong>Email:</strong> {profile.email || "-"}</p>
        <p><strong>Birthdate:</strong> {formatDate(profile.birthDate)}</p>
        <p><strong>Age:</strong> {profile.age ?? "-"}</p>
        <p><strong>Gender:</strong> {profile.gender || "-"}</p>
      </div>
    </div>
  );
}

export default ProfilePage;