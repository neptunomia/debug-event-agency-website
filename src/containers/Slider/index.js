import { useEffect, useRef, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );
  const byDateDescLength = byDateDesc?.length;

  const ref = useRef();
  const nextCard = () => {
    clearTimeout(ref.current);
    ref.current = setTimeout(
      () => setIndex(index < byDateDescLength - 1 ? index + 1 : 0),
      5000
    );
  };

  const handleClick = (idx) => {
    setIndex(idx);
  };
  const handlePauseIsTrue = (e) => {
    e.preventDefault();
    if (e.code === 'Space') {
      setIsPaused(true);
      clearTimeout(ref.current);
    }
  };
  const handlePauseIsFalse = (e) => {
    e.preventDefault();
    if (e.code === 'Space') {
      setIsPaused(false);
      nextCard();
    }
  };

  useEffect(() => {
    if (!isPaused) {
      nextCard();
    }

    document.addEventListener('keydown', handlePauseIsTrue);
    document.addEventListener('keydown', handlePauseIsFalse);

    return () => {
      document.removeEventListener('keydown', handlePauseIsTrue);
      document.removeEventListener('keydown', handlePauseIsFalse);
    };
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? 'display' : 'hide'
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              readOnly
              key={`${event.title}-${index}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onClick={() => handleClick(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
