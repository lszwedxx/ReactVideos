import { React, useContext } from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import VideosList from './VideosList';
import ThemeContext from '../context/ThemeContext';

const Main = () => {
  const { mode } = useContext(ThemeContext);
  const { background, color } = mode;
  return (
    <Container className={`bg-${background} text-${color} p-0 vh-100`} fluid>
      <Header />
      <VideosList />
    </Container>
  );
};

export default Main;
