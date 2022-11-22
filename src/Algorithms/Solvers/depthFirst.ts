import Cell from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";
import Node from "../../Models/Pathing/Node";

/**
 *
 * @param maze the maze to be solved using depth first pathfinding.
 * @returns a tree of nodes. The generator of which will return all nodes in the tree, in order to globally updates statuses.
 */
const depthFirst = (maze: Maze) => {
  // Get previews of neighboring cells as children.
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
