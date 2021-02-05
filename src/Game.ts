export class Game {
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number) : void {
        //if first move
        if (this._lastSymbol == ' ') {
            //if player is X
            if (symbol == 'O') {
                throw new Error("Invalid first player");
            }
        }
        //if not first move but player repeated
        else if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
        //if not first move but play on an already played tile
        else if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error("Invalid position");
        }

        // update game state
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Winner() : string {
      // REFACTOR: three large repeated blocks in here - fix it
      // SMELL: many comments (and they were wrong)

      //if the positions in first row are taken
      // REFACTOR: LoD violations everywhere
            if (this._board.TileAt(0, 0)!.Symbol ==
                    this._board.TileAt(0, 1)!.Symbol &&
                    this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
                if (this._board.TileAt(0, 0)!.Symbol != ' ') {
                  return this._board.TileAt(0, 0)!.Symbol;
                }
            }

        //if the positions in SECOND row are taken
        if (this._board.TileAt(1, 0)!.Symbol != ' ' &&
                this._board.TileAt(1, 1)!.Symbol != ' ' &&
                this._board.TileAt(1, 2)!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt(1, 0)!.Symbol ==
                    this._board.TileAt(1, 1)!.Symbol &&
                    this._board.TileAt(1, 2)!.Symbol ==
                            this._board.TileAt(1, 1)!.Symbol) {
                return this._board.TileAt(1, 0)!.Symbol;
            }
        }

        //if the positions in THIRD row are taken
        if (this._board.TileAt(2, 0)!.Symbol != ' ' &&
                this._board.TileAt(2, 1)!.Symbol != ' ' &&
                this._board.TileAt(2, 2)!.Symbol != ' ') {
            //if THIRD row is full with same symbol
            if (this._board.TileAt(2, 0)!.Symbol ==
                    this._board.TileAt(2, 1)!.Symbol &&
                    this._board.TileAt(2, 2)!.Symbol ==
                            this._board.TileAt(2, 1)!.Symbol) {
                return this._board.TileAt(2, 0)!.Symbol;
            }
        }

        return ' ';
    }
}

interface Tile
{
    X: number;
    Y: number;
    Symbol: string;
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

  // SMELL: the type of this method seems to encourage LoD problems
    public TileAt(x:  number, y: number): Tile {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        // SMELL: LoD violation
        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}
