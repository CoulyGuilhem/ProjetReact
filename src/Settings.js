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

    /**
     * sendBackData permet de faire passer les differentes informations necessaire aà la generation de la partie du component Fille au component Mere
     */
    sendBackData = () => {
        this.props.lines(this.state.inputLine)
        this.props.rows(this.state.inputRow)
        this.props.mines(this.state.inputMine)
        this.props.restart()
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de lignes
     * @param evt correspond au nombre de lignes
     */
    updateInputLine(evt) {
        this.setState({
            inputLine: evt.target.value,
        });
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de colonnes
     * @param evt correspond au nombre de colonnes
     */
    updateInputRow(evt) {
        this.setState({
            inputRow: evt.target.value,
        });
    }

    /**
     * Cette fonction permet de recuperer et stocker la valeur enregistrée pour le nombre de mines
     * @param evt correspond au nombre de mines
     */
    updateInputMine(evt) {
        this.setState({
            inputMine: evt.target.value
        });
    }

    render(){
        return(
            <div>
                <div>
                    <label>Nombre de lignes : </label>
                    <input value={this.state.inputLine} onChange={evt => this.updateInputLine(evt)} type="number" min={10} max={50}/>
                    <label> Nombre de colonnes : </label>
                    <input value={this.state.inputRow} onChange={evt => this.updateInputRow(evt)} type="number" min={10} max={50}/>
                </div>
                <div>
                    <label>Nombre de mines : </label>
                    <input value={this.state.inputMine} onChange={evt => this.updateInputMine(evt)} type="number" min={10} max={25}/>
                    <label> Demarrer : </label>
                    <input type="button" value={"START"} onClick={this.sendBackData}/>
                </div>
            </div>
        )
    }
}
export default Settings