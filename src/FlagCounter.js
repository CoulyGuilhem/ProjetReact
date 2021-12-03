import React from "react";
export class FlagCounter extends React.Component {
    render() {
        return(
            <div className={"FlagCounter"}>
                <p>⚑ restant : {this.props.flags}</p>
            </div>


        )
    }
}

export default FlagCounter