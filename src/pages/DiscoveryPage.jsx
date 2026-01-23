import MatchCard from "../components/MatchCard";
import FilterBar from "../components/FilterBar";

function DiscoveryPage() {
  return (
    <div className="page discover-page">
      <FilterBar />

      <div className="discover-feed">
        <MatchCard />
      </div>
    </div>
  );
}

export default DiscoveryPage;
