import { useEffect, useState } from "react";

function LikedPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/api/user-likes/sent/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((likes) => {
        return Promise.all(
          likes.map((l) =>
            fetch(`http://localhost:5005/api/users/${l.toUser}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }).then((r) => r.json())
          )
        );
      })
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleDislike = async (userId) => {
    try {
      await fetch(
        `http://localhost:5005/api/user-likes/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert("Failed to remove like");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Liked</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Liked</h1>

      {users.length === 0 && <p>No likes yet.</p>}

      <div className="card-list">
        {users.map((user) => {
          if (!user) return null;

          return (
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

                <button
                  onClick={() => handleDislike(user._id)}
                  style={{
                    marginTop: "12px",
                    fontSize: "20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LikedPage;
