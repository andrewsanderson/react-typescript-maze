import Plot from "../../../Models/Plot";

const backStep = (pathing: Plot) => {
  const { exhausted, queued, current } = pathing;
  exhausted.push(current.pop()!);

  if (queued.length === 0) {
    queued.push(current.pop()!);
  }
};
export default backStep;
