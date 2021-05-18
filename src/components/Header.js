import React from 'react';
import { Form, FormGroup, Button, Input, Row, Col } from 'reactstrap';

const Header = () => (
  <header>
    <h1 className="text-center">My Favorite Videos</h1>
    <Form className="bg-dark-primary p-5">
      <FormGroup>
        <Row className="justify-content-center">
          <Col xs="12" sm="6" md="5" lg="4">
            <Input />
          </Col>
          <Col xs="auto">
            <Button className="btn-dark-secondary">Add</Button>
          </Col>
          <Col xs="auto">
            <Input className="bg-dark-secondary text-white" type="select">
              <option>All</option>
              <option>Favorites</option>
            </Input>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  </header>
);

export default Header;
