import Cell from "../../Models/Maze/Cell";
import Graph from "../../Models/Maze/Graph";
import kruskals from "./kruskal";
import manual from "./manual";
import modifiedPrims from "./modifiedPrims";
import randomisedDepthFirst from "./randomisedDepthFirst";

// Utilities

/**
 *
 * @param cell the cell you'd like the preview the nieghbors of.
 * @param maze the maze context required to preview the neighbors.
 * @returns neighbors of the given cell as Cell objects with nulls filtered out.
 */
export const getNeighborsOfCurrentNode = (cell: Cell, maze: Graph) => {
  return Object.keys(cell.neighbors)
    .map((direction) => {
      return maze.peekNeighbor(cell, direction as keyof typeof cell.neighbors);
    })
    .filter((child) => {
      return child !== null;
    }) as Array<Cell>;
};

/**
 *
 * @param array The array to be shuffled
 * @returns A completely random, shuffled version of the provided array.
 */
export const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

/**
 *
 * @param max inclusive of this number.
 * @returns a random number inclusive of the 0 and the provided max.
 */
export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

// Exports

const generators = {
  Manual: manual,
  "Randomised Depth First": randomisedDepthFirst,
  "Randomised Kruskals": kruskals,
  "Randomised Modified Prims": modifiedPrims,
};

export default generators;
