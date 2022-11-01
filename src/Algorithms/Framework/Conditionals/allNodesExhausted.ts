import Plot from "../../../Models/Plot";

/**
 *
 * @param plot in question.
 * @returns a boolean denoting whether the provided plot has exhausted all nodes via the current algorithm.
 */
const allNodesExplored = (plot: Plot) => {
  return plot.exhausted.length === plot.maze.cells.length - 1;
};

export default allNodesExplored;
