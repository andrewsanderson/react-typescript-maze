const traversalAlgorithmConstructor: TraversalAlgorithmConstructor = (
  childAcquisition: ChildAcquisition,
  pathMutate: PathMutate,
  ...nodeMutators: Array<NodeMutator>
) => {
  const returnF = (maze: Maze, path: Path) => {
    const nodeMutatorsActual = nodeMutators || [];
    const children = childAcquisition(maze, path);
    pathMutate(path, children);
    for (const nodeMutator of nodeMutatorsActual) {
      nodeMutator(path);
    }
  };

  return returnF;
};

export default traversalAlgorithmConstructor;
