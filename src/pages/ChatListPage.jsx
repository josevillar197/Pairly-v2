import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function ChatListPage() {
  const { user, isLoading: authLoading } = useContext(AuthContext);

  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    const loadLikes = async () => {
      setError("");
      setLoading(true);

      try {
        const res = await api.get("/api/chats");
        setLikes(res.data);
      } catch (err) {
        console.log(err);
        setLikes([]);
        setError("");
      } finally {
        setLoading(false);
      }
    };

    if (user) loadLikes();
    else setLoading(false);
  }, [authLoading, user]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in</p>;

  return (
    <div>
      <h1>Chats</h1>

      {chats.length === 0 ? (
        <div>
          <p>No chats yet.</p>
          <Link to="/DiscoveryPage">
            <button>Go to Discovery</button>
          </Link>
        </div>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>
              <Link to={`/chats/${chat._id}`}>
                <p><strong>Open chat</strong></p>
                <p>{chat.lastMessage || "Say hi.."}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatListPage;
