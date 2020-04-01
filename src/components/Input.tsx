import React from 'react';

export interface InputProps {
	value?: string,
	onChange: (newValue: string) => void
}

export default class Input extends React.Component<InputProps, {}> {

	onSelfChange(e: any) {
		this.props.onChange(e.target.value)
	}

	render() {
		let {
			value = "",
			onChange
		} = this.props;

		
	    return <div className="radio">
	        <input 	
	    		type="text"
	    		value={value}
	    		onChange={this.onSelfChange.bind(this)}
	    	/>
	    </div>;
	}
	
}