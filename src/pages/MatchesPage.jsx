import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyMatches } from "../services/api";

function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyMatches()
      .then(setMatches)
      .catch((err) => {
        console.error("MATCHES LOAD ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

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
          <div
            key={match._id}
            className="card discover-card"
            onClick={() =>
              navigate(`/users/${match.otherUser._id}`)
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={match.otherUser.image}
              alt={match.otherUser.name}
              className="discover-avatar"
            />

            <div className="discover-info">
              <h3>
                {match.otherUser.name}
                {match.otherUser.age && (
                  <span className="discover-age">
                    {" "}
                    · {match.otherUser.age}
                  </span>
                )}
              </h3>

              {match.otherUser.bio && (
                <p className="discover-bio">
                  {match.otherUser.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchesPage;
