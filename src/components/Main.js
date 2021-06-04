import { React, useContext, useState, useEffect } from 'react';
import { Container, Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import Header from './Header';
import VideosList from './VideosList';
import ThemeContext from '../context/ThemeContext';

const Main = () => {
  // Global context variable
  const { mode } = useContext(ThemeContext);
  const { background, color, secondary } = mode;
  // Hooks
  const [link, setLink] = useState('');
  const [videoParams, setVideoParams] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [favVideos, setFavVideos] = useState([]);
  const [modal, setModal] = useState(false);

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
    setFavVideos(videoParams.filter((video) => video.favorite));
  }, [videoParams]);

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
              favorite: false,
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
        .catch(() => {
          setLink('');
          setModal(true);
        });
    } else {
      setLink('');
      return false;
    }
    return undefined;
  };
  // Delete video
  const deleteVideo = (id) => {
    const newVideos = [...videoParams].filter((video) => video.id !== id);
    setVideoParams(newVideos);
  };

  // Toggle favorite videos
  const toggleVideos = () => {
    setFavorite((prevState) => !prevState);
  };
  // Add video to favorites
  const addFavorite = (id) => {
    const newVideos = [...videoParams].map((video) =>
      video.id === id ? { ...video, favorite: true } : video
    );
    setVideoParams(newVideos);
  };
  // Toggle Modal
  const toggle = () => setModal(!modal);

  return (
    <Container
      className={`bg-${background} text-${color} p-0 min-vh-100`}
      fluid
    >
      <Header
        input={link}
        handleChange={handleChange}
        handleClick={addVidoe}
        handleToggle={toggleVideos}
      />
      <VideosList
        videos={videoParams}
        handleClick={deleteVideo}
        favorite={favorite}
        addFavorite={addFavorite}
        favVideos={favVideos}
      />
      <Modal isOpen={modal} toggle={toggle} className={`bg-${background}`}>
        <ModalBody className={`bg-${background} text-${color}`}>
          Ups Something goes wrong. Please check Your Link
        </ModalBody>
        <ModalFooter className={`bg-${background} text-${color}`}>
          <Button className={`btn-${secondary}`} onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Main;
