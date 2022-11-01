import Graph from "../../Models/Graph";
import Pathing from "../../Models/Plot";
import step from "./Step";
import Plot from "../../Models/Plot";
import { GetChildNodes, InsertChildNodes } from "..";
import allNodesExplored from "./Conditionals/allNodesExhausted";

export type Recursive = (maze: Graph, _plot?: Plot) => Plot;

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
      step(plot, getChildNodes, insertChildNodes);
      if (!!solutionFinder && solutionFinder(plot)) {
        plot.solutions.push(plot.currentPath);
      }
      return recursive(maze, plot);
    }
  };
  return recursive;
};

export default recursiveConstructor;
