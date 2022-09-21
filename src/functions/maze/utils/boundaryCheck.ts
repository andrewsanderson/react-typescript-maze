const boundaryCheck = (
  coordinates: Coordinates,
  mazeConfig: MazeConfig
): boolean => {
  const [x, y] = coordinates;
  const { height, width } = mazeConfig;
  return x >= 0 && x < width && y >= 0 && y < height;
};

export default boundaryCheck;
