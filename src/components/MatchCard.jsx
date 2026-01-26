import LikeButton from "./LikeButton";

function MatchCard({ tasteItem, isLiked, onLike, onUnlike }) {
  return (
    <div className="match-card">
      <h3>{tasteItem.name}</h3>
      <p>{tasteItem.category}</p>

      {isLiked ? (
        <button onClick={onUnlike}>💔 Unlike</button>
      ) : (
        <LikeButton onLike={onLike} />
      )}
    </div>
  );
}

export default MatchCard;
