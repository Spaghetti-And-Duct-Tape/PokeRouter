import { describe, it, expect, vi, beforeEach } from "vitest";
import { preloadGrowthRate } from "./retrieveGrowthRate";
import * as fetchHelper from "./fetchHelper";

vi.mock("./fetchHelper", () => ({
  fetchRequest: vi.fn()
}));

const mockLevels = [
  { level: 1, experience: 0 },
  { level: 2, experience: 10 },
  { level: 3, experience: 33 }
];

const expectedExp = mockLevels.map(l => l.experience);

describe("preloadGrowthRate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches all growth rates and returns a complete cache", async () => {
    const fetchMock = fetchHelper.fetchRequest as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue({ levels: mockLevels });

    const result = await preloadGrowthRate();

    expect(fetchMock).toHaveBeenCalledTimes(6);

    expect(Object.keys(result)).toEqual([
      "slow",
      "medium",
      "fast",
      "medium-slow",
      "slow-then-very-fast",
      "fast-then-very-slow"
    ]);

    for (const rate in result) {
      expect(result[rate]).toEqual(expectedExp);
    }
  });

  it("throws an error if any fetch fails", async () => {
    const fetchMock = fetchHelper.fetchRequest as ReturnType<typeof vi.fn>;

    // First 2 succeed, 3rd one fails
    fetchMock
      .mockResolvedValueOnce({ levels: mockLevels }) // slow
      .mockResolvedValueOnce({ levels: mockLevels }) // medium
      .mockRejectedValueOnce(new Error("API error")) // fast
      .mockResolvedValue({ levels: mockLevels }); // remaining

    await expect(preloadGrowthRate()).rejects.toThrow("API error");

    expect(fetchMock).toHaveBeenCalledTimes(6); // stops at the failure in Promise.all
  });
});
