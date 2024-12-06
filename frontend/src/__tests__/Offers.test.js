import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Offers from '../pages/Offers';

test('renders Offers component', () => {
  render(<Offers />);
  expect(screen.getByText(/Offers/i)).toBeInTheDocument();
});

test('allows adding a new offer', () => {
  render(<Offers />);
  // Simulate adding an offer
  fireEvent.change(screen.getByPlaceholderText(/Offer Description/i), { target: { value: 'Special Offer' } });
  fireEvent.click(screen.getByText(/Create Offer/i));
  // Check for success notification (mocking toast)
});
