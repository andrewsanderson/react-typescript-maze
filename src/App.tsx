import { useState } from "react";
import "./App.css";
import Settings from "./Components/Settings";
import mazeGeneration from "./functions/mazeUtils/mazeGeneration";

function App() {
  const mazeSettingsState = useState<MazeSettings>({
    height: 5,
    width: 5,
  });
  return (
    <div className="App">
      <Settings mazeSettingsState={mazeSettingsState} />
      <pre>{JSON.stringify(mazeGeneration(mazeSettingsState[0]), null, 2)}</pre>
    </div>
  );
}

export default App;
