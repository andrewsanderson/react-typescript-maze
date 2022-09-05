import styled from "styled-components";
import Cell from "./Cell";

interface MazeProps {
  maze: Maze;
  mazeSettings: MazeSettings;
}

const Row = styled.div`
  display: flex;
`;

const Maze = (mazeProps: MazeProps) => {
  const { maze, mazeSettings } = mazeProps;
  const { height } = mazeSettings;
  return (
    <>
      {[...Array(height).keys()].map((y) => {
        return (
          <Row key={`row-${y}`}>
            {maze
              .filter((cell) => {
                return cell.coordinates[0] === y;
              })
              .map((cell) => {
                return (
                  <Cell cell={cell} key={JSON.stringify(cell.coordinates)} />
                );
              })}
          </Row>
        );
      })}
    </>
  );
};
export default Maze;
