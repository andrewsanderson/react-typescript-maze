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

const vertices = ["top", "right", "bottom", "left"];

const styleGen = (
  direction: "from" | "to",
  vertex: string | boolean | undefined
) => {
  const styles = [];
  if (direction === "to" && typeof vertex === "string") {
    const currentIndex = vertices.indexOf(vertex);
    const opposite = vertices[(currentIndex + 2) % 4];
    styles.push(`${opposite}:0%`);
    styles.push(`margin-${opposite}:50%`);
  } else {
    styles.push(`${vertex}:0%`);
  }
  return styles.join("; ");
};

const animateThis = (vertex: string | boolean | undefined) => {
  return vertex === "top" || vertex === "bottom"
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

const animateCircle = (solutionIndex: number, status: any) => {
  const statusColor = () => {
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

  return solutionIndex > -1
    ? keyframes` 
0% {
  background-color: ${statusColor()}
}
100% {
  background-color: pink;
}`
    : keyframes` 
0% {
  background-color: ${statusColor()}
}
100% {
  background-color: ${statusColor()}
}`;
};

const From = styled("div")<{
  from: string | boolean | undefined;
  interval: number;
  solutionIndex: number;
}>`
  ${({ from }) => styleGen("from", from)};
  position: absolute;
  background-color: pink;
  -webkit-animation: ${({ from }) => animateThis(from)}
    ${({ interval }) => interval}s linear;
  -webkit-animation-fill-mode: forwards;
  animation: ${({ from }) => animateThis(from)} ${({ interval }) => interval}s
    linear 1;
  animation-fill-mode: forwards;
  z-index: -10;
  animation-delay: ${({ interval, solutionIndex }) =>
    interval * solutionIndex + 0.2}s;
`;

const To = styled("div")<{
  to: string | boolean | undefined;
  interval: number;
  solutionIndex: number;
}>`
  ${({ to }) => styleGen("to", to)};
  position: absolute;
  background-color: pink;
  -webkit-animation: ${({ to }) => animateThis(to)}
    ${({ interval }) => interval}s linear;
  -webkit-animation-fill-mode: forwards;
  animation: ${({ to }) => animateThis(to)} ${({ interval }) => interval / 2}s
    linear 1;
  animation-fill-mode: forwards;
  z-index: -10;
  animation-delay: ${({ interval, solutionIndex }) =>
    interval * solutionIndex + interval / 2 + 0.2}s;
`;

const Circle = styled("div")<{
  status: "queued" | "touched" | "exhausted" | false | undefined;
  solutionIndex: number;
  interval: number;
}>`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  padding: 5px;
  z-index: 10;
  background-color: ${({ status }) => {
    switch (status) {
      case "queued":
        return "rgba(00,255,0,1)";
      case "touched":
        return "rgba(00,00,255,1)";
      case "exhausted":
        return "rgba(255, 0, 0, 1)";
      default:
        return "#00000000";
    }
  }};
  -webkit-animation: ${({ solutionIndex, status }) =>
      animateCircle(solutionIndex, status)}
    0s linear;
  -webkit-animation-fill-mode: forwards;
  animation: ${({ solutionIndex, status }) =>
      animateCircle(solutionIndex, status)}
    0s linear 1;
  animation-fill-mode: forwards;
  animation-delay: ${({ interval, solutionIndex }) =>
    interval * solutionIndex + interval / 2 + 0.2}s;
`;

const wallStylesGenerator = (cell: Cell) => {
  const { neighbors } = cell;

  const potentialWalls = [
    "0 -1px 0 0 white", //up
    "1px 0 0 0 white",
    "0 1px 0 0 white",
    "-1px 0 0 0 white",
  ];

  const wallWidthString = Object.values(neighbors).map((neighbor, index) => {
    if (!!neighbor) {
      return "0 0 0 0 white";
    } else {
      return potentialWalls[index];
    }
  });

  return wallWidthString.join(", ");
};

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
        <From
          from={from}
          interval={interval}
          solutionIndex={typeof solutionIndex === "number" ? solutionIndex : -1}
        />
      )}
      {!!to && (
        <To
          to={to}
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

export default memo(
  CellComponent,
  (
    {
      cell: oldCell,
      status: oldStatus,
      solutionIndex: oldSI,
      from: oldFrom,
      to: oldTo,
    }: Readonly<CellProps>,
    {
      cell: newCell,
      status: newStatus,
      solutionIndex: newSI,
      from: newFrom,
      to: newTo,
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
      oldFrom === newFrom &&
      oldTo === newTo
    );
  }
);
