import React from 'react';

export class Projects extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			colorObject:{
				backgroundColor:'',
				colorArray:[],
				magnitude:0,
				counter:false,
				mounted:false
			},
			projects: [
				{
					id: 17,
					number: "CMA developer",
					staticlink: 'https://avm-jn.herokuapp.com/',
					//staticlink: 'https://raspberryrealty.herokuapp.com/',
					//1. a description of this homework (what does it do).
					//2 how to use it.
					//3. how it does it/ how it was made.
					desc: 'A Single Page Application using React.js with a node and express server. Enter a description of a property, then receive statistics related to that property in addition to a Comparative Market Analysis. Searches enabled by accessing a mongo database of mongoose schemas / models; collections are populated with documents of actual property listings. Front-end framework custom designed using CSS3.',
					tech: ['React', 'Node.js', 'express', 'JSX', 'mongodb', 'mongoose', 'axios', 'd3', 'CSS3', 'JavaScript', 'react-router', 'babel', 'webpack', 'css-loader','heroku']
				},{
					id: 16,
					number: "NYT SPA",
					staticlink: 'https://nyt-jn.herokuapp.com/',
					//staticlink: 'https://homework15jn.herokuapp.com/',
					desc: 'A Single Page Application using React with a node and express server. This application searches the New York Times API, and stores user-saved articles in a mongo database using mongoose models. Front-end framework designed using Twitter Bootstrap.',
					tech: ['React', 'Node.js', 'express', 'JSX', 'mongodb', 'mongoose', 'axios', 'Twitter Bootstrap', 'CSS3', 'JavaScript', 'heroku']
				},{
					id: 15,
					number: "news web scraper",
					staticlink: 'https://homework14jn.herokuapp.com/',
					desc: 'Application using a web scraper. Get the current and most recent headlines from Democracy Now. Save articles and delete articles.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'express', 'mongoose', 'cheerio', 'heroku']
				},{
					id: 14,
					number: "group project two",
					staticlink: 'https://enhajolist.herokuapp.com/',
					desc: 'Application built by a three-person team; users may search local business listings for business information and current promotions; business owners may add their business and add promotions.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'mySQL', 'express', 'handlebars', 'heroku']
				},{
					id: 13,
					number: "craps dealer trainer",
					staticlink: 'https://jonathonn.herokuapp.com/apps/app03.html',
					desc: 'Randomly generates deal scenarios & detailed explanations; calculates user performance statistics.',
					tech: ['HTML5', 'CSS3', 'JavaScript']
				},{
					id: 12,
					number: "mySQL burger app",
					staticlink: 'https://jn1.herokuapp.com/',
					desc: 'Add new burgers, "devour" burgers, and make burgers available for devouring again. This homework involved creating my own server.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'mySQL', 'express', 'handlebars', 'heroku']
				},{
					id: 11,
					number: "multi-player RPS",
					staticlink: 'https://jonathonn.herokuapp.com/applications/hw7.html',
					desc: 'Find a partner and play "Rock, Paper, Scissors," anywhere connected to the internet, on different computers and browsers. Use the chat feature to send messages. Additional spectators may view the results of each round and add their own commentary to the messaging system. This homework utilizes Firebase like a server in that each user "posts" and "gets" information to and from the Firebase database to enjoy the features of this application. The game works by assigning each user\'s DOM elements ids or data attributes unique to them, so Firebase can send them the appropriate information. Firebase understands whose turn it is, or what to display on different browsers, based on internal variables. Firebase "listens" for specific actions to send the appropriate information to the intended users. I also added timer functionality so subsequent games occur automatically rather than requiring explicit consent from the players (eg "next button") to start a new round. This enhances the game experience.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Google Firebase']
				},{
					id: 10,
					number: "mySQL CLI app",
					staticlink: 'https://youtu.be/M3w1Te47G5o',
					desc: 'This homework involved "creating an Amazon-like storefront with mySQL. The application takes in orders from customers and depletes stock from the store\'s inventory. The application also tracks product sales across departments and can provide a summary of the highest-grossing departments in the store." Preliminary steps included creating a package.json file and installing and saving the NPM packages (libraries) "mysql" for creating a mySQL connection, "inquirer" for the CLI interface, and "cli-table" for the "Supervisor View." I also added a .gitignore file so when pushing updates to github, the node_modules repository was not added. In MySQL Workbench, I created a database, specified using that particular database, then created a table with columns including an item_id primary key auto_incremented column, as well as product name, department name, price, and stock quantity columns. The JavaScript code first created a mySQL connection using the mysql object, then used inquirer and the mysql packages to obtain data from the products table and allow the user through the CLI to manipulate the table data in various ways, as demonstrated in the video. A second table was added to the same database which reflected total department sales and "profit," which would be updated whenever a change occured in the first products table. Success on this homework required extensive use of promises, anonymous functions, and callback functions, in addition to crafting appropriate mySQL queries and utilizing placeholders when necessary.',
					tech: ['JavaScript', 'Node.js', 'NPM libraries/packages: inquirer, mysql, cli-table', 'mySQL']
				},{
					id: 9,
					number: "timed trivia app",
					staticlink: 'https://jonathonn.herokuapp.com/applications/hw5.html',
					desc: 'This "trivia" application navigates the user through a series of timed questions. Once a user selects an answer (or if time remaining reaches 0), their answer is compared to the correct answer. After time is provided for the user to read the answer and explanation, the next timed question begins automatically. Once the user exhausts all questions and answers, the user\'s score is presented, and the user may select the option to try the quiz again. This assignment required more advanced JavaScript programming and continued the use of jQuery. I added additional features to this homework, including questions being randomly generated every time the quiz begins, and the application displaying a corresponding answer explanation whenever an answer was displayed. To complete this homework, success required correctly applying the use of JavaScript timers and enhanced understanding of JavaScript arrays and objects.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery']
				},{
					id: 8,
					number: "giphy app",
					staticlink: 'https://jonathonn.herokuapp.com/applications/hw6.html',
					desc: 'Take a look at popular giphys of a certain topic from a predetermined list, or add your own new topic to the list. After selecting a topic, the DOM populates with giphys corresponding to the selected topic, and you may click on a particular giphy image to see the animated version of that giphy. Then click an animated giphy to return it to the still image version. This homework involved creating AJAX calls to the giphy api to get the proper images and animated images. An AJAX call required properly formulating the query URL, then filtering the returned data and using jQuery to populate the DOM with the images corresponding to the topic. This application also involved assigning custom attributes to different html elements so the animate/still functionality would work as expected.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'AJAX (Asynchronous JavaScript and XML)', 'API (application programming interface)']
				},{
					id: 7,
					number: "hangman game",
					staticlink: 'https://jonathonn.herokuapp.com/applications/hw3.html',
					desc: 'A "hangman" style game. Homework three represents an exercise in javascript basics, as well as requiring continued advancement in html and css. This assignment involved organizing the game code as an object. While playing, users enter letters from their keyboard as they guess which letters are contained in the current word. Guesses are validated against prior guesses, so the letters guessed count does not decrement with repeat guesses on the same word. As correct letters are entered, the word replaces the placeholders with the correctly guessed letters in the appropriate locations within the current word. Once all letters for the current word are entered within the allotted guess limit, the user "wins" the word and the next word begins.',
					tech: ['HTML5', 'CSS3', 'JavaScript']
				},{
					id: 6,
					number: 'crystal collector game',
					staticlink: 'https://jonathonn.herokuapp.com/applications/hw4.html',
					desc: 'The player wins with both skill and luck, by correctly calculating how many "crystals" of random values, will give them a total score equal to a randomly generated "goal score." This assignment further refines and explores my capabilities with JavaScript, while introducing the use of jQuery. jQuery enabled DOM manipulation (rendering, appending, updating, etc) through "simpler" code. Also had to properly include the jQuery CDN to enable the jQuery functionality.',
					tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery']
				}]
		};
		this.changeBC = this.changeBC.bind(this);
		this.convertToRGBAString = this.convertToRGBAString.bind(this);
		this.randomColors = this.randomColors.bind(this);
		this.changeValue = this.changeValue.bind(this);
	}
	componentDidMount(){
		let{colorObject} = this.state;
		if(!colorObject.mounted){
			this.changeBC([250, 250, 250, 1], 13, 3000);
		}else{
			this.changeBC(colorObject.colorArray, colorObject.magnitude, 3000);
		}
	}
	componentWillUnmount(){
		clearInterval(this.state.colorObject.counter);
	}
	changeBC(initialRGBA, mag, interval){
		let{colorObject} = this.state;
		let counter = setInterval(this.randomColors, interval);
		let objCopy = Object.assign({}, colorObject, {backgroundColor:this.convertToRGBAString(initialRGBA), colorArray: initialRGBA, magnitude: mag, counter: counter, mounted:true});
		this.setState({
			colorObject: objCopy
		});
	}
	convertToRGBAString(array){
		return 'rgba(' + array.join(',') + ')';
	}
	randomColors(){
		let{colorObject} = this.state;
		let colorArray = colorObject.colorArray;
		for(let i = 0; i < colorArray.length; i ++){
			colorArray[i] = this.changeValue(colorArray[i], colorObject.magnitude);
		}
		//set opacity to 1 for now
		colorArray[3] = 1;
		let objCopy = Object.assign({}, colorObject, {backgroundColor:this.convertToRGBAString(colorArray), colorArray: colorArray});
		this.setState({
			colorObject: objCopy
		});
	}
	changeValue(value, mag){
		//with equal probability, increase or decrease each of the 3 values by mag
		if(Math.random() < 0.5){
			value = value - mag;
		}else{
			value = value + mag;
		}
		if(value < 0){
			value = Math.floor(Math.random()*mag);
		}
		if(value > 255){
			value = 255 - Math.floor(Math.random()*mag);
		}
		return value;
	}
	render(){
		let{colorObject} = this.state;
		let style =
			{
				backgroundColor: colorObject.backgroundColor,
				height:'200px'
			};
		return(
			<div className = 'fit-95'>
				<div className = 'projects-component'>
					<div className = 'projects' style = {style}>projects here
					</div>
				</div>
			</div>
		);
	}
}

