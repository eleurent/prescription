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
		return "missingDate";
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
  return datePlusYears(context.dateOfFacts, 3);
}

const prescriptionSocle6 = (context) => {
  return datePlusYears(context.dateOfFacts, 6);
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
  	dateCheck_1: {
  		rule: dateCheck_1,
  		description: "Quelle est la date des faits?"
  	},
  	dateCheck_1_1: {
  		rule: dateCheck_1_1,
  		description: "Le ${this.dateOfFacts.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la date de la commission des faits.",
  		law: "Loi du 31 décembre 1957 instituant le code de procédure pénale"
  	},
  	dateCheck_1_2: {
  		rule: dateCheck_1_2,
  		description: "",
  		law: ""
  	},
  	dateCheck_1_2_1: {
  		rule: dateCheck_1_2_1,
  		description: ""
  	},
  	dateCheck_1_3: {
  		rule: dateCheck_1_3,
  		description: ""
  	},
  	dateCheck_1_4: {
  		rule: dateCheck_1_4,
  		description: ""
  	},
  	dateCheck_1_5: {
  		rule: dateCheck_1_5,
  		description: ""
  	},
  	prescriptionSocle: {
  		rule: prescriptionSocle,
  		description: ""
  	},
  	prescriptionSocle6: {
  		rule: prescriptionSocle6,
  		description: ""
  	},
  	missingDate: {
  		description: "Erreur: dates manquantes."
  	},
};


const fillTemplate = function(templateString, templateVars){
    return new Function("return `"+templateString +"`;").call(templateVars);
}

const Node = (props) => {
		if (props.value instanceof Date)
			return (<Alert variant="success">La prescription des faits apparait acquise / court jusqu'au : { props.value.toLocaleDateString() }</Alert>);
  	else
  		console.log(props.value);
  		let law = nodes[props.value].law ? "(" + nodes[props.value].law + ")" : ""
  		return (
	  		<Alert variant="primary">
	  		{ fillTemplate(nodes[props.value].description, props.inputValues) } { law }
	  		<div className="d-flex justify-content-end">
	  		{ props.value }
	  		</div>
	  		</Alert>
  		);
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
  	while (node in nodes && "rule" in nodes[node] && depth < 20) {
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
   { path.map((node, idx) => <Node key={idx} value={node} inputValues={this.props.inputValues}/>) }
    </div>
  	)
  }
}

export default Tree;