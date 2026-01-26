import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTasteItems } from "../services/api";
import { useSignup } from "../context/SignupContext";

const ORDER = ["movie", "show", "game", "artist"];

function SignupTasteStepPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { selectedTasteIds, toggleTaste, step, setStep } = useSignup();

  const [items, setItems] = useState([]);

  useEffect(() => {
    getTasteItems().then((data) => {
      const all = data[0]?.tasteItems || [];
      setItems(all.filter((t) => t.type === category));
    });
  }, [category]);

  const currentIndex = ORDER.indexOf(category);
  const isLast = currentIndex === ORDER.length - 1;

  const handleContinue = () => {
    if (!isLast) {
      setStep(step + 1);
      navigate(`/signup/tastes/${ORDER[currentIndex + 1]}`);
    } else {
      navigate("/signup/tastes/finish");
    }
  };

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
          Continue
        </button>
      </div>
    </div>
  );
}

export default SignupTasteStepPage;
