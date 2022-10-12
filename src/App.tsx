import { useEffect, useState } from "react";
import "./App.css";
import Map, { WinConditions } from "./Models/Map";
import randomisedDepthFirst from "./Algorithms/Generators/randomisedDepthFirst";
import Maze from "./Components/Maze";

const maze = new Map({ width: 5, height: 5 });
const winConditions: WinConditions = (node) => {
  return node.id === 24;
};
randomisedDepthFirst(maze, winConditions);

function App() {
  return (
    <div className="App">
      <Maze maze={maze} />
    </div>
  );
}

export default App;
