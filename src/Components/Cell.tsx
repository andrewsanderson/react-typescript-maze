import styled from "styled-components";
import Node, { Neighbors } from "../Models/Cell";

interface CellProps {
  cell: Node;
}

const Walls = styled("div")<{
  cell: Node;
}>`
  width: 20px;
  height: 20px;
  box-shadow: ${(props) => {
    return wallGenerator(props.cell.neighbors);
  }};
`;

const wallGenerator = (neighbors: Neighbors) => {
  const walls = [
    "0 -1px 0 0 white",
    "1px 0 0 0 white",
    "0 1px 0 0 white",
    "-1px 0 0 0 white",
  ];
  const wallWidthString = Object.values(neighbors).map((neighbor, index) => {
    return !!neighbor ? "0 0 0 0 white" : walls[index];
  });
  return wallWidthString.join(", ");
};

const Cell = ({ cell }: CellProps) => {
  // const status = cell.maze.pathing.getStatus(cell.id);
  // const solutions = cell.maze.pathing.getSolutions(cell.id);
  return <Walls cell={cell}></Walls>;
};

export default Cell;

// export default memo(
//   Cell,
//   (
//     { cell: oldCell }: Readonly<CellProps>,
//     { cell: newCell }: Readonly<CellProps>
//   ) => {
//     console.log("new", newCell.id);
//     console.log("old", oldCell.id);

//     return oldCell.id === newCell.id;
//   }
// );
