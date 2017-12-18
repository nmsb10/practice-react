import React from 'react';

export class Home extends React.Component{
	render(){
		return(
			<div className = 'fit-95'>
				<div className = 'home-intro'>
					<div className = 'text'>
						<p>Jonathon develops engaging applications using JavaScript, React, Node, Express, MongoDB, HTML5, CSS3,  jQuery, mySQL, and Twitter Bootstrap. He strives to write clear, concise code. Above all he values sharing his experience and talents to save others time and solve their problems with elegant solutions.</p>
						<p>Jonathon's mission is simple. Create a "Wow!" experience for each of his clients, every day. As a Full Stack Web Developer and Realtor, Jonathon provides services tailored to your specific needs, at exceptional value.</p>
						<p>Expect straightforward advice, research, and service, supported by salient analysis custom designed for your needs. Whether seeking a completely custom application to enhance your everyday life, selling your home for the most money in the most convenient manner, buying your next property at the best terms possible, or seeking guidance with real estate investment, enjoy the benefits of Jonathon's comprehensive resources carefully designed to achieve your goals.
						<div className = 'ci-container'>
							<div className = 'circle-image'>
								<img src="https://jonathonn.herokuapp.com/assets/images/five.jpg" alt="jonathon nagatani" title="jonathon nagatani" className = 'photo-jn'/>
								<img src="https://jonathonn.herokuapp.com/assets/images/three.jpg" alt="jonathon nagatani" title="jonathon nagatani" className = 'photo-jn'/>
							</div>
						</div> 
						Jonathon dedicates himself to thrilling clients with the results of their collaboration.</p>
						<p>Contact Jonathon now for your complimentary consultation. Start enjoying the freedom and security that confidential guidance and eloquent application development will bring to your business and personal lives. Read reviews from enthusiastic clients on <a href='https://www.linkedin.com/in/jonathonnagatani' target='_blank' title='Jonathon on LinkedIn'>LinkedIn</a>.</p>
						<p>As an exercise, all applications here are designed and hand-coded from scratch, unless specified otherwise.</p>
						<p>Jonathon Nagatani: making life easier for you.</p>
					</div>
				</div>
			</div>
		);
	}
}