import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../pages/Products';

test('renders Products component', () => {
  render(<Products />);
  expect(screen.getByText(/Products/i)).toBeInTheDocument();
});

test('allows adding a new product', () => {
  render(<Products />);
  // Simulate adding a product
  fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'New Product' } });
  fireEvent.change(screen.getByPlaceholderText(/Price/i), { target: { value: '100' } });
  fireEvent.click(screen.getByText(/Add/i));
  // Check for success notification (mocking toast)
});
