import React from 'react';
require('./Confirm.less');

export interface ConfirmProps {
	onClose: () => void,
	notice: string
}

export default class Input extends React.Component<ConfirmProps, {}> {

	componentDidMount() {
		setTimeout(() => {
			let confirm = document.getElementById('confirm') as HTMLElement;
			confirm.classList.add('active');
		}, 0);
	}

	render() {
		let {
			onClose,
			notice
		} = this.props;

		
	    return <div id="confirm" className="confirm">
	        <div className="inner">
	        	<div className="wrap">
	        		<div className="content">
		        		{notice}
		        		
		        	</div>
		        	<div className="button" onClick={onClose}>
		        		Done
		        	</div>
	        	</div>
	        </div>
	    </div>;
	}
	
}