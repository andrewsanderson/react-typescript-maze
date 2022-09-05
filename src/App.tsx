import { useEffect, useState } from "react";
import "./App.css";
import Settings from "./Components/Settings";
import mazeGeneration from "./functions/mazeUtils/mazeGeneration";
import Maze from "./Components/Maze";

function App() {
  const [mazeSettings, setMazeSettings] = useState<MazeSettings>({
    height: 5,
    width: 5,
  });

  const [maze, setMaze] = useState<Maze>(mazeGeneration(mazeSettings));

  useEffect(() => {
    setMaze(mazeGeneration(mazeSettings));
  }, [mazeSettings]);

  return (
    <div className="App">
      <Settings mazeSettingsState={[mazeSettings, setMazeSettings]} />
      <Maze maze={maze} mazeSettings={mazeSettings} />
    </div>
  );
}

export default App;
