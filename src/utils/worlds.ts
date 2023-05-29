export type World = {
  id: number;
  name: string;
  region: string;
  platform: string;
  defunct?: boolean;
  noStats?: boolean;
};

export const worlds: World[] = [
  { name: "Connery", id: 1, region: "USW", platform: "PC" },
  { name: "Genudine", id: 2, region: "USW", platform: "PC", defunct: true },
  { name: "Helios", id: 3, region: "USW", platform: "PC", defunct: true },
  { name: "Palos", id: 4, region: "USW", platform: "PC", defunct: true },
  { name: "Torremar", id: 5, region: "USW", platform: "PC", defunct: true },
  { name: "Voight", id: 6, region: "USW", platform: "PC", defunct: true },
  { name: "Benson", id: 7, region: "USW", platform: "PC", defunct: true },
  { name: "Everett", id: 8, region: "USW", platform: "PC", defunct: true },
  { name: "Woodman", id: 9, region: "EU", platform: "PC", defunct: true },
  { name: "Miller", id: 10, region: "EU", platform: "PC" },
  { name: "Ceres", id: 11, region: "EU", platform: "PC", defunct: true },
  { name: "Lithcorp", id: 12, region: "EU", platform: "PC", defunct: true },
  { name: "Cobalt", id: 13, region: "EU", platform: "PC" },
  { name: "Mallory", id: 14, region: "EU", platform: "PC", defunct: true },
  { name: "Rust Mesa", id: 15, region: "EU", platform: "PC", defunct: true },
  { name: "Snowshear", id: 16, region: "EU", platform: "PC", defunct: true },
  { name: "Emerald", id: 17, region: "USE", platform: "PC" },
  { name: "Waterson", id: 18, region: "USE", platform: "PC", defunct: true },
  { name: "Jaeger", id: 19, region: "USE", platform: "PC" },
  { name: "SolTech", id: 20, region: "USE", platform: "PC", defunct: true },
  { name: "DeepCore", id: 21, region: "USE", platform: "PC", defunct: true },
  { name: "AuraxiCom", id: 22, region: "USE", platform: "PC", defunct: true },
  {
    name: "Snake Ravine",
    id: 23,
    region: "USE",
    platform: "PC",
    defunct: true,
  },
  { name: "Apex", id: 24, region: "USE", platform: "PC", defunct: true },
  { name: "Briggs", id: 25, region: "AU", platform: "PC", defunct: true },
  { name: "Morgannis", id: 26, region: "AU", platform: "PC", defunct: true },
  { name: "Saerro", id: 27, region: "AU", platform: "PC", defunct: true },
  { name: "Vaemar", id: 28, region: "AU", platform: "PC", defunct: true },
  { name: "Jagged Lance", id: 29, region: "AU", platform: "PC", defunct: true },
  { name: "Alkali", id: 30, region: "AU", platform: "PC", defunct: true },
  { name: "Stillwater", id: 31, region: "AU", platform: "PC", defunct: true },
  { name: "Black Ridge", id: 32, region: "AU", platform: "PC", defunct: true },
  { name: "SolTech", id: 40, region: "JP", platform: "PC" },
];

export const defunctWorlds = worlds.filter((w) => w.defunct);
export const activeWorlds = worlds.filter((w) => !w.defunct);

export const worldIdToName = (id: number): string => {
  const world = worlds.find((w) => w.id === id);
  return world?.name || "Unknown";
};
