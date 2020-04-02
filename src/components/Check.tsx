import React from 'react';
import './Check.less';

export interface CheckProps {
	value?: boolean,
	onChange: (newValue: boolean) => void
}

export default class Check extends React.Component<CheckProps, {}> {
	onSelfChange(e: any) {
		this.props.onChange(e.target.checked);
	}

	render() {
		let {
			value
		} = this.props;

	    return <div className="input-component">
	        <input 
	        	type="checkbox" 
	        	checked={!!value} 
	        	onChange={this.onSelfChange.bind(this)}
	        />
	    </div>;
	}	
}