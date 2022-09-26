import Cell from "../Models/Cell";
import Maze from "../Models/Maze";

export interface Solver {
    solve(maze:Maze, start:Cell, end:Cell): Cell[]|false

}