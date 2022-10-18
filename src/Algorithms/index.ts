import Node from "../Models/Node";
import Map from "../Models/Map";
import Pathing from "../Models/Pathing";

type ChildAcquisition = (path: Pathing, maze: Map) => Array<Node>;

type PathMutation = (path: Pathing, children: Array<Node>) => void;

type Conditions = {
  win: (maze: Map) => boolean;
  lose: (maze: Map) => boolean;
};
export type Solver = {
  childAcquisition: ChildAcquisition;
  pathMutation: PathMutation;
};

const backStep = ({ exhausted, queued, current }: Pathing) => {
  exhausted.push(queued.pop()!);

  queued.push(current.pop()!);
};

const forwardStep = (
  pathMutation: PathMutation,
  pathing: Pathing,
  children: Array<Node>
) => {
  const { queued, current } = pathing;
  current.push(queued.shift()!);
  pathMutation(pathing, children);
};

export const IterativeConstructor = (
  childAcquisition: ChildAcquisition,
  pathMutation: PathMutation
) => {
  const iterative = (maze: Map, coniditions: Conditions) => {
    const { win, lose } = coniditions;
    while (!lose(maze) && !win(maze)) {
      const { pathing } = maze;
      const { queued, current, exhausted } = pathing;
      const children = childAcquisition(pathing, maze);
      if (children.length > 0) {
        forwardStep(pathMutation, pathing, children);
      } else if (queued.length === 1) {
        backStep(pathing);
      }
    }
    return maze;
  };
  return iterative;
};

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
      const { queued, current, exhausted } = pathing;
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
