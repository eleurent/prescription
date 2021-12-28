import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


const dateCheck = (context) => {
	if (!context.dateOfFacts)
		return "error";
	if (context.dateOfFacts < new Date('1989-07-04')) {
		return "dateCheck_1";
	} else if (context.dateOfFacts < new Date('1998-06-18')) {
		return "dateCheck_2";
	} else if (context.dateOfFacts < new Date('2004-03-10')) {
		return "dateCheck_3";
	} else if (context.dateOfFacts < new Date('2017-03-01')) {
		return "dateCheck_4";
	} else {
  	return "dateCheck_5";
  }
};

const dateCheck_1 = (context) => {
	context.prescriptionDate = new Date(context.dateOfFacts.getTime());
	context.prescriptionDate.setFullYear(context.prescriptionDate.getFullYear() + 3);
	if (context.prescriptionDate < new Date('1989-07-04'))
		return context.prescriptionDate;
	else
		return "dateCheck_2";
};

const dateCheck_2 = (context) => {
	if (context.isMinor && context.circAutorite)
		return "dateCheck_2_1";
	else
		return "dateCheck_2_2";
};

const dateCheck_2_1 = (context) => {
	context.prescriptionDate = new Date(context.dateOfBirth.getTime());
	context.prescriptionDate.setFullYear(context.prescriptionDate.getFullYear() + 21);
	return context.prescriptionDate;
}

const dateCheck_2_2 = (context) => {
  context.prescriptionDate = new Date(context.dateOfFacts.getTime());
	context.prescriptionDate.setFullYear(context.prescriptionDate.getFullYear() + 3);
	return context.prescriptionDate;
}

const nodes = {
  	dateCheck: {rule: dateCheck},
  	dateCheck_1: {rule: dateCheck_1},
  	dateCheck_2: {rule: dateCheck_2},
  	dateCheck_2_1: {rule: dateCheck_2_1},
  	dateCheck_2_2: {rule: dateCheck_2_2},
};

const Node = (props) => {
		let name = props.value;
		if (name instanceof Date)
			name = name.toString();
  	return (<Alert variant="primary">{ name }</Alert>);
}

class Tree extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {root: "dateCheck"}
  }

  traverse(inputValues) {
  	console.log("inputValues", inputValues);
  	let context = {...inputValues};
  	let path = [];
  	let node = this.state.root;
  	path.push(node);
  	let depth = 0;
  	while (node in nodes && depth < 20) {
  		node = nodes[node].rule(context);
  		path.push(node);
  		depth++;
  	}
  	return path
  }

  render() {
  	const path = this.traverse(this.props.inputValues);
  	console.log(path);
  	return (<div>
   { path.map((node, idx) => <Node key={idx} value={node}/>) }
  </div>
  	)
  }
}

export default Tree;