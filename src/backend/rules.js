import {Node, Graph} from './graph.js'

const natureCheck = new Node({
    name: "natureCheck",
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
                    return "typeError";
              }
            case "buccogenital":
                if (!context.dateOfFacts)
                return "missingDate";
                return context.dateOfFacts < new Date('2021-04-21') ? "delit" : "crime";
            default:
                return "typeError";
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
        if (date < delit_law_1957.expirationDate) {
            context.validUntil = delit_law_1957.expirationDate;
            return "delit_law_1957";
        } else if (date < delit_law_1989.expirationDate) {
            context.validUntil = delit_law_1989.expirationDate;
            return "delit_law_1989";
        } else if (date < delit_laws_1998_2003.expirationDate) {
            context.validUntil = delit_laws_1998_2003.expirationDate;
            return "delit_laws_1998_2003";
        } else if (date < delit_laws_2004_2006.expirationDate) {
            context.validUntil = delit_laws_2004_2006.expirationDate;
            return "delit_laws_2004_2006";
        } else {
            context.validUntil = delit_law_2017.expirationDate;
        return "delit_law_2017";
      }
    },
});

const delit_report = new Node({
    name: "delit_report",
    description: `Les faits n'étaient pas prescrits au moment de l'entrée en vigueur d'une nouvelle loi de réforme portant allongement du délai de prescription de l'action publique (voir ci-dessous).`,
    rule: delit.rule,
});

const delit_law_1957 = new Node({
    name: "delit_law_1957",
    description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    law: "Loi du 31 décembre 1957 instituant le code de procédure pénale",
    expirationDate: new Date('1989-07-04'),
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfFacts, 3);
        return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
    },
});

const delit_law_1989 = new Node({
    name: "delit_law_1989",
    description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 3 ans à compter de la majorité de la victime mineure, lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
    law: "Loi du 14 juillet 1989, décision de la chambre criminelle du 2 décembre 1998",
    expirationDate: new Date('1998-06-18'),
    rule: (context) => {
        context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
        if (context.isMinor && (context.circAutorite || context.circFonctions))
            return "delit_law_1989_1";
        else
            context.prescription = 3;
            return "prescriptionSocle";
    },
});

const delit_law_1989_1 = new Node({
    name: "delit_law_1989_1",
    description:  (context) => `En application de la loi précitée, le délai de prescription de l'action publique court jusqu'au ${context.prescriptionDate.toLocaleDateString()}.`,
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
        return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
    },
});

const delit_laws_1998_2003 = new Node({
    name: "delit_laws_1998_2003",
    description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 3 ans à compter de la majorité de la victime mineure, ou\n- par 10 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entraîné des blessures\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
    law: "Loi du 18 juin 1998, et loi du 19 mars 2003",
    expirationDate: new Date('2004-03-10'),
    rule: (context) => {
        context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
        if (context.isMinor) {
        if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
            return "delit_laws_1998_2003_2";
            } else {
                return "delit_laws_1998_2003_1";
            }
        }
        else
            context.prescription = 3;
            return "prescriptionSocle";
    },
});

const delit_laws_1998_2003_1 = new Node({
    name: "delit_laws_1998_2003_1",
    description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 3 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfBirth, 21);
        return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
    },
});

const delit_laws_1998_2003_2 = new Node({
    name: "delit_laws_1998_2003_2",
    description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
        return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
    },
});

const delit_laws_2004_2006 = new Node({
    name: "delit_laws_2004_2006",
    description:  (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0: \n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans lorsque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\n- par 3 ans à compter de la date de commission des faits s'agissant des autres cas.`,
    law: "Loi du 10 mars 2004, et loi du 5 avril 2006",
    expirationDate: new Date('2017-03-01'),
    rule: (context) => {
        context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
        if (context.isMinor) {
        if (context.isMinor15 && (context.circAutorite || context.circFonctions || context.circCoaction || context.circArme || context.circBlessures)) {
            return "delit_laws_2004_2006_2";
            } else {
                return "delit_laws_2004_2006_1";
            }
        }
        else
            context.prescription = 3;
            return "prescriptionSocle";
    },
});

const delit_laws_2004_2006_1 = new Node({
    name: "delit_laws_2004_2006_1",
    description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
        return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
    },
});

