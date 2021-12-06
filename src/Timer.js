import React from 'react';

export class Timer extends React.Component{



    state = {
        seconds: 0,
        minute: 0,
        heure: 0,
        game: 0,
        timerRun: 0
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.game !== this.state.game){
            this.setState({
                seconds: 0,
                minute: 0,
                heure: 0,
                game: this.state.game+1,
                timerRun: 0
            })
        }


        if(this.props.gameState === "En cours"){
            console.log("tamer" + this.props.gameState)
            this.timer(true)
        } else {
            console.log("false : " + this.props.gameState)
            this.timer(false)
        }
    }


    timer(i) {
        console.log("FDP : "+i+" TAPUTEDEMERE : " + this.props.gameState + " gkjkljldfkmdf f: "+this.state.timerRun)

        if (i && this.state.timerRun === 0){
            this.setState({
                timerRun : 1
            })
            this.intervalID = setInterval(
                () => {
                    this.timeSwitch()
                    this.setState({ seconds: this.state.seconds + 1 })
                },
                1000
            );
        }else if (this.props.gameState !== "En cours"){
            clearInterval(this.intervalID)
            this.setState({
                timerRun : 0
            })
        }

        //
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