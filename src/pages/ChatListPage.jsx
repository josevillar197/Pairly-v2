import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getChats } from "../services/api";

function ChatListPage() {
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    getChats()
      .then((data) => {
        setChats(data);
      })
      .catch(() => {
        setChats([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authLoading, user]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in</p>;

  return (
    <div className="page">
      <h1>Chats</h1>

      {chats.length === 0 ? (
        <div>
          <p>No chats yet.</p>
          <Link to="/discover">
            <button>Go to Discovery</button>
          </Link>
        </div>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>
              <Link to={`/chats/${chat._id}`}>
                <strong>Open chat</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatListPage;
