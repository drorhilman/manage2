import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Orders from '../pages/Orders';

test('renders Orders component', () => {
  render(<Orders />);
  expect(screen.getByText(/Orders/i)).toBeInTheDocument();
});

test('allows adding a new order', () => {
  render(<Orders />);
  // Simulate adding an order
  fireEvent.change(screen.getByPlaceholderText(/Customer/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/Job Description/i), { target: { value: 'Job 1' } });
  fireEvent.change(screen.getByPlaceholderText(/Product/i), { target: { value: 'Product 1' } });
  fireEvent.change(screen.getByPlaceholderText(/Quantity/i), { target: { value: '1' } });
  fireEvent.click(screen.getByText(/Create Order/i));
  // Check for success notification (mocking toast)
});
