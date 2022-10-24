import { useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Graph";
import Cell from "./Cell";
import randomisedDepthFirst from "../Algorithms/Generators/randomisedDepthFirst";
import depthFirstR from "../Algorithms/Solvers/breadthFirst";
import iterativeConstructor from "../Algorithms/Framework/iterative";

const Row = styled.div`
  display: flex;
`;

type MazeProps = {
  config: {
    height: number;
    width: number;
  };
};

const Maze = ({ config }: MazeProps) => {
  const width = 12;
  const height = 12;
  const maze = new Graph({ width: width, height: height });

  randomisedDepthFirst(iterativeConstructor)(maze);
  maze.resetPath();

  const [mazeState, setMazeState] = useState<Graph>(maze);

  const step = () => {
    setMazeState({ ...depthFirstR(iterativeConstructor)(mazeState) } as Graph);
  };

  return (
    <>
      <button onClick={step}>Step</button>
      {JSON.stringify(config)}
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
    </>
  );
};

export default Maze;
