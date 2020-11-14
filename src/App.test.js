import { ThemeProvider } from '@chakra-ui/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('should render', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByText('Noughts and Crosses')).toBeVisible();
    expect(screen.getByText('Difficulty?')).toBeVisible();
    expect(screen.getByLabelText('Beatable')).toBeVisible();
    expect(screen.getByLabelText('Unbeatable')).toBeVisible();
    expect(screen.getByText('Start over?')).toBeVisible();
    expect(screen.getByText('Who moves first?')).toBeVisible();
    expect(screen.getByLabelText('Player')).toBeVisible();
    expect(screen.getByLabelText('Computer')).toBeVisible();
  });

  it('should mark the board when the player moves first', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'top-left' }));

    // player's mark
    expect(screen.getByText('X')).toBeVisible();

    // computer's mark
    await waitFor(() => expect(screen.getByText('O')).toBeVisible());
  });

  it('should mark the board when the computer moves first', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByLabelText('Computer'));

    // computer's mark
    await waitFor(() => expect(screen.getByText('X')).toBeVisible());
  });

  it('should reset the game', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'top-left' }));
    expect(screen.getByText('X')).toBeVisible();
    await waitFor(() => expect(screen.getByText('O')).toBeVisible());

    fireEvent.click(screen.getByText('Start over?'));
    await waitFor(() => {
      expect(screen.queryByText('O')).toBeNull();
      expect(screen.queryByText('X')).toBeNull();
    });
  });
});
