import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap"
import Navbar from './components/layout/navbar';
import Route from './components/route/route';
import Team from './components/team/team';
import { useState } from 'react';
import Calculator from './components/calculator/calculator';

export type TeamType = {
  species: string;
  totalEXP: number;
  level: number;
  levelCaps: [];
}

export type EnemyType = {
  species: string;
  level: number;
  baseEXP: number;
  party: boolean[];
}

export type TrainerType = {
  name: string;
  pokemon: EnemyType[]
}

function App() {
  const [pokemonTeam, setPokemonTeam] = useState<TeamType[]>([]);
  const [trainers, setTrainers] = useState([]);

  console.log(trainers)

  return (
    <>
      <Navbar />
      <Team
        pokemonTeam={ pokemonTeam }
        setPokemonTeam={ setPokemonTeam }
      />
      <Route
        trainers={ trainers }
        party={ pokemonTeam }
        setTrainers={ setTrainers } 
      />
      <div 
        className="container"
        id="calculator"
      >
        <div className="row">
          {pokemonTeam.map((pokemon, index) => 
            <Calculator
              key={ index }
              index={ index }
              trainers={ trainers }
              pokemon={ pokemon } 
            />
          )}
        </div>
      </div>
      
    </>
  )
}

export default App
