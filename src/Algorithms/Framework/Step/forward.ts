import { InsertChildNodes } from "../..";
import Cell from "../../../Models/Cell";
import Plot from "../../../Models/Plot";

const forwardStep = (
  insertChildNodes: InsertChildNodes,
  pathing: Plot,
  children: Array<Cell>
) => {
  insertChildNodes(pathing, children);
};

export default forwardStep;
