import { GetChildNodes, InsertChildNodes } from "../..";
import Plot from "../../../Models/Plot";
import backStep from "./back";
import forwardStep from "./forward";

/**
 * If children are acquired using the provided function it will proress forward otherwise it will regress.
 * @param plot in question.
 * @param getChildNodes how the child nodes are acquired.
 * @param insertChildNodes how the child nodes are inserted into plot.
 */
const step = (
  plot: Plot,
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes
) => {
  const children = getChildNodes(plot)!;
  if (children.length > 0) {
    forwardStep(insertChildNodes, plot, children);
  } else {
    backStep(plot);
  }
};

export default step;
