import { useEffect, useState } from "react";
import { preloadGrowthRate } from "./utils/retrieveGrowthRate";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
import "./App.css";

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

  return (
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vw"
      }}
    >
      <LoadingScreen />
    </div>
  )

  return (
    <div>{ JSON.stringify(growthRatesCache) }</div>
  )
};