// var bcChange =
// {
// 	element: '',
// 	bc: [],
// 	mag: 0,
// 	counter: '',
// 	interval: function(element, initialRGBA, mag, interval){
// 		bcChange.element = element;
// 		bcChange.bc = initialRGBA;
// 		bcChange.mag = mag;
// 		bcChange.counter = setInterval(bcChange.changeColor, interval);
// 	},
// 	changeColor: function(){
// 		//obtain the element's current rgba
// 		for(var i = 0; i < bcChange.bc.length; i ++){
// 			bcChange.bc[i] = bcChange.changeValue(bcChange.bc[i], bcChange.mag);
// 		}
// 		//for now, set a (opacity) to 1
// 		bcChange.bc[3] = 1;
// 		//set background color to new values
// 		// document.getElementById(element).style.backgroundColor = 'rgba(' + [255,0,0, 0.5].join(',') + ')';
// 		//http://www.w3schools.com/jsref/dom_obj_style.asp
// 		document.getElementById(bcChange.element).style.backgroundColor = 'rgba(' + bcChange.bc + ')';
// 	},
// 	changeValue: function(value, mag){
// 		//with equal probability, increase or decrease each of the 3 values by mag
// 		if(Math.random() < 0.5){
// 			value = value - mag;
// 		}else{
// 			value = value + mag;
// 		}
// 		if(value < 0){
// 			value = Math.floor(Math.random()*mag);
// 		}
// 		if(value > 255){
// 			value = 255 - Math.floor(Math.random()*mag);
// 		}
// 		return value;
// 	},
// 	stop: function(){
// 		clearInterval(bcChange.counter);
// 	}
// };