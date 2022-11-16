import { randomNumber } from ".";
import Cell, { Neighbors } from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";

// Create a list of all walls, and create a set for each cell, each containing just that one cell.
// For each wall, in some random order:
// If the cells divided by this wall belong to distinct sets:
// Remove the current wall.
// Join the sets of the formerly divided cells.

const kruskals = (maze: Maze) => {
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
    const neighbors = Object.keys(randomNode.neighbors)
      .map((direction) => {
        return maze.peekNeighbor(randomNode, direction as keyof Neighbors);
      })
      .filter((child) => {
        return child !== null;
      }) as Array<Cell>;

    // Choose one of these neighbors at random.
    const randomNeighbor = neighbors[randomNumber(neighbors.length - 1)];

    // If the randomly selected node and neighbor aren't part of the same set already, this function will merge them.
    mergeNodes(randomNode, randomNeighbor);
  }
  return maze;
};

export default kruskals;
