
import './App.css';
import Game from './Game.js'
import Timer from './Timer.js';
import React from "react";
import Settings from "./Settings";
import FlagCounter from "./FlagCounter";
import EtatPartie from "./EtatPartie";
import ReactDOM from "react-dom";
class Index extends React.Component{

    state = {
        lines: 10,
        rows: 10,
        mines: 10,
        flags: 10,
        key: 0,
        gameState: "En cours"
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de lignes
     * @param p correspond au nombre de lignes
     */
    lineCallbackFunction = (p) => {
        this.setState({lines: p})
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de colonnes
     * @param p correspond au nombre de colonnes
     */
    rowCallbackFunction = (p) => {
        this.setState({rows: p})
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de mines
     * @param p correspond au nombre de mines
     */
    mineCallbackFunction = (p) => {
        this.setState({mines: p})
    }

    /**
     * Cette fonction permet de redémarer une nouvelle partie. On recrée une table grace a l'attribut key qui re fait appel au constructeur du component Game
     */
    restartTable = () =>{
        this.setState({key:this.state.key+1,gameState: "En cours",endGame:false})
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de drapeaux
     * @param p correspond au nombre de drapeaux
     */
    flagsCallback = (p) =>{
        this.setState({flags:p})
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour l'état de la partie'
     * @param p correspond a l'état de la partie
     */
    gameStateCallback = (p) =>{
        this.setState(
            {gameState:p
        })
    }

    /**
     * Permet de generer l'affichage entier du jeu et de la zone d'information/paramettre
     * @returns {JSX.Element}
     */
    render(){
        return (
            <div>
            <Game lines = {this.state.lines} rows = {this.state.rows} mines = {this.state.mines} key={this.state.key} flags = {this.flagsCallback} gameState = {this.gameStateCallback}/>
                <div className="menu">
                    <EtatPartie gameState = {this.state.gameState} game={this.state.key}/>
                <div className="timer">
                    <Timer game = {this.state.key} gameState={this.state.gameState}/>
                </div>
                <div className="settings">
                    <Settings lines = {this.lineCallbackFunction} rows = {this.rowCallbackFunction} mines = {this.mineCallbackFunction} restart = {this.restartTable}/>
                </div>
                <div className="flags"  >
                    <FlagCounter flags={this.state.flags}/>
                </div>
            </div>
            </div>
        );

    }

}
ReactDOM.render(<Index/>, document.getElementById('root'));

