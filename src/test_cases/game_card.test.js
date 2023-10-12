import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameCard from "../component/game_card";

test('suite', async () => {
  const { debug } = render(
    <GameCard />
  );
  debug();
});

test('renders a GameCard component with an image', () => {
  const item = {
    state: 'someState',
    img: 'test-image.jpg',
  };

  render(<GameCard item={item} id={1} handleClick={() => { }} />);
  const imgElement = screen.getByAltText('');
  expect(imgElement).toHaveAttribute('src', item.img);
});

test('handles click event when the card is clicked', () => {
  const item = {
    state: 'someState',
    img: 'test-image.jpg',
  };

  const handleClick = jest.fn();
  render(<GameCard item={item} id={1} handleClick={handleClick} />);

  const gameCard = screen.getByTestId('game-card-container');
  fireEvent.click(gameCard);
  expect(handleClick).toHaveBeenCalledWith(1);
});

test('handleClick is called when the card is clicked', () => {

  const mockHandleClick = jest.fn();
  const { container } = render(
    <GameCard item={{ state: 'example', img: 'example.png' }} id={1} handleClick={mockHandleClick} />
  );

  const gameCard = container.querySelector('.game-card-container');
  fireEvent.click(gameCard);
  expect(mockHandleClick).toHaveBeenCalledTimes(1);
});
