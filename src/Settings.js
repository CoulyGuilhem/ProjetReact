import React from "react";

export class Settings extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            inputLine:10,
            inputRow:10,
            inputMine:10
        }
    }

    sendBackData = () => {
        this.props.lines(this.state.inputLine)
        this.props.rows(this.state.inputRow)
        this.props.mines(this.state.inputMine)
        this.props.restart()
    }

    updateInputLine(evt) {
        this.setState({
            inputLine: evt.target.value,
        });
    }

    updateInputRow(evt) {
        this.setState({
            inputRow: evt.target.value,
        });
    }
    updateInputMine(evt) {
        this.setState({
            inputMine: evt.target.value
        });
    }

    render(){
        return(
            <div>
                <div>
                    <input value={this.state.inputLine} onChange={evt => this.updateInputLine(evt)} type="number" min={10} max={50}/>
                    <input value={this.state.inputRow} onChange={evt => this.updateInputRow(evt)} type="number" min={10} max={50}/>
                </div>
                <div>
                    <input value={this.state.inputMine} onChange={evt => this.updateInputMine(evt)} type="number" min={10} max={25}/>
                    <input type="button" value={"START"} onClick={this.sendBackData}/>
                </div>
            </div>
        )
    }
} // Pourcentage mines

export default Settings