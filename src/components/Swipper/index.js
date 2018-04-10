import React from 'react'; 
import PropTypes from 'prop-types';
import './index.less'; 
import ReactDOM from 'react-dom';
export default class Swipper extends React.Component{ 
  constructor(props, context) {
    super(props, context);
    // console.log(props.location);
	this.state = {
		interval: this.props.interval?this.props.interval:3000,
		autoPlay: true,
		activeIndex: this.props.activeIndex?this.props.activeIndex:0, 
		direction: this.props.direction?this.props.direction:'right',
		number: this.props.number?this.props.number:4,
		direction: props.boxStyle,
		timeOuter:''
	};
		}

		componentDidMount(){ 
			console.log(this.state.autoPlay);
			this.autoPlay(); 
		}

		componentWillReceiveProps (){
		}

		componentWillUnmount(){ 
			clearInterval(this.timeOuter); 
		}

		autoPlay(){
			// console.log(this.state.autoPlay);
			// console.log(this.state.activeIndex);
			if(this.state.autoPlay){ 
				this.timeOuter=setInterval(this.playRight.bind(this),this.state.interval); 
			} 
		}



		playRight(indexIn){ 
			let index=indexIn?indexIn:this.state.activeIndex+1; 
			// console.log(index); 
			if(index>this.state.number-1){ 
				index=0; 
			} 
			this.setState({ 
				activeIndex:index 
			}) 
		}

		position(){ 
			switch (this.state.activeIndex){ 
				case 0:return "onePosition" ; 
				case 1:return "twoPosition" ; 
				case 2:return "therePosition" ; 
				case 3:return "fourPosition"; 
			} 
		}

		render(){ 
			let{ 
				interval, 
				autoPlay, 
				activeIndex, 
				defaultActiveIndex, 
				direction, 
				number, 
				boxStyle 
			}=this.props; 
			return (
				<div className={boxStyle}> 
					<ul className={this.position()} > {this.props.children} </ul> 
				</div> 
			)
				
		} 
	}
	Swipper.propTypes = {
		interval: PropTypes.number, 
		autoPlay: PropTypes.bool, 
		activeIndex: PropTypes.number, 
		direction: PropTypes.string, 
		number: PropTypes.number, 
		boxStyle: PropTypes.string
	  };