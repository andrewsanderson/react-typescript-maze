import { InsertChildNodes } from "../..";
import Cell from "../../../Models/Cell";
import Plot from "../../../Models/Plot";

/**
 *
 * @param insertChildNodes a function that denotes how the child nodes are inserted into the plot.
 * @param plot the plot insert the nodes into.
 * @param children the children to insert.
 */
const forwardStep = (
  insertChildNodes: InsertChildNodes,
  plot: Plot,
  children: Array<Cell>
) => {
  insertChildNodes(plot, children);
};

export default forwardStep;
