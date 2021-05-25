import { React, useContext } from 'react';
import Parser from 'html-react-parser';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';

const VideosList = ({ videos }) => {
  const { mode } = useContext(ThemeContext);
  const { secondary, colorSecondary } = mode;
  const videosList = videos || [];
  return (
    <div className="container-fluid ">
      {videosList.length > 0 ? (
        <ul className="container-fluid list-unstyled p-4 m-0">
          <Row className="justify-content-around" md="2">
            {videos.map((video) => (
              <li key={video.id}>
                <Col>
                  <div className="text-center">{Parser(video.embedHtml)}</div>
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
                    <Button className={`btn-${secondary} mx-3`}>
                      <FontAwesomeIcon icon={faPlus} />
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
