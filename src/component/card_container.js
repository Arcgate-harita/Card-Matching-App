import React, { useState, useEffect } from 'react';
import "../component/card_container.css";
import GameCard from "./game_card";


const initialItems = [
  { id: 1, img: '/img/image1.png', state: "" },
  { id: 1, img: '/img/image1.png', state: "" },
  { id: 2, img: '/img/image2.png', state: "" },
  { id: 2, img: '/img/image2.png', state: "" },
  { id: 3, img: '/img/image3.png', state: "" },
  { id: 3, img: '/img/image3.png', state: "" },
  { id: 4, img: '/img/image4.png', state: "" },
  { id: 4, img: '/img/image4.png', state: "" },
  { id: 5, img: '/img/image5.png', state: "" },
  { id: 5, img: '/img/image5.png', state: "" },
  { id: 6, img: '/img/image6.png', state: "" },
  { id: 6, img: '/img/image6.png', state: "" },
  { id: 7, img: '/img/image7.png', state: "" },
  { id: 7, img: '/img/image7.png', state: "" },
  { id: 8, img: '/img/image8.png', state: "" },
  { id: 8, img: '/img/image8.png', state: "" },
  { id: 9, img: '/img/image9.png', state: "" },
  { id: 9, img: '/img/image9.png', state: "" },
  { id: 10, img: '/img/image10.png', state: "" },
  { id: 10, img: '/img/image10.png', state: "" },
].sort(() => Math.random() - 0.5)

function CardContainer() {
  const [items, setItems] = useState(initialItems);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('memoryGame'));

    if (savedState) {
      setItems(savedState.items);
      setSelectedCards(savedState.selectedCards);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'memoryGame',
      JSON.stringify({ items, selectedCards })
    );
  }, [items, selectedCards]);

  const resetGame = () => {
    localStorage.removeItem('memoryGame');

    setItems(initialItems);
    setSelectedCards([]);
  };

  const handleClick = (id) => {
    const currentCard = items[id];

    if (!currentCard.state && selectedCards.length < 2) {
      currentCard.state = 'active';
      setItems([...items]);
      setSelectedCards([...selectedCards, currentCard]);

      if (selectedCards.length === 1) {
        const [firstCard] = selectedCards;

        if (firstCard.id === currentCard.id) {
          currentCard.state = 'correct';
          firstCard.state = 'correct';
        } else {
          currentCard.state = 'wrong';
          firstCard.state = 'wrong';

          setTimeout(() => {
            currentCard.state = '';
            firstCard.state = '';
            setItems([...items]);
          }, 1000);
        }

        setSelectedCards([]);
      }
    }
  };

  return (
    <>
      <div className="card-container">
        {items.map((item, index) => (
          <div key={index} data-testid={`game-card-${index}`}>
            <GameCard item={item} id={index} handleClick={handleClick} />
          </div>
        ))}
      </div>
      <div className='button'>
        <button
          className='play-button'
          onClick={resetGame}>Play Again</button>
      </div>
    </>
  );
}

export default CardContainer;