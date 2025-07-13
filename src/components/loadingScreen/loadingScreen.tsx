import PokeBall from "../pokeball/pokeball";
import "./loadingScreen.scss";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader-container">
        <PokeBall />
      </div>
    </div>
  )
};