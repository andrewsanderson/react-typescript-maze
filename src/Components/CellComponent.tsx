import { memo } from "react";
import styled, { keyframes } from "styled-components";
import Cell from "../Models/Maze/Cell";
import Node, { Neighbors } from "../Models/Maze/Cell";

interface CellProps {
  cell: Node;
  status: "queued" | "touched" | "exhausted" | false | undefined;
}

const Walls = styled("div")<{
  cell: Node;
}>`
  width: 20px;
  height: 20px;
  box-shadow: ${({ cell }) => wallStylesGenerator(cell)};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled("div")<{
  position: number;
  interval: number;
  direction: keyof Neighbors | undefined;
}>`
  z-index: -10;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ position }) =>
    position >= 0 && "linear-gradient(to bottom, purple 50%, #00000000 50%)"};
  animation: ${keyframes`
  from {
    background-position:bottom
  }
  to {
    background-position:top;
  }
  `} ${({ interval }) => interval}s linear 1;
  animation-fill-mode: backwards;
  background-size: 100% 200%;
  animation-delay: ${({ position, interval }) => position * interval}s;
  transform: rotate(${({ direction }) => bgDirectionGenerator(direction)});
`;

const Background2 = styled("div")<{
  status: "queued" | "touched" | "exhausted" | false | undefined;
}>`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  padding: 5px;
  background-color: ${({ status }) => {
    switch (status) {
      case "queued":
        return "green";
      case "touched":
        return "rgba(00,00,00,0.3)";
      case "exhausted":
        return "red";
      default:
        return "#00000000";
    }
  }};
`;

const bgDirectionGenerator = (direction: keyof Neighbors | undefined) => {
  if (direction !== undefined) {
    switch (direction) {
      case "up":
        return "0deg";
      case "down":
        return "180deg";
      case "right":
        return "90deg";
      case "left":
        return "270deg";
    }
  }
};

const wallStylesGenerator = (cell: Cell) => {
  const { neighbors } = cell;

  const potentialWalls = [
    "0 -1px 0 0 white", //up
    "1px 0 0 0 white",
    "0 1px 0 0 white",
    "-1px 0 0 0 white",
  ];

  // Iterate over the neighbors.
  // If they are either the first or last cell in the maze (start and end points) apply specific walls at certain indexes.
  // Otherwise if the neighbor exists add the wall to the cell. If no neighbor exists add an transparent wall so that the cell width remains universal.
  const wallWidthString = Object.values(neighbors).map((neighbor, index) => {
    if (!!neighbor) {
      return "0 0 0 0 white";
      // } else if (index === 2 && last) {
      //   return `0 2px 0 0 purple`;
      // } else if (index === 0 && id === 0) {
      //   return `0 -2px 0 0 purple`;
    } else {
      return potentialWalls[index];
    }
  });

  // Return this collection join by commas.
  return wallWidthString.join(", ");
};

const CellComponent = ({ cell, status }: CellProps) => {
  return (
    <Walls cell={cell}>
      {/* {position >= 0 && (
        <Background
          position={position}
          interval={3 / length}
          direction={direction}
        />
      )} */}
      <Background2 status={status} />
    </Walls>
  );
};

// export default CellComponent;

export default memo(
  CellComponent,
  (
    { cell: oldCell, status: oldStatus }: Readonly<CellProps>,
    { cell: newCell, status: newStatus }: Readonly<CellProps>
  ) => {
    const oldNeighbors = () =>
      Object.values(oldCell.neighbors).filter((neighbor) => neighbor !== null)
        .length;
    const newNeighbors = () =>
      Object.values(newCell.neighbors).filter((neighbor) => neighbor !== null)
        .length;

    return oldNeighbors === newNeighbors && oldStatus === newStatus;
  }
);
