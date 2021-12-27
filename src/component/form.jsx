import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      natureActe: 'attouchement',
      circAutorite: false,
      circFonctions: false,
      circCoaction: false,
      circArme: false,
      circBlessures: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
  }
  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="natureActe">
          <Form.Label>Nature de l'acte</Form.Label>
          <Form.Select aria-label="Nature de l'acte">
            <option value="attouchement">Attouchement</option>
            <option value="penetration">Pénétration</option>
          </Form.Select>
          {/* <Form.Text className="text-muted"> */}
          {/*   Nature de l'acte effectué */}
          {/* </Form.Text> */}
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
        {/*   <Form.Label>Password</Form.Label> */}
        {/*   <Form.Control type="password" placeholder="Password" /> */}
        {/* </Form.Group> */}
        <Form.Group className="mb-3" controlId="circAutorite">
          <Form.Check type="checkbox" label="Par personne ayant autorite ou ascendance sur la victime" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circFonctions">
          <Form.Check type="checkbox" label="Par personne abusant de l'autorite que lui confère ses fonctions" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circCoaction">
          <Form.Check type="checkbox" label="Par plusieurs personnes agissant en coaction" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circArme">
          <Form.Check type="checkbox" label="Avec usage ou menace d'une arme" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circBlessures">
          <Form.Check type="checkbox" label="Ayant entrainé des blessures" />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date de naissance de la victime</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group controlId="dateOfFacts">
            <Form.Label>Date des faits</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Valider
        </Button>
      </Form>
    );
  }
}

export default InputForm;
