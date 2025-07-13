import { useEffect, useState, Fragment } from "react"
import type { EnemyType, TeamType, TrainerType } from "../../App";
import { fetchRequest } from "../../utils/fetchHelper";

export default function Route({
  trainers,
  party,
  setTrainers
}: {
  trainers: TrainerType[];
  party: TeamType[];
  setTrainers: (trainers: TrainerType[]) => void;
}) {
  const [newTrainer, setNewTrainer] = useState(false);

  function addTrainer(trainer: TrainerType) {
    setTrainers(prev => ([...prev, trainer]));
    setNewTrainer(false);
  };

  function removeTrainer(index: number) {
    setTrainers(prev => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    })

  }

  function modifyPokemon(
    trainer: TrainerType,
    index: number
  ) {
    const trainerClones = [...trainers];
    trainerClones[index].pokemon = trainer.pokemon;
    setTrainers(trainerClones);
  };

  return (
    <section
      className="container"
      id="pokemon-fights"
    >
      <div className="py-5">
        <div className="d-flex align-items-center gap-2">
          <h4
            className="text-center"
          >
            Trainers
          </h4>
          <button
            className={ `btn ${ newTrainer ? "btn-danger" : "btn-success" }` }
            onClick={() => setNewTrainer(prev => !prev)}
          >
            { newTrainer ? "-" : "+"}
          </button>
        </div>

        { newTrainer && (
          <NewTrainerForm
            setTrainers={ addTrainer } 
          />
        )}
      </div>

      <div className="row">
        { trainers.map((trainer, index) => (
          <Trainer
            key={ index }
            trainer={ trainer }
            index={ index }
            party={ party }
            modifyPokemon={ modifyPokemon }
            removeTrainer={ removeTrainer }
          />
        ))}
      </div>
    </section>
  )
};

function NewTrainerForm({
  setTrainers,
} : {
  setTrainers: (trainer: TrainerType) => void;
}) {
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    pokemon: []
  });

  function submitTrainer(e) {
    e.preventDefault();
    setTrainers(newTrainer);
    setNewTrainer({
      name: "",
      pokemon: []
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => submitTrainer(e)}
        className="form-inline row align-items-end"
      >
        <div className="col-auto">
          <label htmlFor="new-trainer" className="sr-only">
            Trainer Name
          </label>
          <input
            type="text"
            name="newTrainer"
            id="new-trainer"
            className="form-control"
            aria-describedby="pokemon-trainer"
            onChange={ (e) => setNewTrainer(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">
            +
          </button>
        </div>
      </form>
    </>
  )
};

function Trainer({
  trainer,
  index,
  modifyPokemon,
  removeTrainer
} : {
  trainer: TrainerType;
  index: number;
  party: TeamType[];
  modifyPokemon: (trainer: TrainerType, index: number) => void;
  removeTrainer: (index: number) => void;
}) {
  const [newMember, setNewMember] = useState(false);

  function addPokemonCloseWindow(pokemon: EnemyType) {
    pokemon.party = [false, false, false, false, false, false];
    trainer.pokemon.push(pokemon);
    modifyPokemon(trainer, index);
    setNewMember(false);
  };

  function removePokemon(index: number) {
    const clonedTrainer = { ...trainer };
    const pokemon = trainer.pokemon
    clonedTrainer.pokemon = [...pokemon.slice(0, index), ...pokemon.slice(index + 1)];

    modifyPokemon(clonedTrainer, index);
  };

  function addBaseEXP(pokemon: EnemyType, pokeindex: number) {
    const clonedTrainer = { ...trainer };
    clonedTrainer.pokemon[pokeindex] = pokemon;
    
    modifyPokemon(clonedTrainer, index)
  };

  return (
    <div className="col-12">
      <div className="pb-5">
        <div className="d-flex gap-2 align-items-center gap-2">
          <h5 className="m-0">{ trainer.name }</h5>
          <button
            className={`btn ${newMember ? "btn-danger" : "btn-success"}`}
            onClick={() => setNewMember(prev => !prev)}
          >
            {newMember ? "-" : "+"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => removeTrainer(index)}
          >
            x
          </button>
        </div>

        { newMember && (
          <NewMemberForm
            addPokemon={ (pokemon) =>  addPokemonCloseWindow(pokemon) } 
          />
        )}
      </div>

      <div className="row">
        { trainer.pokemon.map((pokemon, index) => (
          <Pokemon
            key={ index }
            pokemon={ pokemon }
            index={ index }
            removePokemon={ removePokemon }
            addBaseEXP={ addBaseEXP }
          />
        ))}
      </div>
    </div>
  )
};

function NewMemberForm({ 
  addPokemon
} : {
  addPokemon: (pokemon: EnemyType) => void;
}) {

  const [newPokemon, setNewPokemon] = useState<EnemyType>({
    species: "",
    level: 0,
    baseEXP: 0,
    party: []
  });

  function submitPokemon(e) {
    e.preventDefault();
    addPokemon(newPokemon)
    setNewPokemon({
      species: "",
      level: 0,
      baseEXP: 0,
      party: []
    })
  }

  return (
    <form
      onSubmit={(e) => submitPokemon(e)}
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
          onChange={(e) =>
            setNewPokemon((prev) => ({
              ...prev,
              species: e.target.value,
            }))
          }
        />
      </div>
      <div className="col-auto">
        <label htmlFor="level" className="sr-only">
          Level
        </label>
        <input
          type="number"
          id="level"
          name="level"
          className="form-control"
          aria-describedby="pokemon-experience"
          onChange={(e) =>
            setNewPokemon((prev) => ({
              ...prev,
              level: e.target.value,
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
};

function Pokemon({
  pokemon,
  index, 
  removePokemon, 
  addBaseEXP
} : {
  pokemon: EnemyType;
  index: number;
  removePokemon: (index: number) => void;
  addBaseEXP: (pokemon: EnemyType, pokeindex: number) => void;
}) {
  useEffect(() => {
    getBaseEXP();
  }, []);

  async function getBaseEXP() {
    const species = await fetchRequest(`pokemon/${ pokemon.species }`)
    const baseExp = species.base_experience;

    const pokemonClone = { ...pokemon }
    pokemonClone.baseEXP = baseExp;

    addBaseEXP(pokemonClone, index);
  };

  function handleParty(slotindex: number) {
    const pokemonClone = { ...pokemon }
    const party = pokemonClone.party

    party[slotindex] = !party[slotindex];

    addBaseEXP(pokemonClone, index);
  };


  return (
    <div className="col-12">
      <div className="d-flex gap-2 align-items-end">
        { pokemon.party.map((bool, index) => (
          <Fragment key={ pokemon.species + pokemon.level + index }>
            <label
              className="d-block"
              htmlFor={`slot-${ pokemon.species + pokemon.level + index }`}
            >
              Slot { index }
            </label>
            <input
              type="checkbox" 
              className="d-block"
              id={ `slot-${ pokemon.species + pokemon.level + index }` }
              checked={ bool }
              onChange={ () => handleParty(index) }
            />
          </Fragment>
        ))}
        <span>Lvl. { pokemon.level }</span>
        <h5 className="m-0">{ pokemon.species }</h5>
        <button
          className="btn btn-danger"
          onClick={() => removePokemon(index)}
        >
          x
        </button>
      </div>
      <p className="text-end">Base Experience: { pokemon.baseEXP }</p>
    </div>
  )
}