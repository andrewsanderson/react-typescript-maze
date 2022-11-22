import { getNeighborsOfCurrentNode, randomNumber } from ".";
import Cell from "../../Models/Maze/Cell";
import Graph from "../../Models/Maze/Graph";

/**
 *
 * ref: <a>https://en.wikipedia.org/wiki/Kruskal%27s_algorithm</a>
 *
 * Create a list of all walls, and create a set for each cell, each containing just that one cell.
 *
 * For each wall, in some random order:
 *
 * If the cells divided by this wall belong to distinct sets:
 *
 * &nbsp; Remove the current wall.
 *
 * &nbsp; Join the sets of the formerly divided cells.
 *
 * @param maze the maze that is to be generated using this method.
 * @returns the cells of the maze are mutated within the function so no return is necessary but the maze is returned in case the functionality needs adapting.
 */
const kruskals = (maze: Graph) => {
  // Create a set from each of the cells.
  const cellSets = maze.cells.map((cell) => {
    return [cell];
  });

  // Helper function to get the index of a set given the value.
  const findIndexOfSetWithValue = (value: Cell) => {
    return cellSets.findIndex((set) => {
      return !!set.find((cell) => {
        return cell === value;
      });
    });
  };

  // Helper function to merge cell sets.
  const mergeNodes = (initial: Cell, neighbor: Cell) => {
    const indexOfInitial = findIndexOfSetWithValue(initial);
    const indexOfNeighbor = findIndexOfSetWithValue(neighbor);
    if (indexOfInitial !== indexOfNeighbor) {
      initial.addNeighbour(neighbor);

      const set1 = cellSets[indexOfInitial];
      const set2 = cellSets.splice(indexOfNeighbor, 1);
      for (const item of set2) {
        set1.push(...item);
      }
    }
  };

  while (cellSets.length > 1) {
    // Get a random set.
    const randomSet = cellSets[randomNumber(cellSets.length - 1)];

    // Get a random node from the set.
    const randomNode = randomSet[randomNumber(randomSet.length - 1)];

    // Find the neighbors of the randomly selected node.
    const neighbors = getNeighborsOfCurrentNode(randomNode, maze);

    // Choose one of these neighbors at random.
    const randomNeighbor = neighbors[randomNumber(neighbors.length - 1)];

    // If the randomly selected node and neighbor aren't part of the same set already, this function will merge them.
    mergeNodes(randomNode, randomNeighbor);
  }
  return maze;
};

export default kruskals;
