import React, { useState } from 'react';
import './App.less';
import Form , { FormData }from './components/Form';


export default class App extends React.Component<{}, {}> {

    state = {
    	list: [{}]
    }

   	onFormChangeHandler(index: number, formData: FormData) {	
		let {
			list
		} = this.state
    	list[index] = formData;
    	this.setState({
    		list
    	});
    }

    addOrRemove(action: string) {
    	if (action === 'add') {
    		this.setState({
    			list: this.state.list.concat({})
    		});
    	} else {
    		let curlist = this.state.list;
    		curlist.pop();
    		this.setState({
    			list: curlist
    		});
    	}
    }
    render() {
    	let {
    		list
    	} = this.state;

    	return <div className="App">
    		<div onClick={this.addOrRemove.bind(this, 'add')}>add</div>
    		<div onClick={this.addOrRemove.bind(this, 'remove')}>remove</div>
		  	{list && list.map((formData: FormData, index : number) => {
		  		return <Form
		  			key={index}
		  			id={index}
		  			formData={formData}
		  			onChange={this.onFormChangeHandler.bind(this, index)}
		  		/>
		  	})}
		</div>
	}
}