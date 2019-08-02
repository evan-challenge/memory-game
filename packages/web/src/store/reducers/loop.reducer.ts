import * as R from 'ramda';

import {
  FETCH_CARDS,
  FLIP_CARDS,
  GAME_STATUS,
  Actions,
  PICK_CARD,
  LOOP_RESET,
} from '../types';

interface LoopState {
  status: GAME_STATUS;
  cards: number[];
  ordered: number[];
  currentIndex: number;
}

const initialState: LoopState = {
  status: GAME_STATUS.PREPARING,
  cards: [],
  ordered: [],
  currentIndex: -1,
};

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...initialState,
        cards: action.payload.cards,
        ordered: R.sort(R.subtract, action.payload.cards),
      };
    case PICK_CARD: {
      const currentIndex = state.currentIndex + 1;
      const nextCard = state.ordered[currentIndex];
      const selectedCard = action.payload.card;

      const isOrdered = R.equals(selectedCard, nextCard);
      const isLastCard = R.equals(currentIndex, state.cards.length - 1);

      const status = isOrdered
        ? isLastCard
          ? GAME_STATUS.WON
          : GAME_STATUS.ACTIVE
        : GAME_STATUS.LOST;

      return {
        ...state,
        currentIndex,
        status,
      };
    }
    case FLIP_CARDS:
      return { ...state, status: GAME_STATUS.ACTIVE };
    case LOOP_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
