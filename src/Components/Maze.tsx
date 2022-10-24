import { useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Graph";
import Cell from "./Cell";
import randomisedDepthFirst from "../Algorithms/Generators/randomisedDepthFirst";
import depthFirstR from "../Algorithms/Solvers/depthFirst";
import iterativeConstructor from "../Algorithms/Framework/iterative";
import { Iterative, Recursive } from "../Algorithms/Framework";
import Settings from "./Settings/Settings";

const Row = styled.div`
  display: flex;
`;

export type settings = {
  height: number;
  width: number;
  solver: Recursive | Iterative;
  generator: Recursive | Iterative;
};

type MazeProps = {
  config: {
    height: number;
    width: number;
  };
};

const Maze = ({ config }: MazeProps) => {
  const settings = useState<settings>({});
  const MazeContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const width = 6;
  const height = 6;
  const maze = new Graph({ width: width, height: height });

  randomisedDepthFirst(iterativeConstructor)(maze);
  maze.resetPath();

  const [mazeState, setMazeState] = useState<Graph>(maze);

  const step = () => {
    setMazeState({ ...depthFirstR(iterativeConstructor)(mazeState) } as Graph);
  };

  return (
    <>
      <Settings settingsState={settings} />
      <MazeContainer>
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
      </MazeContainer>
    </>
  );
};

export default Maze;
