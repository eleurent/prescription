import React from "react";
import Alert from 'react-bootstrap/Alert';

function datePlusYears(date, years) {
	date = new Date(date.getTime());
	date.setFullYear(date.getFullYear() + years);
	return date
}


const dateCheck_1 = (context) => {
	const date = ("prescriptionDate" in context) ? context.prescriptionDate : context.dateOfFacts;
	if (!context.dateOfFacts || !context.dateOfBirth)
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
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor && context.circAutorite)
		return "dateCheck_1_2_1";
	else
		return "prescriptionSocle";
};

const dateCheck_1_2_1 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
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
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
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
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
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
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
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
  	dateCheck_start: {
  		rule: dateCheck_1,
  		description: null
  	},
  	dateCheck_1: {
  		rule: dateCheck_1,
  		description: `Toutefois, les faits n'étaient pas prescrits au moment de l'entrée en vigueur d'une nouvelle loi de réforme portant allongement du délai prescription de l'action publique (voir ci-dessous).`
  	},
  	dateCheck_1_1: {
  		rule: dateCheck_1_1,
  		description: `Le ${this.dateOfFacts.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la date de la commission des faits, soit le ${this.prescriptionDate.toLocaleDateString()}.`,
  		law: "Loi du 31 décembre 1957 instituant le code de procédure pénale"
  	},
  	dateCheck_1_2: {
  		rule: dateCheck_1_2,
  		description: `Le ${this.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 3 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 3 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 14 juillet 1989, décision de la chambre criminelle du 2 décembre 1998"
  	},
  	dateCheck_1_2_1: {
  		rule: dateCheck_1_2_1,
  		description: `En application de la loi précitée, le délai de prescription de l'action publique court jusqu'au ${this.prescriptionDate.toLocaleDateString()}.`
  	},
  	dateCheck_1_3: {
  		rule: dateCheck_1_3,
  		description: `Le ${this.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 10 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 3 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 18 juin 1998, et loi du 19 mars 2003"
  	},
  	dateCheck_1_4: {
  		rule: dateCheck_1_4,
  		description: `Le ${this.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confère ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\n- par 3 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 10 mars 2004, et loi du 5 avril 2006"
  	},
  	dateCheck_1_5: {
  		rule: dateCheck_1_5,
  		description: ``
  	},
  	prescriptionSocle: {
  		rule: prescriptionSocle,
  		description: null
  	},
  	prescriptionSocle6: {
  		rule: prescriptionSocle6,
  		description: null
  	},
  	missingDate: {
  		description: `Erreur: dates manquantes.`
  	},
};


const fillTemplate = function(templateString, templateVars){
    return new Function("return `"+templateString +"`;").call(templateVars);
}

const Node = (props) => {
		if (props.value instanceof Date)
			return (<Alert variant="success">La prescription des faits apparait acquise / court jusqu'au : { props.value.toLocaleDateString() }</Alert>);
  	else
  		if (nodes[props.value].description == null)
  			return (null);
  		let law = nodes[props.value].law ? "(" + nodes[props.value].law + ")" : ""
  		return (
	  		<Alert variant="primary">
	  		{ fillTemplate(nodes[props.value].description, props.context) } { law }
	  		<div className="d-flex justify-content-end">
	  		{ props.value }
	  		</div>
	  		</Alert>
  		);
}

class Tree extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {root: "dateCheck_start"}
  }

  traverse(inputValues) {
  	let context = {...inputValues};
  	let path = [];
  	let node = this.state.root;
  	while (node in nodes && "rule" in nodes[node]) {
  		let next_node = nodes[node].rule(context);
  		path.push(<Node key={path.length} value={node} context={{...context}}/>);
  		node = next_node
  	}
  	path.push(<Node key={path.length} value={node} context={{...context}}/>);
  	return path
  }

  render() {
  	const path = this.traverse(this.props.inputValues);
  	return (<div>
   { path }
    </div>
  	)
  }
}

export default Tree;