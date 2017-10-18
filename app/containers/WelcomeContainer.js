import React from 'react';
import { Link } from 'react-router-dom';
import {ExpandingBorder} from '../components/ExpandingBorder';
import {Footer} from '../components/Footer';
import {Thoughts} from '../components/Thoughts';
import {Testimonials} from '../components/Testimonials';

export class WelcomeContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentYear: '',
			imageURLs:{
				regular:['001.JPG', '01.JPG', '002.jpg', '3053p.jpg', '4067p.jpg', '4301p.jpg', '4336p.jpg', '4636p.jpg', 'one.JPG'],
				winter:['0323p.jpg', '0324p.jpg', '4162p.jpg', '4168p.jpg']
			},
			backgroundImageDir:[],
			thoughts:{
				fullArray:[//{thought , picked}
					{q: 'Do not expect anyone to hold your hand in "real life."', p: false},
					{q: 'Nothing is sacred.', p: false},
					{q: 'Focus on the nutrition of your mind.', p: false}
					// {q: 'Do more for others than anyone else does for them.', p: false},
					// {q: 'We must earn our clients and friends every day. Never take a relationship (business or friend) for granted.', p: false},
					// {q: 'Go beyond "the normal," especially when serving others.', p: false},
					// {q: 'What I do, not what I have, defines who and what I am.', p: false},
					// {q: 'Assume you are being recorded everywhere and that such recordings shall exist forever.', p: false},
					// {q: 'Is time the scarcest resource of all?', p: false},
					// {q: 'Does 1 minute of your time during one part of the day have a different value than the same length of time (1 minute) during a different time of the day?', p: false},
					// {q: 'Seek only positive energy.', p: false},
					// {q: 'Be the "calming force."', p: false},
					// {q: 'Through complaining, one embraces their identity as a "victim."', p: false},
					// {q: 'Less is more.', p: false},
					// {q: '"Conduct your life as though your every act were to become a universal law for all people."', p: false},
					// {q: 'Everyone is entitled to their beliefs. But holding a belief does not necessarily make it true. Or does it?', p: false},
					// {q: '"Truth is in the eye of the beholder." Do you make a distinction between truth and reality?', p: false},
					// {q: 'impartial. transparent. accurate.', p: false},
					// {q: 'always offer solutions, because anyone can complain about problems', p: false}
				],
				count: null,
				currentSelection: null,
				interval: null,
				displaying: false,
				cssClass: ''
			},
			testimonials:{
				fullArray:[
					{
						quote: 'Jonathon is a consistently professional Real Estate Expert - He provides outstanding responsive service, market knowledge, and a willingness to do additional marketing and even showcased my property for the best presentation to the marketplace. I will recommend him to all my friends on the North Shore! Great Job!',
						source: 'John S.'
					},
					{
						quote: 'I met Jonathon over three years ago through a recommendation from a close friend of mine. I was looking to find an apartment in Chicago at short notice and had a bunch of things I was particular about; Jonathon helped me find a place that offered them all! Jonathon helped me find my first rental pretty quick and when it was time to purchase my first home I knew I\'d want to get his help. He\'s always just a phone call away, at any time and has always been very helpful. Jonathon has a solid understanding of the real estate market and helped me understand the intricacies of the purchase process so that I felt comfortable and well-informed at every stage. He was also very accommodating of various requests and was thorough in his research and responses to various questions of mine. Always courteous and prompt, working with Jonathon has always been a pleasure. He\'s my go to guy for any Real Estate needs!',
						source: 'Hari R.'
					},
					{
						quote: 'I would just like to provide some feedback with regards to the service that Jonathon extended to us while we were selling our Lake Forest property. From beginning to end Jonathon’s professionalism was impressive. We originally chose Jonathon as an agent because we had received a mailing from him for homes in the neighborhood that clearly stood out above the rest. He did not disappoint. He had a professional photographer take pictures of the property, created a beautiful brochure and provided great online exposure. Jonathon also accompanied potential buyers to all the showings and provided us with feedback. He also kept us up to date on market activity. We were extremely pleased with Jonathon and look forward to working with him whenever we need an agent.',
						source: 'Monica K.'
					},
					{
						quote: 'We both appreciate very much your dedication and innovation in our search for a new home! We are so pleased with the house and want to thank you for all you did for us throughout the process.',
						source: 'Cate & Matthew F.'
					},
					{
						quote: 'Jane and I sincerely appreciate all the hard work you put into the sale of our condominium. We would recommend you to friends and potential clients without reservation, and would tell them the following: Jonathon won our business through his professional and thorough approach, and obtained a legitimate offer on our property (which subsequently resulted in a sale) within three weeks of listing. He provided us with timely, detailed and accurate market information to enable us to make informed decisions about the listing and sale of our condominium. He then aggressively marketed the property through customized mailings of his own design, extensive internet marketing, and a custom property website. He continually explored new sources of potential buyers. Our neighbors in the building commented on the fact that they received two mailings about our condominium within the short period of time it was on the market. Jonathon\'s hard work and creative approach worked for us, and are certain to produce successful results with future listings.',
						source: 'Jane and Steven A.'
					},
					{
						quote: 'We would like to express our enthusiastic endorsement of Jonathon Nagatani as a REALTOR. Among his many strengths are good listening and communication skills, diligence, enthusiasm and attention to detail. After not being able to sell our home in the Edgebrook neighborhood for nearly a year, we turned to Jonathon and the Koenig & Strey company to represent us as sellers. Jonathon developed and implemented a strong marketing program and then met with us weekly to provide a detailed analysis of the results to date. As a result of Jonathon\'s work of finding qualified buyers and the value-add of the Koenig & Strey network and services, we went under contract in less than a month in the winter of 2011. Jonathon negotiated aggressively on our behalf, facilitating a deal with which we were very pleased. He continued to work proactively, monitoring each step of the process through to a successful close. We absolutely would work with Jonathon again and highly recommend that you select him as your REALTOR.',
						source: 'Jackie and William G.'
					}
				],
				count: null,
				currentSelection: null,
				interval: null,
				displaying: false,
				cssClass: ''
			},
			loginModal:{
				containerClass: 'modal',
				animateClass: 'modal-content animate-down'
			},
			loginForm:{
				username:'',
				password:'',
				passwordHidden:''
			}
		};
		this.setBackgroundImages = this.setBackgroundImages.bind(this);
		this.shuffleByKnuth = this.shuffleByKnuth.bind(this);
		this.handleShowLoginModal = this.handleShowLoginModal.bind(this);
		this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showThoughts = this.showThoughts.bind(this);
		this.showTestimonials = this.showTestimonials.bind(this);
	}
	componentDidMount(){
		this.setBackgroundImages();
		this.showThoughts();
		this.showTestimonials();
	}
	componentWillUnmount(){
		let { thoughts, testimonials} = this.state;
		clearInterval(thoughts.interval);
		clearInterval(testimonials.interval);
		let objCopyThoughts = Object.assign({}, thoughts, {displaying: false});
		let objCopyTestim = Object.assign({}, testimonials, {displaying: false});
		this.setState({
			thoughts: objCopyThoughts,
			testimonials: objCopyTestim
		});
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
	handleShowLoginModal(){
		let {loginModal} = this.state;
		let objCopy = Object.assign({}, loginModal, {containerClass: loginModal.containerClass + ' modal-open'});
		this.setState({
			loginModal: objCopy
		});
	}
	handleCloseLoginModal(e){
		let{ loginModal } = this.state;
		let clicked = e.target.id;
		if(clicked === 'modal-container' || clicked === 'login-close-span'){
			let objCopy = Object.assign({}, loginModal, {containerClass: 'modal modal-closing', animateClass: 'modal-content animate-up'});
			this.setState({
				loginModal: objCopy
			});
			setTimeout(() =>{
				objCopy = Object.assign({}, loginModal, {containerClass: 'modal', animateClass: 'modal-content animate-down'});
				this.setState({
					loginModal: objCopy
				});
			}, 350);
		}
	}
	handleInputChange(e){
		let {loginForm} = this.state;
		let newState = {};
		if(e.target.id === 'password'){
			newState.password = loginForm.password + e.target.value[e.target.value.length-1];
			newState.passwordHidden = e.target.value.replace(/./gi, '*');
		}else{
			newState[e.target.id] = e.target.value;
		}
		let objCopy = Object.assign({}, loginForm, newState);
		this.setState({
			loginForm: objCopy
		});
	}
	handleSubmit(e){
		e.preventDefault();
	}
	showThoughts(){
		let { thoughts } = this.state;
		let objCopy = {};
		if(thoughts.displaying && thoughts.fullArray.length > 0){
			let nextCount = thoughts.count + 1;
			if(nextCount < thoughts.fullArray.length-1){
				objCopy = Object.assign({}, thoughts, {currentSelection: thoughts.fullArray[nextCount], count: nextCount});
				this.setState({
					thoughts: objCopy
				});
			}else{//on final fullArray element
				//set currentSelection to the last
				let lastSelection = thoughts.fullArray[nextCount];
				//then reset count
				//and remix the fullArray
				let newMixedArray = this.shuffleByKnuth(thoughts.fullArray);
				objCopy = Object.assign({}, thoughts, {fullArray: newMixedArray, currentSelection: lastSelection, count:-1, cssClass: 'one-thought one-thought-end'});
				this.setState({
					thoughts: objCopy
				});
			}
		}else if(thoughts.fullArray.length > 0 && !thoughts.displaying){
			let interval = setInterval(this.showThoughts, 10000);
			let mixedThoughts = this.shuffleByKnuth(thoughts.fullArray);
			let current = mixedThoughts[0];
			objCopy = Object.assign({}, thoughts, {fullArray: mixedThoughts, count:0, currentSelection: current, interval: interval, displaying: true, cssClass: 'one-thought'});
			this.setState({
				thoughts: objCopy
			});
		}
	}
	showTestimonials(){
		let { testimonials } = this.state;
		let objCopy = {};
		if(testimonials.displaying && testimonials.fullArray.length > 0){
			let nextCount = testimonials.count + 1;
			if(nextCount < testimonials.fullArray.length-1){
				objCopy = Object.assign({}, testimonials, {currentSelection: testimonials.fullArray[nextCount], count: nextCount});
				this.setState({
					testimonials: objCopy
				});
			}else{//on final fullArray element
				//set currentSelection to the last
				let lastSelection = testimonials.fullArray[nextCount];
				//then reset count
				//and remix the fullArray
				let newMixedArray = this.shuffleByKnuth(testimonials.fullArray);
				objCopy = Object.assign({}, testimonials, {fullArray: newMixedArray, currentSelection: lastSelection, count:-1});
				this.setState({
					testimonials: objCopy
				});
			}
		}else if(testimonials.fullArray.length > 0 && !testimonials.displaying){
			let interval = setInterval(this.showTestimonials, 19000);
			let mixedTestimonials = this.shuffleByKnuth(testimonials.fullArray);
			let current = mixedTestimonials[0];
			objCopy = Object.assign({}, testimonials, {fullArray: mixedTestimonials, count:0, currentSelection: current, interval: interval, displaying: true, cssClass: 'testimonial-content'});
			this.setState({
				testimonials: objCopy
			});
		}
	}
	render(){
		let{
			currentYear,
			backgroundImageDir,
			loginModal,
			loginForm,
			thoughts,
			testimonials
		} = this.state;
		return(
			<div className = 'welcome-content'>
				<div id = 'login-container'>
					<div id = 'lbc-top-spacer'>
					</div>
					<div id = 'button-container' onClick = {this.handleShowLoginModal}>
						< ExpandingBorder
							elementType = 'button'
							text = 'log in'
						/>
					</div>
					<div className={loginModal.containerClass} id = 'modal-container' onClick = {this.handleCloseLoginModal}>
						<div className={loginModal.animateClass} id = 'login-modal-content'>
							<span className="closeSpan" id = 'login-close-span'>&times;</span>
							<div className="modal-header">
								<span>welcome</span>
							</div>
							<div className="modal-body">
								<form onSubmit = {this.handleSubmit}>
									<label htmlFor = 'username'>
										<span>username | e-mail</span>
									</label>
									<input
										type = 'text'
										id = 'username'
										value = {loginForm.username}
										placeholder = 'username'
										onChange = {this.handleInputChange}
									/>
									<label htmlFor = 'password'>
										<span>password</span>
									</label>
									<input
										type = 'text'
										id = 'password'
										value = {loginForm.passwordHidden}
										placeholder = 'password'
										onChange = {this.handleInputChange}
									/>
									<button
										type="submit"
										className=''
									>enter
									</button>
								</form>
								<p>Contact Jonathon now for your complimentary consultation. Start enjoying the freedom and security that confidential guidance and eloquent application development will bring to your business and personal lives. Read reviews from enthusiastic clients on LinkedIn.</p>
							</div>
							<div className="modal-footer">
								<Link to = '/userpage'>click here to represent signing in...</Link>
							</div>
						</div>
					</div>
				</div>	
				<div className = 'pax' style = {backgroundImageDir[0]}>
				</div>
				<div className = 'pax' style = {backgroundImageDir[1]}>
				</div>
				<div className = 'pax' style = {backgroundImageDir[2]}>
					<Thoughts
						thoughts = {thoughts}
					/>
				</div>
				<div className = 'pax' style = {backgroundImageDir[3]}>
				</div>
				<div className = 'pax' style = {backgroundImageDir[4]}>
					<Testimonials
						content = {testimonials}
					/>		
				</div>
				<Footer
					year = {currentYear}
					name = 'jonathon nagatani'
				/>
			</div>
		);
	}
}