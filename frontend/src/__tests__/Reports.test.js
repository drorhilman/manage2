import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Reports from '../pages/Reports';

test('renders Reports component', () => {
  render(<Reports />);
  expect(screen.getByText(/Reports/i)).toBeInTheDocument();
});

test('allows generating a report', () => {
  render(<Reports />);
  // Simulate generating a report
  fireEvent.change(screen.getByPlaceholderText(/Start Date/i), { target: { value: '2023-01-01' } });
  fireEvent.change(screen.getByPlaceholderText(/End Date/i), { target: { value: '2023-12-31' } });
  fireEvent.click(screen.getByText(/Generate Report/i));
  // Check for success notification (mocking toast)
});
