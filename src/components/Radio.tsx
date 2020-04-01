import React from 'react';

export interface RadioProps {
	value?: string | number,
	options: {
		label: string,
		value: string | number
	}[],
	onChange: (newValue: string | number ) => void,
	name: string
}

export default class Radio extends React.Component<RadioProps, {}> {
	render() {
		let {
			value,
			onChange,
			options,
			name
		} = this.props;
	    return <div className="radio">
	        {options.map( option => {
	        	return <span key={option.value}>
	        		<input 	
		        		type="radio"
		        		value={value}
		        		name={name}
		        		onClick={() => {
		        			onChange(option.value);
		        		}}
		        	/>
		        	{option.label}
	        	</span>
	        })}
	    </div>;
	}
}