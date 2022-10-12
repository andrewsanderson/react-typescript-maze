import Cell from "../Models/Cell";
import Maze from "../Models/Maze";

interface PathContext {
  queued: Array<Cell>;
  current: Array<Cell>;
  exhausted: Array<Cell>;
}

// using iterative as default
const depthFirst = (maze: Maze, _pathContext?: PathContext) => {
  const pathContext = _pathContext || {
    queued: [maze.nodes[0]],
    current: [],
    exhausted: [],
  };

  const { queued, current, exhausted } = pathContext;

  while (
    !maze.winConditions(queued[0]) &&
    exhausted.length < maze.width * maze.height
  ) {
    const currentNode = queued.shift()!;

    // acquire children as array that are not null
    const possibleChildren: Array<Cell> = Object.values(
      currentNode.neighbors
    ).filter((node): node is Cell => !!node);

    // filter children out that are already queued, in the current branch, already exhausted
    const useableChildren = possibleChildren.filter((child) => {
      return !(
        queued.includes(child) ||
        current.includes(child) ||
        exhausted.includes(child)
      );
    });

    // if there is no useable children add the current ndoe to the exhausted queue
    if (useableChildren.length === 0) {
      exhausted.push(currentNode);
      // otherwise add the the first child to the queue and the current node to the current branch
    } else {
      queued.push(useableChildren[0]);
      current.push(currentNode);
    }
  }
  console.log("fin", pathContext);
};

export default depthFirst;
