import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('To have a title', () => {
  render(<App />);
  const title = screen.getByRole("title")
  expect(title).toBeInTheDocument(<p role="title">Elephant game</p>);
});

test('16 images', () => {
  render(<App />);
  const imgTags = screen.getAllByRole("img");
  expect(imgTags).toHaveLength(16);
})
