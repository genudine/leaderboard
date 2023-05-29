import { activeWorlds, defunctWorlds, worldIdToName } from "./utils/worlds";
import * as styles from "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
import {
  LeaderboardEntry,
  LeaderboardName,
  LeaderboardPeriod,
  fetchLeaderboard,
} from "./utils/census";

function App() {
  const [world, setWorld] = useState<number>(-1);
  const [name, setName] = useState<LeaderboardName>("Kills");
  const [period, setPeriod] = useState<LeaderboardPeriod>("Forever");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(
    null
  );

  useEffect(() => {
    // Load world, period, and name from local storage if they exist
    const world = localStorage.getItem("world");
    if (world) {
      setWorld(Number(world));
    }
    const name = localStorage.getItem("name");
    if (name) {
      setName(name as LeaderboardName);
    }
    const period = localStorage.getItem("period");
    if (period) {
      setPeriod(period as LeaderboardPeriod);
    }

    // Load leaderboard from session storage if it exists
    const leaderboard = sessionStorage.getItem(`${world}-${name}-${period}`);
    if (leaderboard) {
      setLeaderboard(JSON.parse(leaderboard));
    }
  }, [world, name, period]);

  const saveState =
    (key: string, next: (a: unknown) => void) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      localStorage.setItem(key, event.target.value);
      next(event.target.value);
    };

  const loadLeaderboard = async () => {
    const leaderboard = await fetchLeaderboard(world, name, period, 100);
    setLeaderboard(leaderboard.leaderboard_list);
    sessionStorage.setItem(
      `${world}-${name}-${period}`,
      JSON.stringify(leaderboard.leaderboard_list)
    );
  };

  return (
    <>
      <header className={styles.header}>
        <form action="#" onSubmit={() => loadLeaderboard()}>
          <select
            value={world}
            onChange={saveState("world", (a) => setWorld(Number(a)))}
          >
            <option value="-1" disabled>
              === Worlds ===
            </option>
            <option value="-2" disabled>
              --- Active Worlds ---
            </option>
            {activeWorlds.map((world) => (
              <option key={world.id} value={world.id} disabled={world.noStats}>
                {world.name} [{world.region}] [{world.platform}] ({world.id})
              </option>
            ))}
            <option value="-3" disabled>
              --- Defunct Worlds ---
            </option>
            {defunctWorlds.map((world) => (
              <option key={world.id} value={world.id} disabled={world.noStats}>
                {world.name} [{world.region}] [{world.platform}] ({world.id})
              </option>
            ))}
          </select>
          <select
            value={name}
            onChange={saveState("name", (a) => setName(a as LeaderboardName))}
          >
            <option value="Kills">Kills</option>
            <option value="Deaths">Deaths</option>
            <option value="Score">Score</option>
            <option value="Time">Time</option>
          </select>
          <select
            value={period}
            onChange={saveState("period", (a) =>
              setPeriod(a as LeaderboardPeriod)
            )}
          >
            <option value="Forever">Forever</option>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
            <option value="OneLife">One Life</option>
          </select>
          <button type="submit" disabled={world < 1}>
            Submit
          </button>
        </form>
      </header>
      {leaderboard ? <Leaderboard data={leaderboard} /> : <EmptyBoard />}
    </>
  );
}

const EmptyBoard = () => {
  return <div>No leaderboard loaded, select it above</div>;
};

const Leaderboard = ({ data }: { data: LeaderboardEntry[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>TAG</th>
          <th>Player</th>
          <th>Stat Value</th>
          <th>Current World</th>
          <th>BR</th>
          <th>Certs Gained</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr>
            <td style={{ textAlign: "right" }}>
              {entry.outfit?.alias && <>[{entry.outfit.alias}]</>}
            </td>
            <td style={{ textAlign: "left" }}>
              <b>{entry?.name?.first || "*Deleted*"}</b>{" "}
              <div
                className={styles.tempFactionBox}
                style={{ backgroundColor: factionToColor(entry.faction_id) }}
              ></div>
            </td>
            <td>{entry.value}</td>
            <td>{worldIdToName(Number(entry.world?.world_id))}</td>
            <td>
              {entry.battle_rank?.value}
              {+entry.prestige_level > 0 && <>~{entry.prestige_level}</>}
            </td>
            <td>{entry.certs?.earned_points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const factionToColor = (faction: string) => {
  switch (faction) {
    case "1":
      return "#8800aa";
    case "2":
      return "#0000ff";
    case "3":
      return "#ff0000";
    default:
      return "#000000";
  }
};

export default App;
