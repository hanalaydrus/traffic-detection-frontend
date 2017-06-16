import React, { Component } from 'react';
import {
  DropDownMenu,
  MenuItem
} from 'material-ui';
import './styles.scss'

class Dropdown extends Component {
    constructor () {
        super()
        this.state = {
            value: ''
        }
    }

    handleChange = (event, index, value, onChangeFunction) => {
        this.setState({value})
        onChangeFunction()
    }

    componentWillMount() {
        this.setState({value: this.props.currentValue})
    }

    render () {
        /*
            Destructure Props
        */
        const {onChangeFunction, menuItemValues, width} = this.props

        return (
            <DropDownMenu value={this.state.value} onChange={() => this.handleChange(event, index, value, onChangeFunction)} style={{width: width}}>
                {this.props.menuItemValues && this.props.menuItemValues.map((row) => (
                    <MenuItem value={row.value} primaryText={row.text} />
                ))}
            </DropDownMenu>
        )
    }
}
/**
 *  Export the component
 */
export default Dropdown