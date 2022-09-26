
import Cell from './Cell'
import {Solver} from "../Solvers/Solvers"

interface MazeConfig {
    width: number,
    height: number
}


class Maze {
    width = 0
    height = 0
    cells: Array<Cell> = []

    constructor(config: MazeConfig) {
        this.width = config.width
        this.height =config.height
        this.create()
        this.random() //this.generatePath()
    }
    
    /**
     * Build the cells for this maze's configuration
     */
    create() {
        let id = 0
        for (const x of [...Array(this.height).keys()]) {
            for (const y of [...Array(this.width).keys()]) {
              const cell = new Cell(
                id++, // unique cell id
                {x, y}, //cooldinates
                {}, // No neighbours to start with
              );
              this.cells.push(cell);
            }
          }
    }

    /**
     * 
     * @returns Cells grouped by columns for easier rendering
     */
    rows(): Array<Array<Cell>> {
        const rows: Array<Array<Cell>> = []
        for(let y =0; y<this.width; y++) {
            rows.push(this.cells.filter(cell => cell.coordinates.y === y).sort((a,b) => a.coordinates.y - b.coordinates.y))
        }
        return rows
    }

    /**
     * Randomly select a 5 cells to make connection with as a test
     */
    random() {
        for(let i =0; i < 5; i++) {
            const randomCell =  this.cells[Math.floor(Math.random()*this.cells.length)];
            const up = this.cells.find(cell => cell.coordinates.x === randomCell.coordinates.x && cell.coordinates.y === randomCell.coordinates.y - 1)
            const down = this.cells.find(cell => cell.coordinates.x === randomCell.coordinates.x && cell.coordinates.y === randomCell.coordinates.y + 1)
            const left = this.cells.find(cell => cell.coordinates.x === randomCell.coordinates.x - 1 && cell.coordinates.y === randomCell.coordinates.y)
            const right = this.cells.find(cell => cell.coordinates.x === randomCell.coordinates.x + 1 && cell.coordinates.y === randomCell.coordinates.y )

            if(up) {randomCell.addUpNeighbour(up)}
            if(down) {randomCell.addDownNeighbour(down)}
            if(left) {randomCell.addLeftNeighbour(left)}
            if(right) {randomCell.addRightNeighbour(right)}
            
        }
    }

    /**
     * TODO: Implement a path generator 
     */
    generateMazePath() {

    }

    /**
     * Run a solver on the current maze
     * 
     * @param start starting cell
     * @param end ending cell 
     * @param solver the algorithm being used to solve this maze
     * @returns A solved path in the form of an array of cells or false if there's no solution
     */
    solve(start:Cell, end:Cell, solver: Solver): Array<Cell>|false {
        
        return solver.solve(this,start,end)

    }


}

export default Maze