export const censusUrl = (
  collection: string,
  query: Record<string, string>
) => {
  const url = new URL(
    `https://census.daybreakgames.com/s:ps2livepublic/get/ps2:v2/${collection}`
  );
  url.search = new URLSearchParams(query).toString();
  return url.toString();
};

export const censusFetch = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(path, init);
  const json: T = await response.json();
  return json;
};

export type LeaderboardName = "Deaths" | "Kills" | "Score" | "Time";
export type LeaderboardPeriod =
  | "Forever"
  | "Monthly"
  | "Weekly"
  | "Daily"
  | "OneLife";

export type Leaderboard = {
  leaderboard_list: LeaderboardEntry[];
};

export type LeaderboardEntry = {
  character_id: string;
  rank: string;
  value: string;
  name: { first: string; first_lower: string };
  faction_id: string;
  title?: { name: { en: string } };
  battle_rank: {
    value: string;
    percent_to_next: string;
  };
  certs: {
    earned_points: string;
  };
  prestige_level: string;
  outfit?: {
    alias: string;
  };
  world?: {
    world_id: string;
  };
};

export const fetchLeaderboard = (
  world: number,
  name: LeaderboardName,
  period: LeaderboardPeriod,
  limit: number
) => {
  const url = censusUrl("leaderboard", {
    world: world.toString(),
    name,
    period,
    "c:limit": limit.toString(),
    "c:resolve": "character",
    "c:join":
      "title^outer:true^on:title_id^to:title_id^inject_at:title,outfit_member_extended^outer:true^on:character_id^to:character_id^inject_at:outfit,characters_world^outer:true^on:character_id^to:character_id^inject_at:world",
  });

  return censusFetch<Leaderboard>(url);
};
