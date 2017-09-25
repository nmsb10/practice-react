import React from 'react';

export class Footer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			year: ''
		};
		this.populateFooterYears = this.populateFooterYears.bind(this);
	}
	componentDidMount(){
		this.populateFooterYears();
	}
	populateFooterYears(){
		//http://www.w3schools.com/jsref/jsref_obj_date.asp
		let d = new Date();
		let yearCurrent = d.getFullYear();
		let years = '2016 - ' + yearCurrent;
		this.setState({
			year: years
		})

	}
	render(){
		let{year} = this.state;
		return(
			<div>
				Copyright &copy; {year} <a className="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank" title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.
			</div>
		);
	}
}