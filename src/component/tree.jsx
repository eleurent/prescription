import React from "react";
import Alert from 'react-bootstrap/Alert';

const SHOW_RULE_NAMES = false;

function datePlusYears(date, years) {
	date = new Date(date.getTime());
	date.setFullYear(date.getFullYear() + years);
	return date
}

const typeCheck = (context) => {
	switch(context.natureActe) {
		case "agression":
			return "delit_root";
		case "penetration":
		  switch(context.commiseSur) {
		  	case "auteur":
		  		if (!context.dateOfFacts)
		  			return "missingDate";
		  		return context.dateOfFacts < new Date('2018-08-03') ? "delit_root" : "crime_root";
	  		case "victime":
	  			return "crime_root";
	  		default:
	  			return "error";
		  }
		case "orogenital":
			if (!context.dateOfFacts)
  			return "missingDate";
			return context.dateOfFacts < new Date('2021-04-21') ? "delit_root" : "crime_root";
		default:
			return "error";
	}
};

const delit = (context) => {
	const date = ("prescriptionDate" in context) ? context.prescriptionDate : context.dateOfFacts;
	if (!context.dateOfFacts || !context.dateOfBirth)
		return "missingDate";
	if (date < new Date('1989-07-04')) {
		context.validUntil = new Date('1989-07-04');
		return "delit_1";
	} else if (date < new Date('1998-06-18')) {
		context.validUntil = new Date('1998-06-18');
		return "delit_2";
	} else if (date < new Date('2004-03-10')) {
		context.validUntil = new Date('2004-03-10');
		return "delit_3";
	} else if (date < new Date('2017-03-01')) {
		context.validUntil = new Date('2017-03-01');
		return "delit_4";
	} else {
		context.validUntil = new Date('9999-01-01'); // Unknown
  	return "delit_5";
  }
};

const delit_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
	if (context.prescriptionDate < context.validUntil)
		return context.prescriptionDate;
	else
		return "delit";
};

const delit_2 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor && (context.circAutorite || context.circFonctions))
		return "delit_2_1";
	else
		return "prescriptionSocle";
};

const delit_2_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}

const prescriptionSocle = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
  return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}

const prescriptionSocle6 = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 6);
  return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}

const delit_3 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor) {
    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
    	return "delit_3_2";
		} else {
			return "delit_3_1";
		}
	}
	else
		return "prescriptionSocle";
};

const delit_3_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}

const delit_3_2 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}

const delit_4 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor) {
    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
    	return "delit_4_2";
		} else {
			return "delit_4_1";
		}
	}
	else
		return "prescriptionSocle";
};

const delit_4_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}

const delit_4_2 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "delit";
}


const delit_5 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor) {
    if (context.isMinor15) {
    	return "delit_5_2";
		} else {
			return "delit_5_1";
		}
	}
	else
		return "prescriptionSocle6";
};

const delit_5_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	return context.prescriptionDate;
}

const delit_5_2 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
	return context.prescriptionDate;
}

const crime = (context) => {
	const date = ("prescriptionDate" in context) ? context.prescriptionDate : context.dateOfFacts;
	if (!context.dateOfFacts || !context.dateOfBirth)
		return "missingDate";
	if (date < new Date('1989-07-04')) {
		context.validUntil = new Date('1989-07-04');
		return "crime_1";
	} else if (date < new Date('1998-06-18')) {
		context.validUntil = new Date('1998-06-18');
		return "crime_2";
	} else if (date < new Date('2004-03-10')) {
		context.validUntil = new Date('2004-03-10');
		return "crime_3";
	} else if (date < new Date('2017-02-27')) {
		context.validUntil = new Date('2017-02-27');
		return "crime_4";
	} else if (date < new Date('2018-08-03')) {
		context.validUntil = new Date('2018-08-03');
  	return "crime_5";
	} else {
		context.validUntil = new Date('9999-01-01');
  	return "crime_6";
  }
};

const crime_1 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfFacts, 10);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "crime";

};

const crime_2 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor && (context.circAutorite || context.circFonctions))
		return "crime_major10";
	else
		return "crime_prescriptionSocle10";
};

const crime_3 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor)
		return "crime_major10";
	else
		return "crime_prescriptionSocle10";
};

const crime_4 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor)
		return "crime_major20";
	else
		return "crime_prescriptionSocle10";
};
const crime_5 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor)
		return "crime_major20";
	else
		return "crime_prescriptionSocle20";
};

const crime_6 = (context) => {
	context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
	if (context.isMinor)
		return "crime_major30";
	else
		return "crime_prescriptionSocle20";
};

const crime_prescriptionSocle10 = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 10);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "crime";
}

