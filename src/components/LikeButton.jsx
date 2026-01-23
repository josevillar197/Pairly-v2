function LikeButton({ onLike }) {
  return (
    <button className="like-button" onClick={onLike}>
      ❤️ Like
    </button>
  );
}

export default LikeButton;
