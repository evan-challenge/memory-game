import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import styled from 'styled-components';
import { Button, Typography } from 'antd';

interface IntroViewProps extends RouteComponentProps {}

const ButtonGroup = Button.Group;

const gameModes = [4, 8, 12];

export default (props: IntroViewProps) => (
  <Container>
    <Typography.Title>Memory Game</Typography.Title>
    <Typography.Paragraph strong type="secondary">
      Select an amount of cards you want to play
    </Typography.Paragraph>
    <ButtonGroup>
      {gameModes.map(mode => (
        <Button key={mode} size="large">
          <Link to={`/play/${mode}`}>{mode} cards</Link>
        </Button>
      ))}
    </ButtonGroup>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;
