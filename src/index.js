
import './App.css';
import Game from './Game.js'
import Timer from './Timer.js';
import React from "react";
import Settings from "./Settings";
import FlagCounter from "./FlagCounter";
import ReactDOM from "react-dom";
class Index extends React.Component{



    state = {
        lines: 10,
        rows: 10,
        mines: 10,
        flags: 10,
        key: 0
    }
    lineCallbackFunction = (p) => {
        this.setState({lines: p})
    }
    rowCallbackFunction = (p) => {
        this.setState({rows: p})
    }
    mineCallbackFunction = (p) => {
        this.setState({mines: p})
    }

    restartTable = () =>{
        this.setState({key:this.state.key+1})
    }

    flagsCallback = (p) =>{
        this.setState({flags:p})
    }



    render(){

        return (
            <div>
            <Game lines = {this.state.lines} rows = {this.state.rows} mines = {this.state.mines} key={this.state.key} flags = {this.flagsCallback}/>
                <div className="menu">

                <div className="timer">
                    <Timer/>
                </div>
                <div className="settings">
                    <Settings lines = {this.lineCallbackFunction} rows = {this.rowCallbackFunction} mines = {this.mineCallbackFunction} restart = {this.restartTable}/>
                </div>
                <div className="flags"  >
                    <FlagCounter flags={this.state.flags}/>
                </div>
                <p>{this.state.lines}:{this.state.rows}:{this.state.mines}:{this.state.key}</p>
            </div>
            </div>
        );

    }

}
ReactDOM.render(<Index/>, document.getElementById('root'));

