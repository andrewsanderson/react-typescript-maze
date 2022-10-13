import { useEffect } from "react";
import styled from "styled-components";
import Node, { Neighbors } from "../Models/Node";
import { memo } from "react";

interface CellProps {
  cell: Node;
  status: string | undefined;
}

const Walls = styled("div")<{ cell: Node }>`
  width: 40px;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => {
    return wallGenerator(props.cell.neighbors);
  }};
  border-style: solid;
`;

const wallGenerator = (neighbors: Neighbors) => {
  const wallWidthString = Object.values(neighbors).map((neighbor) => {
    return !!neighbor ? "white" : "black";
  });
  return wallWidthString.join(" ");
};

const Cell = ({ cell, status }: CellProps) => {
  return (
    <Walls cell={cell}>
      {cell.id}
      <div style={{ fontSize: "8px" }}>{status}</div>
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
