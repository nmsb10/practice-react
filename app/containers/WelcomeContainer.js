import React from 'react';
import { Link } from 'react-router-dom';
import {ExpandingBorder} from '../components/ExpandingBorder';
import {Footer} from '../components/Footer';

export class WelcomeContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentYear: '',
			thoughts:[//{thought , picked}
				{q: 'Do not expect anyone to hold your hand in "real life."', p: false},
				{q: 'Nothing is sacred.', p: false},
				{q: 'Focus on the nutrition of your mind.', p: false},
				{q: 'Do more for others than anyone else does for them.', p: false},
				{q: 'I must earn my clients and friends every day. Never take a relationship (business or friend) for granted.', p: false},
				{q: 'Go beyond "the normal," especially when serving others.', p: false},
				{q: 'What I do, not what I have, defines who and what I am.', p: false},
				{q: 'Assume you are being recorded everywhere and that such recordings shall exist forever.', p: false},
				{q: 'Is time the scarcest resource of all?', p: false},
				{q: 'Does 1 minute of your time during one part of the day have a different value than the same length of time (1 minute) during a different time of the day?', p: false},
				{q: 'Seek only positive energy.', p: false},
				{q: 'Be the "calming force."', p: false},
				{q: 'Through complaining, one embraces their identity as a "victim."', p: false},
				{q: 'Less is more.', p: false},
				{q: '"Conduct your life as though your every act were to become a universal law for all people."', p: false},
				{q: 'Everyone is entitled to their beliefs. But holding a belief does not necessarily make it true. Or does it?', p: false},
				{q: '"Truth is in the eye of the beholder." Do you make a distinction between truth and reality?', p: false},
				{q: 'impartial. transparent. accurate.', p: false},
				{q: 'always offer solutions, because anyone can complain about problems', p: false}
			],
			imageURLs:{
				regular:['001.JPG', '01.JPG', '002.jpg', '3053p.jpg', '4067p.jpg', '4301p.jpg', '4336p.jpg', '4636p.jpg', 'one.JPG'],
				winter:['0323p.jpg', '0324p.jpg', '4162p.jpg', '4168p.jpg']
			},
			backgroundImageDir:[],
			testimonials:[
				{
					quote: 'Jonathon is a consistently professional Real Estate Expert - He provides outstanding responsive service, market knowledge, and a willingness to do additional marketing and even showcased my property for the best presentation to the marketplace. I will recommend him to all my friends on the North Shore! Great Job!',
					source: 'John S.'
				},
				{
					quote: 'I met Jonathon over three years ago through a recommendation from a close friend of mine. I was looking to find an apartment in Chicago at short notice and had a bunch of things I was particular about; Jonathon helped me find a place that offered them all! Jonathon helped me find my first rental pretty quick and when it was time to purchase my first home I knew I\'d want to get his help. He\'s always just a phone call away, at any time and has always been very helpful. Jonathon has a solid understanding of the real estate market and helped me understand the intricacies of the purchase process so that I felt comfortable and well-informed at every stage. He was also very accommodating of various requests and was thorough in his research and responses to various questions of mine. Always courteous and prompt, working with Jonathon has always been a pleasure. He\'s my go to guy for any Real Estate needs!',
					source: 'Hari R.'
				},
				{
					quote: 'I would just like to provide some feedback with regards to the service that Jonathon extended to us while we were selling our Lake Forest property. From beginning to end Jonathon’s professionalism was impressive.We originally chose Jonathan as an agent because we had received a mailing from him for homes in the neighborhood that clearly stood out above the rest. He did not disappoint. He had a professional photographer take pictures of the property, created a beautiful brochure and provided great online exposure. Jonathon also accompanied potential buyers to all the showings and provided us with feedback. He also kept us up to date on market activity. We were extremely pleased with Jonathon and look forward to working with him whenever we need an agent.',
					source: 'Monica K.'
				},
				{
					quote: 'We both appreciate very much your dedication and innovation in our search for a new home! We are so pleased with the house and want to thank you for all you did for us throughout the process.',
					source: 'Cate & Matthew F.'
				},
				{
					quote: 'Jane and I sincerely appreciate all the hard work you put into the sale of our condominium. We would recommend you to friends and potential clients without reservation, and would tell them the following:Jonathon won our business through his professional and thorough approach, and obtained a legitimate offer on our property (which subsequently resulted in a sale) within three weeks of listing. He provided us with timely, detailed and accurate market information to enable us to make informed decisions about the listing and sale of our condominium. He then aggressively marketed the property through customized mailings of his own design, extensive internet marketing, and a custom property website. He continually explored new sources of potential buyers. Our neighbors in the building commented on the fact that they received two mailings about our condominium within the short period of time it was on the market. Jonathon\'s hard work and creative approach worked for us, and are certain to produce successful results with future listings.',
					source: 'Jane and Steven A.'
				},
				{
					quote: 'We would like to express our enthusiastic endorsement of Jonathon Nagatani as a REALTOR. Among his many strengths are good listening and communication skills, diligence, enthusiasm and attention to detail. After not being able to sell our home in the Edgebrook neighborhood for nearly a year, we turned to Jonathon and the Koenig & Strey company to represent us as sellers. Jonathon developed and implemented a strong marketing program and then met with us weekly to provide a detailed analysis of the results to date. As a result of Jonathon\'s work of finding qualified buyers and the value-add of the Koenig & Strey network and services, we went under contract in less than a month in the winter of 2011. Jonathon negotiated aggressively on our behalf, facilitating a deal with which we were very pleased. He continued to work proactively, monitoring each step of the process through to a successful close.We absolutely would work with Jonathon again and highly recommend that you select him as your REALTOR.',
					source: 'Jackie and William G.'
				}
			]
		};
		this.setBackgroundImages = this.setBackgroundImages.bind(this);
		this.shuffleByKnuth = this.shuffleByKnuth.bind(this);
	}
	componentDidMount(){
		this.setBackgroundImages();
	}
	componentWillUnmount(){
		//clearInterval(this.state.colorObject.counter);
	}
	setBackgroundImages(){
		let { imageURLs } = this.state;
		let orderArr = [], directory = [];
		let d = new Date();
		let finalImageURLs = d.getMonth() >= 11 || d.getMonth() <= 3 ? imageURLs.regular.concat(imageURLs.winter) : imageURLs.regular;
		finalImageURLs = this.shuffleByKnuth(finalImageURLs);
		for(let i = 0; i < 5; i++){
			directory.push({backgroundImage: "url('https://jonathonn.herokuapp.com/assets/images/" + finalImageURLs[i] + "')"});
		}
		this.setState({
			currentYear: d.getFullYear(),
			backgroundImageDir: directory
		});
	}
	shuffleByKnuth(array){
		//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		//https://github.com/coolaj86/knuth-shuffle
		let currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}


