import { purple } from "@mui/material/colors";
import { positions, darken } from "@mui/system";
import styled, { keyframes } from "styled-components";
import Cell from "../Models/Maze/Cell";
import Node, { Neighbors } from "../Models/Maze/Cell";

interface CellProps {
  cell: Node;
  position: number;
  length: number;
  direction?: keyof Neighbors;
  last: boolean;
}

const secondaryWallGenerator = (id: number, last: boolean) => {
  if (last) {
    return `0 -2px 0 0 ${darken(purple[900], 0.5)}`;
  } else if (id === 0) {
  }
};

const Walls = styled("div")<{
  cell: Node;
  last: boolean;
}>`
  width: 20px;
  height: 20px;
  box-shadow: ${({ cell, last }) => {
    return wallGenerator(cell, last);
  }};
  position: relative;
`;

const keyf = keyframes`
from {
  background-position:bottom
}
to {
  background-position:top;
}
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
  background: ${({ position }) => {
    return (
      position >= 0 && "linear-gradient(to bottom, purple 50%, #00000000 50%)"
    );
  }};
  animation: ${keyf}
    ${({ interval }) => {
      return interval;
    }}s
    linear 1;
  animation-fill-mode: backwards;
  background-size: 100% 200%;
  animation-delay: ${({ position, interval }) => {
    return !!position && position * interval;
  }}s;
  transform: rotate(
    ${({ direction }) => {
      return !!direction && bgDirectionGenerator(direction);
    }}
  );
`;

const bgDirectionGenerator = (direction: keyof Neighbors) => {
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
};

const wallGenerator = (cell: Cell, last: boolean) => {
  const { neighbors, id } = cell;
  const walls = [
    "0 -1px 0 0 white", //up
    "1px 0 0 0 white",
    "0 1px 0 0 white",
    "-1px 0 0 0 white",
  ];
  const wallWidthString = Object.values(neighbors).map((neighbor, index) => {
    if (!!neighbor) {
      return "0 0 0 0 white";
    } else if (index === 2 && last) {
      return `0 2px 0 0 ${darken(purple[900], 0.5)}`;
    } else if (index === 0 && cell.id === 0) {
      return `0 -2px 0 0 ${darken(purple[900], 0.5)}`;
    } else {
      return walls[index];
    }
  });
  return wallWidthString.join(", ");
};

const CellComponent = ({
  cell,
  position,
  direction,
  length,
  last,
}: CellProps) => {
  return (
    <Walls cell={cell} last={last}>
      {position >= 0 && (
        <Background
          position={position}
          interval={3 / length}
          direction={direction}
        />
      )}
    </Walls>
  );
};

export default CellComponent;

// Once
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
