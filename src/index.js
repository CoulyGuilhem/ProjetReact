
import './App.css';
import Game from './Game.js'
import Timer from './Timer.js';
import React from "react";
import Settings from "./Settings";
import FlagCounter from "./FlagCounter";
import ReactDOM, {unmountComponentAtNode} from "react-dom";

class Index extends React.Component{



    state = {
        lines: 10,
        rows: 10,
        mines: 10,
        restart: true,
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
    startNewGameCallBack = (p) => {
        this.setState({restart : p})
    }
    restartTable = () =>{
        this.setState({key:this.state.key+1})
    }



    render(){

        return (
            <div>
            <Game lines = {this.state.lines} rows = {this.state.rows} mines = {this.state.mines} key={this.state.key}/>
                <div className="menu">

                <div className="timer">
                    <Timer/>
                </div>
                <div className="settings">
                    <Settings lines = {this.lineCallbackFunction} rows = {this.rowCallbackFunction} mines = {this.mineCallbackFunction} restart={this.startNewGameCallBack}/>
                </div>
                <div className="flags">
                    <FlagCounter/>
                </div>
                <p>{this.state.lines}:{this.state.rows}:{this.state.mines}:{this.state.key}</p>
                    <input type="button" value={"START"} onClick={this.restartTable}/>
            </div>
            </div>
        );

    }

}
ReactDOM.render(<Index/>, document.getElementById('root'));

