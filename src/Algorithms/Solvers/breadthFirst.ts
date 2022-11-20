import Cell from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";
import Node from "../../Models/Pathing/Node";

const breadthFirst = (maze: Maze) => {
  // Get children via neighbors.
  const getChildren: GetChildren<Cell> = (currentNode) => {
    const children = Object.values(currentNode.value.neighbors).filter(
      (neighbor) => {
        return neighbor !== null;
      }
    ) as Array<Cell>;

    return children;
  };

  // insert all children into the queue.
  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    queue.queue(...children);
  };

  // Solution is when the node height is found
  const solver = (node: Node<Cell>) => {
    return node.value.id === maze.width * maze.height - 1;
  };

  // Create a tree forom the above settings.
  const tree = new Tree(maze.cells[0], getChildren, insertChildren, solver);

  return tree;
};

export default breadthFirst;
