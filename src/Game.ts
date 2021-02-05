export class Game {
  private _lastPlayer: Player = " ";
  private _board: Board = new Board();

  public Play(player: Player, x: number, y: number): void {
    if (this._isFirstMove()) {
      if (player == "O") {
        throw new Error("Invalid first player");
      }
    }
    else if (this._lastPlayerIs(player)) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.tileIsTaken(x, y)) {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastPlayer = player;
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): Player {
    for (const row of [0, 1, 2]) {
      const rowOwner = this._board.ownerOfAllTilesOnRow(row);
      if (rowOwner && rowOwner != " ") {
        return rowOwner;
      }
    }
    return " ";
  }

  private _lastPlayerIs(player: Player): boolean {
    return player == this._lastPlayer;
  }

  private _isFirstMove(): boolean {
    return this._lastPlayer == " ";
  }
}

interface Tile {
  X: number;
  Y: number;
  Player: Player;
}

type Player = "X" | "O" | " ";

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Player: " " };
        this._plays.push(tile);
      }
    }
  }

  // SMELL: the type of this method seems to encourage LoD problems
  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(player: Player, x: number, y: number): void {
    const tile: Tile = { X: x, Y: y, Player: player };

    // SMELL: LoD violation
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Player = player;
  }

  public ownerOfAllTilesOnRow(row: number): Player {
    if (
      this.TileAt(row, 0)!.Player == this.TileAt(row, 1)!.Player &&
      this.TileAt(row, 2)!.Player == this.TileAt(row, 1)!.Player
    ) {
      if (this.TileAt(row, 0)!.Player != " ") {
        return this.TileAt(row, 0)!.Player;
      }
    }
    return " ";
  }

  public tileIsTaken(x: number, y: number): boolean {
    return this.TileAt(x, y).Player != " "
  }
}
