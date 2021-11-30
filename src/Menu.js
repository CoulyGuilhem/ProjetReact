import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';
import React from "react";
import Settings from "./Settings";
import FlagCounter from "./FlagCounter";

class Menu extends React.Component{


    render(){
        return (
            <div className="menu">
                <div className="timer">
                    <Timer/>
                </div>
                <div className="settings">
                    <Settings/>
                </div>
                <div className="flags">
                    <FlagCounter/>
                </div>
            </div>
        );
    }

}

export default Menu;
