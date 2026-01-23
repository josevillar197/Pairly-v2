import { useState } from "react";
import MatchCard from "../components/MatchCard";
import LikeButton from "../components/LikeButton";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";

function DiscoveryPage() {
  const users = [
    { id: 1, name: "Alex", tastes: ["Movies", "Gaming"] },
    { id: 2, name: "Jamie", tastes: ["Shows", "Indie Games"] },
  ];

  const [index, setIndex] = useState(0);
  const currentUser = users[index];

  return (
    <div className="page discover-page">
      <h1>Discover</h1>

      <FilterBar />

      {currentUser ? (
        <>
          <MatchCard user={currentUser} />
          <LikeButton onLike={() => setIndex(index + 1)} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default DiscoveryPage;
