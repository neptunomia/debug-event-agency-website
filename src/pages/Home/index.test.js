import { fireEvent, render, screen } from '@testing-library/react';
import Home from './index';

describe('When Form is created', () => {
  it('a list of fields card is displayed', async () => {
    render(<Home />);
    await screen.findByText('Email');
    await screen.findByText('Nom');
    await screen.findByText('Prénom');
    await screen.findByText('Personnel / Entreprise');
  });

  describe('and a click is triggered on the submit button', () => {
    it('the success message is displayed', async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText('Envoyer'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(await screen.findByText('En cours')).toBeVisible();
      expect(await screen.findByText('Message envoyé !')).toBeVisible();
    });
  });
});

describe('When the page is created', () => {
  it('a list of events is displayed', async () => {
    render(<Home />);
    const events = screen.getByTestId('events-testid');
    const event = screen.getByTestId('card-testid');
    const titleEvent = screen.getByTestId('card-title-testid');
    expect(events && event && titleEvent).toBeInTheDocument();
  });
  it('a list a people is displayed', () => {
    render(<Home />);
    const peopleCardsList = screen.getByTestId('people-card-testid');
    expect(peopleCardsList).toBeInTheDocument();
    expect(screen.getByText('Samira'));
  });
  it('a footer is displayed', () => {
    render(<Home />);
    expect(screen.getByTestId('footer-testid')).toBeInTheDocument();
  });
  it('an event card, with the last event, is displayed', () => {
    // to implement
  });
});
