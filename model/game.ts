

export enum UnitClass {
    CLASS_I = 'Ⅰ',
    CLASS_II = 'Ⅱ',
    CLASS_III = 'Ⅲ',
    CLASS_QUEEN = '👑',
}

export enum Player {
    ATTACKER = 'Token--attacker',
    DEFENDER = 'Token--defender',
}

export class Token {
    constructor(
        public readonly unitClass: UnitClass,
        public readonly owner: Player
    ) {
    }

    get cssClass() {
        return this.owner
    }
}
export enum TileType {
    HIDDEN = "Tile--hidden",
    STANDARD = "Tile--standard",

    INITIAL_ATTACKER = "Tile--initial-attacker",
    INITIAL_DEFENDER = "Tile--initial-defender",

    POINT_A = "Tile--point-a",
    POINT_B = "Tile--point-b",
}

export class Tile {
    public boardIndex: number;
    public token: Token = null;

    constructor(
        public readonly type: TileType = TileType.STANDARD,
    ) {

    }

    get cssClass() {
        return this.type
    }

    get baseContent() {
        switch (this.type) {
            case TileType.POINT_A:
                return 'A'
            case TileType.POINT_B:
                return 'B'
            default:
                return ''
        }
    }

    get isInitial() {
        return [TileType.INITIAL_ATTACKER, TileType.INITIAL_DEFENDER].includes(this.type)
    }
}

export class Game {
    public board: Tile[]
    public highlighted: number[] = []

    constructor() {
        const line = (length: number, type: TileType) =>
            Array.from({length,}, _ => new Tile(type))

        this.board = [
            line(2, TileType.HIDDEN),
            line(3, TileType.STANDARD),
            line(4, TileType.INITIAL_ATTACKER),
            line(2, TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(1, TileType.INITIAL_DEFENDER),
            line(3, TileType.STANDARD),
            line(4, TileType.INITIAL_ATTACKER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(2, TileType.INITIAL_DEFENDER),
            line(7, TileType.STANDARD),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.POINT_A),
            line(2, TileType.INITIAL_DEFENDER),
            line(6, TileType.STANDARD),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(2, TileType.INITIAL_DEFENDER),
            line(7, TileType.STANDARD),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(1, TileType.INITIAL_DEFENDER),
            line(6, TileType.STANDARD),
            line(1, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(7, TileType.STANDARD),
            line(2, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(6, TileType.STANDARD),
            line(2, TileType.INITIAL_DEFENDER),
            new Tile(TileType.POINT_B),
            //
            new Tile(TileType.HIDDEN),
            line(7, TileType.STANDARD),
            line(2, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            line(4, TileType.INITIAL_ATTACKER),
            line(3, TileType.STANDARD),
            line(1, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            line(2, TileType.HIDDEN),
            line(4, TileType.INITIAL_ATTACKER),
            line(3, TileType.STANDARD),
            line(2, TileType.HIDDEN),
        ].flat()

        this.board.forEach((t, i) => t.boardIndex = i)

        this.board[5].token = new Token(UnitClass.CLASS_II, Player.ATTACKER)
        this.board[22].token = new Token(UnitClass.CLASS_III, Player.DEFENDER)
        this.board[32].token = new Token(UnitClass.CLASS_QUEEN, Player.DEFENDER)
    }


    public getNeighbourTiles(tile: Tile): Tile[] {
        if (tile.type === TileType.HIDDEN) return [];

        const i = tile.boardIndex;
        const board_length = this.board.length
        // check fox new wrapped line not needed, since
        // the next tile on new line is always a hidden tile
        return [
            i - 1, i + 1,
            i - 11, i - 10,
            i + 10, i + 11
        ].filter(
            v => v >= 0 && v < board_length
        ).map(
            i => this.board[i]
        ).filter(
            t => t.type != TileType.HIDDEN
        )
    }

    public click(tile: Tile) {
        this.highlighted = this.getNeighbourTiles(tile).map(t => t.boardIndex)
    }

    public toJSON() {
        return {...this}
    }
}
