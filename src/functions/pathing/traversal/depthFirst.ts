import findNeighbor from "../../maze/utils/findNeighbor";
import constructor from "./constructor";

const depthFirst = () => {
  const childAcquisition = (maze: Maze, path: Path) => {
    const current: Cell = path.queued[0];
    const possibleChildren = [...Array(4).keys()].map((direction) => {
      return findNeighbor(maze, current, direction);
    });
    const children = possibleChildren.filter((child: Cell | undefined) => {
      return (
        child !== undefined &&
        !path.exhausted.includes(child) &&
        !path.traversed.includes(child)
      );
    });
    return children;
  };

  const pathMutate = (path: Path, children: Cell) => {};

  return constructor(childAcquisition, pathMutate);
};

export default depthFirst;
