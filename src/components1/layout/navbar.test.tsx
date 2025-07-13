import { describe, expect, it } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from './navbar';

describe('Layout', () => {
  it('should render a nav with the title and toggle button', () => {
    render(<Navbar />);

    const title = screen.getByText("Poké Router");
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });


    expect(title).toBeInTheDocument();
    expect(toggleButton).toBeInTheDocument();
  });

  it('shows and hides the menu when toggled', async () => {
    render(<Navbar />);
    
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    const collapseDiv = screen.getByRole('navigation').querySelector('#navbarCollapse');

    expect(collapseDiv?.classList.contains('show')).toBe(false);

    await userEvent.click(toggleButton);
    collapseDiv?.classList.add('show');
    expect(collapseDiv?.classList.contains('show')).toBe(true);

    await userEvent.click(toggleButton);
    collapseDiv?.classList.remove('show');
    expect(collapseDiv?.classList.contains('show')).toBe(false);
  });
})