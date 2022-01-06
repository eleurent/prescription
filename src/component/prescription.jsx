import React from "react";
import InputForm from './form.jsx'
import Path from './path.jsx'
import prescriptionGraph from '../backend/rules'

class Prescription extends React.Component {
  state = {
      natureActe: 'agression',
      commiseSur: 'auteur',
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
    if (this.state.dateOfBirth && this.state.dateOfFacts) {
      const majorDate = new Date(this.state.dateOfBirth.getTime());
      const major15Date = new Date(this.state.dateOfBirth.getTime());
      majorDate.setFullYear(this.state.dateOfBirth.getFullYear() + 18);
      major15Date.setFullYear(this.state.dateOfBirth.getFullYear() + 15);
      this.setState({isMinor: this.state.dateOfFacts < majorDate, isMinor15: this.state.dateOfFacts < major15Date});
    }
  }

  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      this.setState({[event.target.name]: event.target.checked}, () => {this.updateState();})
    } else if (event.target.type === "date") {
      this.setState({[event.target.name]: event.target.valueAsDate}, () => {this.updateState();})
    } else
      this.setState({[event.target.name]: event.target.value}, () => {this.updateState();})
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const path = prescriptionGraph.traverse(this.state);
    return (
      <div>
      <InputForm onSubmit = {this.handleSubmit} onChange = {this.handleChange} inputValues = {this.state}/>
      <Path path = {path}/>
      </div>
    )
  }
}

export default Prescription;
