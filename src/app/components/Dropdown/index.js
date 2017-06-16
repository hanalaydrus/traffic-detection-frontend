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

    handleChange = (value) => {
        this.props.onChangeFunction(value)
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
            <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.handleChange(value)} style={{width: width}}>
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