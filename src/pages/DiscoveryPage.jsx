import { useEffect, useState } from "react";
import {
  getDiscoverUsers,
  getSentLikes,
  getMyMatches,
  likeUser,
} from "../services/api";

function DiscoveryPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔔 match alert
  const [matchAlert, setMatchAlert] = useState(null);

  // =========================
  // LOAD DISCOVER USERS
  // =========================
  useEffect(() => {
    Promise.all([
      getDiscoverUsers(),
      getSentLikes(),
      getMyMatches(),
    ])
      .then(([discoverUsers, sentLikes, matches]) => {
        const likedIds = sentLikes.map((l) => l.toUser);
        const matchedIds = matches.map((m) => m.otherUser._id);

        const excludedIds = [...likedIds, ...matchedIds];

        const filteredUsers = discoverUsers.filter(
          (u) => !excludedIds.includes(u._id)
        );

        setUsers(filteredUsers);
      })
      .catch((err) => {
        console.error("DISCOVER LOAD ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================
  // AUTO HIDE MATCH ALERT
  // =========================
  useEffect(() => {
    if (!matchAlert) return;

    const timer = setTimeout(() => {
      setMatchAlert(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [matchAlert]);

  // =========================
  // LIKE USER
  // =========================
  const handleLike = async (user) => {
    try {
      const res = await likeUser(user._id);

      // ✅ THIS NOW MATCHES YOUR BACKEND
      if (res.match === true) {
        setMatchAlert({
          name: user.name,
          image: user.image,
        });
      }

      // remove user from discover
      setUsers((prev) =>
        prev.filter((u) => u._id !== user._id)
      );
    } catch (err) {
      alert("Failed to like user");
    }
  };

  if (loading) {
    return (
      <div className="page discover-page">
        <h1>Discover</h1>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="page discover-page">
      <h1>Discover</h1>

      {/* 🔔 MATCH ALERT */}
      {matchAlert && (
        <div className="match-alert">
          <img src={matchAlert.image} alt="" />
          <span>
            You matched with {matchAlert.name} 💜
          </span>
        </div>
      )}

      <div className="card-list">
        {users.length === 0 && <p>No users to discover yet.</p>}

        {users.map((user) => (
          <div key={user._id} className="card discover-card">
            <img
              src={user.image}
              alt={user.name}
              className="discover-avatar"
            />

            <div className="discover-info">
              <h3>
                {user.name}
                {user.age && (
                  <span className="discover-age">
                    {" "}
                    · {user.age}
                  </span>
                )}
              </h3>

              {user.bio && (
                <p className="discover-bio">{user.bio}</p>
              )}

              <div style={{ marginTop: "12px" }}>
                <button
                  onClick={() => handleLike(user)}
                  style={{
                    fontSize: "22px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "12px",
                  }}
                >
                  ❤️
                </button>

                <button
                  onClick={() =>
                    setUsers((prev) =>
                      prev.filter((u) => u._id !== user._id)
                    )
                  }
                  style={{
                    fontSize: "22px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoveryPage;
