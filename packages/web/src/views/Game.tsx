import React, { useEffect } from 'react';
import * as R from 'ramda';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';
import { Button, Icon, Spin, message } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../store';
import { saveRound } from '../store/actions/history.actions';
import {
  fetchCards,
  changeLoopStatus,
  pickCard,
} from '../store/actions/loop.actions';
import {
  GAME_STATUS,
  STATUS_TYPES,
  FLIP_CARDS,
  LOOP_RESET,
} from '../store/types';

interface GameViewProps extends RouteComponentProps {
  difficulty?: string;
  loop: AppState['loop'];
  fetchCards: typeof fetchCards;
  changeStatus: typeof changeLoopStatus;
  selectCard: typeof pickCard;
  saveRound: typeof saveRound;
}

const GameView = ({
  difficulty,
  loop,
  fetchCards,
  changeStatus,
  selectCard,
  saveRound,
}: GameViewProps) => {
  useEffect(() => {
    fetchCards(Number(difficulty));
    return () => {
      changeStatus(LOOP_RESET);
    };
  }, []);

  useEffect(() => {
    saveRound(loop.status);

    if (loop.status === GAME_STATUS.WON) {
      message.success('Congratulations, you won the round!');
    }

    if (loop.status === GAME_STATUS.LOST) {
      message.error('Unfortunately, you lost the round!');
    }
  }, [loop.status]);

  const isRoundActive = loop.status === GAME_STATUS.ACTIVE;
  const handleForwardClick = () => {
    if (R.includes(loop.status, [GAME_STATUS.LOST, GAME_STATUS.WON])) {
      return fetchCards(Number(difficulty));
    }

    changeStatus(FLIP_CARDS);
  };

  if (!loop.cards) {
    return <Spin size="large" />;
  }

  const flippedCards = loop.ordered.slice(0, loop.currentIndex + 1);
  const forwardButton = R.cond<GAME_STATUS, string>([
    [
      (v: GAME_STATUS) => R.includes(v, [GAME_STATUS.WON, GAME_STATUS.LOST]),
      R.always('Restart'),
    ],
    [R.equals<GAME_STATUS>(GAME_STATUS.PREPARING), R.always('Flip cards')],
  ]);

  return (
    <Container>
      <CardsContainer>
        {loop.cards.map(card => {
          const isFlipped = isRoundActive && !R.includes(card, flippedCards);
          return (
            <FlipCard
              key={card}
              flipped={isFlipped}
              onClick={() => isRoundActive && isFlipped && selectCard(card)}
            >
              <CardSide back>?</CardSide>
              <CardSide>{card}</CardSide>
            </FlipCard>
          );
        })}
      </CardsContainer>
      {loop.status !== GAME_STATUS.ACTIVE && (
        <Button size="large" type="primary" onClick={handleForwardClick}>
          {forwardButton(loop.status)}
          <Icon type="right" />
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  perspective: 600px;
  margin-bottom: 50px;
`;

const FlipCard = styled.div<{ flipped?: boolean }>`
  width: 120px;
  height: 200px;
  margin: 10px;
  border: 1px solid #e8e8e8;
  cursor: pointer;

  transform-style: preserve-3d;
  position: relative;
  transition: transform 0.8s;

  ${props =>
    props.flipped &&
    css`
      transform: rotateY(180deg);
    `}
`;

const CardSide = styled.div<{ front?: boolean; back?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;

  ${props =>
    props.back &&
    css`
      transform: rotateY(180deg);
    `}
`;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // @ts-ignore
  fetchCards: (n: number) => dispatch(fetchCards(n)),
  selectCard: (n: number) => dispatch(pickCard(n)),
  changeStatus: (type: STATUS_TYPES) => dispatch(changeLoopStatus(type)),
  saveRound: (status: GAME_STATUS) => dispatch(saveRound(status)),
});

export default connect(
  ({ loop }: AppState) => ({ loop }),
  mapDispatchToProps,
)(GameView);
