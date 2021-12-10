import React from "react";
export class FlagCounter extends React.Component {

    /**
     * render permet d'afficher le nombre de drapeaux restant (Soit le nombre de mines max - le nombre de drapeaux posés)
     * @returns {JSX.Element}
     */

    render() {
        return(
            <div className={"FlagCounter"}>
                <p>⚑ restant : {this.props.flags}</p>
            </div>
        )
    }
}

export default FlagCounter