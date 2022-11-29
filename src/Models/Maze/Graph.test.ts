import Graph from "./Graph";

export let testGraph = new Graph({ height: 6, width: 6 });

describe("Graph", () => {
  beforeEach(() => {
    testGraph = new Graph({ height: 6, width: 6 });
  });

  test("blank", () => {
    expect(undefined).toBeUndefined();
  });
});
