import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { Router } from '@reach/router';
import { Layout } from 'antd';

import store from './store';
import Intro from './views/Intro';
import Game from './views/Game';
import History from './views/History';

const { Content, Sider } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Sider width={200} theme="light">
          <History />
        </Sider>
        <StyledContent>
          <InnerContainer>
            <Router>
              <Intro path="/" />
              <Game path="/play/:difficulty" />
            </Router>
          </InnerContainer>
        </StyledContent>
      </Container>
    </Provider>
  );
};

const Container = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
`;

const InnerContainer = styled.div`
  padding: 24px;
  background: #fff;
`;

export default App;
