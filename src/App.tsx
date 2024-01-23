import React, {useState, useEffect} from "react";
import "./App.css";
import Card, {Image} from "./Card";



const sourceFront = "https://api.dicebear.com/7.x/fun-emoji/svg?seed=";

const images = [
  {src:`${sourceFront}Ginger`, id:0},   //same as sourceFront + "Ginger"
  {src:`${sourceFront}Cleo`, id:1},
  {src:`${sourceFront}Mittens`, id:2},
  {src:`${sourceFront}Charlie`, id:3},
  {src:`${sourceFront}Lucy`, id:4},
  {src:`${sourceFront}Rascal`, id:5},
  {src:`${sourceFront}Snowball`, id:6},
  {src:`${sourceFront}Jack`, id:7},
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
  const [matchCount, setMatchCount] = useState(0); // callCount used for count matches. so, if matchCount called for 8 times - you win a game
  const [pairClicks, setPairClicks] = useState(1);  //pairClicks can't be more then 2, to avoid click on 3rd card
  const [totalClicks, setTotalClicks] = useState(1);  // totalClicks used to count how many clicks do user for game
  const [timer, setTimer] = useState(30);
  const [timerStarted, setTimerStarted] = useState(false);

  const buildCard = (index: number, image: Image) => {
    return <Card image={image} index={index} state={cardState[index]} onClick={onCardClick}/>
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timerStarted && timer > 0) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);
    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(timerId);
  }, [timer, timerStarted]);

  useEffect(() => {
    setTimer(30);
    setTimerStarted(false);
  }, [cardImages]);

  useEffect(() => {
    if (timer === 0) {
      setCardState([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]); 
      alert("Time's up! Game over.");
    }
  }, [timer, setCardState]);

  const startTimer = () => {
    setTimerStarted(true);
  };
  
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

  const incrementingPairClick = () => { //PairClicks is used to avoid click on 3rd card
    setPairClicks(pairClicks + 1);
  }
 
  const incrementingTotalClick = () => {
    setTotalClicks(totalClicks + 1);
    console.log('You clicked', totalClicks, 'times') // totalClicks is used to count how many clicks do user for game
  }

  const increaseMatchCount = () => {
    if (matchCount <= 7) {
      setMatchCount(matchCount + 1);
      console.log('Match!', matchCount+1);
    }
    if (matchCount === 7) {
      winMessage();
    }
  };
  const newGame = () => {
    setCardState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    setPairClicks(1);
    setTotalClicks(1);
    setMatchCount(0);
  }
  
  const flipCard = (index: number, state:boolean) => {
    setCardState((cardState) => {
      const newState = [...cardState];
      newState[index] = state;
      return newState;
    })
  }

  const winMessage = () => {
    const score = timer*100;
    if(totalClicks <= 34){
      alert(`You win! Your score is ${score}+ bonus 50 points. Your total score is ${score+50}`);
    }
    else{
      alert(`You win! Your score is ${score} without any bonus points:(`);
    }
    setTimerStarted(false);
  }

  const onCardClick = (index: number) => {
    if(timerStarted === false){
      startTimer();
    }
      if (cardState[index] !== true && pairClicks < 3){
        incrementingTotalClick();
        incrementingPairClick();
        const newState = !cardState[index];
        flipCard(index, newState);
  
        if (newState === true && lastCardIndex !== -1 && lastCardIndex !== index) {
          const sameImages = cardImages[lastCardIndex] === cardImages[index];
          if(sameImages){
            increaseMatchCount();
            setTimeout(() => {
              setLastCardIndex(-1);
              setPairClicks(1);
            }, 500);
          }
          else{
            setTimeout(() => {
                flipCard(lastCardIndex, false);
                flipCard(index, false);     
              setLastCardIndex(-1);
              setPairClicks(1);
            }, 500);
          }
              
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
          <button type="button" onClick={event => {shuffleArray(); newGame()}}>New game</button>
          <p id="timer">Left {timer} seconds!</p>
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