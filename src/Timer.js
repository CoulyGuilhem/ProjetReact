import React from 'react';

export class Timer extends React.Component{

    state = {
        seconds: 0,
        minute: 0,
        heure: 0
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            seconds: 0,
            minute: 0,
            heure: 0
        })
    }
    componentDidMount() {
        setInterval(
            () => {
                this.timeSwitch()
                this.setState({ seconds: this.state.seconds + 1 })
            },
            1000
        );
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