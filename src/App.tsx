import React, {useState, useEffect} from "react";
import "./App.css";
import Card from "./Card";


function App() {

  const [cardState, setCardState] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const [lastCardIndex, setLastCardIndex] = useState(-1);
  const [cardImages, setCardImages] = useState([
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball",
                      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack"
                    ]);
  const [callCount, setCallCount] = useState(0);
  const [clicks, setClicks] = useState(1);



  const buildCard = (index: number, imageSrc: string) => {
    return <Card imageSrc={imageSrc} index={index} state={cardState[index]} onClick={onCardClick}/>
  }
  
  const shuffleArray = () => {
    let shuffledArray = [...cardImages];
    let currentIndex = shuffledArray.length,  randomIndex;
    while (currentIndex > 0) {  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ]
    }
  
    setCardImages(shuffledArray);
  }

  useEffect(() => {
    shuffleArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // executes on 'mount' []); // executes on 'mount'

  const clickCount = () => {
    setClicks(clicks + 1);
    console.log('You clicked', clicks, 'times')
  }
 
  const matchCount = () => {
    if (callCount <= 7) {
      setCallCount(callCount + 1);
      console.log('Match!', callCount+1);
    }
    if (callCount === 7) {
      alert("You win!");
    }
  };


  
  const flipCard = (index: number, state:boolean) => {
    setCardState((cardState) => {
      const newState = [...cardState];
      newState[index] = state;
      return newState;
    })
  }


  const onCardClick = (index: number) => {
      clickCount();
      const newState = !cardState[index];
      flipCard(index, newState);

      if (newState === true && lastCardIndex !== -1 && lastCardIndex !== index) {
        const sameImages = cardImages[lastCardIndex] === cardImages[index];
            setTimeout(() => {
              if (!sameImages) {
                flipCard(lastCardIndex, false);
                flipCard(index, false); 
              }
              else{
                matchCount();
              }           
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
          <button type="button" onClick={shuffleArray}>New game</button>
          <br/>
        </div>
        <div className= "App-cardContainer">
          {buildCard(0, cardImages[0])}
          {buildCard(1, cardImages[1])}
          {buildCard(2, cardImages[2])}
          {buildCard(3, cardImages[3])}
          <br/>
          {buildCard(4, cardImages[4])}
          {buildCard(5, cardImages[5])}
          {buildCard(6, cardImages[6])}
          {buildCard(7, cardImages[7])}
          <br/>
          {buildCard(8,cardImages[8])}
          {buildCard(9,cardImages[9])}
          {buildCard(10,cardImages[10])}
          {buildCard(11,cardImages[11])}
          <br/>
          {buildCard(12,cardImages[12])}
          {buildCard(13,cardImages[13])}
          {buildCard(14,cardImages[14])}
          {buildCard(15,cardImages[15])}
        </div>
      </div>
    );
}

export default App;