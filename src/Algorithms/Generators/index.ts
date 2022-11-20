import kruskals from "./kruskal";
import modifiedPrims from "./modifiedPrims";
import randomisedDepthFirst from "./randomisedDepthFirst";

// Utilities

/**
 *
 * @param array The array to be shuffled
 * @returns A completely random, shuffled version of the provided array.
 */
export const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

/**
 *
 * @param max inclusive of this number.
 * @returns a random number inclusive of the 0 and the provided max.
 */
export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const generators = {
  "Randomised Depth First": randomisedDepthFirst,
  Kruskals: kruskals,
  "Modified Prims": modifiedPrims,
};

export default generators;
