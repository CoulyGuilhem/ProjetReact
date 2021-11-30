import React from "react";

export class Settings extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <input type="number" min={10} max={50}/>
                    <input type="number" min={10} max={50}/>
                </div>
                <div>
                    <input type="number" min={10} max={50}/>
                    <input type="button" value={"START"}/>
                </div>
            </div>
        )
    }
}

export default Settings