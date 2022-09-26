
interface Coordinates {
    x: number,
    y: number
}


interface Neighbours {
    up?: Cell,
    down?: Cell,
    left?: Cell,
    right?: Cell
}

class Cell {
    id:number =  0
    coordinates: Coordinates = {x: 0, y: 0}
    neighbours: Neighbours = {}

    constructor(id:number, coordinates: Coordinates, neighbours: Neighbours) {
        this.id = id
        this.coordinates = coordinates
        this.neighbours = neighbours
    }

    getNeighbours(): Array<Cell> {
        return Object.values(this.neighbours)
    }

    addLeftNeighbour(cell: Cell ) {
        this.neighbours.left = cell
        cell.neighbours.right = this
    }

    addRightNeighbour(cell: Cell) {
        this.neighbours.right = cell
        cell.neighbours.left  = this
    }

    addUpNeighbour(cell:Cell) {
        this.neighbours.up = cell
        cell.neighbours.down = this
    }

    addDownNeighbour(cell:Cell) {
        this.neighbours.down = cell
        cell.neighbours.up = this
    }

}

export default Cell