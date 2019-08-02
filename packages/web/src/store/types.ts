export const FETCH_CARDS = 'FETCH_CARDS';
export const FLIP_CARDS = 'FLIP_CARDS';
export const PICK_CARD = 'PICK_CARD';
export const ROUND_LOST = 'ROUND_LOST';
export const ROUND_WON = 'ROUND_WON';
export const ROUND_END = 'ROUND_END';
export const LOOP_RESET = 'LOOP_RESET';

export type STATUS_TYPES =
  | typeof FLIP_CARDS
  | typeof ROUND_LOST
  | typeof ROUND_WON
  | typeof ROUND_END
  | typeof LOOP_RESET;

export enum GAME_STATUS {
  PREPARING = 'PREPARING',
  ACTIVE = 'ACTIVE',
  LOST = 'LOST',
  WON = 'WON',
}

export interface FetchCardsAction {
  type: typeof FETCH_CARDS;
  payload: {
    cards: number[];
  };
}

export interface PickCardAction {
  type: typeof PICK_CARD;
  payload: {
    card: number;
  };
}

export interface LoopStatusAction {
  type: STATUS_TYPES;
}

export interface SaveRoundAction {
  type: typeof ROUND_END;
  payload: {
    status: GAME_STATUS;
    timestamp: number;
  };
}

export type LoopActions = FetchCardsAction | LoopStatusAction | PickCardAction;

export type Actions = LoopActions | SaveRoundAction;
