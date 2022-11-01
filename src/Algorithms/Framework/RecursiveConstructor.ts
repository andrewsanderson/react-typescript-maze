import Graph from "../../Models/Graph";
import Pathing from "../../Models/Plot";
import step from "./Step";
import Plot from "../../Models/Plot";
import { GetChildNodes, InsertChildNodes } from "..";
import allNodesExplored from "./Conditionals/allNodesExhausted";

export type Recursive = (maze: Graph, _plot?: Plot) => Plot;

/**
 *
 * @param getChildNodes how the algorithm acquires child nodes.
 * @param insertChildNodes how the algorithm inserts these nodes into the queue then sorts them.
 * @param solutionFinder an optional variable denoting how the objective of this algorithm.
 * @returns a function that when provided a graph will use the above criteria to plot a solution.
 */
const recursiveConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solutionFinder?: (plot: Plot) => boolean
) => {
  const recursive: Recursive = (maze: Graph, _plot?: Plot) => {
    const plot = !!_plot ? _plot : new Pathing(maze);

    if (allNodesExplored(plot)) {
      return plot;
    } else {
      const { queued, current } = plot;
      current.push(queued.shift()!);
      if (!!solutionFinder && solutionFinder(plot)) {
        plot.solutions.push(plot.currentPath);
      }
      step(plot, getChildNodes, insertChildNodes);

      return recursive(maze, plot);
    }
  };
  return recursive;
};

export default recursiveConstructor;
