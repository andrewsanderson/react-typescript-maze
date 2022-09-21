const getDirection = (from: Coordinates, to: Coordinates): number => {
  switch ([from[0] - to[0], from[1] - to[1]].toString()) {
    case [0, 1].toString():
      return 1;
    case [-1, 0].toString():
      return 2;
    case [0, -1].toString():
      return 3;
    case [1, 0].toString():
      return 4;
    default:
      return -1;
  }
};

export default getDirection;
