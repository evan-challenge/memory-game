import React from 'react';
import { Empty, Timeline } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { AppState } from '../store';
import { GAME_STATUS } from '../store/types';

interface HistoryViewProps {
  history: AppState['history'];
}

const History = ({ history }: HistoryViewProps) => {
  if (!history.results.length) {
    return <HistoryEmpty />;
  }

  return (
    <TimelineHistory>
      {history.results.map(round => (
        <Timeline.Item
          key={round.timestamp}
          color={round.status === GAME_STATUS.WON ? 'green' : 'red'}
        >
          {round.status === GAME_STATUS.WON ? 'Won' : 'Lost'}
        </Timeline.Item>
      ))}
    </TimelineHistory>
  );
};

const HistoryEmpty = () => (
  <EmptyContainer>
    <Empty description="No game history yet" />
  </EmptyContainer>
);

const EmptyContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineHistory = styled(Timeline)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}`;

export default connect((state: AppState) => ({ history: state.history }))(
  History,
);
