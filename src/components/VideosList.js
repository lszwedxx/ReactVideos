import { React, useContext } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';

const VideosList = ({
  videos,
  handleClick,
  addFavorite,
  favorite,
  favVideos,
}) => {
  const { mode } = useContext(ThemeContext);
  const { secondary, colorSecondary } = mode;
  const videosList = favorite ? favVideos : videos;
  return (
    <div className="container-fluid ">
      {videosList.length > 0 ? (
        <ul className="container-fluid list-unstyled p-4 m-0">
          <Row className="justify-content-around" md="2">
            {videosList.map((video) => (
              <li key={video.id}>
                <Col>
                  <iframe
                    title="video"
                    width="100%"
                    height="300px"
                    src={`https://youtube.com/embed/${video.id}`}
                  />
                  <h2>{video.title}</h2>
                  <div
                    style={{ fontSize: 15 }}
                    className={`text-${colorSecondary} d-flex p-1`}
                  >
                    <div className="d-flex flex-grow-1">
                      <p className="p-1 m-0">{`${video.viewCount} views`}</p>
                      <p className="p-1 m-0">{video.date}</p>
                    </div>
                    <div className="d-flex flex-grow-2">
                      <FontAwesomeIcon
                        className="fs-2 py-2"
                        icon={faThumbsUp}
                      />
                      <p className="py-1 m-0">{video.likeCount}</p>
                    </div>
                    <div className="d-flex flex-grow-2">
                      <FontAwesomeIcon
                        className="fs-2 py-2"
                        icon={faThumbsDown}
                      />
                      <p className="py-1 m-0">{video.dislikeCount}</p>
                    </div>
                    <Button
                      onClick={() => addFavorite(video.id)}
                      className={`btn-${secondary} mx-3`}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                      onClick={() => handleClick(video.id)}
                      className={`btn-danger text-${colorSecondary} mx-3`}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                </Col>
              </li>
            ))}
          </Row>
        </ul>
      ) : (
        <h1 className="m-0 text-center">Nothing to watch</h1>
      )}
    </div>
  );
};
export default VideosList;
