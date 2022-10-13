import { useEffect, useState, memo } from "react";
import styled from "styled-components";
import Map, { WinConditions } from "../Models/Map";
import Cell from "./Cell";
import randomisedDepthFirst from "../Algorithms/Generators/randomisedDepthFirst";
import depthFirst from "../Algorithms/Solvers/depthFirstSimplified";

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
  const maze = new Map({ width: 5, height: 5 });
  maze.init();

  const winConditions: WinConditions = (node) => {
    return node.id === 24;
  };

  randomisedDepthFirst(maze, winConditions);

  const [mazeState, setMazeState] = useState<Map>(maze);

  const step = () => {
    setMazeState({ ...mazeState.path?.step(depthFirst) } as Map);
  };

  return (
    <>
      <button onClick={step}>Step</button>
      {JSON.stringify(config)}
      {[...Array(mazeState.height).keys()].map((yVal) => {
        return (
          <Row>
            {mazeState.nodes
              .filter((node) => {
                return node.coordinates.y === yVal;
              })
              .map((node) => {
                const status = mazeState.path?.getStatus(node.id);
                return <Cell key={node.id} cell={node} status={status} />;
              })}
          </Row>
        );
      })}
    </>
  );
};

export default Maze;
