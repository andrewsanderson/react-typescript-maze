import Cell, { Neighbors } from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";
import Node from "../../Models/Pathing/Node";

const depthFirst = (maze: Maze) => {
  const getChildren: GetChildren<Cell> = (currentNode) => {
    const children = Object.values(currentNode.value.neighbors).filter(
      (neighbor) => {
        return neighbor !== null;
      }
    ) as Array<Cell>;

    return children;
  };

  // Add only the first node to the queue.
  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    queue.queue(children[0]);
  };

  const solver = (node: Node<Cell>) => {
    return node.value.id === maze.width * maze.height - 1;
  };

  const tree = new Tree(maze.cells[0], getChildren, insertChildren, solver);

  return tree;
};

export default depthFirst;
