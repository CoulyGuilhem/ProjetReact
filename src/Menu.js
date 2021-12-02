
import './App.css';
import Game from './index'
import Timer from './Timer.js';
import React from "react";
import Settings from "./Settings";
import FlagCounter from "./FlagCounter";
import ReactDOM from "react-dom";

class Menu extends React.Component{

    state = {
        lines: 10,
        rows: 10,
        mines: 10,
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



    render(){
        return (
            <div className="menu">
                <Game lines={10} rows={10} mines={10}/>
                <div className="timer">
                    <Timer/>
                </div>
                <div className="settings">
                    <Settings lines = {this.lineCallbackFunction} rows = {this.rowCallbackFunction} mines = {this.mineCallbackFunction}/>
                </div>
                <div className="flags">
                    <FlagCounter/>
                </div>
                <p>{this.state.lines}:{this.state.rows}:{this.state.mines}</p>
            </div>
        );
    }

}
ReactDOM.render(<div><Menu/></div>, document.getElementById("root"));

