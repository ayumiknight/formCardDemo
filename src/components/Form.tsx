import React from 'react';
import Check from './Check';
import Input from './Input';
import Radio from './Radio';
import './Form.less';

export interface FormData {
	name?: string ,
	email?: string,
	radioTest?: string | number,
	checkTest?: boolean,
	errorMessage?: string
}

export interface FormProps {
	id: number,
	formData: FormData,
	onChange: (formData: FormData) => void,
	onDelete: () => void
}
export default class MyForm extends React.Component<FormProps, {}> {
	onSelfChange(field: string, value: any) {
		this.props.onChange({
			...this.props.formData,
			[field]: value
		});
	}

	render() {
		let {
			formData,
			onDelete
		} = this.props;
		let {
			name,
			email,
			radioTest,
			checkTest,
			errorMessage
		} = formData;


	    return <div className={`form ${ !!errorMessage ? 'error' : ''}`}>

	    	<div className="delete" onClick={onDelete}><i className="fas fa-chevron-right" />&times;</div>
	        <div className="input-row">
	        	<label>Name</label>
	        	<Input 
	        		value={name}
	        		onChange={this.onSelfChange.bind(this, 'name')}
	        	/>
	        </div>
	        <div className="input-row">
	        	<label>Email</label>
	        	<Input 
	        		value={email} 
	        		onChange={this.onSelfChange.bind(this, 'email')}
	        	/>
	        </div>
	        <div className="input-row">
	        	<label>RadioTest</label>
	        	<Radio
	        		name="radioTest"
	        		options={[{
	        			label: 'correct',
	        			value: 1
	        		},{
	        			label: 'not corrent',
	        			value: 2
	        		}]}
	        		value={radioTest}
	        		onChange={this.onSelfChange.bind(this, 'radioTest')}
	    		/>
	        </div>
	        <div className="input-row">
	        	<label>CheckTest</label>
	        	<Check
	        		value={checkTest}
	        		onChange={this.onSelfChange.bind(this, 'checkTest')}
	    		/>
	        </div>
	        <div className="error">{errorMessage}</div>
	    </div>;
	}
	
}