function MatchesPage() {
  const matches = [
    { id: 1, name: "Alex" },
    { id: 2, name: "Jamie" },
    { id: 3, name: "Taylor" },
  ];

  return (
    <div className="page matches-page">
      <h1 className="page-title">Matches</h1>

      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.id} className="match-row">
            <div className="match-avatar" />
            <span>{match.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchesPage;
