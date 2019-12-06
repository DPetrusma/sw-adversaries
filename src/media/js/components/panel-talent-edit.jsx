
import React from "react";
import { InputText, InputTextArea } from "./input-text";
import InputSelect from "./input-select";
import PanelCode from "./panel-code";
import { findByProperty, diceMap, symbolise } from "../lib/utils";

export default class PanelTalentEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: "",
			name: "",
			rank: "",
			description: "",
			isNew: false
		};
	}

	setRank(rank) {
		this.setState({
			rank: parseInt(rank)
		});
	}

	setName(name) {
		this.setState({
			name: name,
			isNew: !(!name || !this.state.description)
		});
	}

	setDesc(desc) {
		this.setState({
			description: desc,
			isNew: !(!this.state.name || !desc)
		});
	}

	selectItem(name) {
		let item = this.props.list.find(findByProperty("name", name));

		this.setState({
			selected: item
		});
	}

	add() {
		let selected = this.state.selected;

		if(selected && this.props.handler) {
			let name = selected.name;

			if(selected.ranked) {
				name += " " + (this.state.rank || "1");
			}

			this.props.handler(name);
		}

		this.setState({
			selected: "",
			rank: ""
		});
	}

	create() {
		let talent = {
			name: this.state.name,
			description: this.state.description
		};

		if(this.state.rank) {
			talent.name += ` ${this.state.rank}`;
			talent.ranked = true;
		}

		if(this.props.handler) {
			this.props.handler(talent);
		}

		this.setState({
			name: "",
			description: "",
			rank: "",
			isNew: false
		});
	}

	render() {
		let list = ["", ...this.props.list.map(i => i.name)];
		let selected = this.state.selected ? this.state.selected.name : "";

		return <div>
			<h3>Select { this.props.title }</h3>
			<InputSelect label={ this.props.title } value={ selected } values={ list } handler={ this.selectItem.bind(this) } required={ true } />
			{ this.state.selected && this.state.selected.ranked
				? <InputText label="Rank" value={ this.state.rank } handler={ this.setRank.bind(this) } />
				: null
			}
			<button className="btn-full" disabled={ !this.state.selected } onClick={ this.add.bind(this) }>Select</button>
			<div className="divider"><span>OR</span></div>
			<h3>Create { this.props.title }</h3>
			<InputText label="Name" value={ this.state.name } handler={ this.setName.bind(this) } required={ true } />
			<InputText label="Rank" value={ this.state.rank } handler={ this.setRank.bind(this) } />
			<InputTextArea label="Description" value={ this.state.description } handler={ this.setDesc.bind(this) } required={ true } />
			<button className="btn-full" disabled={ !this.state.isNew } onClick={ this.create.bind(this) }>Create</button>
			<PanelCode />
		</div>;
	}
}

