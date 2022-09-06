const boundaryCheck = (
  coordinates: Coordinates,
  mazeSettings: MazeSettings
): boolean => {
  const [x, y] = coordinates;
  const { height, width } = mazeSettings;
  return x >= 0 && x < width && y >= 0 && y < height;
};

export default boundaryCheck;
