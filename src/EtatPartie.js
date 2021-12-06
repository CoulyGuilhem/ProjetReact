import React from "react";

export class EtatPartie extends React.Component {

    state = {
        etatPartie: this.props.gameState,
        numberGame: 0
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.game !== this.state.numberGame) {
            this.setState({
                etatPartie: "En Cours",
                numberGame: this.props.game
            })
        }
    }

    render() {
        return(<h1>{this.props.gameState}</h1>)
    }
}

export default EtatPartie