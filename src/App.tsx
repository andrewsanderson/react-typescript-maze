import { useEffect, useState } from "react";
import "./App.css";
import Settings from "./Components/Settings";
import Maze from "./Models/Maze";
import MazeGrid from "./Components/MazeGrid"

function App() {

  const [width, setWidth] = useState<number>(5)
  const [height, setHeight ] = useState<number>(5)
  const [maze, setMaze] = useState<Maze>(new Maze({width, height}));

  useEffect(() => {
    setMaze(new Maze({width, height}));
  }, [width, height]);

  return (
    <div className="App">
      <Settings width={width} setWidth={setWidth} height={height} setHeight={setHeight} />
      <MazeGrid maze={maze} />
    </div>
  );
}

export default App;
