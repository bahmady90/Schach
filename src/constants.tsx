export const figuresStylingBlack = "text-black w-[80%] h-[80%]";
export const figuresStylingWhite = "text-zinc-100 w-[80%] h-[80%]";
export const figuresStylingWhiteTwo = "text-gray-100 w-[80%] h-[80%]";

export const files = ["a", "b", "c", "d", "e", "f", "g", "h"];


export const initialBoardState = [
  [ { type: "r", color: "b" }, { type: "n", color: "b" }, { type: "b", color: "b" }, { type: "q", color: "b" }, { type: "k", color: "b" }, { type: "b", color: "b" }, { type: "n", color: "b" }, { type: "r", color: "b" } ],
  [ { type: "p", color: "b" }, { type: "p", color: "b" }, { type: "p", color: "b" }, { type: "p", color: "b" }, { type: "p", color: "b" }, { type: "p", color: "b" }, { type: "p", color: "b" }, { type: "p", color: "b" } ],
  [ null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null ],
  [ { type: "p", color: "w" }, { type: "p", color: "w" }, { type: "p", color: "w" }, { type: "p", color: "w" }, { type: "p", color: "w" }, { type: "p", color: "w" }, { type: "p", color: "w" }, { type: "p", color: "w" } ],
  [ { type: "r", color: "w" }, { type: "n", color: "w" }, { type: "b", color: "w" }, { type: "q", color: "w" }, { type: "k", color: "w" }, { type: "b", color: "w" }, { type: "n", color: "w" }, { type: "r", color: "w" } ]
];

/* export const initialBoardState = [
  [ null, null, null, null, null, null, null, null ], // 8
  [ { type: "p", color: "w" }, null, null, null, null, null, null, null ], // 7 ← White pawn on a7
  [ null, null, null, null, null, null, null, null ], // 6
  [ null, null, null, null, null, null, null, null ], // 5
  [ null, null, null, null, null, null, null, null ], // 4
  [ null, null, null, null, null, null, null, null ], // 3
  [ null, null, null, null, null, null, null, null ], // 2
  [ null, null, null, null, { type: "k", color: "b" }, null, null, { type: "k", color: "w" } ], // 1 ← Black king on e1, white king on h1
];
 */