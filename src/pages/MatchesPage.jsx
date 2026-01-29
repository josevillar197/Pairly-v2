import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyMatches } from "../services/api";

function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyMatches()
      .then(setMatches)
      .catch((err) => {
        console.error("MATCHES LOAD ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUnmatch = async (userId) => {
    try {
     await fetch(
  `${import.meta.env.VITE_URL || "http://localhost:5005/api"}/user-likes/${userId}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  }
);


      setMatches((prev) =>
        prev.filter((m) => m.otherUser._id !== userId)
      );
    } catch {
      alert("Failed to unmatch");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Matches</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Matches</h1>

      {matches.length === 0 && <p>No matches yet.</p>}

      <div className="card-list">
        {matches.map((match) => (
          <div key={match._id} className="match-card-horizontal">
            
            <img
              src={match.otherUser.image}
              alt={match.otherUser.name}
              className="match-avatar-large"
              onClick={() => navigate(`/users/${match.otherUser._id}`)}
            />

            <div className="match-details">
              <h3>
                {match.otherUser.name}
                {match.otherUser.age && (
                  <span className="discover-age"> · {match.otherUser.age}</span>
                )}
              </h3>

              {match.otherUser.bio && (
                <p className="discover-bio">{match.otherUser.bio}</p>
              )}
            </div>

            <div className="match-menu">
              <button
                onClick={() =>
                  setMenuOpen(menuOpen === match._id ? null : match._id)
                }
                className="menu-btn"
              >
                ⋯
              </button>

              {menuOpen === match._id && (
                <div className="menu-dropdown">
                  <button
                    onClick={() =>
                      navigate(`/users/${match.otherUser._id}`)
                    }
                  >
                    View profile
                  </button>

                  <button disabled style={{ opacity: 0.4 }}>
                    Chat (soon)
                  </button>

                  <button
                    onClick={() => handleUnmatch(match.otherUser._id)}
                    className="danger"
                  >
                    Unmatch
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchesPage;
