import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <p role="title">
          Elephant game
        </p>
      </header>
      <div>
        <br/>
        <br/>
      </div>
      <div>
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger" height="auto" width={150} alt="Smile" id='smile' />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger" height="auto" width={150} alt="Smile" id='smile' />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo" height="auto" width={150} alt="Star Eyes" id='stars' />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo" height="auto" width={150} alt="Star Eyes" id='stars' />
        <br />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens" height="auto" width={150} alt="Sunglasses" id="sunglasses" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens" height="auto" width={150} alt="Sunglasses" id="sunglasses" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie" height="auto" width={150} alt="Sad Face" id="sadFAce" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie" height="auto" width={150} alt="Sad Face" id="sadFace" />
        <br />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy" height="auto" width={150} alt="Eal" id="eal" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy" height="auto" width={150} alt="Eal" id="eal" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal" height="auto" width={150} alt="Wink" id="wink" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal" height="auto" width={150} alt="Wink" id="wink" />
        <br />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball" height="auto" width={150} alt="Kiss" id="Kiss" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball" height="auto" width={150} alt="Kiss" id="Kiss" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack" height="auto" width={150} alt="Angry" id="Angry" />
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack" height="auto" width={150} alt="Angry" id="Angry" />
      </div>
    </div>
  );
}

export default App;
