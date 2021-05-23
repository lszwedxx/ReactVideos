import { React, useContext, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import VideosList from './VideosList';
import ThemeContext from '../context/ThemeContext';

const Main = () => {
  const { mode } = useContext(ThemeContext);
  const { background, color } = mode;
  const [link, setLink] = useState('');
  const [videoParams, setVideoParams] = useState([]);

  // Take all videos from local storage
  useEffect(() => {
    setVideoParams(JSON.parse(localStorage.getItem('link')));
    console.log(videoParams);
  }, []);
  useEffect(() => {
    localStorage.setItem('link', JSON.stringify(videoParams));
  }, [videoParams]);

  // Handle input value
  const handleChange = (e) => {
    const { value } = e.target;
    setLink(value);
  };

  // Add video to local storage
  const addVidoe = async (e) => {
    e.preventDefault();
    const arr = [
      {
        key: '4',
        date: '2021-05-21',
        title: 'Lofi Morning Coffe',
        viewCount: '2500',
        like: '500',
        dislike: '25',
        video:
          '<iframe src="https://www.youtube.com/watch?v=Vdxp5H2vOdU"></iframe>',
      },
      {
        key: '3',
        date: '2020-06-14',
        title: 'Workout Music',
        viewCount: '1253',
        like: '258',
        dislike: '3',
        video:
          '<iframe src="https://www.youtube.com/watch?v=Vdxp5H2vOdU" style="border:0px #ffffff none;" name="b" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px"  allowfullscreen></iframe>',
      },
      {
        key: '2',
        date: '2021-05-12',
        title: 'Throwing no Spin',
        viewCount: '500',
        like: '35',
        dislike: '1',
        video:
          '<iframe src="https://www.youtube.com/watch?v=nQ0Tf68DlpM" style="border:0px #ffffff none;" name="a" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" allowfullscreen></iframe>',
      },
      {
        key: '1',
        date: '2018-11-21',
        title: 'Javascript Tricks',
        viewCount: '3678',
        like: '1250',
        dislike: '65',
        video:
          '<iframe src="https://www.youtube.com/watch?v=Vdxp5H2vOdU" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" allowfullscreen></iframe>',
      },
    ];
    setVideoParams(arr);
    setLink('');
  };
  return (
    <Container
      className={`bg-${background} text-${color} p-0 min-vh-100`}
      fluid
    >
      <Header input={link} handleChange={handleChange} handleClick={addVidoe} />
      <VideosList videos={videoParams} />
    </Container>
  );
};

export default Main;
