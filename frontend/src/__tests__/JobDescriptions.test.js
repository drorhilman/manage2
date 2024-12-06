import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobDescriptions from '../pages/JobDescriptions';

test('renders Job Descriptions component', () => {
  render(<JobDescriptions />);
  expect(screen.getByText(/Job Descriptions/i)).toBeInTheDocument();
});

test('allows adding a new job description', () => {
  render(<JobDescriptions />);
  // Simulate adding a job description
  fireEvent.change(screen.getByPlaceholderText(/New Job Description/i), { target: { value: 'New Job' } });
  fireEvent.click(screen.getByText(/Add Job Description/i));
  // Check for success notification (mocking toast)
});
