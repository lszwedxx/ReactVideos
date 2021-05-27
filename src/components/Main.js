import { React, useContext, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import VideosList from './VideosList';
import ThemeContext from '../context/ThemeContext';

const Main = () => {
  // Global context variable
  const { mode } = useContext(ThemeContext);
  const { background, color } = mode;
  // Hooks
  const [link, setLink] = useState('');
  const [videoParams, setVideoParams] = useState([]);

  // Take all videos from local storage
  useEffect(() => {
    setVideoParams(
      JSON.parse(localStorage.getItem('link')) === null
        ? []
        : JSON.parse(localStorage.getItem('link'))
    );
  }, []);
  // Set videos to local storage
  useEffect(() => {
    localStorage.setItem('link', JSON.stringify(videoParams));
  });

  // Handle input value
  const handleChange = (e) => {
    const { value } = e.target;
    setLink(value);
  };

  // Add video to local storage
  const addVidoe = async (e) => {
    e.preventDefault();
    // Id start/end index
    const indexStart = link.indexOf('=') + 1;
    const indexEnd = link.indexOf('&');
    // Slice id video from link
    const videoId =
      indexEnd !== -1
        ? link.slice(indexStart, indexEnd)
        : link.slice(indexStart);
    const sameVideo = [...videoParams].filter((video) => video.id === videoId);
    if (sameVideo.length === 0) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=statistics&id=${videoId}&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          const {
            items: [
              {
                id,
                player: { embedHtml },
                statistics: { viewCount, likeCount, dislikeCount },
                snippet: { publishedAt, title },
              },
            ],
          } = res;
          const dateIndex = publishedAt.indexOf('T');
          let date = publishedAt.split('');
          date.splice(dateIndex);
          date = date.join('');
          // Set vidoe params to hook
          setVideoParams([
            ...videoParams,
            {
              embedHtml,
              viewCount,
              likeCount,
              dislikeCount,
              date,
              title,
              id,
            },
          ]);
          setLink('');
        })
        .catch((err) => console.log(err));
    } else {
      setLink('');
      return false;
    }
    return undefined;
  };
  // Delete video
  const deleteVideo = (id) => {
    const newvideos = [...videoParams].filter((video) => video.id !== id);
    setVideoParams(newvideos);
  };
  return (
    <Container
      className={`bg-${background} text-${color} p-0 min-vh-100`}
      fluid
    >
      <Header input={link} handleChange={handleChange} handleClick={addVidoe} />
      <VideosList videos={videoParams} handleClick={deleteVideo} />
    </Container>
  );
};

export default Main;
