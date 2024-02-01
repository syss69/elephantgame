import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Card, { Image } from "./Card";
import {
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from "@mui/material/";

const sourceFront = "https://api.dicebear.com/7.x/fun-emoji/svg?seed=";

const images = [
  { src: `${sourceFront}Ginger`, id: 0 }, //same as sourceFront + "Ginger"
  { src: `${sourceFront}Cleo`, id: 1 },
  { src: `${sourceFront}Mittens`, id: 2 },
  { src: `${sourceFront}Charlie`, id: 3 },
  { src: `${sourceFront}Lucy`, id: 4 },
  { src: `${sourceFront}Rascal`, id: 5 },
  { src: `${sourceFront}Snowball`, id: 6 },
  { src: `${sourceFront}Jack`, id: 7 },
  { src: `${sourceFront}Salem`, id: 8 },
  { src: `${sourceFront}Misty`, id: 9 },
  { src: `${sourceFront}Abby`, id: 10 },
  { src: `${sourceFront}Coco`, id: 11 }
];

const fullCardArray= [
  images[0],
  images[0],
  images[1],
  images[1],
  images[2],
  images[2],
  images[3],
  images[3],
  images[4],
  images[4],
  images[5],
  images[5],
  images[6],
  images[6],
  images[7],
  images[7],
  images[8],
  images[8],
  images[9],
  images[9],
  images[10],
  images[10],
  images[11],
  images[11]
];

const shuffle = (originalArray:Image[]) => {
  let shuffledArray = [...originalArray];
  let currentIndex = shuffledArray.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
};

interface GameTimer {
  maxTime: number;
  remainingTime: number;
}

function App() {
  const [pairs, setPairs] = useState(8);
  const [cardState, setCardState] = useState(Array(pairs * 2).fill(false));
  const [lastCardIndex, setLastCardIndex] = useState(-1);
  
  const [cardImages, setCardImages] = useState(
    fullCardArray.slice(0, pairs*2)
  );
  const [matchCount, setMatchCount] = useState(0); // used to count matches. so, if matchCount called for 8 times - you win a game
  const [pairClicks, setPairClicks] = useState(0); //pairClicks can't be more then 2, to avoid click on 3rd card
  const [totalClicks, setTotalClicks] = useState(0); // totalClicks used to count how many clicks is done by the user
  const [timer, setTimer] = useState<GameTimer>({
    maxTime: 30,
    remainingTime: 30,
  });
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const [bestScore, setBestScore] = useState(0);


  useEffect(() => {
    shuffleArray();
    const bestScore = localStorage.getItem('bestscore');
    if(bestScore !== null){
      setBestScore(parseInt(bestScore))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // executes on 'mount'

  const buildCard = (index: number, image: Image) => {
    return (
      <Card
        image={image}
        index={index}
        state={cardState[index]}
        onClick={onCardClick}
      />
    );
  };

  const initCardState = useCallback((state:boolean) => {
    setCardState(Array(pairs * 2).fill(state));
  }, [pairs]);

  useEffect(() => {
    initCardState(false);
  }, [initCardState])

  const buildCards = () => {
    const cards: JSX.Element[] = [];
    let cardInRow = 0;
    for (let p = 0; p < pairs * 2; ++p) {
      const currentImage = cardImages[p];
      cards.push(buildCard(p, currentImage));
      ++cardInRow;
      if (cardInRow === 4) {
        cards.push(<br />);
        cardInRow = 0;
      }
    }
    return cards;
  };

  const startTimer = () => {
    let tt = timer.maxTime;
    setTimerId(
      setInterval(() => {
        if (tt > 0) {
          --tt;
          setTimer({ ...timer, remainingTime: tt });
          if (tt <= 0) {
            loseGame();
          }
        }
      }, 1000),
    );
  };

  const stopTimer = () => {
    // stop loop
    if (timerId) {
      clearInterval(timerId);
    }
    // reset timer
    setTimer({ maxTime: timer.maxTime, remainingTime: timer.maxTime });
    setTimerId(undefined);
  };

  const shuffleArray = () => {
    setCardImages(shuffle(cardImages));
  };

  const incrementingPairClick = () => {
    //PairClicks is used to avoid click on 3rd card
    setPairClicks(pairClicks + 1);
  };

  const incrementingTotalClick = () => {
    setTotalClicks(totalClicks + 1);
    console.log("You clicked", totalClicks + 1, "times"); // totalClicks is used to count how many clicks do user for game
  };

  const increaseMatchCount = () => {
    if (matchCount <= pairs - 1) {
      const newCount = matchCount + 1;
      setMatchCount(newCount);
      console.log("Match!", newCount);
      if (newCount === pairs) {
        winGame();
      }
    }
  };

  const newGame = () => {
    initCardState(false);
    setPairClicks(0);
    setTotalClicks(0);
    setMatchCount(0);
    stopTimer();
    shuffleArray();
  };

  const flipCard = (index: number, state: boolean) => {
    setCardState((cardState) => {
      const newState = [...cardState];
      newState[index] = state;
      return newState;
    });
  };

  const winGame = () => {
    scoreCount();
    stopTimer();
  };

  const loseGame = () => {
    stopTimer();
    alert("Time's up! Game over.");
    // show answer
    initCardState(true);
  };

  const calculateScore = (timerBonus: number, clickBonus: number, pairsBonus: number): number => {
    let score = timer.remainingTime * timerBonus * pairsBonus;
  
    if (totalClicks <= pairs * 4.5) {
      const lastScore = score + clickBonus;
      alert(`You win! Your score is ${score}+ bonus ${clickBonus} points. Your total score is ${lastScore}`);
      score = lastScore;
    } 
    else {
      alert(`You win! Your score is ${score} without any bonus points:(`);
    }
    return score;
  };
  
  const scoreCount = () => {
    let timerBonus: number = 0;
  
    if (timer.maxTime === 30) {
      timerBonus = 100;
    } 
    else if (timer.maxTime === 40) {
      timerBonus = 50;   
    } 
    else if (timer.maxTime === 50) {
      timerBonus = 33;
    }
    let pairsBonus: number = 0;
    let clickBonus: number = 0;
    
    if (pairs === 8){
      pairsBonus = 1;
      clickBonus = 50;
    } 
    else if (pairs === 10){
      pairsBonus = 1.5;
      clickBonus = 100;
    }
    else if(pairs === 12){
      pairsBonus =2;
      clickBonus = 150;
    }
  
    const score: number = calculateScore(timerBonus, clickBonus, pairsBonus);
    console.log(`Score - ${score}, timerBonus - 0.${timerBonus}, clickBonus${clickBonus}, pairsBonus ${pairsBonus}`)
    if (bestScore !== null && bestScore < score) {
      setBestScore(score);
      localStorage.setItem('bestscore', score.toString());

    }
  
  };
  

  const onCardClick = (index: number) => {
    if (!timerId && matchCount !== pairs) {
      startTimer();
    }
    if (cardState[index] !== true && pairClicks < 2) {
      incrementingTotalClick();
      incrementingPairClick();
      const newState = !cardState[index];
      flipCard(index, newState);

      if (
        newState === true &&
        lastCardIndex !== -1 &&
        lastCardIndex !== index
      ) {
        const sameImages = cardImages[lastCardIndex] === cardImages[index];
        if (sameImages) {
          setTimeout(() => {
            increaseMatchCount();
            setLastCardIndex(-1);
            setPairClicks(0);
          }, 100);
        } else {
          setTimeout(() => {
            flipCard(lastCardIndex, false);
            flipCard(index, false);
            setLastCardIndex(-1);
            setPairClicks(0);
          }, 500);
        }
      }

      setLastCardIndex(index);
    }
  };

  const handleChangeTimer = (event: SelectChangeEvent) => {
    const selectedValue = parseInt(event.target.value, 10);
    stopTimer();
    setTimer({ maxTime: selectedValue, remainingTime: selectedValue });
  };

  const handleChangePairs = (event: SelectChangeEvent) => {
    const selectedValue = parseInt(event.target.value, 10);
    setPairClicks(0);
    setTotalClicks(0);
    setMatchCount(0);
    setCardImages(
      shuffle(fullCardArray.slice(0, selectedValue*2))
    );
    setPairs(selectedValue);
    stopTimer();
  }

  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <p>Elephant game</p>
      </header>
      <div>
        <br />
        <Button type="button" variant="contained" onClick={newGame}>
          New game
        </Button>
        <br />
        <div className="select-div">
          <Box sx={{ maxWidth: 200, marginTop: "1rem" }}>
            <FormControl fullWidth>
              <InputLabel id="select-timer-label">Timer</InputLabel>
              <Select
                labelId="select-timer-label"
                id="simple-timer-select"
                value={timer.maxTime.toString()}
                label="timer"
                onChange={handleChangeTimer}
              >
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={40}>40 seconds</MenuItem>
                <MenuItem value={50}>50 seconds</MenuItem>
              </Select>
              </FormControl>
            </Box>
            <Box sx={{ maxWidth: 200, marginTop: "1rem" }}>
              <FormControl fullWidth>                
                <InputLabel id="select-pairs-label">Pairs</InputLabel>
                  <Select
                    labelId="select-pairs-label"
                    id="simple-pairs-select"
                    value={pairs.toString()}
                    label="pairs"
                    onChange={handleChangePairs}
                  >
                <MenuItem value={8}>8 pairs </MenuItem>
                <MenuItem value={10}>10 pairs</MenuItem>
                <MenuItem value={12}>12 pairs</MenuItem>
                  </Select>
            </FormControl>
          </Box>
        </div>

        <p id="timer">{`Only ${timer.remainingTime} seconds left!`}</p>
      </div>
      <p>
      {(bestScore && bestScore !== 0) ? `Your best score is ${bestScore}` : null}    
      </p>
      <div className="App-cardContainer">
        <Box sx={{ width: "100%" }}>{buildCards()}</Box>
      </div>
    </div>
  );
}

export default App;
