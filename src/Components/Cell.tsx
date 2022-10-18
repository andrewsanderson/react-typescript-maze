import { useEffect } from "react";
import styled from "styled-components";
import Node, { Neighbors } from "../Models/Node";
import { memo } from "react";

interface CellProps {
  cell: Node;
  status: string | undefined;
}

const Walls = styled("div")<{ cell: Node; status: string | undefined }>`
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
      return "gray";
    case "queued":
      return "blue";
  }
};

const Cell = ({ cell, status }: CellProps) => {
  return (
    <Walls cell={cell} status={status}>
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
