import "./App.css";
import Maze from "./Components/Maze";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import purple from "@mui/material/colors/purple";
import styled from "styled-components";
import { darken } from "@mui/material/styles";

const AppContainer = styled("div")`
  background-color: ${darken(purple[900], 0.5)};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
        <Maze config={{ height: 5, width: 5 }} />
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