// // Get the modal
// var modal = document.getElementById('myModal');
// var modalAboutMe = document.getElementById('modalAboutMe');

// // Get the button that opens the modal
// var btn = document.getElementById("aboutMeBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
//     modal.style.backgroundColor = 'rgba(0,0,0,0.35)';
// };

// // When the user clicks anywhere outside of the modal OR the X span, close the modal
// window.onclick = function(event) {
//     if (event.target === modal || event.target === span) {
//     	if(modalAboutMe.className === 'modal-content animate-down'){
//     		modalAboutMe.className = 'modal-content animate-up';
//     		modal.style.backgroundColor = 'rgba(0,0,0,0)';
//     		setTimeout(function(){
//     			modal.style.display = "none";
//     			modalAboutMe.className = 'modal-content animate-down';
//     		}, 300);
//     	}
//     }
// }; 



	render(){
		let{
			currentYear,
			backgroundImageDir
		} = this.state;
		return(
			<div className = 'welcome-content'>
				<div id = 'login-container'>
					<div id = 'lbc-top-spacer'>
					</div>
					<div id = 'button-container'>
						< ExpandingBorder
							elementType = 'button'
							text = 'log in'
						/>
					</div>
					<div id="myModal" className="modal">
						<div className="modal-content animate-down" id = 'modalAboutMe'>
							<span className="closeSpan">&times;</span>
							<div className="modal-header">
								<h2>jonathon nagatani</h2>
							</div>
							<div className="modal-body">
								<p>Jonathon develops engaging applications using JavaScript, React, Node, Express, MongoDB, HTML5, CSS3,  jQuery, mySQL, and Twitter Bootstrap. He strives to write clear, concise code. Above all he values sharing his experience and talents to save others time and solve their problems with elegant solutions.
								</p>
								<p>Jonathon's mission is simple. Create a "Wow!" experience for each of his clients, every day. As a Full Stack Web Developer and Realtor, Jonathon provides services tailored to your specific needs, at exceptional value.</p>
								<p>Expect straightforward advice, research, and service, supported by salient analysis custom designed for your needs. Whether seeking a completely custom application to enhance your everyday life, selling your home for the most money in the most convenient manner, buying your next property at the best terms possible, or seeking guidance with real estate investment, enjoy the benefits of Jonathon's comprehensive resources carefully designed to achieve your goals. Jonathon dedicates himself to thrilling clients with the results of their collaboration.</p>
								<p>Contact Jonathon now for your complimentary consultation. Start enjoying the freedom and security that confidential guidance and eloquent application development will bring to your business and personal lives. Read reviews from enthusiastic clients on LinkedIn.</p>
							</div>
							<div className="modal-footer">hello there I\'m the footer
							</div>
						</div>
					</div>
				</div>

{/*
	<!-- modal -->
	<div id="myModal" class="modal">
		<!-- Modal content -->
		<div class="modal-content animate-down" id = 'modalAboutMe'>
			<span class="closeSpan">&times;</span>
			<div class="modal-header">
				<h2>jonathon nagatani</h2>
			</div>
			<div class="modal-body">
				<p><img src="./assets/images/five.jpg" alt="jonathon nagatani" title="jonathon nagatani" id = 'photo-jn'>
				Jonathon develops engaging applications using JavaScript, React, Node, Express, MongoDB, HTML5, CSS3,  jQuery, mySQL, and Twitter Bootstrap. He strives to write clear, concise code. Above all he values sharing his experience and talents to save others time and solve their problems with elegant solutions.
				</p>
				<p>Jonathon's mission is simple. Create a "Wow!" experience for each of his clients, every day. As a Full Stack Web Developer and Realtor, Jonathon provides services tailored to your specific needs, at exceptional value.</p>
				<p>Expect straightforward advice, research, and service, supported by salient analysis custom designed for your needs. Whether seeking a completely custom application to enhance your everyday life, selling your home for the most money in the most convenient manner, buying your next property at the best terms possible, or seeking guidance with real estate investment, enjoy the benefits of Jonathon's comprehensive resources carefully designed to achieve your goals. Jonathon dedicates himself to thrilling clients with the results of their collaboration.</p>
				<p>Contact Jonathon now for your complimentary consultation. Start enjoying the freedom and security that confidential guidance and eloquent application development will bring to your business and personal lives. Read reviews from enthusiastic clients on LinkedIn.</p>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
*/}			
				<div className = 'pax wc-section' style = {backgroundImageDir[0]}>
					{/*review array functions including filter
						https://stackoverflow.com/questions/7206640/css-vertically-align-div-when-no-fixed-size-of-the-div-is-known
					*/}
				</div>
				<div className = 'pax wc-section' style = {backgroundImageDir[1]}>
				</div>
				<div className = 'pax wc-section welcome-thoughts' style = {backgroundImageDir[2]}>
					<div className = 'thoughts-container'>
					thoughts here
					</div>
				</div>
				<div className = 'pax wc-section' style = {backgroundImageDir[3]}>
				</div>
				<div className = 'pax wc-section' style = {backgroundImageDir[4]}>
				</div>
				
				{/*
				<div className = 'intro'>
					<div className = 'welcome-nav'>
						<div>welcome</div>
						<nav id = 'intro-nav'>
							<Link to = '/userpage'>click here to represent signing in...</Link>
						</nav>
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'content' id= 'welcome-c2'>
					impartial. transparent. accurate.
					<br/>
					always offer solutions.
					<br/>
					anyone can complain about problems.
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'welcome'>
						<div id = 'one-test'>
							<span className = {currentQuote === '' ? '' : 'quote'}>{currentQuote===''? 'testimonials for Jonathon Nagatani...': '"' + currentQuote +'"'}</span>
							<br/>
							<span className = 'source'>{currentSource}</span>
						</div>
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'welcome-nav'>
						<div>welcome</div>
						<nav id = 'intro-nav'>
							<Link to = '/userpage'>click here to represent signing in...</Link>
						</nav>
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'welcome-nav'>
						<div>welcome</div>
						<nav id = 'intro-nav'>
							<Link to = '/userpage'>click here to represent signing in...</Link>
						</nav>
					</div>
				</div>
			*/}
			<Footer
					year = {currentYear}
					name = 'jonathon nagatani'
				/>
			</div>
		);
	}
}