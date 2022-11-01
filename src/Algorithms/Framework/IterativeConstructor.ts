import { GetChildNodes, InsertChildNodes } from "..";
import Graph from "../../Models/Graph";
import Plot from "../../Models/Plot";
import step from "./Step";

export type Iterative = (maze: Graph) => Plot;

/**
 *
 * @param getChildNodes how the algorithm acquires child nodes.
 * @param insertChildNodes how the algorithm inserts these nodes into the queue then sorts them.
 * @param solutionFinder an optional variable denoting how the objective of this algorithm.
 * @returns a function that when provided a graph will use the above criteria to plot a solution.
 */
const iterativeConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solutionFinder?: (plot: Plot) => boolean
): Iterative => {
  const iterative = (maze: Graph): Plot => {
    const plot = new Plot(maze);
    while (!plot.allNodesExplored()) {
      step(plot, getChildNodes, insertChildNodes);
      if (!!solutionFinder && solutionFinder(plot)) {
        plot.solutions.push(plot.currentPath);
      }
    }
    return plot;
  };
  return iterative;
};

export default iterativeConstructor;
