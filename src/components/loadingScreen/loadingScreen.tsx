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
      role="status"
      aria-live="polite"
      aria-label="Loading content, please wait"
    >
      <div 
        className="half-screen"
        data-testid="half-screen"
        onAnimationEnd={ () => setIsLoaded(true) }  
        aria-hidden="true"
      />
      <div 
        className="half-screen" 
        aria-hidden="true"
      />
      <div 
        className="loader-container"
        aria-hidden="true"
      >
        <div className="loader-animator">
          <PokeBall />
        </div>
      </div>
    </div>
  )
};