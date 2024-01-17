import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import Card, { ICardProps, backFace } from './Card';
import userEvent from "@testing-library/user-event";


const cardProps:ICardProps = {
  state:true,
  imageSrc: "https://api.dicebear.com/7.x/shapes/svg?seed=Harley",
  index: 1,
  onClick: jest.fn()
}

test('To have a title', () => {
  render(<App />);
  const title = screen.getByText("Elephant game");
  expect(title).toBeInTheDocument("Elephant game");
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
    expect(imgTag.src).toEqual(backFace);
  }
})

test('Card click callback', async() => {
  render (<Card {...cardProps}/>)
  const imgTags = screen.getAllByRole("img");
  expect(imgTags).toHaveLength(1);
  const myimg = imgTags[0];
  await userEvent.click(myimg);
  expect(cardProps.onClick).toHaveBeenCalledTimes(1);
  expect(cardProps.onClick).toHaveBeenCalledWith(cardProps.index);
})

test('back-front face on click', async() =>{
  render (<App/>);
  const myImg = screen.getByRole("img", { name: /image_0/i });
  expect(myImg.src).toEqual(backFace);
  await userEvent.click(myImg);
  expect(myImg.src).not.toBe(backFace);
})

test('image change on new game', async() => {
  render (<App/>);
  const myImg = screen.getByRole("img", { name: /image_0/i });
  const startButton = screen.getByRole("button", { name: /new game/i });
  await userEvent.click(myImg);
  const firstSrc = myImg.src
  await userEvent.click(startButton)
  const secondSrc = myImg.src
  expect(firstSrc).not.toBe(secondSrc)
})