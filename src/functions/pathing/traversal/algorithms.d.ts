type PathMutate = (path: Path, children: Children) => void;

type ChildAcquisition = (nodes: Nodes, path: Path) => Array<cell>;

type NodeMutator = (path) => void;

type TraversalAlgorithmConstructor = (
  childAcquisition: ChildAcquisition,
  pathMutate: PathMutate,
  ...nodeMutators: Array<NodeMutator>
) => TraversalAlgorithm;

type TraversalAlgorithm = (maze: Maze, path: Path) => void;
