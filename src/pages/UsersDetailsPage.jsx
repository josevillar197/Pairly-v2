import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CATEGORY_EMOJI = {
  movie: "🎬",
  show: "📺",
  game: "🎮",
  artist: "🎵",
};

function UsersDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tastes, setTastes] = useState([]);
  const [myTastes, setMyTastes] = useState([]);
  const [isMatch, setIsMatch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    Promise.all([
      fetch(`http://localhost:5005/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),

      fetch(`http://localhost:5005/api/users/${id}/tastes`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),

      fetch(`http://localhost:5005/api/user-tastes`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),

      fetch(`http://localhost:5005/api/matches/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    ])
      .then(([userData, theirTastes, myTastesData, matches]) => {
        setUser(userData);
        setTastes(theirTastes);
        setMyTastes(myTastesData);

        const matched = matches.some((m) =>
          m.users.includes(userData._id)
        );
        setIsMatch(matched);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page">Loading…</div>;
  if (!user) return <div className="page">User not found</div>;

  const myTasteIds = myTastes.map((t) => t.tasteItem._id);

  const groupedTastes = tastes.reduce((acc, t) => {
    const category = t.tasteItem.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(t.tasteItem);
    return acc;
  }, {});

  return (
    <div className="page user-details-page">
      <div className="user-details-layout">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="user-details-header">
          <img
            src={user.image}
            alt={user.name}
            className="user-details-avatar"
          />

          <h1>
            {user.name}
            <span className="user-age"> · {user.age}</span>
          </h1>

          {isMatch && <span className="match-badge">💜 Match</span>}

          {user.bio && <p className="user-bio">{user.bio}</p>}
        </div>

        <div className="user-tastes-section">
          <h2 className="user-tastes-title">Tastes</h2>

          {Object.entries(groupedTastes).map(([category, items]) => (
            <div key={category} className="taste-category">
              <div className="taste-category-title">
                {CATEGORY_EMOJI[category]} {category.toUpperCase()}
              </div>

              <div className="taste-pill-list">
                {items.map((item) => (
                  <span
                    key={item._id}
                    className={`taste-pill ${
                      myTasteIds.includes(item._id) ? "shared" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersDetailsPage;
