import Maze from "./Components/MazeComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import purple from "@mui/material/colors/purple";
import styled from "styled-components";
import { darken } from "@mui/material/styles";
import KeyComponent from "./Components/KeyComponent";

const AppContainer = styled("div")`
  background-color: #26262;
  padding-top: 100px;
  @media (max-width: 1150px) {
    overflow-y: scroll;
    padding-top: 0px;
  }
`;

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <AppContainer className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Maze />
        </div>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
