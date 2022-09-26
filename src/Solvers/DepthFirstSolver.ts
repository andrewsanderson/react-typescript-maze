import Cell from "../Models/Cell";
import Maze from "../Models/Maze";
import { Solver } from "./Solvers";

/**
 * Generates candidates ordered on their y coordinate, exploring the maze vertically
 */
class DepthFirstSolver implements Solver
{

    solve(maze:Maze, start: Cell, end: Cell): Cell[]|false {
        const traversed = [] //what cells we have travered on our current path
        const candidates = [] // ordered list of next cells to explore
        

        return false;
    }

    /**
     * 
     * @param cell 
     * @returns ordered list of candidates, from most likely to least likely
     */
    getCandidates(cell:Cell): Array<Cell>
    {
       return cell.getNeighbours().sort((a,b) => a.coordinates.y - b.coordinates.y)
       
    }

}

export default DepthFirstSolver