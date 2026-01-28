import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasteItems,
  getUserTastes,
  addUserTaste,
  removeUserTaste
} from "../services/api";

const CATEGORIES = ["movie", "show", "game", "artist"];

function EditTastesPage() {
  const navigate = useNavigate();

  const [allTastes, setAllTastes] = useState([]);
  const [userTasteIds, setUserTasteIds] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getTasteItems(), getUserTastes()])
      .then(([items, userTastes]) => {
        setAllTastes(items);
        setUserTasteIds(userTastes.map(t => t.tasteItem._id));
      });
  }, []);

  const toggleTaste = (tasteId) => {
    setUserTasteIds(prev =>
      prev.includes(tasteId)
        ? prev.filter(id => id !== tasteId)
        : [...prev, tasteId]
    );
  };

  const handleSave = async () => {
    setSaving(true);

    const current = await getUserTastes();
    const currentIds = current.map(t => t.tasteItem._id);

    const toAdd = userTasteIds.filter(id => !currentIds.includes(id));
    const toRemove = current.filter(t => !userTasteIds.includes(t.tasteItem._id));

    for (const id of toAdd) await addUserTaste(id);
    for (const t of toRemove) await removeUserTaste(t._id);

    setSaving(false);
    navigate("/profile");
  };

  return (
    <div className="page edit-tastes-page">
      <h1>Edit your tastes</h1>

      {CATEGORIES.map(cat => (
        <div key={cat} className="taste-category">
          <div className="taste-category-title">
            {cat.toUpperCase()}
          </div>

          <div className="taste-pill-list">
            {allTastes
              .filter(t => t.category === cat)
              .map(t => (
                <button
                  key={t._id}
                  className={`taste-pill ${
                    userTasteIds.includes(t._id) ? "selected" : ""
                  }`}
                  onClick={() => toggleTaste(t._id)}
                >
                  {t.name}
                </button>
              ))}
          </div>
        </div>
      ))}

      <button
        className="profile-save-btn"
        disabled={saving}
        onClick={handleSave}
      >
        {saving ? "Saving..." : "Save tastes"}
      </button>
    </div>
  );
}

export default EditTastesPage;
