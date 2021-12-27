import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class InputForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit} onChange={this.props.onChange}>
        <Form.Group className="mb-3" controlId="natureActe">
          <Form.Label>Nature de l'acte</Form.Label>
          <Form.Select name="natureActe" aria-label="Nature de l'acte">
            <option value="attouchement">Attouchement</option>
            <option value="penetration">Pénétration</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="circAutorite">
          <Form.Check name="circAutorite" type="checkbox" label="Par personne ayant autorité ou ascendance sur la victime" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circFonctions">
          <Form.Check name="circFonctions" type="checkbox" label="Par personne abusant de l'autorité que lui confère ses fonctions" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circCoaction">
          <Form.Check name="circCoaction" type="checkbox" label="Par plusieurs personnes agissant en coaction" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circArme">
          <Form.Check name="circArme" type="checkbox" label="Avec usage ou menace d'une arme" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circBlessures">
          <Form.Check name="circBlessures" type="checkbox" label="Ayant entrainé des blessures" />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date de naissance de la victime</Form.Label>
            <Form.Control name="dateOfBirth" type="date" defaultValue={this.props.inputValues.dateOfBirth} onChange={this.props.handleChange}/>
          </Form.Group>
          <Form.Group controlId="dateOfFacts">
            <Form.Label>Date des faits</Form.Label>
            <Form.Control name="dateOfFacts" type="date"  defaultValue={this.props.inputValues.dateOfFacts} onChange={this.props.handleChange}/>
          </Form.Group>
        </Row>
        {/* <Button variant="primary" type="submit"> */}
        {/*   Valider */}
        {/* </Button> */}
      </Form>
    );
  }
}

class DateEvaluation extends React.Component {
  state = {
      natureActe: 'attouchement',
      circAutorite: false,
      circFonctions: false,
      circCoaction: false,
      circArme: false,
      circBlessures: false,
      dateOfBirth: null,
      dateOfFacts: null,
      isMinor: '?'
  }

  updateState() {
    const today = new Date();
    const majorDate = new Date(this.state.dateOfBirth);
    majorDate.setFullYear(majorDate.getFullYear() + 18);
    const isMinor = today < majorDate
    this.setState({isMinor: isMinor});
  }

  handleChange = (event) => {
    if (event.target.type == "checkbox") {
      this.setState({[event.target.name]: event.target.checked}, () => {this.updateState();})
    } else
      this.setState({[event.target.name]: event.target.value}, () => {this.updateState();})
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const inputValues = this.state
    return (
      <div>
      <InputForm onSubmit = {this.handleSubmit} onChange = {this.handleChange} inputValues = {inputValues}/>
      <p>La victime est {this.state.isMinor == true ? "Mineure": (this.state.isMinor == false ? "Majeure" : this.state.isMinor)}</p>
      </div>
    )
  }
}

export default DateEvaluation;
