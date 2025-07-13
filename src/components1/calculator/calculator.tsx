import type { TeamType, TrainerType } from "../../App"

export default function Calculator({
  trainers,
  index,
  pokemon
} : {
  trainers: TrainerType[];
  index: number;
  pokemon: TeamType;
}) {
  if (trainers.length === 0 || !pokemon) return;
  
  const trainerPokemon = trainers.flatMap(trainer => trainer.pokemon);

  if (trainerPokemon.length === 0) return;

  let pokemonlevel = pokemon.level;
  let pokemonexperience = parseInt(pokemon.totalEXP);

  trainerPokemon.forEach(enemypokemon => {
    if (!enemypokemon.party[index]) return;
    const totalFiltered = enemypokemon.party.filter(party => party).length;
    const exp = calculateEXP(parseInt(enemypokemon.baseEXP), parseInt(enemypokemon.level), parseInt(pokemonlevel), totalFiltered);
    pokemonexperience += exp;
    checkLevel();
  });

  function checkLevel() {
    for (const { level, experience } of pokemon.levelCaps) {
      if (pokemonexperience > experience) {
        pokemonlevel = level;
      } else {
        break;
      }
    };
  };

  function calculateEXP(
    baseExp: number, 
    enemyLevel: number, 
    playerLevel: number, 
    totalShared: number,
    trainerBattle = true) {
    const t = trainerBattle ? 1.5 : 1.0;

    const part1 = ((baseExp * t * enemyLevel) / 5) / totalShared;
    const part2 =
      Math.pow(2 * enemyLevel + 10, 2.5) /
      Math.pow(enemyLevel + playerLevel + 10, 2.5);

    return Math.floor(part1 * part2 + 1);
  }

  return (
    <div 
      className="col-12 col-sm-6 col-md-4 col-lg-2"
    >
      <h5 className="m-0">{ pokemon.species }</h5>
      <p className="m-0">Final EXP. { pokemonexperience - pokemon.totalEXP }</p>
      <p className="m-0">Final Lvl. { pokemonlevel }</p>
    </div>
  )
};