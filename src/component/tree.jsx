import React from "react";
import Alert from 'react-bootstrap/Alert';

const SHOW_RULE_NAMES = false;

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
	if (context.isMinor && (context.circAutorite || context.circFonctions))
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
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
  return context.prescriptionDate;
}

const prescriptionSocle6 = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 6);
  return context.prescriptionDate;
}

const dateCheck_1_3 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor) {
    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
    	return "dateCheck_1_3_2";
		} else {
			return "dateCheck_1_3_1";
		}
	}
	else
		return "prescriptionSocle";
};

const dateCheck_1_3_1 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
	if (context.prescriptionDate > new Date('2004-03-10'))
		return "dateCheck_1";
	else
		return context.prescriptionDate;
}

const dateCheck_1_3_2 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	if (context.prescriptionDate > new Date('2004-03-10'))
		return "dateCheck_1";
	else
		return context.prescriptionDate;
}

const dateCheck_1_4 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor) {
    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
    	return "dateCheck_1_4_2";
		} else {
			return "dateCheck_1_4_1";
		}
	}
	else
		return "prescriptionSocle";
};

const dateCheck_1_4_1 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	if (context.prescriptionDate > new Date('2017-03-01'))
		return "dateCheck_1";
	else
		return context.prescriptionDate;
}

const dateCheck_1_4_2 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
	if (context.prescriptionDate > new Date('2017-03-01'))
		return "dateCheck_1";
	else
		return context.prescriptionDate;
}


const dateCheck_1_5 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor) {
    if (context.isMinor15) {
    	return "dateCheck_1_5_2";
		} else {
			return "dateCheck_1_5_1";
		}
	}
	else
		return "prescriptionSocle6";
};

const dateCheck_1_5_1 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	return context.prescriptionDate;
}

const dateCheck_1_5_2 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
	return context.prescriptionDate;
}


const nodes = {
  	dateCheck_start: {
  		rule: dateCheck_1,
  		description: null
  	},
  	dateCheck_1: {
  		rule: dateCheck_1,
  		description: `Les faits n'étaient pas prescrits au moment de l'entrée en vigueur d'une nouvelle loi de réforme portant allongement du délai prescription de l'action publique (voir ci-dessous).`
  	},
  	dateCheck_1_1: {
  		rule: dateCheck_1_1,
  		description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: "Loi du 31 décembre 1957 instituant le code de procédure pénale"
  	},
  	dateCheck_1_2: {
  		rule: dateCheck_1_2,
  		description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 3 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 3 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 14 juillet 1989, décision de la chambre criminelle du 2 décembre 1998"
  	},
  	dateCheck_1_2_1: {
  		rule: dateCheck_1_2_1,
  		description:  (context) => `En application de la loi précitée, le délai de prescription de l'action publique court jusqu'au ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	dateCheck_1_3: {
  		rule: dateCheck_1_3,
  		description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 3 ans à compter de la majorité de la victime mineure, ou\n- par 10 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confère ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\n- par 3 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 18 juin 1998, et loi du 19 mars 2003"
  	},
  	dateCheck_1_3_1: {
  		rule: dateCheck_1_3_1,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	dateCheck_1_3_2: {
  		rule: dateCheck_1_3_2,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confère ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	dateCheck_1_4: {
  		rule: dateCheck_1_4,
  		description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confère ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\n- par 3 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 10 mars 2004, et loi du 5 avril 2006"
  	},
  	dateCheck_1_4_1: {
  		rule: dateCheck_1_4_1,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	dateCheck_1_4_2: {
  		rule: dateCheck_1_4_2,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confère ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	dateCheck_1_5: {
  		rule: dateCheck_1_5,
  		description: (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait:\n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans \n- par 6 ans, à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 1er mars 2017"
  	},
  	dateCheck_1_5_1: {
  		rule: dateCheck_1_5_1,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	dateCheck_1_5_2: {
  		rule: dateCheck_1_5_2,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	prescriptionSocle: {
  		rule: prescriptionSocle,
  		description: (context) => `En application, le délit d'agression sexuelle se prescrivait à 3 ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	prescriptionSocle6: {
  		rule: prescriptionSocle6,
  		description: (context) => `Le délit d'agression sexuelle se prescrivait à 6 ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	missingDate: {
  		description: null
  	},
};

function NewlineText(props) {
  return props.text.split('\n').map((str, idx) => <p key={idx}>{str}</p>);
}


const RuleName = (props) => {
	if (SHOW_RULE_NAMES) {
		return (
  		<div className="d-flex justify-content-end">
  		{ props.name }
  		</div>
			)
	} else return (null);
}

const Node = (props) => {
	if (props.value instanceof Date)
		return (<Alert variant="success">La prescription des faits {props.context.prescriptionDate > new Date() ? "court jusqu'au" : "apparait acquise depuis le"} : { props.value.toLocaleDateString() }</Alert>);
	else {
		let description = nodes[props.value].description;
		if (description == null)
			return (null);
		else if (description instanceof Function)
			description = description(props.context);

		let law = nodes[props.value].law ? "(" + nodes[props.value].law + ")" : ""


		return (
  		<Alert variant="primary">
  		<NewlineText text={ description + " " + law }/>
  		<RuleName name={ props.value }/>
  		</Alert>
		);
	}
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