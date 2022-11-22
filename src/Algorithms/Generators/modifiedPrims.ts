import { getNeighborsOfCurrentNode } from ".";
import Cell from "../../Models/Maze/Cell";
import Graph from "../../Models/Maze/Graph";

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 *
 * ref: <a>https://en.wikipedia.org/wiki/Prim%27s_algorithm</a>
 *
 * Start with a grid full of walls.
 *
 * Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
 *
 * While there are walls in the list:
 *
 * &nbsp;Pick a random wall from the list. If only one of the cells that the wall divides is visited, then:
 *
 * &nbsp;&nbsp;Make the wall a passage and mark the unvisited cell as part of the maze.
 *
 * &nbsp;&nbsp;Add the neighboring walls of the cell to the wall list.
 *
 * &nbsp;Remove the wall from the list.
 *
 *
 * @param maze the maze that is to be generated using this method.
 * @returns the cells of the maze are mutated within the function so no return is necessary but the maze is returned in case the functionality needs adapting.
 */

const modifiedPrims = (maze: Graph) => {
  // Helper function to identify if the a cell exists within the current maze cells.
  const mazeContains = (cell: Cell) => {
    return !!mazeCells.includes(cell);
  };
  const mazeCells = [maze.cells[0]];
  const queue = [...getNeighborsOfCurrentNode(mazeCells[0], maze)];

  while (queue.length > 0) {
    // get random node from queue
    const randomIndex = randomIntFromInterval(0, queue.length - 1);
    const randomNode = queue[randomIndex];

    // get it's neighbors
    const potentialNeighbors = getNeighborsOfCurrentNode(randomNode, maze);

    // find which of these neighbors are in the maze
    const potentialNeighborsInMaze = potentialNeighbors.filter((cell) =>
      mazeContains(cell)
    ) as Array<Cell>;

    const randomNodeNeighbors = Object.values(randomNode.neighbors).filter(
      (neighbor) => {
        return neighbor !== null;
      }
    );

    // if only one of it's neighbors is in the maze
    if (potentialNeighborsInMaze.length > 0 && randomNodeNeighbors.length < 1) {
      // break the wall between a random neighbor in the maze and this
      randomNode.addNeighbour(
        potentialNeighborsInMaze[
          randomIntFromInterval(0, potentialNeighborsInMaze.length - 1)
        ]
      );

      // add the neighbors to the queue if they aren't already in the maze
      queue.push(
        ...potentialNeighbors.filter((neighbor) => {
          return !mazeContains(neighbor);
        })
      );
    }
    // add the current node to the maze
    mazeCells.push(...queue.splice(randomIndex, 1));
  }
  return maze;
};

export default modifiedPrims;
