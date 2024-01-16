import React, {useState} from "react";
import "./App.css";
import Card from "./Card";


function App() {

  const [cardState, setCardState] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const [lastCardIndex, setLastCardIndex] = useState(-1);
  const buildCard = (index: number, imageSrc: string, id: number) => {
    return <Card imageSrc={imageSrc} index={index} state={cardState[index]} onClick={onCardClick}/>
  }

  const flipCard = (index: number, state:boolean) => {
    setCardState((cardState) => {
      const newState = [...cardState];
      newState[index] = state;
      return newState;
    })
  }

    
  const onCardClick = (index: number) => {
      console.log(`Card ${index} was clicked`);
      const newState = !cardState[index];
      flipCard(index, newState);

      if (newState === true && lastCardIndex !== -1 && lastCardIndex !== index) {
        setTimeout(() => {
          flipCard(lastCardIndex, false);
          flipCard(index, false);
          setLastCardIndex(-1);
        }, 500);
      }
      setLastCardIndex(index);
    }
    
    return (
      <div className="App">
        <header role="heading" aria-level={1} className="App-header">
          <p>
            Elephant game
          </p>
        </header>
        <div>
          <br/>
          <br/>
        </div>
        <div className= "App-cardContainer">
          {buildCard(0, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger", 1)}
          {buildCard(1, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger", 1)}
          {buildCard(2, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo", 2)}
          {buildCard(3, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo", 2)}
          <br/>
          {buildCard(4, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens", 3)}
          {buildCard(5, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens", 3)}
          {buildCard(6, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie", 4)}
          {buildCard(7, "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie", 4)}
          <br/>
          {buildCard(8,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy", 5)}
          {buildCard(9,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy", 5)}
          {buildCard(10,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal", 6)}
          {buildCard(11,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal", 6)}
          <br/>
          {buildCard(12,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball", 7)}
          {buildCard(13,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball", 7)}
          {buildCard(14,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack", 8)}
          {buildCard(15,"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack", 8)}
        </div>
      </div>
    );
}

export default App;
