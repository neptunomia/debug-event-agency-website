import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Slider from './index';
import { api, DataProvider } from '../../contexts/DataContext';

const data = {
  focus: [
    {
      title: 'World economic forum',
      description:
        'Oeuvre à la coopération entre le secteur public et le privé.',
      date: '2022-02-29T20:28:45.744Z',
      cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
    },
    {
      title: 'World Gaming Day',
      description: 'Evenement mondial autour du gaming',
      date: '2022-03-29T20:28:45.744Z',
      cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
    },
    {
      title: 'World Farming Day',
      description: 'Evenement mondial autour de la ferme',
      date: '2022-01-29T20:28:45.744Z',
      cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
    },
  ],
};

describe('When slider is created', () => {
  it('a list of card is displayed', async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText('World economic forum');
    await screen.findByText('janvier');
    await screen.findByText(
      'Oeuvre à la coopération entre le secteur public et le privé.'
    );
  });
});

function HandleClickTest() {
  const [index, setIndex] = useState(0);
  const handleClick = (idx) => {
    setIndex(idx);
  };
  return (
    <div>
      <span data-testid="index-testid">Index {index}</span>
      <input
        data-testid="input-testid"
        type="radio"
        onClick={() => handleClick(2)}
      />
    </div>
  );
}

describe('When there is a click on a bullet point', () => {
  it('handleClick function sets the index correctly', async () => {
    render(<HandleClickTest />);
    expect(screen.getByTestId('index-testid').textContent).toBe('Index 0');
    fireEvent.click(screen.getByTestId('input-testid'));
    expect(screen.getByTestId('index-testid').textContent).toBe('Index 2');
  });
});
