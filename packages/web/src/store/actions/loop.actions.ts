import * as R from 'ramda';
import { ThunkAction } from 'redux-thunk';

import CardsService from '../../services/cards.service';
import { Actions, FETCH_CARDS, PICK_CARD, STATUS_TYPES } from '../types';
import { AppState } from '..';

export const fetchCards = (
  count: number,
): ThunkAction<void, AppState, undefined, Actions> => async dispatch => {
  const response = await CardsService.fetchCards(count);
  const cards: number[] = await response.json();

  dispatch({
    type: FETCH_CARDS,
    payload: {
      cards,
    },
  });
};

export const pickCard = (card: number) => ({
  type: PICK_CARD,
  payload: {
    card,
  },
});

export const changeLoopStatus = (type: STATUS_TYPES) => ({ type });
