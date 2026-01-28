import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTasteItems, addUserTaste, getUserTastes } from "../services/api";
import { useSignup } from "../context/SignupContext";

const ORDER = ["movie", "show", "game", "artist"];

function SignupTasteStepPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const {
    selectedTasteIds,
    toggleTaste,
    step,
    setStep,
    resetSignup,
  } = useSignup();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [existingTasteIds, setExistingTasteIds] = useState([]);


  useEffect(() => {
  setLoading(true);

  Promise.all([
    getTasteItems(),
    getUserTastes(),
  ])
    .then(([allTastes, userTastes]) => {
      setItems(allTastes.filter((t) => t.category === category));

      const ids = userTastes.map(
        (t) => t.tasteItem._id
      );
      setExistingTasteIds(ids);
    })
    .catch((err) => {
      console.error("Taste load failed:", err);
      setItems([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [category]);


  const currentIndex = ORDER.indexOf(category);
  const isLast = currentIndex === ORDER.length - 1;

  const handleContinue = async () => {
    if (!isLast) {
      setStep(step + 1);
      navigate(`/signup/tastes/${ORDER[currentIndex + 1]}`);
      return;
    }

    try {
      const newTasteIds = selectedTasteIds.filter(
  (id) => !existingTasteIds.includes(id)
);

for (const tasteId of newTasteIds) {
  await addUserTaste(tasteId);
}


      resetSignup();
      navigate("/discover");
    } catch (err) {
      alert("Failed to save tastes");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="signup-page">
      <div className="signup-content">
        <p className="signup-progress">
          Step {currentIndex + 1} of {ORDER.length}
        </p>

        <h1>
          {category === "movie" && "Movies"}
          {category === "show" && "TV Shows"}
          {category === "game" && "Games"}
          {category === "artist" && "Music"}
        </h1>

        <div className="taste-grid">
          {items.map((taste) => (
            <button
              key={taste._id}
              className={
                selectedTasteIds.includes(taste._id)
                  ? "taste selected"
                  : "taste"
              }
              onClick={() => toggleTaste(taste._id)}
            >
              {taste.name}
            </button>
          ))}
        </div>

        <button className="primary" onClick={handleContinue}>
          {isLast ? "Finish" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default SignupTasteStepPage;
