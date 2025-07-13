import { fetchRequest } from "./fetchHelper";

//Growth rate data search
export async function preloadGrowthRate() {
  const growthRatesCache: Record<string, number[]> = {};
  const rateNames = [
    "slow",
    "medium",
    "fast",
    "medium-slow",
    "slow-then-very-fast",
    "fast-then-very-slow"
  ];

  await Promise.all(rateNames.map(async (rate) => {
    const response = await fetchRequest(`/growth-rate/${ rate }`);
    const expTable: number[] = response.levels.map((lvl: any) => lvl.experience);
    growthRatesCache[rate] = expTable;
  }));


  return growthRatesCache;
};