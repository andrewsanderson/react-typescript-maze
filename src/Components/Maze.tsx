import { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Graph";
import Cell from "./Cell";
import Settings from "./Settings/Settings";
import common from "@mui/material/colors/common";
import { algorithmBuilder, generators, solvers } from "../Algorithms";
import defaultSolution from "../Algorithms/Framework/Conditionals/lastNodeFound";
import { Recursive } from "../Algorithms/Framework/RecursiveConstructor";
import { Iterative } from "../Algorithms/Framework/IterativeConstructor";
import Plot from "../Models/Plot";

const Row = styled("div")`
  display: flex;
`;

export type settings = {
  height: number;
  width: number;
  generator: {
    type: "iterative" | "recursive";
    method: keyof typeof generators;
  };
  solver: { type: "iterative" | "recursive"; method: keyof typeof solvers };
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
  const randomisedDepthFirstSolver = algorithmBuilder(
    "iterative",
    "randomisedDepthFirst"
  );

  const depthFirstSolver = algorithmBuilder(
    "iterative",
    "depthFirst",
    defaultSolution
  );

  const settingsState = useState<settings>({
    width: 6,
    height: 6,
    generator: { type: "iterative", method: "randomisedDepthFirst" },
    solver: { type: "iterative", method: "depthFirst" },
  });

  const maze = new Graph({
    width: settingsState[0].width,
    height: settingsState[0].height,
  });

  const plot = useState<Plot>();

  const [mazeState, setMazeState] = useState<Graph>(maze);

  const [settings] = settingsState;

  const {
    width,
    height,
    generator: { type: gtype, method: gmethod },
    solver: { type: stype, method: smethod },
  } = settings;

  useEffect(() => {
    const maze = new Graph({
      width: width,
      height: height,
    });

    const generator = algorithmBuilder(gtype, gmethod);

    generator(maze);

    setMazeState(maze);
  }, [width, height, gtype, gmethod]);

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
      <Settings
        settingsState={settingsState}
        plotState={plot}
        maze={mazeState}
      />
    </Wrapper>
  );
};

export default Maze;
