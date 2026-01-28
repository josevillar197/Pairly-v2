import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../services/api";
import { AuthContext } from "../context/AuthContext";

function SignupProfilePage() {
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age) {
      alert("Age is required");
      return;
    }

    setSaving(true);

    try {
      await updateUserProfile({
        age: Number(age),
        bio,
        image,
      });

      await authenticateUser();
navigate("/discover");

    } catch (err) {
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content profile-step">
        <h1>Complete your profile</h1>

        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18"
            required
            className="profile-input"
          />

          <textarea
            placeholder="Short bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={300}
            className="profile-textarea"
          />

          <input
            type="text"
            placeholder="Profile image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="profile-input"
          />

          {image && (
            <img
              src={image}
              alt="Profile preview"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "12px",
              }}
            />
          )}

          <button
            type="submit"
            disabled={saving}
            className="profile-button"
          >
            {saving ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupProfilePage;
