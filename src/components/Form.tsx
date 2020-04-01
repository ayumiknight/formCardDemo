import React from 'react';
import Check from './Check';
import Input from './Input';
import Radio from './Radio';

export interface FormData {
	name?: string ,
	email?: string,
	radioTest?: string | number,
	checkTest?: boolean
}

export interface FormProps {
	id: number,
	formData: FormData,
	onChange: (formData: FormData) => void
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
			id,
			formData,
			onChange
		} = this.props;
		let {
			name,
			email,
			radioTest,
			checkTest
		} = formData;


	    return <div className="form">
	        <div className="input-row">
	        	<label>name</label>
	        	<Input 
	        		value={name}
	        		onChange={this.onSelfChange.bind(this, 'name')}
	        	/>
	        </div>
	        <div className="input-row">
	        	<label>email</label>
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
	        			label: 'pick me otherwise it will fail',
	        			value: 1
	        		},{
	        			label: 'nonce',
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
	    </div>;
	}
	
}