import React from 'react';

export class Timer extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minute: 0,
            heure: 0,
            game: 0,
        }
        this.startTimer(false)
    }


    startTimer(stop){
        if(!stop){
            this.intervalID = setInterval(
                () => {
                    this.timeSwitch()
                    this.setState({ seconds: this.state.seconds + 1 })
                },
                1000
            );
        } else {
            clearInterval(this.intervalID)
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.game !== this.state.game){
            this.setState({
                seconds: 0,
                minute: 0,
                heure: 0,
                game: this.state.game+1
            })
            this.startTimer(false)
        } else {
            let gameState = nextProps.gameState
            if(gameState !== "En cours") {
                this.startTimer(true)
            }
        }

    }



    timeSwitch(){
        if(this.state.seconds >=60){
            this.setState({
                seconds: 0,
                minute: this.state.minute + 1
            })
        }

        if(this.state.minute >=60){
            this.setState({
                minute: 0,
                heure: this.state.heure + 1
            })
        }
    }

    render(){
            return (
                <p>  {this.state.heure} : {this.state.minute} : {this.state.seconds}</p>
            )
    }
}

export default Timer