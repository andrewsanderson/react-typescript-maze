import styled from "styled-components";
import Map from "../Models/Map";
import Cell from "./Cell";

interface MazeProps {
  maze: Map;
}

const Row = styled.div`
  display: flex;
`;

const Maze = (mazeProps: MazeProps) => {
  const { maze } = mazeProps;
  return (
    <>
      {[...Array(maze.height).keys()].map((yVal) => {
        return (
          <Row>
            {maze.nodes
              .filter((node) => {
                return node.coordinates.y === yVal;
              })
              .map((node) => {
                return <Cell cell={node} />;
              })}
          </Row>
        );
      })}
    </>
  );
};

export default Maze;
