import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

function IsVictory(cells: (string | null)[]) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row: number[]) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i != null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

function IsDraw(cells: (string | null)[]) {
  return cells.filter((c) => c === null).length === 0;
}

export interface TicTacToeState {
  cells: (string | null)[];
}

export default {
  setup(): TicTacToeState {
    return {
      cells: Array(9).fill(null) as (string | null)[],
    };
  },

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell(G, ctx, id) {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    },
  },

  endIf(G, ctx) {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
} as Game<TicTacToeState>;
