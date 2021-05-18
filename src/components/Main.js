import React from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import VideosList from './VideosList';

const Main = () => (
  <Container className="p-0 bg-dark-bg text-white vh-100" fluid>
    <Header />
    <VideosList />
  </Container>
);

export default Main;
