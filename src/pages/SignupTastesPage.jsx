import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasteItems, addUserTaste } from "../services/api";

function SignupTastesPage() {
  const [groupedTastes, setGroupedTastes] = useState({});
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTasteItems()
      .then((data) => {
        const tastes = data[0]?.tasteItems || [];

        const grouped = tastes.reduce((acc, taste) => {
          if (!acc[taste.type]) acc[taste.type] = [];
          acc[taste.type].push(taste);
          return acc;
        }, {});

        setGroupedTastes(grouped);
      })
      .catch(() => {
        alert("Failed to load tastes");
      });
  }, []);

  const toggleTaste = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) {
      alert("Select at least one taste");
      return;
    }

    setSaving(true);

    try {
      for (const tasteId of selected) {
        if (typeof tasteId !== "string") {
          throw new Error("Invalid taste id");
        }
        await addUserTaste(tasteId);
      }

      navigate("/discover");
    } catch (err) {
      console.error("SAVE TASTES ERROR:", err);
      alert("Failed to save tastes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1>Select your tastes</h1>
        <p className="signup-subtitle">
          Pick what you actually enjoy — this drives your matches
        </p>

        {Object.entries(groupedTastes).map(([type, tastes]) => (
          <div key={type} className="taste-category">
            <h2 className="taste-category-title">
              {type.toUpperCase()}
            </h2>

            <div className="taste-grid">
              {tastes.map((taste) => (
                <button
                  key={taste._id}
                  type="button"
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

        <button
          type="button"
          className="primary-button"
          onClick={handleContinue}
          disabled={saving}
        >
          {saving ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default SignupTastesPage;
