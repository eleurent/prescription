import {Node, Graph} from './graph.js'

const typeCheck = new Node({
	name: "typeCheck",
	description: null,
	rule: (context) => {
		switch(context.natureActe) {
			case "agression":
				return "delit";
			case "penetration":
			  switch(context.commiseSur) {
			  	case "auteur":
			  		if (!context.dateOfFacts)
			  			return "missingDate";
			  		return context.dateOfFacts < new Date('2018-08-03') ? "delit" : "crime";
		  		case "victime":
		  			return "crime";
		  		default:
		  			return "error";
			  }
			case "orogenital":
				if (!context.dateOfFacts)
	  			return "missingDate";
				return context.dateOfFacts < new Date('2021-04-21') ? "delit" : "crime";
			default:
				return "error";
		}
	},
})

const delit = new Node({
	name: "delit",
	description: "Les faits sont qualifiés de délit.",
	rule: (context) => {
		const date = ("prescriptionDate" in context) ? context.prescriptionDate : context.dateOfFacts;
		if (!context.dateOfFacts || !context.dateOfBirth)
			return "missingDate";
		if (date < delit_1.expirationDate) {
			context.validUntil = delit_1.expirationDate;
			return "delit_1";
		} else if (date < delit_2.expirationDate) {
			context.validUntil = delit_2.expirationDate;
			return "delit_2";
		} else if (date < delit_3.expirationDate) {
			context.validUntil = delit_3.expirationDate;
			return "delit_3";
		} else if (date < delit_4.expirationDate) {
			context.validUntil = delit_4.expirationDate;
			return "delit_4";
		} else {
			context.validUntil = delit_5.expirationDate;
	  	return "delit_5";
	  }
	},
});

const delit_report = new Node({
	name: "delit_report",
	description: `Les faits n'étaient pas prescrits au moment de l'entrée en vigueur d'une nouvelle loi de réforme portant allongement du délai de prescription de l'action publique (voir ci-dessous).`,
	rule: delit.rule,
});

const delit_1 = new Node({
	name: "delit_1",
	description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	law: "Loi du 31 décembre 1957 instituant le code de procédure pénale",
	expirationDate: new Date('1989-07-04'),
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
		return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const delit_2 = new Node({
	name: "delit_2",
	description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 3 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 14 juillet 1989, décision de la chambre criminelle du 2 décembre 1998",
	expirationDate: new Date('1998-06-18'),
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor && (context.circAutorite || context.circFonctions))
			return "delit_2_1";
		else
			context.prescription = 3;
			return "prescriptionSocle";
	},
});

const delit_2_1 = new Node({
	name: "delit_2_1",
	description:  (context) => `En application de la loi précitée, le délai de prescription de l'action publique court jusqu'au ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
		return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const delit_3 = new Node({
	name: "delit_3",
	description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 3 ans à compter de la majorité de la victime mineure, ou\n- par 10 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entraîné des blessures\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 18 juin 1998, et loi du 19 mars 2003",
	expirationDate: new Date('2004-03-10'),
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
	    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
	    	return "delit_3_2";
			} else {
				return "delit_3_1";
			}
		}
		else
			context.prescription = 3;
			return "prescriptionSocle";
	},
});

const delit_3_1 = new Node({
	name: "delit_3_1",
	description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
		return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const delit_3_2 = new Node({
	name: "delit_3_2",
	description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
		return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const delit_4 = new Node({
	name: "delit_4",
	description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 10 mars 2004, et loi du 5 avril 2006",
	expirationDate: new Date('2017-03-01'),
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
	    if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
	    	return "delit_4_2";
			} else {
				return "delit_4_1";
			}
		}
		else
			context.prescription = 3;
			return "prescriptionSocle";
	},
});

const delit_4_1 = new Node({
	name: "delit_4_1",
	description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
		return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const delit_4_2 = new Node({
	name: "delit_4_2",
	description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
		return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const delit_5 = new Node({
	name: "delit_5",
	description: (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0:\n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans \n- par 6 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 1er mars 2017",
	expirationDate: new Date('9999-01-01'),
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
	    if (context.isMinor15) {
	    	return "delit_5_2";
			} else {
				return "delit_5_1";
			}
		}
		else
			context.prescription = 6;
			return "prescriptionSocle";
	},
});

const delit_5_1 = new Node({
	name: "delit_5_1",
	description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
		return null;
	},
});

const delit_5_2 = new Node({
	name: "delit_5_2",
	description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
		return null;
	},
});

const prescriptionSocle = new Node({
	name: "prescriptionSocle",
	description: (context) => `En application, le délit d'agression sexuelle se prescrivait à ${context.prescription} ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
	  context.prescriptionDate = datePlusYears(context.dateOfFacts, context.prescription);
	  return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
	},
});

