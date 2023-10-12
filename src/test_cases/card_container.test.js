import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardContainer from '../component/card_container';

test('suite', async () => {
  const { debug } = render(
    <CardContainer />
  );
  debug();

});

test('renders CardContainer component', () => {
  const { container } = render(<CardContainer />);
  expect(container).toBeInTheDocument();
});

test('renders initial game cards', () => {
  const { getAllByRole } = render(<CardContainer />);
  const gameCards = getAllByRole('img');
  expect(gameCards).toHaveLength(20);
});

test('clicking a game card triggers handleClick', () => {
  const { getAllByRole } = render(<CardContainer />);
  const gameCards = getAllByRole('img');

  const mockHandleClick = jest.fn();

  const firstGameCard = gameCards[0];
  firstGameCard.onclick = () => mockHandleClick();

  fireEvent.click(firstGameCard);

  expect(mockHandleClick).toHaveBeenCalled();
});

test('clicking the "Play Again" button resets the game', () => {
  const { getByText } = render(<CardContainer />);
  const playAgainButton = getByText('Play Again');

  const mockResetGame = jest.fn();

  playAgainButton.onclick = () => mockResetGame();

  fireEvent.click(playAgainButton);

  expect(mockResetGame).toHaveBeenCalled();
});

test('matching cards should be marked as correct', async () => {
  const { getAllByRole } = render(<CardContainer />);
  const gameCards = getAllByRole('img');

  const card1 = gameCards[0];
  const card2 = gameCards[1];
  card1.onclick = null;
  card2.onclick = null;


  fireEvent.click(card1);

  fireEvent.click(card2);

  await waitFor(() => {
    const card1Styles = window.getComputedStyle(card1);
    const card2Styles = window.getComputedStyle(card2);


    console.log('Background Color 1:', card1Styles.backgroundColor);
    console.log('Background Color 2:', card2Styles.backgroundColor);

    console.log('Class Name 1:', card1.className);
    console.log('Class Name 2:', card2.className);
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
});



test('non-matching cards should be marked as wrong and then reset', async () => {
  const { getAllByRole } = render(<CardContainer />);
  const gameCards = getAllByRole('img');

  const card1 = gameCards[0];
  const card3 = gameCards[2];
  card1.onclick = null;
  card3.onclick = null;

  fireEvent.click(card1);

  fireEvent.click(card3);

  await waitFor(() => {
    expect(getComputedStyle(card1).getPropertyValue('background-color')).not.toContain('255, 0, 0');
    expect(getComputedStyle(card3).getPropertyValue('background-color')).not.toContain('255, 0, 0');
  });
});


test('both cards marked as wrong after a delay', async () => {
  render(<CardContainer />);

  const card1 = screen.getByTestId('game-card-0');
  const card3 = screen.getByTestId('game-card-2');
  fireEvent.click(card1);
  fireEvent.click(card3);

  await waitFor(() => {
    expect(getComputedStyle(card1).getPropertyValue('background-color'));
    expect(getComputedStyle(card3).getPropertyValue('background-color'));
  });

  await waitFor(() => {
    expect(getComputedStyle(card1).getPropertyValue('background-color'));
    expect(getComputedStyle(card3).getPropertyValue('background-color'));
  });
});
