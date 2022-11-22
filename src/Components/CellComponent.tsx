import { memo } from "react";
import styled, { keyframes } from "styled-components";
import Cell from "../Models/Maze/Cell";
import Node, { Neighbors } from "../Models/Maze/Cell";

interface CellProps {
  cell: Node;
  status: "queued" | "touched" | "exhausted" | false | undefined;
  solutionIndex: number | undefined;
  from: string | boolean | undefined;
  to: string | boolean | undefined;
  interval: number;
}

const axes = ["top", "right", "bottom", "left"];

// Due to the overlapping caused by using 'border' css, box shadow provides flush styling for walls.
const wallStylesGenerator = (cell: Cell) => {
  // detructure the only necessary variable, neighbors
  const { neighbors } = cell;

  // configure the strings to be added depending on the status of the neighbor
  const potentialWalls = [
    "0 -1px 0 0 white", //up
    "1px 0 0 0 white", // right
    "0 1px 0 0 white", // down
    "-1px 0 0 0 white", // left
  ];

  // if there is a neighbor at this axis add the a string to the array of the final result.
  const wallWidthString = Object.values(neighbors).map((neighbor, index) => {
    if (!!neighbor) {
      return "0 0 0 0 white";
    } else {
      return potentialWalls[index];
    }
  });

  // Join the result with a comma.
  return wallWidthString.join(", ");
};

const styleGen = (
  origin: "edge" | "center",
  axis: string | boolean | undefined
) => {
  const styles = [];
  if (origin === "center" && typeof axis === "string") {
    const currentIndex = axes.indexOf(axis);
    const opposite = axes[(currentIndex + 2) % 4];
    styles.push(`${opposite}:0%`);
    styles.push(`margin-${opposite}:50%`);
  } else {
    styles.push(`${axis}:0%`);
  }
  return styles.join("; ");
};

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

//

const animatePathing = (axis: string | boolean | undefined) => {
  return axis === "top" || axis === "bottom"
    ? keyframes` 
0% {
  width: 3px;
  height: 0%;
}
100% {
  width: 3px;
  height: 50%;
}`
    : keyframes` 
0% {
  width: 0%;
  height: 3px;
}
100% {
  width: 50%;
  height: 3px
}`;
};

const statusColor = (status: any) => {
  switch (status) {
    case "queued":
      return "rgba(00,255,0,1)";
    case "touched":
      return "rgba(00,00,255,1)";
    case "exhausted":
      return "rgba(255, 0, 0, 1)";
    default:
      return " #00000000";
  }
};

const transitionCircle = (solutionIndex: number, status: any) => {
  return solutionIndex > -1
    ? keyframes` 
0% {
  background-color: ${statusColor(status)}
}
100% {
  background-color: pink;
}`
    : keyframes` 
0% {
  background-color: ${statusColor(status)}
}
100% {
  background-color: ${statusColor(status)}
}`;
};

const Path = styled("div")<{
  origin: "center" | "edge";
  axis: string | boolean | undefined;
  interval: number;
  solutionIndex: number;
}>`
  ${({ axis, origin }) => styleGen(origin, axis)};
  position: absolute;
  background-color: pink;
  -webkit-animation: ${({ axis }) => animatePathing(axis)}
    ${({ interval }) => interval}s linear;
  -webkit-animation-fill-mode: forwards;
  animation: ${({ axis }) => animatePathing(axis)}
    ${({ interval, axis }) => interval / (axis === "to" ? 2 : 1)}s linear 1;
  animation-fill-mode: forwards;
  z-index: -10;
  animation-delay: ${({ interval, solutionIndex, axis }) =>
    (interval * solutionIndex) / (axis === "to" ? 2 : 1) + 0.2}s;
`;

export const Circle = styled("div")<{
  status: "queued" | "touched" | "exhausted" | false | undefined;
  solutionIndex: number;
  interval: number;
}>`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  padding: 5px;
  z-index: 10;
  background-color: ${({ status }) => statusColor(status)}};
  -webkit-animation: ${({ solutionIndex, status }) =>
    transitionCircle(solutionIndex, status)}
    .2s linear;
  -webkit-animation-fill-mode: forwards;
  animation: ${({ solutionIndex, status }) =>
    transitionCircle(solutionIndex, status)}
    0s linear 1;
  animation-fill-mode: forwards;
  animation-delay: ${({ interval, solutionIndex }) =>
    interval * solutionIndex + interval / 2 + 0.2}s;
`;

const CellComponent = ({
  cell,
  status,
  interval,
  solutionIndex,
  from,
  to,
}: CellProps) => {
  return (
    <Walls cell={cell}>
      {!!from && (
        <Path
          origin={"edge"}
          axis={from}
          interval={interval}
          solutionIndex={typeof solutionIndex === "number" ? solutionIndex : -1}
        />
      )}
      {!!to && (
        <Path
          origin={"center"}
          axis={to}
          interval={interval}
          solutionIndex={typeof solutionIndex === "number" ? solutionIndex : -1}
        />
      )}
      <Circle
        interval={interval}
        status={status}
        solutionIndex={typeof solutionIndex === "number" ? solutionIndex : -1}
      />
    </Walls>
  );
};

// As the cell is a reference value that can potentially change with each render a memoised version of this coomponent will conditionally render based on the result of the following calculation.
export default memo(
  CellComponent,
  (
    {
      cell: oldCell,
      status: oldStatus,
      solutionIndex: oldSI,
      from: oldPath,
      to: oldToLine,
    }: Readonly<CellProps>,
    {
      cell: newCell,
      status: newStatus,
      solutionIndex: newSI,
      from: newPath,
      to: newToLine,
    }: Readonly<CellProps>
  ) => {
    const oldNeighbors = () =>
      Object.values(oldCell.neighbors).map((node) => {
        return node?.id;
      });
    const newNeighbors = () =>
      Object.values(newCell.neighbors).map((node) => {
        return node?.id;
      });

    return (
      JSON.stringify(oldNeighbors()) === JSON.stringify(newNeighbors()) &&
      oldStatus === newStatus &&
      oldPath === newPath &&
      oldToLine === newToLine
    );
  }
);