const crime = new Node({
	name: "crime",
	description: "Les faits sont qualifiés de crime.",
	rule: (context) => {
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
	},
});

const crime_report = new Node({
	name: "crime_report",
	rule: crime.rule,
	description: null
});

const crime_1 = new Node({
	name: "crime_1",
	description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le crime de viol se prescrivait par 10 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	law: "Loi du 31 décembre 1957 instituant le code de procédure pénale",
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfFacts, 10);
		return (context.prescriptionDate < context.validUntil) ? null : "crime_report";
	},
});

const crime_2 = new Node({
	name: "crime_2",
  description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 10 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 14 juillet 1989",
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor && (context.circAutorite || context.circFonctions)) {
			context.prescription = 10;
			return "crime_majority";
		} else {
			context.prescription = 10;
			return "crime_prescriptionSocle";
		}
	},
});

const crime_3 = new Node({
	name: "crime_3",
  description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure\n- par 10 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 18 juin 1998",
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
			context.prescription = 10;
			return "crime_majority";
		} else {
			context.prescription = 10;
			return "crime_prescriptionSocle";
		}
	},
});

const crime_4 = new Node({
	name: "crime_4",
  description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 20 ans à compter de la majorité de la victime mineure\n- par 10 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 10 mars 2004",
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
			context.prescription = 20;
			return "crime_majority";
		} else {
			context.prescription = 10;
			return "crime_prescriptionSocle";
		}
	},
});

const crime_5 = new Node({
	name: "crime_5",
  description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 20 ans à compter de la majorité de la victime mineure\n- par 20 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 27 février 2017",
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
			context.prescription = 20;
			return "crime_majority";
		} else {
			context.prescription = 20;
			return "crime_prescriptionSocle";
		}
	},
});

const crime_6 = new Node({
	name: "crime_6",
  description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le crime de viol se prescrivait\xa0: \n- par 30 ans à compter de la majorité de la victime mineure\n- par 20 ans à compter de la date de commission des faits s'agissant des autres cas.`,
	law: "Loi du 3 aout 2018",
	rule: (context) => {
		context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
		if (context.isMinor) {
			context.prescription = 30;
			return "crime_majority";
		} else {
			context.prescription = 20;
			return "crime_prescriptionSocle";
		}
	},
});

const crime_prescriptionSocle = new Node({
	name: "crime_prescriptionSocle",
	description: (context) => `En application, le crime de viol se prescrivait à ${context.prescription} ans à compter de la date de commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
	  context.prescriptionDate = datePlusYears(context.dateOfFacts, context.prescription);
		return (context.prescriptionDate < context.validUntil) ? null : "crime_report";
	},
});

const crime_majority = new Node({
	name: "crime_majority",
	description:  (context) => `En application, le crime de viol se prescrivait par ${context.prescription} ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
	rule: (context) => {
		context.prescriptionDate = datePlusYears(context.dateOfBirth, 18 + context.prescription);
		return (context.prescriptionDate < context.validUntil) ? null : "crime_report";
	},
});

const missingDate = new Node({
	name: "missingDate",
	description: "Veuillez renseigner les dates."
});

const error = new Node({
	name: "error",
	description: "Type inconnu."
});

function datePlusYears(date, years) {
	date = new Date(date.getTime());
	date.setFullYear(date.getFullYear() + years);
	return date
}

const prescriptionGraph = new Graph("typeCheck",
[
	typeCheck,
	delit,
	delit_report,
	delit_1,
	delit_2,
	delit_2_1,
	delit_3,
	delit_3_1,
	delit_3_2,
	delit_4,
	delit_4_1,
	delit_4_2,
	delit_5,
	delit_5_1,
	delit_5_2,
	prescriptionSocle,
	crime,
	crime_report,
	crime_1,
	crime_2,
	crime_3,
	crime_4,
	crime_5,
	crime_6,
	crime_prescriptionSocle,
	crime_majority,
	missingDate,
	error
]);


export default prescriptionGraph;