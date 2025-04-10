import { useEffect, useState } from "react";
import "./App.css";
import leaderboardLogo from "/leaderboard.png";

// Defineerin liidese, mille abil määratlen leaderboardi entry andmetüübid
interface LeaderboardEntry {
  id: string;
  fullName: string;
  country: string;
  totalBets: number;
  winPercentage: number;
  profit: number;
}

function App() {
  // State leaderboardi andmete hoidmiseks
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  // State, kuhu salvestatakse kasutaja reaalajas sisestatud riik
  const [countryInput, setCountryInput] = useState<string>('all');
  // State, mida kasutatakse tegeliku päringu käivitamiseks (debounce tulemus)
  const [country, setCountry] = useState<string>('all');
  // Laadimisoleku state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Funktsioon, mis teeb fetch-päringu backendilt leaderboardi andmete toomiseks
  async function fetchLeaderboard(countryFilter: string) {
    try {
      setIsLoading(true); // Alustan laadimise
      const response = await fetch(`http://localhost:3000/leaderboard?country=${countryFilter}`);
      const data = await response.json();
      setEntries(data); // Seadistan saadud andmed state'i
    } catch (error) {
      console.error("Viga leaderboard andmete laadimisel:", error);
      setEntries([]); // Kui tekib viga, seadistan tühja massiivi
    } finally {
      setIsLoading(false); // Lõpetan laadimise
    }
  }

  // Debounce loogika: oota 500ms enne kui uuendan päringuks vajalikku riigi state'i
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCountry(countryInput);
    }, 500); // 500 ms viivitus
    return () => clearTimeout(delayDebounce); // Tühjenda eelmine timeout kui kasutaja jätkab tippimist
  }, [countryInput]);

  // Kui 'country' state muutub, käivitan fetchLeaderboard funktsiooni
  useEffect(() => {
    fetchLeaderboard(country);
  }, [country]);

  // Kui andmeid laaditakse, kuvan laadimisoleku teate
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Laen leaderboard andmeid...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Päise osa: logo ja pealkiri */}
      <div className="header">
        <img src={leaderboardLogo} className="logo" alt="Leaderboard logo" />
        <h1>Betting Leaderboard</h1>
      </div>

      {/* Filtreerimise ala: kasutaja saab sisestada riigi nime */}
      <div className="filter-container">
        <div className="search-box">
          <label htmlFor="countryFilter">Filter by Country:</label>
          <input
            id="countryFilter"
            type="text"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            placeholder="Enter country or 'all'"
          />
        </div>
      </div>

      {/* Kui leaderboard andmed on saadaval, kuvan tabeli; muidu teade andmete puudumisest */}
      {entries.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>FULL NAME</th>
                <th>COUNTRY</th>
                <th>TOTAL BETS</th>
                <th>WIN PERCENTAGE</th>
                <th>PROFIT</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                // Kui kasum on suurem kui 200, lisatakse sellele rea stiiliks "high-profit"
                <tr key={entry.id} className={entry.profit > 200 ? "high-profit" : ""}>
                  <td>{entry.fullName}</td>
                  <td>{entry.country}</td>
                  <td>{entry.totalBets}</td>
                  <td>{entry.winPercentage.toFixed(2)}%</td>
                  <td className={entry.profit > 0 ? "profit-positive" : "profit-negative"}>
                    € {entry.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data">Ühtegi leaderboard andmeid pole selle filtri jaoks.</div>
      )}
    </div>
  );
}

export default App;
