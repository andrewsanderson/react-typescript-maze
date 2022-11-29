import Cell, { Neighbors } from "./Cell";

import { testGraph } from "./Graph.test";

export let testCell = new Cell(4, { x: 2, y: 2 });

describe("Cell", () => {
  // Re-mount the testCell before each test to account for any mutations during test.
  beforeEach(() => {
    testCell = new Cell(4, { x: 2, y: 2 });
  });

  test("addNeighbor()", () => {
    const neighborCell = new Cell(2, { x: 2, y: 1 });
    testCell.addNeighbour(neighborCell);

    expect(testCell.neighbors.top?.id).toEqual(2);
  });

  test("cellString is unique", () => {
    // Mapping over our test graph return the uid string
    const cellStrings = testGraph.cells.map((cell) => {
      return cell.cellString;
    });

    // get the actual number of unqiue strings from the above variable
    const uniqueStringsLength = Array.from(new Set(cellStrings)).length;

    // Our test graph is six by six meaning we should expect 36 uids
    expect(uniqueStringsLength).toEqual(36);
  });

  // Maps over an neighbor keys and returns the direction and the neighbor in that direction from the test graph.
  const expectedGenerateNeighborResults = Object.keys(testCell.neighbors).map(
    (direction) => {
      return [
        direction,
        testGraph.peekNeighbor(testCell, direction as keyof Neighbors)
          ?.coordinates,
      ];
    }
  );

  // Iterates over the above expected results to ensure the 'generateNeighborCoordinates' fn returns the expected coordinates.
  test.each(expectedGenerateNeighborResults)(
    "when generateNeighborCoordinates() is given %p direction, returns %p",
    (direction, expectedResult) => {
      const returnedNeighbor = testCell.generateNeighborCoordinates(
        direction as keyof Neighbors
      );
      expect(returnedNeighbor).toEqual(expectedResult);
    }
  );

  const expectedGetCellDirectionResults = Object.keys(testCell.neighbors).map(
    (direction) => {
      const neighborCell = testGraph.peekNeighbor(
        testCell,
        direction as keyof Neighbors
      );
      return [neighborCell, direction];
    }
  );

  test.each(expectedGetCellDirectionResults)(
    "when getCellDirection() is given %p cell, returns %p",
    (neighborCell, expectedResult) => {
      expect(testCell.getCellDirection(neighborCell as Cell)).toEqual(
        expectedResult
      );
    }
  );

  test("inverseDirection", () => {
    expect(testCell.inverseDirection("top")).toEqual("bottom");
  });
});
