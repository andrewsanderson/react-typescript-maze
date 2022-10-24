import styled from "styled-components";
import Node, { Neighbors } from "../Models/Cell";

interface CellProps {
  cell: Node;
}

const Walls = styled("div")<{
  cell: Node;
  status: string | undefined;
  solutions: Array<number>;
}>`
  width: 40px;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => {
    return wallGenerator(props.cell.neighbors);
  }};
  border-style: solid;
  background-color: ${(props) => {
    return bgGenerator(props.status);
  }};
  background-color: ${(props) => {
    return props.solutions[0] !== undefined ? "green" : "white";
  }};
`;

const wallGenerator = (neighbors: Neighbors) => {
  const wallWidthString = Object.values(neighbors).map((neighbor) => {
    return !!neighbor ? "rgba(255,255,255,0)" : "black";
  });
  return wallWidthString.join(" ");
};

const bgGenerator = (status: string | undefined) => {
  switch (status) {
    case "current":
      return "red";
    case "exhausted":
      return "lightgray";
    case "queued":
      return "blue";
  }
};

const Cell = ({ cell }: CellProps) => {
  const status = cell.maze.pathing.getStatus(cell.id);
  const solutions = cell.maze.pathing.getSolutions(cell.id);
  console.log("s", solutions);
  return (
    <Walls cell={cell} status={status} solutions={solutions}>
      {cell.id}
    </Walls>
  );
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
