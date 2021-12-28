import React, { Component } from "react";
import InputForm from './form.jsx'
import Tree from './tree.jsx'


class Prescription extends React.Component {
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
    if (this.state.dateOfBirth && this.state.dateOfFacts) {
      const majorDate = new Date(this.state.dateOfBirth.getTime());
      const major15Date = new Date(this.state.dateOfBirth.getTime());
      majorDate.setFullYear(majorDate.getFullYear() + 18);
      major15Date.setFullYear(majorDate.getFullYear() + 15);
      console.log("dateOfBirth update", this.state.dateOfBirth)
      this.setState({isMinor: this.state.dateOfFacts < majorDate, isMinor15: this.state.dateOfFacts < major15Date});
    }
  }

  handleChange = (event) => {
    if (event.target.type == "checkbox") {
      this.setState({[event.target.name]: event.target.checked}, () => {this.updateState();})
    } else if (event.target.type == "date") {
      this.setState({[event.target.name]: event.target.valueAsDate}, () => {this.updateState();})
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
      <Tree inputValues = {inputValues}/>
      </div>
    )
  }
}

export default Prescription;