const delit_laws_2004_2006_2 = new Node({
    name: "delit_laws_2004_2006_2",
    description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 20 ans à compter de la majorité de la victime agée de moins de 15 ans, puisque les faits ont été commis par ascendant ou personne ayant autorité sur elle, ou par personne abusant de l'autorité que lui confèrent ses fonctions, ou par plusieurs personnes agissant en coaction, ou avec usage ou menace d'une arme, ou ayant entrainé des blessures\xa0; soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfBirth, 38);
        return (context.prescriptionDate < context.validUntil) ? null : "delit_report";
    },
});

const delit_law_2017 = new Node({
    name: "delit_law_2017",
    description: (context) => `Le ${context.applicationDate.toLocaleDateString()}, le délit d'agression sexuelle se prescrivait\xa0:\n- par 10 ans à compter de la majorité de la victime mineure, ou\n- par 20 ans à compter de la majorité de la victime agée de moins de 15 ans \n- par 6 ans à compter de la date de commission des faits s'agissant des autres cas.`,
    law: "Loi du 1er mars 2017",
    expirationDate: new Date('9999-01-01'),
    rule: (context) => {
        context.applicationDate = "prescriptionDate" in context ? context.prescriptionDate : context.dateOfFacts;
        if (context.isMinor) {
        if (context.isMinor15) {
            return "delit_law_2017_2";
            } else {
                return "delit_law_2017_1";
            }
        }
        else
            context.prescription = 6;
            return "prescriptionSocle";
    },
});

const delit_law_2017_1 = new Node({
    name: "delit_law_2017_1",
    description:  (context) => `En application, le délit d'agression sexuelle se prescrivait par 10 ans à compter de la majorité de la victime mineure, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfBirth, 28);
        return null;
    },
});

const delit_law_2017_2 = new Node({
    name: "delit_law_2017_2",
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
            return "crime_law_1957";
        } else if (date < new Date('1998-06-18')) {
            context.validUntil = new Date('1998-06-18');
            return "crime_law_1989";
        } else if (date < new Date('2004-03-10')) {
            context.validUntil = new Date('2004-03-10');
            return "crime_law_1998";
        } else if (date < new Date('2017-02-27')) {
            context.validUntil = new Date('2017-02-27');
            return "crime_law_2004";
        } else if (date < new Date('2018-08-03')) {
            context.validUntil = new Date('2018-08-03');
        return "crime_law_2017";
        } else {
            context.validUntil = new Date('9999-01-01');
        return "crime_law_2018";
      }
    },
});

const crime_report = new Node({
    name: "crime_report",
    rule: crime.rule,
    description: null
});

const crime_law_1957 = new Node({
    name: "crime_law_1957",
    description: (context) => `Le ${context.dateOfFacts.toLocaleDateString()}, le crime de viol se prescrivait par 10 ans à compter de la date de la commission des faits, soit le ${context.prescriptionDate.toLocaleDateString()}.`,
    law: "Loi du 31 décembre 1957 instituant le code de procédure pénale",
    rule: (context) => {
        context.prescriptionDate = datePlusYears(context.dateOfFacts, 10);
        return (context.prescriptionDate < context.validUntil) ? null : "crime_report";
    },
});

const crime_law_1989 = new Node({
    name: "crime_law_1989",
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

const crime_law_1998 = new Node({
    name: "crime_law_1998",
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

const crime_law_2004 = new Node({
    name: "crime_law_2004",
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

const crime_law_2017 = new Node({
    name: "crime_law_2017",
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

const crime_law_2018 = new Node({
    name: "crime_law_2018",
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

const typeError = new Node({
    name: "typeError",
    description: "Type inconnu."
});

function datePlusYears(date, years) {
    date = new Date(date.getTime());
    date.setFullYear(date.getFullYear() + years);
    return date
}

const prescriptionGraph = new Graph("natureCheck",
[
    natureCheck,
    delit,
    delit_report,
    delit_law_1957,
    delit_law_1989,
    delit_law_1989_1,
    delit_laws_1998_2003,
    delit_laws_1998_2003_1,
    delit_laws_1998_2003_2,
    delit_laws_2004_2006,
    delit_laws_2004_2006_1,
    delit_laws_2004_2006_2,
    delit_law_2017,
    delit_law_2017_1,
    delit_law_2017_2,
    prescriptionSocle,
    crime,
    crime_report,
    crime_law_1957,
    crime_law_1989,
    crime_law_1998,
    crime_law_2004,
    crime_law_2017,
    crime_law_2018,
    crime_prescriptionSocle,
    crime_majority,
    missingDate,
    typeError
]);


export default prescriptionGraph;