import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as growthLoader from "./utils/retrieveGrowthRate";
import "@testing-library/jest-dom/vitest";
import App from './App';

vi.mock("./utils/retrieveGrowthRate", () => {
  return {
    preloadGrowthRate: vi.fn()
  };
});

describe("App", () => {
  it("shows the LoadingScreen initially and hides it after growth rates load", async() => {
    const mockData = {
      fast: [0, 10, 33, 80, 156],
      slow: [0, 15, 52, 122, 237]
    };

    const preloadMock = growthLoader.preloadGrowthRate as ReturnType<typeof vi.fn>;
    preloadMock.mockResolvedValue(mockData);

    render(<App />);

    const loadingScreen = screen.getByRole("status", { name: /loading/i });
    const halfScreen = screen.getByTestId("half-screen");

    expect(loadingScreen).toBeInTheDocument();

    fireEvent.animationEnd(halfScreen);

    await waitFor(() => {
      expect(loadingScreen).not.toBeInTheDocument();
    });
  })
})