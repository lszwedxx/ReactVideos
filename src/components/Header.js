import { React, useContext } from 'react';
import { Form, FormGroup, Button, Input, Row, Col } from 'reactstrap';
import ThemeContext from '../context/ThemeContext';

const Header = ({ input, handleChange, handleClick, handleToggle }) => {
  const { changeMode, mode } = useContext(ThemeContext);
  const { name, primary, secondary } = mode;
  return (
    <header className={`bg-${primary}`}>
      <h1 className="text-center">My Favorite Videos</h1>
      <Button
        onClick={changeMode}
        className={`btn-${secondary} position-absolute top-0 end-0 m-3`}
      >
        {name === 'dark' ? 'Light' : 'Dark'}
      </Button>
      <Form className="p-5">
        <FormGroup>
          <Row className="justify-content-center">
            <Col xs="12" sm="6" md="5" lg="4">
              <Input
                placeholder="Add Video"
                value={input}
                onChange={handleChange}
              />
            </Col>
            <Col xs="auto">
              <Button onClick={handleClick} className={`btn-${secondary}`}>
                Add
              </Button>
            </Col>
            <Col xs="auto">
              <Input
                onChange={handleToggle}
                className={`btn-${secondary}`}
                type="select"
              >
                <option>All</option>
                <option>Favorites</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </header>
  );
};

export default Header;
