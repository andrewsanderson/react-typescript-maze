import Cell from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";
import Node from "../../Models/Pathing/Node";

const breadthFirst = (maze: Maze) => {
  const getChildren: GetChildren<Cell> = (currentNode) => {
    const children = Object.values(currentNode.value.neighbors).filter(
      (neighbor) => {
        return neighbor !== null;
      }
    ) as Array<Cell>;

    return children;
  };

  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    queue.queue(...children);
  };

  const solver = (node: Node<Cell>) => {
    return node.value.id === maze.width * maze.height - 1;
  };

  const tree = new Tree(maze.cells[0], getChildren, insertChildren, solver);

  for (const item of tree) {
    void item;
  }

  return tree.solution;
};

export default breadthFirst;
