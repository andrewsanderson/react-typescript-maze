import { useEffect, useState } from "react";
import "./App.css";
import Settings from "./Components/Settings";
import mazeGeneration from "./functions/maze/utils/mazeGeneration";
import Maze from "./Components/Maze";

function App() {
  const [mazeConfig, setMazeConfig] = useState<MazeConfig>({
    height: 5,
    width: 5,
  });

  const [maze, setMaze] = useState<Maze>(mazeGeneration(mazeConfig));

  useEffect(() => {
    setMaze(mazeGeneration(mazeConfig));
  }, [mazeConfig]);

  return (
    <div className="App">
      <Settings mazeConfigState={[mazeConfig, setMazeConfig]} />
      <Maze maze={maze} />
    </div>
  );
}

export default App;
