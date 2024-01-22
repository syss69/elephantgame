import React, {useState, useEffect} from "react";
import "./App.css";
import Card, {Image} from "./Card";



const images = [
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger", id:0},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo", id:1},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens", id:2},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie", id:3},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy", id:4},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal", id:5},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball", id:6},
  {src:"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack", id:7},
]


function App() {

  const [cardState, setCardState] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const [lastCardIndex, setLastCardIndex] = useState(-1);
  const [cardImages, setCardImages] = useState<Image[]>([
    images[0],
    images[1],
    images[2],
    images[3],
    images[4],
    images[5],
    images[6],
    images[7],
    images[0],
    images[1],
    images[2],
    images[3],
    images[4],
    images[5],
    images[6],
    images[7],
  ]);
  const [callCount, setCallCount] = useState(0);
  const [clicks, setClicks] = useState(1);  //clicks can't be more then 2, i use it to avoid click on 3rd card
  const [clicks1, setClicks1] = useState(1);  // clicks1 used to count how many clicks do user for game


  const buildCard = (index: number, image: Image) => {
    return <Card image={image} index={index} state={cardState[index]} onClick={onCardClick}/>
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
  }, []); // executes on 'mount'

  const incrementingClick = () => { //i use clicks to avoid click on 3rd card
    setClicks(clicks + 1);
  }
 
  const incrementingClick1 = () => {
    setClicks1(clicks1 + 1);
    console.log('You clicked', clicks1, 'times') // i use clicks1 to count how many clicks do user for game
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

  const setFalse = () => {
    setCardState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  }
  
  const flipCard = (index: number, state:boolean) => {
    setCardState((cardState) => {
      const newState = [...cardState];
      newState[index] = state;
      return newState;
    })
  }


  const onCardClick = (index: number) => {
    if (cardState[index] !== true && clicks < 3){
      incrementingClick();
      incrementingClick1();
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
              setClicks(1);
          }, 500);
    }
      
      setLastCardIndex(index);
    }
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
          <button type="button" onClick={event => {shuffleArray(); setFalse()}}>New game</button>
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