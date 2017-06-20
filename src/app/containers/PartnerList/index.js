import React, { Component } from 'react';
import {
	RaisedButton,
	TextField,
	Checkbox,
	Dialog,
	FlatButton,
	Subheader,
	List,
	ListItem,
	DropDownMenu,
	MenuItem
} from 'material-ui';
import { orange600, orange500, blue500 } from 'material-ui/styles/colors';

// import dependencies

import { Header } from './../../components/Header';
import { Drawer } from './../../components/DrawerBase';
import { PageTitle } from './../../components/PageTitle';
import PartnerTable from './../../components/PartnerTable';
import cityData from '../../../../temp-data/cityData.json';
import response from './constant';
/**
 * overide material-ui default style * 
 */
const style = {
	orange: {
		borderColor: orange600
	},
	content_full: {
		marginLeft: 0,
		padding: 40,
		paddingTop: 20,
		transition: '1s all ease'
	},
	content_less: {
		marginLeft: 250,
		padding: 40,
		paddingTop: 20,
		transition: '1s all ease'
	},
	customWidth: {
		width: 300,
		marginLeft: -24,
		marginTop: 20
	},
	dialogSize: {
		height: 900,
		width: 600,
		marginLeft: 400
	},
	buttonAdd: {
		marginTop: 10,
		marginBottom: 10
	}
};
const dataCity = cityData.data;

class PartnerList extends Component {
	constructor() {
		super();
		this.state = {
			navStyle: 'nav',
			drawerStyle: 'menu-drawer',
			contentStyle: style.content_less,
      id:"",
			open: false,
			name: '',
			email: '',
			website: '',
			description: '',
			data: response.data,
			value: 1,
      updateId:null,
      update:false
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = (Nav, Draw) => {
		this.setState({ navStyle: Nav });
		this.setState({ drawerStyle: Draw });
		const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
		this.setState({ contentStyle: Const });
	};

	onChangeData = type => (event, value) => {
		this.setState({
			[type]: value
		});
	};

	onDelete = id => {
		const result = this.state.data.filter((res, idx) => res.id !== id);
		this.setState({
			data: result,
			name: '',
			email: '',
			website: '',
			description: ''
		});
	};

	OnUpdate = id => {
    this.setState({
      open:true,
      update:true,
      updateId:id,
    })
	};

  submitUpdate = () => {
    const { name, email, website, description,updateId } = this.state;
		const update = {
			id: updateId,
			name: name,
			email: email,
			website: website,
			description: description
		};
		this.setState({
			data: this.getUpdate(updateId,update),
			open: !this.state.open
		});
  }
  getUpdate =(id,update) => {
      console.log("matamuu")
     return this.state.data.map((res) => (res.id === id) ? update :res)
  }
	onSubmitData = () => {
		const { name, email, website, description } = this.state;
		const post = {
			id: this.state.data.length + 1,
			name: name,
			email: email,
			website: website,
			description: description
		};
		this.setState({
			data: this.state.data.concat(post),
			open: !this.state.open
		});
	};

	handleChangeDropDown = (event, index, value) => this.setState({ value });

	render() {
		// constant for open dialog button
		const actions = [
			(this.state.update) ? <FlatButton label="Update" primary={true} keyboardFocused={true} onTouchTap={() => this.submitUpdate()} /> :<FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={() => this.onSubmitData()} /> 
		];

		return (
			<div style={{ margin: 0 }}>
				<Header
					onClick={this.handleChange}
					navStyle={this.state.navStyle}
					drawerStyle={this.state.drawerStyle}
					content={this.state.content}
				/>
				<Drawer drawerStyle={this.state.drawerStyle} />
				<div style={this.state.contentStyle}>
					<PageTitle title="Partner" />
					<div>
						<div style={style.buttonAdd}>
							<RaisedButton
								label="add"
								onTouchTap={this.handleOpen}
								backgroundColor={blue500}
								labelStyle={{ fontWeight: 'bold' }}
							/>
						</div>
						<Dialog
							title={<Subheader>Create New Partner</Subheader>}
							actions={actions}
							modal={false}
							open={this.state.open}
							onRequestClose={this.handleClose}
							autoDetectWindowHeight={false}
							autoScrollBodyContent={false}
							style={style.dialogSize}
						>
							<List>
								<TextField
									hintText={this.state.name}
									floatingLabelText="Name"
									onChange={this.onChangeData('name')}
								/>
								<br />
								<TextField
									hintText={this.state.email}
									floatingLabelText="Email"
									onChange={this.onChangeData('email')}
								/>
								<br />
								<TextField
									hintText={this.state.website}
									floatingLabelText="Website"
									onChange={this.onChangeData('website')}
								/>
								<br />
								<TextField
									hintText={this.state.description}
									floatingLabelText="Description"
									multiLine={true}
									rows={3}
									onChange={this.onChangeData('description')}
								/>
							</List>
						</Dialog>
					</div>
					<PartnerTable data={this.state.data} onDelete={this.onDelete.bind(this)} onUpdate={this.OnUpdate.bind(this)}/>
				</div>
			</div>
		);
	}
}

export default PartnerList;