const crime_prescriptionSocle20 = (context) => {
  context.prescriptionDate = datePlusYears(context.dateOfFacts, 20);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "crime";
}

const crime_major10 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "crime";
}

const crime_major20 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
	return (context.prescriptionDate < context.validUntil) ? context.prescriptionDate : "crime";
}

const crime_major30 = (context) => {
	context.prescriptionDate = datePlusYears(context.dateOfBirth, 48);
	return context.prescriptionDate;
}


const nodes = {
  	typeCheck: {
  		rule: typeCheck,
  		description: null
  	},
  	delit_root: {
  		rule: delit,
  		description: "Les faits sont qualifiés de délit."
  	},
  	delit: {
  		rule: delit,
  		description: `Les faits n'étaient pas prescrits au moment de l'entrée en vigueur d'une nouvelle loi de réforme portant allongement du délai de prescription de l'action publique (voir ci-dessous).`
  	},
  	delit_1: {
  		rule: delit_1,
  		description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: "Loi du 31 décembre 1957 instituant le code de procédure pénale"
  	},
  	delit_2: {
  		rule: delit_2,
  		description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 3 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 14 juillet 1989, décision de la chambre criminelle du 2 décembre 1998"
  	},
  	delit_2_1: {
  		rule: delit_2_1,
  		description:  (context) => `En application de la loi précitée, le délai de prescription de l'action publique court jusqu'au ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	delit_3: {
  		rule: delit_3,
  		description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 3 ans à compter de la majorité de la victime mineure, ou\n- par 10 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entraîné des blessures\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 18 juin 1998, et loi du 19 mars 2003"
  	},
  	delit_3_1: {
  		rule: delit_3_1,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	delit_3_2: {
  		rule: delit_3_2,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	delit_4: {
  		rule: delit_4,
  		description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 10 mars 2004, et loi du 5 avril 2006"
  	},
  	delit_4_1: {
  		rule: delit_4_1,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	delit_4_2: {
  		rule: delit_4_2,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	delit_5: {
  		rule: delit_5,
  		description: (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0:\n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans \n- par 6 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 1er mars 2017"
  	},
  	delit_5_1: {
  		rule: delit_5_1,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	delit_5_2: {
  		rule: delit_5_2,
  		description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: ""
  	},
  	prescriptionSocle: {
  		rule: prescriptionSocle,
  		description: (context) => `En application, le délit d'agression sexuelle se prescrivait à 3 ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	prescriptionSocle6: {
  		rule: prescriptionSocle6,
  		description: (context) => `En application, le délit d'agression sexuelle se prescrivait à 6 ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	crime_root: {
  		rule: crime,
  		description: "Les faits sont qualifiés de crime."
  	},
  	crime: {
  		rule: crime,
  		description: null
  	},
  	crime_1: {
  		rule: crime_1,
  		description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le crime de viol se prescrivait par 10 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  		law: "Loi du 31 décembre 1957 instituant le code de procédure pénale"
  	},
  	crime_2: {
  		rule: crime_2,
      description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 10 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 14 juillet 1989"
  	},
  	crime_3: {
  		rule: crime_3,
      description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure\n- par 10 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 18 juin 1998"
  	},
  	crime_4: {
  		rule: crime_4,
      description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 20 ans à compter de la majorité de la victime mineure\n- par 10 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 10 mars 2004"
  	},
  	crime_5: {
  		rule: crime_5,
      description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 20 ans à compter de la majorité de la victime mineure\n- par 20 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 27 février 2017"
  	},
  	crime_6: {
  		rule: crime_6,
      description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 30 ans à compter de la majorité de la victime mineure\n- par 20 ans à compter de la date de commission des faits s'agissant des autres cas.`,
  		law: "Loi du 3 aout 2018"
  	},
  	crime_prescriptionSocle10: {
  		rule: crime_prescriptionSocle10,
  		description: (context) => `En application, le crime de viol se prescrivait à 10 ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	crime_prescriptionSocle20: {
  		rule: crime_prescriptionSocle20,
  		description: (context) => `En application, le crime de viol se prescrivait à 20 ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`
  	},
  	crime_major10: {
  		rule: crime_major10,
  		description:  (context) => `En application, le crime de viol se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  	},
  	crime_major20: {
  		rule: crime_major20,
  		description:  (context) => `En application, le crime de viol se prescrivait par 20 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  	},
  	crime_major30: {
  		rule: crime_major30,
  		description:  (context) => `En application, le crime de viol se prescrivait par 30 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
  	},
  	missingDate: {
  		description: "Veuillez renseigner les dates."
  	},
  	error: {
  		description: "Type inconnu."
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
    this.state = {root: "typeCheck"}
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
  	console.log(path.map(v => v.props.value))
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