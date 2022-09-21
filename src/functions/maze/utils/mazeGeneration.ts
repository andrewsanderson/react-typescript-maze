const mazeGeneration = (mazeConfig: MazeConfig): Maze => {
  const { height, width } = mazeConfig;

  const maze = [];

  for (const x of [...Array(height).keys()]) {
    for (const y of [...Array(width).keys()]) {
      const cell: Cell = {
        coordinates: [x, y],
        walls: [true, true, true, true],
      };
      maze.push(cell);
    }
  }

  return { config: mazeConfig, cells: maze };
};

export default mazeGeneration;
