import { useEffect, useState } from "react";
import {
  getDiscoverUsers,
  getSentLikes,
  likeUser,
} from "../services/api";

function DiscoveryPage() {
  const [users, setUsers] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDiscoverUsers(), getSentLikes()])
      .then(([discoverUsers, sentLikes]) => {
        const likedUserIds = sentLikes.map((like) => like.toUser);
        setLikedIds(likedUserIds);

        const filtered = discoverUsers.filter(
          (u) => !likedUserIds.includes(u._id)
        );

        setUsers(filtered);
      })
      .catch((err) => {
        console.error("DISCOVER LOAD ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLike = async (userId) => {
    try {
      await likeUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setLikedIds((prev) => [...prev, userId]);
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
                  <span className="discover-age"> · {user.age}</span>
                )}
              </h3>

              {user.bio && (
                <p className="discover-bio">{user.bio}</p>
              )}

              <button
                onClick={() => handleLike(user._id)}
                style={{
                  marginTop: "12px",
                  fontSize: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoveryPage;
