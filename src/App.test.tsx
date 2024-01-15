import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import Card, { ICardProps } from './Card';
import userEvent from "@testing-library/user-event";

const cardProps:ICardProps = {
  state:true,
  imageSrc: "https://api.dicebear.com/7.x/shapes/svg?seed=Harley",
  index: 1,
  onClick: jest.fn()
}

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
  const imgTags = screen.getAllByRole("img");
  
  for (const imgTag of  imgTags){
    expect(imgTag.src).toBe("https://api.dicebear.com/7.x/shapes/svg?seed=Harley")
  }
})

test('Card click', async() => {
  render (<Card {...cardProps}/>)
  const imgTags = screen.getAllByRole("img");
  expect(imgTags).toHaveLength(1);
  const myimg = imgTags[0];
  await userEvent.click(myimg);
  expect(cardProps.onClick).toHaveBeenCalledTimes(1);
  expect(cardProps.onClick).toHaveBeenCalledWith(cardProps.index);
})