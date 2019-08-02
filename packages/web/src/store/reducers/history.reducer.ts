import * as R from 'ramda';
import { Actions, GAME_STATUS, ROUND_END, SaveRoundAction } from '../types';

interface HistoryState {
  results: {
    status: GAME_STATUS;
    timestamp: number;
  }[];
}

const initialState: HistoryState = {
  results: [],
};

export default (state = initialState, action: SaveRoundAction) => {
  if (
    action.type === ROUND_END &&
    [GAME_STATUS.LOST, GAME_STATUS.WON].includes(action.payload.status)
  ) {
    return {
      ...state,
      results: [{ ...action.payload }, ...state.results],
    };
  }

  return state;
};
