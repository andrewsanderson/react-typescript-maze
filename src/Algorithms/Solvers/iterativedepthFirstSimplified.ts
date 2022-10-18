import Pathing from "../../Models/Pathing";
import Map from "../../Models/Map";
import Node from "../../Models/Node";
import { IterativeConstructor } from "../index";

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

const loseConditions = (maze: Map) => {
  return maze.pathing.exhausted.length >= maze.width * maze.height;
};

const winConditions = (maze: Map) => {
  return maze.pathing.queued[0].id === maze.width * maze.height - 1;
};

const conditions = { win: winConditions, lose: loseConditions };

export default IterativeConstructor(childAcquisition, pathMutation);
