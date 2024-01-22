import { render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import App from './App';
import Card, { ICardProps, backFace } from './Card';
import userEvent from "@testing-library/user-event";


const cardProps:ICardProps = {
  state:true,
  image: {src:"https://api.dicebear.com/7.x/shapes/svg?seed=Harley",id:0},
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
  const myImg = screen.getByRole("img", { name: /^image_0$/i });
  expect(myImg.src).toEqual(backFace);
  await userEvent.click(myImg);
  expect(myImg.src).not.toBe(backFace);
})

test('image change on new game', async() => {
  render (<App/>);
  const firstImagePair = screen.getAllByTestId("0");
  const fipId =firstImagePair[0].getAttribute(`id`);
  const fipId1 =  firstImagePair[1].getAttribute(`id`);
  await userEvent.click(screen.getByRole("button", { name: /new game/i }))
  const secondImagePair = screen.getAllByTestId("0");
  const sipID = secondImagePair[0].getAttribute(`id`);
  const sipID1 = secondImagePair[1].getAttribute(`id`);
  expect(fipId).not.toEqual(sipID);
  if(fipId === sipID){
    expect(fipId1).not.toEqual(sipID1);
  }
  /*const myImg = screen.getByRole("img", { name: /^image_0$/i });
  const startButton = screen.getByRole("button", { name: /new game/i });
  await userEvent.click(myImg);
  const firstSrc = myImg.src;
  await userEvent.click(startButton);
  await userEvent.click(myImg);
  const secondSrc = myImg.src;
  expect(firstSrc).not.toBe(secondSrc);*/
})


test('Pairs stay flipped', async() => {
  render (<App/>);
  let foundPair = false;
  const imagePair = screen.getAllByTestId("0");
  expect(imagePair).toHaveLength(2);
  await userEvent.click(imagePair[0]);
  await userEvent.click(imagePair[1]);
  expect(imagePair[1].src).toEqual(imagePair[0].src);
  await userEvent.click(imagePair[1]);
  expect(imagePair[1].src).toEqual(imagePair[0].src); // not manually flipped back

  // wait for the card to auto flip back
  await new Promise((r) => setTimeout(r, 600));
  expect(imagePair[1].src).toEqual(imagePair[0].src); // not auto flipped back
});

test('Click on flipped card is prohibited', async() => {
  render(<App/>);
  const myImg = screen.getByRole("img", { name: /^image_0$/i });
  expect(myImg.src).toBe(backFace); // face down
  await userEvent.click(myImg); //click to flip card
  const frontFace = myImg.src;
  expect(frontFace).not.toBe(backFace); // face up
  await userEvent.click(myImg); //click on flipped card, it should not flip back again
  expect(myImg.src).not.toBe(backFace); 
  expect(myImg.src).toBe(frontFace); 
});

test('Flip  more than 2 cards is prohibited', async() => {
  render(<App/>);
  const myImg0 = screen.getByRole("img", { name: /^image_0$/i });
  const myImg1 = screen.getByRole("img", { name: /^image_1$/i });
  const myImg2 = screen.getByRole("img", { name: /^image_2$/i });
  await userEvent.click(myImg0); //click on 1 card
  await userEvent.click(myImg1); //click on 2 cards
  await userEvent.click(myImg2); //click on 3 cards
  expect(myImg0.src).not.toBe(backFace); 
  expect(myImg1.src).not.toBe(backFace);
  expect(myImg2.src).toBe(backFace);
})
 