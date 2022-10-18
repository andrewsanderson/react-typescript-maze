import { useEffect, useState, memo } from "react";
import styled from "styled-components";
import Map, { WinConditions } from "../Models/Map";
import Cell from "./Cell";
import randomisedDepthFirst from "../Algorithms/Generators/randomisedDepthFirst";
import depthFirst from "../Algorithms/Solvers/iterativedepthFirstSimplified";
import depthFirstR from "../Algorithms/Solvers/recursivedepthFirstSimplified";

const Row = styled.div`
  display: flex;
`;

type MazeProps = {
  config: {
    height: number;
    width: number;
  };
};

const loseConditions = (maze: Map) => {
  return maze.pathing.exhausted.length >= maze.width * maze.height;
};

const winConditions = (maze: Map) => {
  return maze.pathing.queued[0].id === maze.width * maze.height - 1;
};

const conditions = { win: winConditions, lose: loseConditions };

const Maze = ({ config }: MazeProps) => {
  console.log("rerender");
  const maze = new Map({ width: 5, height: 5 });

  const winConditions: WinConditions = (node) => {
    return node.id === 24;
  };

  randomisedDepthFirst(maze, winConditions);

  const [mazeState, setMazeState] = useState<Map>(maze);

  const step = () => {
    setMazeState({ ...depthFirstR(mazeState, conditions) } as Map);
  };

  return (
    <>
      <button onClick={step}>Step</button>
      {JSON.stringify(config)}
      {[...Array(mazeState.height).keys()].map((yVal) => {
        return (
          <Row key={yVal}>
            {mazeState.nodes
              .filter((node) => {
                return node.coordinates.y === yVal;
              })
              .map((node) => {
                const status = mazeState.pathing?.getStatus(node.id);
                return <Cell key={node.id} cell={node} status={status} />;
              })}
          </Row>
        );
      })}
    </>
  );
};

export default Maze;
