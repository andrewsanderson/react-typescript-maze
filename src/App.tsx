import "./App.css";
import Maze from "./Components/Maze";

import styled from "styled-components";

const AppContainer = styled("div")`
  background: rgb(56, 6, 20);
  background: linear-gradient(
    0deg,
    rgba(56, 6, 20, 1) 0%,
    rgba(78, 18, 117, 1) 100%
  );
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

function App() {
  return (
    <AppContainer className="App">
      <Maze config={{ height: 5, width: 5 }} />
    </AppContainer>
  );
}

export default App;
