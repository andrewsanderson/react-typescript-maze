import styled from "styled-components";
import Cell from "./Cell";
import Maze from '../Models/Maze'
interface MazeProps {
  maze: Maze;
}

const Row = styled.div`
  display: flex;
`;

const MazeGrid = ({maze}: MazeProps) => {
  return (
    <>
      {maze.rows().map((row, rowIndex) => {
        return (
          <Row key={`row-${rowIndex}`}>
            {row
              .map((cell) => {
                return (
                  <Cell cell={cell} key={`cell-${cell.id}`} />
                );
              })}
          </Row>
        );
      })}
    </>
  );
};
export default MazeGrid;
