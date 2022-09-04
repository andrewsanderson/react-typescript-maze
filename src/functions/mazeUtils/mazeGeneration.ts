const mazeGeneration = (mazeSettings: MazeSettings) => {
  const { height, width } = mazeSettings;

  return [...Array(height).keys()].map((y) => {
    return [...Array(width).keys()].map((x) => {
      return { coordinates: [x, y] };
    });
  });
};

export default mazeGeneration;
