import { useEffect, useState } from "react";
import type { TeamType } from "../../App";
import { fetchRequest } from "../../utils/fetchHelper";

export default function Team({
  pokemonTeam,
  setPokemonTeam,
}: {
  pokemonTeam: TeamType[];
  setPokemonTeam: (pokemonTeam: TeamType[]) => void;
}) {
  const [newMember, setNewMember] = useState(false);

  function addPokemon(pokemon: TeamType) {
    setPokemonTeam((prev) => {
      if (prev.length >= 6) return prev;
      return [...prev, pokemon];
    });

    setNewMember(false);
  };

  function removePokemon(pokemonIndex: number) {
    setPokemonTeam(prev => {
      return [...prev.slice(0, pokemonIndex), ...prev.slice(pokemonIndex + 1)];
    })
  };

  function addLevel(pokemon: TeamType, index: number) {
    const team = [...pokemonTeam];
    team[index] = pokemon;

    setPokemonTeam(team);
  }

  return (
    <section className="container" id="team">
      <div className="py-5">
        <div className="d-flex align-items-center gap-2">
          <h4>Team</h4>
          <button
            className={`btn ${newMember ? "btn-danger" : "btn-success"}`}
            onClick={() => setNewMember(prev => !prev)}
          >
            {newMember ? "-" : "+"}
          </button>
        </div>

        {newMember && (
          <NewMemberForm setPokemonTeam={(pokemon) => addPokemon(pokemon)} />
        )}
      </div>

      <div className="row">
        {pokemonTeam.map((pokemon, index) => (
          <Pokemon 
            key={index} 
            pokemon={pokemon} 
            index={ index }
            addLevel={ addLevel }
            removePokemon={ removePokemon }
          />
        ))}
      </div>
    </section>
  );
}

function NewMemberForm({
  setPokemonTeam,
}: {
  setPokemonTeam: (pokemon: TeamType) => void;
}) {
  const [newPokemon, setNewPokemon] = useState<TeamType>({
    species: "",
    totalEXP: 0,
    level: 0,
    levelCaps: []
  });

  function sumbitPokemon(e) {
    e.preventDefault();
    setPokemonTeam(newPokemon);
    setNewPokemon({
      species: "",
      totalEXP: 0,
      level: 0,
      levelCaps: []
    })
  }

  return (
    <form
      onSubmit={(e) => sumbitPokemon(e)}
      className="form-inline row align-items-end"
    >
      <div className="col-auto">
        <label htmlFor="species" className="sr-only">
          Species
        </label>
        <input
          type="text"
          name="species"
          id="species"
          className="form-control"
          aria-describedby="pokemon-species"
          onChange={(e) => {
            setNewPokemon((prev) => ({
              ...prev,
              species: e.target.value,
            }));
          }}
        />
      </div>
      <div className="col-auto">
        <label htmlFor="experience" className="sr-only">
          Total Experience
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          className="form-control"
          aria-describedby="pokemon-experience"
          onChange={(e) =>
            setNewPokemon((prev) => ({
              ...prev,
              totalEXP: e.target.value,
            }))
          }
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-success">
          +
        </button>
      </div>
    </form>
  );
}

function Pokemon({ 
  pokemon,
  index, 
  addLevel,
  removePokemon
} : { 
  pokemon: TeamType;
  index: number;
  addLevel: (pokemon: TeamType, index: number) => void;
  removePokemon: (index: number) => void;
}) {
  useEffect(() => {
    getEXPRate();
  }, []);

  async function getEXPRate() {
    const species = await fetchRequest(`pokemon-species/${pokemon.species}`);
    const growthRatePath = new URL(species.growth_rate.url).pathname.replace(
      /^\/api\/v2\//,
      ""
    );
    const growthRate = await fetchRequest(growthRatePath);

    const levels = growthRate.levels;

    for (const { level, experience } of levels) {
      if (pokemon.totalEXP >= experience) {
        const clonedPokemon = { ...pokemon }
        clonedPokemon.level = level;
        clonedPokemon.levelCaps = levels;
        
        addLevel(clonedPokemon, index);
      } else {
        break;
      }
    }
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
      <div className="d-flex gap-2 align-items-end">
        <h5 className="m-0">{pokemon.species}</h5>
        <span>Lvl. { pokemon.level }</span>
        <button
          className="btn btn-danger"
          onClick={() => removePokemon(index)}
        >
          x
        </button>
      </div>
      <p>Exp: {pokemon.totalEXP}</p>
    </div>
  );
}
