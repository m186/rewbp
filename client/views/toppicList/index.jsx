import React from 'react'
import { inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { appState } from '../../store/state'

@inject('appState') @observer
export default class ToppicList extends React.Component{
	constructor(props) {
		super(props);
		this.changeName = this.changeName.bind(this)
	}

	changeName(event) {
		this.props.appState.name = event.target.value
	}
	
	render() {
		return (
			<div>
				<input type="text" onChange={this.changeName}/>
				<div>{this.props.appState.msg}</div>
			</div>
		)
	}
}

ToppicList.propTypes = {
	appState: PropTypes.instanceOf(appState).isRequired
}