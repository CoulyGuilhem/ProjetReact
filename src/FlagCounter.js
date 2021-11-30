import React from "react";
export class FlagCounter extends React.Component {
    render() {
        return(
            <div className={"FlagCounter"}>
                <p>⚑ restant : {this.state.flagMax}</p>
            </div>


        )
    }
}

export default FlagCounter