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

test('Card click', async() => {
  render (<Card {...cardProps}/>)
  const imgTags = screen.getAllByRole("img");
  expect(imgTags).toHaveLength(1);
  const myimg = imgTags[0];
  await userEvent.click(myimg);
  expect(cardProps.onClick).toHaveBeenCalledTimes(1);
  expect(cardProps.onClick).toHaveBeenCalledWith(cardProps.index);
})

test('back-front face', async() =>{
  render (<App/>);
  const imgTag = screen.getByRole("img", { name: /image_0/i });
  const myimg = imgTag;
  expect(imgTag.src).toEqual(backFace);
  await userEvent.click(myimg);
  expect(imgTag.src).toBe("https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger");
})
