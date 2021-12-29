import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class InputForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit} onChange={this.props.onChange}>
        <h2>Nature de l'acte</h2>
        <div className="alert alert-light" role="alert">
        Il convient dans un premier temps de déterminer la nature de l'acte que vous souhaitez dénoncer :
        <ul>
          <li>Constitue une <mark>agression sexuelle</mark> le fait d'imposer à une personne un acte quelconque pouvant porter atteinte à son intégrité sexuelle ou à son intimité. Cette atteinte peut prendre des formes très diverses : attouchements sur les parties génitales, caresses sur le corps, baisers, frottement, déshabillement forcé... La jurisprudence exige que soit rapportée la preuve d'un contact physique, connoté sexuellement.</li>
          <li>Le <mark>viol</mark> consiste dans tout acte de pénétration sexuelle, quelle qu'en soit la nature. Il peut s'agir de pénétration digitale, pénienne, linguale, ou à l'aide d'un objet, à l'intérieur du vagin, du rectum, ou de la bouche.</li>
          <li>Le <mark>rapport oro-génital</mark> consiste à mettre en contact le sexe d'une personne, et la bouche d'une autre personne (action de lécher, d'embrasser, etc). Attention, en cas de pénétration, il s'agit d'un viol.</li>
        </ul>
        On distinguera le cas où l'acte de pénétration a été commis sur la personne de l'auteur (par exemple : une personne pratique une fellation sur une victime non consentante), ou sur la personne de la victime (cas le plus courant, c'est alors la victime qui est visée par l'acte de pénétration). 
        </div>
        <Form.Group className="mb-3" controlId="natureActe">
          <Form.Label>Nature de l'acte</Form.Label>
          <Form.Select name="natureActe" aria-label="Nature de l'acte">
            <option value="agression">Agression sexuelle</option>
            <option value="penetration">Pénétration</option>
            <option value="orogenital">Acte oro-génital sans pénétration</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="natureActe">
          <Form.Label>Commise sur</Form.Label>
          <Form.Select name="commiseSur" aria-label="Commise sur">
            <option value="auteur">La personne de l'auteur</option>
            <option value="victime">La personne de la victime</option>
          </Form.Select>
        </Form.Group>

        <h2>Circonstances</h2>
        <Form.Group className="mb-3" controlId="circAutorite">
          <Form.Check name="circAutorite" type="checkbox" label="Par personne ayant autorité ou ascendance sur la victime" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circFonctions">
          <Form.Check name="circFonctions" type="checkbox" label="Par personne abusant de l'autorité que lui confèrent ses fonctions" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circCoaction">
          <Form.Check name="circCoaction" type="checkbox" label="Par plusieurs personnes agissant en qualité de coauteurs ou de complices" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circArme">
          <Form.Check name="circArme" type="checkbox" label="Avec usage ou menace d'une arme" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="circBlessures">
          <Form.Check name="circBlessures" type="checkbox" label="Ayant entrainé des blessures" />
        </Form.Group>
        <h2>Dates</h2>
        <Row className="mb-3">
          <Col>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date de naissance de la victime</Form.Label>
            <Form.Control name="dateOfBirth" type="date" defaultValue={this.props.inputValues.dateOfBirth} onChange={this.props.handleChange}/>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="dateOfFacts">
            <Form.Label>Date des faits</Form.Label>
            <Form.Control name="dateOfFacts" type="date"  defaultValue={this.props.inputValues.dateOfFacts} onChange={this.props.handleChange}/>
          </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InputForm;