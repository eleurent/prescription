import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function datePlusYears(date, years) {
	date = new Date(date.getTime());
	date.setFullYear(date.getFullYear() + years);
	return date
}

const dateCheck_1 = (context) => {
	const date = ("prescriptionDate" in context) ? context.prescriptionDate : context.dateOfFacts;
	if (!date)
		return "error";
	if (date < new Date('1989-07-04')) {
		return "dateCheck_1_1";
	} else if (date < new Date('1998-06-18')) {
		return "dateCheck_1_2";
	} else if (date < new Date('2004-03-10')) {
		return "dateCheck_1_3";
	} else if (date < new Date('2017-03-01')) {
		return "dateCheck_1_4";
	} else {
  	return "dateCheck_1_5";
  }
};

const dateCheck_1_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
	if (context.prescriptionDate < new Date('1989-07-04'))
		return context.prescriptionDate;
	else
		return "dateCheck_1";
};

const dateCheck_1_2 = (context) => {
	if (context.isMinor && context.circAutorite)
		return "dateCheck_1_2_1";
	else
		return "prescriptionSocle";
};

const dateCheck_1_2_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
	if (context.prescriptionDate > new Date('1998-06-18'))
		return "dateCheck_1";
	else
		return context.prescriptionDate;
}

const prescriptionSocle = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
}

const prescriptionSocle6 = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 6);
}

const dateCheck_1_3 = (context) => {
	if (context.isMinor) {
    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
    	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
		} else {
			context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
		}
		if (context.prescriptionDate > new Date('2004-03-10'))
  		return "dateCheck_1";
  	else
  		return context.prescriptionDate;
	}
	else
		return "prescriptionSocle";
};

const dateCheck_1_4 = (context) => {
	if (context.isMinor) {
    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
    	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
		} else {
			context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
		}
		if (context.prescriptionDate > new Date('2017-03-01'))
  		return "dateCheck_1";
  	else
  		return context.prescriptionDate;
	}
	else
		return "prescriptionSocle";
};

const dateCheck_1_5 = (context) => {
	if (context.isMinor) {
    if (context.isMinor15) {
    	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
		} else {
			context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
		}
		return context.prescriptionDate;
	}
	else
		return "prescriptionSocle6";
};

const nodes = {
  	dateCheck_1: {rule: dateCheck_1},
  	dateCheck_1_1: {rule: dateCheck_1_1},
  	dateCheck_1_2: {rule: dateCheck_1_2},
  	dateCheck_1_2_1: {rule: dateCheck_1_2_1},
  	dateCheck_1_3: {rule: dateCheck_1_3},
  	dateCheck_1_4: {rule: dateCheck_1_4},
  	dateCheck_1_5: {rule: dateCheck_1_5},
  	prescriptionSocle: {rule: prescriptionSocle},
  	prescriptionSocle6: {rule: prescriptionSocle6},
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
    this.state = {root: "dateCheck_1"}
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