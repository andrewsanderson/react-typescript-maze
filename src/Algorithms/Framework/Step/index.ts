import { GetChildNodes, InsertChildNodes } from "../..";
import Plot from "../../../Models/Plot";
import backStep from "./back";
import forwardStep from "./forward";

const step = (
  plot: Plot,
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes
) => {
  const { queued, current } = plot;
  current.push(queued.shift()!);
  const children = getChildNodes(plot)!;
  if (children.length > 0) {
    forwardStep(insertChildNodes, plot, children);
  } else {
    backStep(plot);
  }
};

export default step;
