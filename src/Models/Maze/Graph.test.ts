import Graph from "./Graph";
import Cell from "./Cell";

export let testGraph: Graph = new Graph({ height: 6, width: 6 });

describe("Graph", () => {
  beforeEach(() => {
    testGraph = new Graph({ height: 6, width: 6 });
  });

  test("peekNeighbor()", () => {
    const firstCell = testGraph.cells[0];
    const expectedResult = testGraph.cells[1];
    expect(testGraph.peekNeighbor(firstCell, "right")).toBe(expectedResult);
  });
  test("getRandomCell()", () => {
    expect(testGraph.getRandomCell()).toBeInstanceOf(Cell);
  });
});
