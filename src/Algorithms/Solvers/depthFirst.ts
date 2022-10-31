import Node from "../../Models/Cell";
import { GetChildNodes, InsertChildNodes } from "..";

const getChildNodes: GetChildNodes = (plot) => {
  const { queued, current, exhausted } = plot;

  const currentNode = plot.currentNode;

  // acquire children as array that are not null
  const possibleChildren: Array<Node> = Object.values(
    currentNode.neighbors
  ).filter((node): node is Node => !!node);

  // filter children out that are already queued, in the current branch, already exhausted
  const useableChildren = possibleChildren.filter((child) => {
    return !(
      queued.includes(child) ||
      current.includes(child) ||
      exhausted.includes(child)
    );
  });
  return useableChildren;
};
const insertChildNodes: InsertChildNodes = (path, children) => {
  path.queued.push(children[0]);
};

const depthFirst = { getChildNodes, insertChildNodes };

export default depthFirst;
