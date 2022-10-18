import Pathing from "../../Models/Pathing";
import Map from "../../Models/Map";
import Node from "../../Models/Node";
import { RecursiveConstructor } from "..";

const childAcquisition = (path: Pathing, maze: Map) => {
  console.log("path", path);
  const { queued, current, exhausted } = path;

  const currentNode = queued[0];

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
const pathMutation = (path: Pathing, children: Array<Node>) => {
  path.queued.push(children[0]);
};

export default RecursiveConstructor(childAcquisition, pathMutation);
