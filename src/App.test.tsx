import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import Card from './Card'

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



test('initial state is false', () =>{
  render (<App/>);
  const imgTags = screen.getAllByRole("img")
  
  for (const imgTag of  imgTags){
    expect(imgTag.src).toBe("https://api.dicebear.com/7.x/shapes/svg?seed=Harley")
  }
})