import Node from "../Models/Node";
import Map from "../Models/Map";
import Pathing from "../Models/Pathing";

type ChildAcquisition = (path: Pathing, maze: Map) => Array<Node>;

type PathMutation = (path: Pathing, children: Array<Node>) => void;

type Conditions = {
  win: (maze: Map) => boolean;
  lose: (maze: Map) => boolean;
};

/**
 *
 * @param param0 the pathing object we're backstepping through.
 */
const backStep = ({ exhausted, queued, current }: Pathing) => {
  console.log("q", { exhausted, queued, current });
  exhausted.push(queued.shift()!);

  if (queued.length === 0) {
    queued.push(current.pop()!);
  }
};

/**
 *
 * @param pathMutation how we're inserting the children into the path.
 * @param pathing the path we're mutating with the path mutation
 * @param children the children we're potentially inserting into the path
 */
const forwardStep = (
  pathMutation: PathMutation,
  pathing: Pathing,
  children: Array<Node>
) => {
  const { queued, current } = pathing;
  current.push(queued.shift()!);
  pathMutation(pathing, children);
};

/**
 *
 * @param childAcquisition how we're acquiring cihldrem, given the current node.
 * @param pathMutation how we're inserting the children into the path.
 * @returns a function that, when provided a maze and lose/win conditions, will iterate through the maze.
 */
export const IterativeConstructor = (
  childAcquisition: ChildAcquisition,
  pathMutation: PathMutation
) => {
  const iterative = (maze: Map, conditions: Conditions) => {
    const { win, lose } = conditions;
    while (!lose(maze) && !win(maze)) {
      const { pathing } = maze;
      const { queued } = pathing;
      const children = childAcquisition(pathing, maze);
      if (children.length > 0) {
        forwardStep(pathMutation, pathing, children);
      } else {
        backStep(pathing);
      }
    }
    return maze;
  };
  return iterative;
};

/**
 *
 * @param childAcquisition how we're acquiring cihldrem, given the current node.
 * @param pathMutation how we're inserting the children into the path.
 * @returns a function that, when provided a maze and lose/win conditions, will iterate through the maze.
 */
export const RecursiveConstructor = (
  childAcquisition: ChildAcquisition,
  pathMutation: PathMutation
) => {
  const recursive = (maze: Map, conditions: Conditions): Map => {
    const { win, lose } = conditions;
    if (lose(maze) || win(maze)) {
      return maze;
    } else {
      const { pathing } = maze;
      const { queued } = pathing;
      const children = childAcquisition(pathing, maze);
      if (children.length > 0) {
        forwardStep(pathMutation, pathing, children);
      } else if (queued.length === 1) {
        backStep(pathing);
      }
      return recursive(maze, conditions);
    }
  };
  return recursive;
};
