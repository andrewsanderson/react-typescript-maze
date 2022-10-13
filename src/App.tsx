import { useEffect, useState } from "react";
import "./App.css";
import Map, { WinConditions } from "./Models/Map";
import randomisedDepthFirst from "./Algorithms/Generators/randomisedDepthFirst";
import Maze from "./Components/Maze";
import Path from "./Models/Path";
import depthFirst from "./Algorithms/Solvers/depthFirstSimplified";

function App() {
  return (
    <div className="App">
      <Maze config={{ height: 5, width: 5 }} />
    </div>
  );
}

export default App;
