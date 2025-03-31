import leaderbordLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchCustomers } from "./requests";
import type { DatabaseCustomer } from "./types";

function App() {
  const [customers, setCustomers] = useState<DatabaseCustomer[]>([]);

  async function init() {
    setCustomers(await fetchCustomers());
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>
        <img src={leaderbordLogo} className="logo" alt="Leaderboard logo" />
      </div>
      <h1>Betting Leaderboard</h1>
      <p>Replace this list of customers with an actual leaderboard of customers...</p>
      <div>
      {customers.map(c => (
        <p>{c.first_name} {c.last_name}</p>
      ))}
      </div>
    </>
  );
}

export default App;
