type levelCaps = {
  level: number;
  experience: number;
}

export type PlayerPokemonType = {
  id: number;
  species: string;
  expTotal: number;
  level: number;
  levelCaps: levelCaps[];
};

export type EnemyPokemonType = {
  id: number;
  species: string;
  level: number;
  baseExp: number;
  participation: boolean[];
};