export class Game {
    private _lastSymbol: Symbol = ' ';
    private _board: Board = new Board();

    public Play(symbol: Symbol, x: number, y: number) : void {
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

    public Winner() : Symbol {
      for (const row of [0, 1, 2]) {
        const rowOwner = this._board.ownerOfAllTilesOnRow(row)
        if (rowOwner && rowOwner != ' ') {
          return rowOwner;
        }
      }
      return ' ';
    }
}

interface Tile
{
    X: number;
    Y: number;
    Symbol: Symbol;
}

type Symbol = "X" | "O" | " "

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

    public AddTileAt(symbol: Symbol, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        // SMELL: LoD violation
        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }

  public ownerOfAllTilesOnRow(row: number): Symbol {
    // REFACTOR: LoD violations everywhere
    if (this.TileAt(row, 0)!.Symbol ==
      this.TileAt(row, 1)!.Symbol &&
      this.TileAt(row, 2)!.Symbol == this.TileAt(row, 1)!.Symbol) {
      if (this.TileAt(row, 0)!.Symbol != ' ') {
        return this.TileAt(row, 0)!.Symbol;
      }
    }
    return ' ';
  }
}
