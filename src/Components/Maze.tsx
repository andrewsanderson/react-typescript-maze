import { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Graph";
import Cell from "./Cell";
import randomisedDepthFirst from "../Algorithms/Generators/randomisedDepthFirst";
import depthFirstR from "../Algorithms/Solvers/depthFirst";
import iterativeConstructor from "../Algorithms/Framework/iterative";
import { Iterative, Recursive } from "../Algorithms/Framework";
import Settings from "./Settings/Settings";
import common from "@mui/material/colors/common";

const Row = styled("div")`
  display: flex;
`;

export type settings = {
  height: number;
  width: number;
  solver: Recursive | Iterative;
  generator: Recursive | Iterative;
};

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  height: 100%;

  padding-left: 10%;
  padding-right: 10%;
`;

const MazeContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
  min-width: 50%;
`;
const MazeBorder = styled("div")`
  border: 2px solid ${common.white};
`;

const Maze = () => {
  const settings = useState<settings>({
    width: 6,
    height: 6,
    solver: randomisedDepthFirst(iterativeConstructor),
    generator: randomisedDepthFirst(iterativeConstructor),
  });
  const [mazeState, setMazeState] = useState<Graph>(
    new Graph({
      width: settings[0].width,
      height: settings[0].height,
    })
  );

  useEffect(() => {
    const newState = new Graph({
      width: settings[0].width,
      height: settings[0].height,
    });
    setMazeState(randomisedDepthFirst(iterativeConstructor)(newState) as Graph);
  }, [settings[0].width, settings[0].height]);

  const step = () => {
    setMazeState({ ...depthFirstR(iterativeConstructor)(mazeState) } as Graph);
  };

  return (
    <Wrapper>
      <MazeContainer>
        <MazeBorder>
          {[...Array(mazeState.height).keys()].map((yVal) => {
            return (
              <Row key={yVal}>
                {mazeState.cells
                  .filter((cell) => {
                    return cell.coordinates.y === yVal;
                  })
                  .map((cell) => {
                    return <Cell key={cell.id} cell={cell} />;
                  })}
              </Row>
            );
          })}
        </MazeBorder>
      </MazeContainer>
      <Settings settingsState={settings} />
    </Wrapper>
  );
};

export default Maze;
