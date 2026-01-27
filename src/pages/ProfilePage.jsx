import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserTastes, updateUserProfile } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [tastes, setTastes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { authenticateUser } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);




useEffect(() => {
  fetch("http://localhost:5005/api/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("PROFILE API RESPONSE:", data);
      setProfile(data);
    });

  getUserTastes().then(setTastes);
}, []);


  if (!profile) {
    return <div className="page">Loading profile…</div>;
  }

  const groupedTastes = tastes.reduce((acc, t) => {
    const category = t.tasteItem.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(t.tasteItem.name);
    return acc;
  }, {});

  return (
    <div className="page profile-page">
      {/* HEADER */}
      <div className="profile-top-bar">
        <h1>Profile</h1>

        <div className="profile-menu-wrapper">
          <button
            className="profile-menu-btn"
            onClick={() => setMenuOpen((p) => !p)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="profile-menu-dropdown">
              <button onClick={() => navigate("/signup/profile")}>
                Settings
              </button>
              <button
                className="danger"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  navigate("/");
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PROFILE FORM */}
      <div className="profile-form-layout">
        <div className="profile-avatar-column">
          <img
            src={profile.image}
            alt={profile.name}
            className="profile-avatar"
          />
        </div>

        <div className="profile-fields-column">
          <label>
            Name
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
          </label>

          <label>
            Email
            <input value={profile.email} disabled />
          </label>

          <label>
            Age
            <input
              type="number"
              value={profile.age || ""}
              onChange={(e) =>
                setProfile({ ...profile, age: e.target.value })
              }
            />
          </label>
        </div>
      </div>

      {/* BIO */}
      <label className="profile-bio-label">
        Bio
        <textarea
          value={profile.bio || ""}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
        />
      </label>

      {/* TASTES */}
      <div className="profile-tastes">
        <h2>Your tastes</h2>

        {Object.entries(groupedTastes).map(([cat, items]) => (
          <div key={cat} className="taste-category">
            <div className="taste-category-title">
              {cat.toUpperCase()}
            </div>

            <div className="taste-pill-list">
              {items.map((t, i) => (
                <span key={i} className="taste-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

     <button
  className="profile-save-btn"
  disabled={saving}
  onClick={async () => {
    try {
      setSaving(true);

      await updateUserProfile({
        age: profile.age,
        bio: profile.bio,
        image: profile.image,
      });
      setSaved(true);
setTimeout(() => setSaved(false), 2000);


      await authenticateUser();

    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }}
  
>
  {saving ? "Saving..." : "Save changes"}
</button>
{saved && <p className="profile-saved">✓ Saved</p>}


    </div>
  );
}

export default ProfilePage;
