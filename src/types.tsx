export type svgProps = {
  color: string;
  frameColor: string;
  isDark: boolean;
};

export type figureType = {
  pieceCode: string;
  square: string;
};

export type boardElementType = {
  type: string;
  color: string;
} | null;

export type CardProps = {
  color: string;
};

export type stats = {
  time: number;
  moves: number;
};

export type DataPlayer = {
  name: string;
  img?: string;
};

export type Score = {
  color: string;
  score: number;
};
