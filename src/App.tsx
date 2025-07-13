import { useEffect, useState } from "react";
import { preloadGrowthRate } from "./utils/retrieveGrowthRate";
import PokeLoader from "./components/pokeLoader";

export default function App() {
  const [growthRatesCache, setGrowthRatesCache] = useState<Record<string, number[]>>({});
  const isGrowthRateEmpty = Object.keys(growthRatesCache).length === 0;

  useEffect(() => {
    loadGrowthRateAPI();
  }, []);

  async function loadGrowthRateAPI() {
    const growthRates = await preloadGrowthRate();
    setGrowthRatesCache(growthRates);
  };

  return <PokeLoader />

  return (
    <div>{ JSON.stringify(growthRatesCache) }</div>
  )
};