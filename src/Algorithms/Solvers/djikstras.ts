// this is a slightly modified versino of djikstras algorithms that is more computationally heavy

import Cell from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";
import Node from "../../Models/Pathing/Node";

/**
 *
 * ref: <a>https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm</a>
 *
 * @param maze the maze to be solved using djikstras algorithm. Currently there is no weight on individual traversal, so the path uses the number of steps from the source node to prioitise queued nodes.
 * @returns a tree of nodes. The generator of which will return all nodes in the tree, in order to globally updates statuses.
 */
const djikstras = (maze: Maze) => {
  // Get previews of neighboring cells as children.
  const getChildren: GetChildren<Cell> = (currentNode) => {
    const children = Object.values(currentNode.value.neighbors).filter(
      (neighbor) => {
        return neighbor !== null;
      }
    ) as Array<Cell>;

    return children;
  };

  const getWeight = (node: Node<Cell>) => {
    let weight = 0;
    node.path.forEach((parent) => {
      weight++;
    });
    return weight;
  };

  // insert all children into the queue.
  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    queue.queue(...children);
    queue.sort((a, b) => {
      const aWeight = getWeight(a);
      const bWeight = getWeight(b);
      return aWeight === bWeight ? 0 : aWeight > bWeight ? 1 : -1;
    });
  };

  // Solution is when the last node is found
  const solver = (node: Node<Cell>) => {
    return node.value.id === maze.width * maze.height - 1;
  };

  // Create a tree forom the above settings.
  const tree = new Tree(maze.cells[0], getChildren, insertChildren, solver);

  return tree;
};

export default djikstras;
