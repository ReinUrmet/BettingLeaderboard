import React, { useEffect, useState } from 'react';

interface LeaderboardEntry {
  id: string;
  fullName: string;
  country: string;
  totalBets: number;
  winPercentage: number;
  profit: number;
}

export default function Leaderboard() {
  // State to store the fetched leaderboard data
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  // State to keep track of the selected country filter (default "all")
  const [country, setCountry] = useState<string>('all');

  // Fetch leaderboard data every time the "country" filter changes
  useEffect(() => {
    fetch(`http://localhost:3000/leaderboard?country=${country}`)
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching leaderboard data:', error));
  }, [country]);

  // Handler for the filter input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <h2>Betting Leaderboard</h2>
      <div>
        <label htmlFor="countryFilter">Filter by Country:</label>
        <input
          id="countryFilter"
          type="text"
          value={country}
          onChange={handleFilterChange}
          placeholder="Enter country or 'all'"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Country</th>
            <th>Total Bets</th>
            <th>Win Percentage</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.fullName}</td>
              <td>{entry.country}</td>
              <td>{entry.totalBets}</td>
              <td>{entry.winPercentage.toFixed(2)}%</td>
              <td>€{entry.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
