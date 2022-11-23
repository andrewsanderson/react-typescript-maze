import Maze from "./Components/MazeComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import purple from "@mui/material/colors/purple";
import styled from "styled-components";
import { darken } from "@mui/material/styles";
import KeyComponent from "./Components/KeyComponent";

const AppContainer = styled("div")`
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1011%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='rgba(73%2c 64%2c 81%2c 1)'%3e%3c/rect%3e%3cpath d='M0 0L377.04 0L0 310.7z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 310.7L377.04 0L968.9200000000001 0L0 530.85z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 530.85L968.9200000000001 0L1085.14 0L0 540.4300000000001z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 540.4300000000001L1085.14 0L1259.0700000000002 0L0 655.1z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1920 1080L1796.29 1080L1920 731.6700000000001z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1920 731.6700000000001L1796.29 1080L1788.24 1080L1920 445.6500000000001z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1920 445.6500000000001L1788.24 1080L1329.3 1080L1920 353.2800000000001z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1920 353.2800000000001L1329.3 1080L440.88 1080L1920 101.18000000000009z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1011'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
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
