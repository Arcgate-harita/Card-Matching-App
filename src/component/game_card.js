import React from 'react';
import "../component/game_card.css";

function GameCard({ item, id, handleClick }) {
  let itemClass = "";

  if (item && item.state) {
    itemClass = `active ${item.state}`;
  }

  return (
    <div data-testid="game-card-container" className={`game-card-container ${itemClass}`} onClick={() => handleClick(id)}>
      <img src={item ? item.img : ''} alt="" />
    </div>
  );
}

export default GameCard;
