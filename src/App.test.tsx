import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const title = screen.getByRole("title")
  expect(title).toBeInTheDocument(<p role="title">Elephant game</p>);
});
