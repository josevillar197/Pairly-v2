import { useEffect, useState } from "react";
import { addUserTaste } from "../services/api";
import { getTasteItems } from "../services/api";
import FilterBar from "../components/FilterBar";

function DiscoveryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTasteItems()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLike = (id) => {
    addUserTaste(id)
      .then(() => {
        setItems((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="page discover-page">
      <h1>Discover</h1>
      <FilterBar />

      <div className="card-list">
        {items.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.name}</h3>
            <p>{item.category}</p>

            <button onClick={() => handleLike(item._id)}>
              Like
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoveryPage;
