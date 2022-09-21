const pathContains = (path: Array<Cell>, node: Cell) => {
  return !!path.filter((cell) => {
    return cell.coordinates.toString() === node.coordinates.toString();
  });
};

export default pathContains;
