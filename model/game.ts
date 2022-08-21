import _ from 'lodash'

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
    public isHighlighted: boolean = false

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
    public boardIndex: number
    public token: Token = null
    public isHighlighted: boolean = false

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
    public unassignedTokens: (Token | null)[] = []
    public selectedToken: Token = null;

    constructor() {
        const tileLine = (length: number, type: TileType) =>
            Array.from({length,}, _ => new Tile(type))

        this.board = [
            tileLine(2, TileType.HIDDEN),
            tileLine(3, TileType.STANDARD),
            tileLine(4, TileType.INITIAL_ATTACKER),
            tileLine(2, TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(1, TileType.INITIAL_DEFENDER),
            tileLine(3, TileType.STANDARD),
            tileLine(4, TileType.INITIAL_ATTACKER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(2, TileType.INITIAL_DEFENDER),
            tileLine(7, TileType.STANDARD),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.POINT_A),
            tileLine(2, TileType.INITIAL_DEFENDER),
            tileLine(6, TileType.STANDARD),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(2, TileType.INITIAL_DEFENDER),
            tileLine(7, TileType.STANDARD),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(1, TileType.INITIAL_DEFENDER),
            tileLine(6, TileType.STANDARD),
            tileLine(1, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(7, TileType.STANDARD),
            tileLine(2, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(6, TileType.STANDARD),
            tileLine(2, TileType.INITIAL_DEFENDER),
            new Tile(TileType.POINT_B),
            //
            new Tile(TileType.HIDDEN),
            tileLine(7, TileType.STANDARD),
            tileLine(2, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            new Tile(TileType.HIDDEN),
            tileLine(4, TileType.INITIAL_ATTACKER),
            tileLine(3, TileType.STANDARD),
            tileLine(1, TileType.INITIAL_DEFENDER),
            new Tile(TileType.HIDDEN),
            //
            tileLine(2, TileType.HIDDEN),
            tileLine(4, TileType.INITIAL_ATTACKER),
            tileLine(3, TileType.STANDARD),
            tileLine(2, TileType.HIDDEN),
        ].flat()

        this.board.forEach((t, i) => t.boardIndex = i)

        const tokenArray = (length: number, unit: UnitClass, player: Player) =>
            Array.from({length,}, _ => new Token(unit, player))

        this.unassignedTokens = [
            tokenArray(4, UnitClass.CLASS_I, Player.ATTACKER),
            tokenArray(4, UnitClass.CLASS_II, Player.ATTACKER),
            tokenArray(4, UnitClass.CLASS_III, Player.ATTACKER),

            tokenArray(4, UnitClass.CLASS_I, Player.DEFENDER),
            tokenArray(4, UnitClass.CLASS_II, Player.DEFENDER),
            tokenArray(4, UnitClass.CLASS_III, Player.DEFENDER),
        ].flat()

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

    public tileClick(tile: Tile) {
        if (this.selectedToken && tile.isHighlighted) {
            // assign new tile to board
            this.assignTokenToTile(this.selectedToken, tile)
            this.selectedToken.isHighlighted = false
            this.selectedToken = null
            this.deHighlightAllTiles()
        }
        // this.highlighted = this.getNeighbourTiles(tile).map(t => t.boardIndex)
    }

    public deHighlightAllTiles() {
        this.board.map(
            t => t.isHighlighted = false
        )
    }

    public deHighlightAllTokens() {
        this.board.filter(t => t.token).map(
            t => t.token.isHighlighted = false
        )
        this.unassignedTokens.filter(_.identity).map(
            t => t.isHighlighted = false
        )
    }

    public assignTokenToTile(token: Token, tile: Tile) {
        tile.token = token
        this.unassignedTokens = this.unassignedTokens.map(t => t === token ? null : t)
    }

    public selectUnassignedToken(t: Token) {
        this.deHighlightAllTokens()
        this.selectedToken = t;
        t.isHighlighted = true
        const type = t.owner === Player.DEFENDER ? TileType.INITIAL_DEFENDER : TileType.INITIAL_ATTACKER;
        this.board.filter(
            t => t.type === type
        ).map(
            t => t.isHighlighted = true
        )
    }

    public assignRandom() {
        this.selectedToken = null
        this.deHighlightAllTiles()
        this.unassignedTokens.filter(_.identity).map(token => {
            const type = token.owner === Player.DEFENDER ? TileType.INITIAL_DEFENDER : TileType.INITIAL_ATTACKER;

            const tile = _.sample(this.board.filter(t => t.type === type && t.token === null))

            this.assignTokenToTile(token, tile)
            return null;
        })
    }

    get isStartable() {
        return this.unassignedTokens.filter(_.identity).length === 0
    }

    public toJSON() {
        return {...this}
    }
}
