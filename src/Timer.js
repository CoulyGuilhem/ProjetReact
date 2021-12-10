import React from 'react';

export class Timer extends React.Component{

    /**
     * Constructeur
     * intialise le state
     * @param props
     */
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


    /**
     * startTimer permet de generer le timer
     * @param stop si stop = false -> on initialise un timer qu'on stock dans intervalID
     *             sinon (true) -> on arrete le timer sauvegardé dans intervalID
     */

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

    /**
     * componentWillReceiveProps() est appelé lorsque de nouveaux props sont envoyés
     * @param nextProps nextProps contient les nouveaux props envoyés
     */

    componentWillReceiveProps(nextProps) {

        // SI ON DEMARRE UNE NOUVELLE PARTIE
        if(this.props.game !== this.state.game){
            this.setState({
                seconds: 0,
                minute: 0,
                heure: 0,
                game: this.state.game+1
            })
            this.startTimer(true)
            this.startTimer(false)
        } else { // SINON ON STOP LE TIMER
            let gameState = nextProps.gameState
            if(gameState !== "En cours") {
                this.startTimer(true)
            }
        }


    }


    /**
     * timeSwitch() contient le code pour convertir les secondes en minutes et les minutes en heures
     */

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