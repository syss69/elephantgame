import React from "react";
import "./App.css";
import Card from "./Card";

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
      <div className= "App-cardContainer">
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger" index={1} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ginger" index={2} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo" index={3} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cleo"  index={4} state={false}/>
        <br />
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens" index={5} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mittens" index={6} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie"  index={7} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Charlie" index={8}  state={false}/>
        <br />
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy" index={9} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucy"   index={10} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal"  index={11} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rascal"  index={12} state={false}/>
        <br />
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball" index={13}  state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Snowball"  index={14} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack" index={15} state={false}/>
        <Card imageSrc="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack" index={16} state={false}/>
      </div>
    </div>
  );
}

export default App;
