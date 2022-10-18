import "./App.css";
import Maze from "./Components/Maze";

function App() {
  return (
    <div className="App">
      <Maze config={{ height: 5, width: 5 }} />
    </div>
  );
}

export default App;
