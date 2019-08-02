import { GAME_STATUS, ROUND_END } from '../types';

export const saveRound = (status: GAME_STATUS) => ({
  type: ROUND_END,
  payload: {
    status,
    timestamp: Date.now(),
  },
});
