import { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Graph";
import Cell from "./Cell";
import Settings from "./Settings/Settings";
import common from "@mui/material/colors/common";
import { builder } from "../Algorithms";
import defaultSolution from "../Algorithms/Framework/Conditionals/lastNodeFound";

const Row = styled("div")`
  display: flex;
`;

export type settings = {
  height: number;
  width: number;
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
  const settingsState = useState<settings>({
    width: 6,
    height: 6,
  });

  const maze = new Graph({
    width: settingsState[0].width,
    height: settingsState[0].height,
  });

  const randomisedDepthFirstSolver = builder(
    "iterative",
    "randomisedDepthFirst"
  );
  randomisedDepthFirstSolver(maze);

  const [mazeState, setMazeState] = useState<Graph>(maze);

  const [settings] = settingsState;

  const { width, height } = settings;

  console.log(mazeState);

  useEffect(() => {
    const maze = new Graph({
      width: width,
      height: height,
    });

    const randomisedDepthFirstGenerator = builder(
      "iterative",
      "randomisedDepthFirst"
    );

    randomisedDepthFirstGenerator(maze);

    setMazeState(maze);
  }, [width, height]);

  const depthFirstSolver = builder("iterative", "depthFirst", defaultSolution);
  console.log(depthFirstSolver(maze));
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
      <Settings settingsState={settingsState} />
    </Wrapper>
  );
};

export default Maze;
