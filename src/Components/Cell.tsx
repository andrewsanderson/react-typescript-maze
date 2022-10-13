import styled from "styled-components";
import Node, { Neighbors } from "../Models/Node";

interface CellProps {
  cell: Node;
}

const wallGenerator = (walls: Neighbors) => {
  console.log(walls);
  const wallWidthString = Object.values(walls).map((neighbor) => {
    console.log(!!neighbor, neighbor);
    return !!neighbor ? "white" : "black";
  });
  return wallWidthString.join(" ") + ";";
};

const Cell = (cellProps: CellProps) => {
  const { cell } = cellProps;

  const Walls = styled("div")<{ cell: Node }>`
    width: 40px;
    height: 40px;
    border-width: 1px;
    border-color: ${(props) => {
      console.log(cell.id);
      return wallGenerator(props.cell.neighbors);
    }};
    border-style: solid;
  `;

  return <Walls cell={cell}>{cell.id}</Walls>;
};

export default Cell;
