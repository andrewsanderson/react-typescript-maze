import Plot from "../../../Models/Plot";

const allNodesExplored = (plot: Plot) => {
  return plot.exhausted.length === plot.maze.cells.length - 1;
};

export default allNodesExplored;
