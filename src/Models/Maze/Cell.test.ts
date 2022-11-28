import Cell from "./Cell";

export let testCell = new Cell(1, { x: 0, y: 0 });

describe("Cell", () => {
  beforeEach(() => {
    testCell = new Cell(1, { x: 0, y: 0 });
  });

  test("addNeighbor()", () => {
    const neighborCell = new Cell(2, { x: 1, y: 0 });
    testCell.addNeighbour(neighborCell);

    expect(testCell.neighbors.right?.id).toEqual(2);
  });

  // possibly move this to graph tests.
  test("cellString is unique", () => {
    const expected = JSON.stringify(testCell);

    expect(testCell.cellString).toEqual(expected);
  });
});
