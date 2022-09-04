import { useState } from "react";
import "./App.css";
import Settings from "./Components/Settings";

function App() {
  const mazeSettingsState = useState<MazeSettings>({
    height: 5,
    width: 5,
  });
  return (
    <div className="App">
      Blank Project
      <Settings mazeSettingsState={mazeSettingsState} />
    </div>
  );
}

export default App;
