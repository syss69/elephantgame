import React, { useState, useEffect } from "react";
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
];

interface GameTimer {
  maxTime: number;
  remainingTime: number;
}

function App() {
  const [pairs, setPairs] = useState(8);
  const [cardState, setCardState] = useState(Array(pairs * 2).fill(false));
  const [lastCardIndex, setLastCardIndex] = useState(-1);
  const [cardImages, setCardImages] = useState<Image[]>([
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
  ]);
  const [matchCount, setMatchCount] = useState(0); // used to count matches. so, if matchCount called for 8 times - you win a game
  const [pairClicks, setPairClicks] = useState(1); //pairClicks can't be more then 2, to avoid click on 3rd card
  const [totalClicks, setTotalClicks] = useState(1); // totalClicks used to count how many clicks is done by the user
  const [timer, setTimer] = useState<GameTimer>({
    maxTime: 30,
    remainingTime: 30,
  });
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    shuffleArray();
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

  const buildCards = () => {
    const cards: JSX.Element[] = [];
    let cardInRow = 0;
    for (let p = 0; p < pairs * 2; ++p) {
      cards.push(buildCard(p, cardImages[p]));
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
    let shuffledArray = [...cardImages];
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

    setCardImages(shuffledArray);
  };

  const incrementingPairClick = () => {
    //PairClicks is used to avoid click on 3rd card
    setPairClicks(pairClicks + 1);
  };

  const incrementingTotalClick = () => {
    setTotalClicks(totalClicks + 1);
    console.log("You clicked", totalClicks, "times"); // totalClicks is used to count how many clicks do user for game
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
    setCardState(Array(pairs * 2).fill(false));
    setPairClicks(1);
    setTotalClicks(1);
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
    stopTimer();
    const score = timer.remainingTime * 100;
    if (totalClicks <= pairs * 4.5) {
      alert(
        `You win! Your score is ${score}+ bonus 50 points. Your total score is ${score + 50}`,
      );
    } else {
      alert(`You win! Your score is ${score} without any bonus points:(`);
    }
  };

  const loseGame = () => {
    stopTimer();
    alert("Time's up! Game over.");
    // show answer
    setCardState(Array(pairs * 2).fill(true));
  };

  const onCardClick = (index: number) => {
    if (!timerId && matchCount !== pairs) {
      startTimer();
    }
    if (cardState[index] !== true && pairClicks < 3) {
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
            setPairClicks(1);
          }, 100);
        } else {
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
  };

  const handleChangeTimer = (event: SelectChangeEvent) => {
    const selectedValue = parseInt(event.target.value, 10);
    setTimer({ maxTime: selectedValue, remainingTime: selectedValue });
  };

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
              <InputLabel id="select-label">Timer</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
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
        </div>

        <p id="timer">{`Only ${timer.remainingTime} seconds left!`}</p>
      </div>
      <div className="App-cardContainer">
        <Box sx={{ width: "100%" }}>{buildCards()}</Box>
      </div>
    </div>
  );
}

export default App;
