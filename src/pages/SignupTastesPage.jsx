import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasteItems, addUserTaste } from "../services/api";

function SignupTastesPage() {
  const [groupedTastes, setGroupedTastes] = useState({});
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasteItems()
      .then((data) => {
        const flattenedTastes = data[0]?.tasteItems || [];

        const grouped = flattenedTastes.reduce((acc, taste) => {
          if (!acc[taste.type]) {
            acc[taste.type] = [];
          }
          acc[taste.type].push(taste);
          return acc;
        }, {});

        setGroupedTastes(grouped);
      })
      .catch((err) => {
        console.error("FAILED TO FETCH TASTES", err);
      });
  }, []);

  const toggleTaste = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    try {
      for (const tasteId of selected) {
        await addUserTaste(tasteId);
      }
      navigate("/discover");
    } catch {
      alert("Failed to save tastes");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1>Select your tastes</h1>
        <p className="signup-subtitle">
          Pick what you actually enjoy — this drives your matches
        </p>

        <div className="taste-groups">
          {Object.entries(groupedTastes).map(([type, items]) => (
            <div key={type} className="taste-group">
              <h3 className="taste-group-title">
                {type === "movie" && "Movies"}
                {type === "show" && "TV Shows"}
                {type === "game" && "Games"}
                {type === "artist" && "Music"}
              </h3>

              <div className="taste-grid">
                {items.map((taste) => (
                  <button
                    key={taste._id}
                    className={
                      selected.includes(taste._id)
                        ? "taste selected"
                        : "taste"
                    }
                    onClick={() => toggleTaste(taste._id)}
                  >
                    {taste.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="primary" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SignupTastesPage;
