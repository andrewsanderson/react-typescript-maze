// import Pathing from "../../Models/Pathing";
// import Node from "../../Models/Cell";
// import Graph from "../../Models/Graph";
// import { algorithmConstructor } from "../Framework";
// import defaultSolution from "./defaultSolution";

// const childAcquisition = (maze: Graph) => {
//   const { pathing } = maze;
//   const { queued, current, exhausted } = pathing;

//   const currentNode = pathing.getCurrentNode();

//   // acquire children as array that are not null
//   const possibleChildren: Array<Node> = Object.values(
//     currentNode.neighbors
//   ).filter((node): node is Node => !!node);

//   // filter children out that are already queued, in the current branch, already exhausted
//   const useableChildren = possibleChildren.filter((child) => {
//     return !(
//       queued.includes(child) ||
//       current.includes(child) ||
//       exhausted.includes(child)
//     );
//   });
//   return useableChildren;
// };
// const pathMutation = (path: Pathing, children: Array<Node>) => {
//   path.queued.push(...children);
// };

// const breadthFirst = (constructor: algorithmConstructor) => {
//   return constructor(childAcquisition, pathMutation, defaultSolution);
// };

// export default breadthFirst;

export {};
