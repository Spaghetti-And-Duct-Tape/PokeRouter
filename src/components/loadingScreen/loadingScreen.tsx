import { useState } from "react";
import PokeBall from "../pokeball/pokeball";
import "./loadingScreen.scss";

type LoadingScreenProps = {
  loading: boolean;
}

export default function LoadingScreen({
  loading
}: LoadingScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) return null;

  return (
    <div 
      className={ `loading-screen ${ loading ? "loading" : "loaded" }` }
    >
      <div 
        className="half-screen"
        onAnimationEnd={ () => setIsLoaded(true) }  
      />
      <div className="half-screen" />
      <div className="loader-container">
        <div className="loader-animator">
          <PokeBall />
        </div>
      </div>
    </div>
  )
};