import { useEffect, useState } from "react";
import { getDiscoverUsers } from "../services/api";

function DiscoveryPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiscoverUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error("DISCOVER USERS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        {users.length === 0 && (
          <p>No users to discover yet.</p>
        )}

        {users.map((user) => (
  <div key={user._id} className="card">
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
))}

      </div>
    </div>
  );
}

export default DiscoveryPage;
