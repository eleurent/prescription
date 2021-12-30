import React from "react";
import Alert from 'react-bootstrap/Alert';

function NewlineText(props) {
  return props.text.split('\n').map((str, idx) => <p key={idx}>{str}</p>);
}

const RuleName = (props) => {
	if (!props.hidden) {
		return (
  		<div className="d-flex justify-content-end">
  		{ props.name }
  		</div>
			)
	} else return (null);
}

const Node = (props) => {
	let law = props.node.law ? "(" + props.node.law + ")" : "";
	let description = props.node.description;
	if (description && description instanceof Function)
		description = description(props.context);
	let alertComponent = (description) ? (
		<Alert variant="primary">
		<NewlineText text={ description + " " + law }/>
		<RuleName name={ props.node.name } hidden/>
		</Alert>
	) : (null);
	if (props.node.terminal && "prescriptionDate" in props.context) {
		let terminalAlert = <Alert variant={props.context.prescriptionDate > new Date() ? "success" : "danger"}>La prescription des faits {props.context.prescriptionDate > new Date() ? "court jusqu'au" : "apparaît acquise depuis le"} { props.context.prescriptionDate.toLocaleDateString() }</Alert>
		return [alertComponent, terminalAlert];
	} else {
		return alertComponent;
	}
}

const Path = (props) => {
	const nodes = props.path.map(step => <Node node={step.node} context = {step.context}/>);
	return (<div>{ nodes }</div>);
}

export default Path;