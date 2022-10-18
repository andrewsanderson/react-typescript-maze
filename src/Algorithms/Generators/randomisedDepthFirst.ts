import Cell from "../../Models/Node";
import Maze, { WinConditions } from "../../Models/Map";
import { Neighbors } from "../../Models/Node";
import { shuffle } from "../../utils";

interface PathContext {
  queued: Array<Cell>;
  current: Array<Cell>;
  exhausted: Array<Cell>;
}

// using iterative as default
const depthFirst = (
  maze: Maze,
  winConditions: WinConditions,
  _pathContext?: PathContext
) => {
  const pathContext = _pathContext || {
    queued: [maze.nodes[0]],
    current: [],
    exhausted: [],
  };

  const { queued, current, exhausted } = pathContext;

  while (exhausted.length < maze.width * maze.height) {
    const currentNode = queued.shift()!;

    // acquire children as array that are not null
    const possibleChildren: Array<Cell> = Object.keys(currentNode.neighbors)
      .map((direction) => {
        return currentNode.findNeighbor(maze, direction as keyof Neighbors);
      })
      .filter((node): node is Cell => !!node);

    // filter children out that are already queued, in the current branch, already exhausted
    const useableChildren = possibleChildren.filter((child) => {
      return !(
        queued.includes(child) ||
        current.includes(child) ||
        exhausted.includes(child)
      );
    });

    const shuffledChildren = shuffle(useableChildren);

    // if there is no useable children add the current ndoe to the exhausted queue
    if (shuffledChildren.length === 0) {
      exhausted.push(currentNode);
      if (queued.length === 0) {
        queued.push(current.pop()!);
      }
      // otherwise add the the first child to the queue and the current node to the current branch
    } else {
      currentNode.addNeighbour(shuffledChildren[0]);
      queued.push(shuffledChildren[0]);
      current.push(currentNode);
    }
  }
};

export default depthFirst;
