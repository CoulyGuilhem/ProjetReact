import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick} onContextMenu={props.rightClick}>
            {props.value}
        </button>
    );
}
class Board extends React.Component {
    renderSquare(i) {
        let className
        let value = this.props.squares[i]
        if(value === 0){
            value = null
            className ="squareNull"
        } else if (value === null){
            className = "squareNotDiscovered"
        } else if (value === 9){
            className = "squareMine"
        } else if (value === "P") {
            className="squareFlag"
        } else {
            className="squareNearMine"
        }
        return (
            <Square key={i}
                className = {className}
                value={value}
                onClick={() => this.props.onClick(i)}
                rightClick={() => this.props.onContextMenu(i)}
            />
        );
    }

    renderRows(coordonne){
        const rows = [];
        for (let i = 0; i < 10; i++){
            rows.push(this.renderSquare(i+coordonne*10))
        }
        return (
            <div className="board_line" key={"lien : "+coordonne}>
                {rows}
            </div>
        )
    }

    render() {
        const lines = [];
        for (let i = 0; i < 10; i++){
            lines[i]=this.renderRows(i)
        }
        return (
            <div className="board" key={"Board"}>
                {lines}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameTable: Array(100).fill(null),
            tableMine: this.generateMines(10,10),
            gameState: ""
        };
    }

    generateMines(line,row){
        let tableMine = Array(10)
        for(let i = 0;i<line;i++){
            tableMine[i] = Array(row).fill(0)
        }
        let randomLine
        let randomRaw
        for (let i = 0 ; i < 10 ; i++){
            do {
                randomLine = Math.round(Math.random() * (9))
                randomRaw = Math.round(Math.random() * (9))
            } while(tableMine[randomLine][randomRaw] === 9)
            tableMine[randomLine][randomRaw] = 9;
        }
        tableMine = this.generateWarning(tableMine,line,row)
        return tableMine
    }

    generateWarning(tableMine,line,row){
        for(let i = 0 ; i < line ; i++){
            for(let j = 0; j < row ; j++){
                if(tableMine[i][j] >= 9){

                    // Gestion 3 cases haut
                    if(i !== 0){
                        tableMine[i-1][j] = tableMine[i-1][j] +1
                        if(j !== 0){
                            tableMine[i-1][j-1] = tableMine[i-1][j-1] +1
                        }
                        if(j !== row-1){
                            tableMine[i-1][j+1] = tableMine[i-1][j+1] +1
                        }
                    }

                    //Gestion 3 Cases bas

                    if(i !== line-1){
                        tableMine[i+1][j] = tableMine[i+1][j] +1
                        if(j !== 0){
                            tableMine[i+1][j-1] = tableMine[i+1][j-1] +1
                        }
                        if(j !== row-1){
                            tableMine[i+1][j+1] = tableMine[i+1][j+1] +1
                        }
                    }

                    // gestion case gauche

                    if(j !== 0){
                        tableMine[i][j-1] = tableMine[i][j-1] +1
                    }
                    if (j !== row-1){
                        tableMine[i][j+1] = tableMine[i][j+1] +1
                    }
                }
            }
        }
        for(let i = 0; i < line ; i++){
            for(let j = 0; j < row ; j++) {
                if (tableMine[i][j] >= 9) {
                    tableMine[i][j] = 9;
                }
            }
        }
        return tableMine
    }
    updateZone(gameTable,line,row,tableMine){
        let id = line * tableMine.length + row
        if (line < 0 || line > tableMine.length-1) return gameTable;
        if (row <0 || row > tableMine[line].length-1) return gameTable;
        if(gameTable[id] !== null) return gameTable;
        gameTable[id] = tableMine[line][row]
        if(gameTable[id]!==0) return gameTable;
        gameTable = this.updateZone(gameTable,line+1,row,tableMine)
        gameTable = this.updateZone(gameTable,line-1,row,tableMine)
        gameTable = this.updateZone(gameTable,line,row+1,tableMine)
        gameTable = this.updateZone(gameTable,line,row-1,tableMine)
        gameTable = this.updateZone(gameTable,line+1,row-1,tableMine)
        gameTable = this.updateZone(gameTable,line+1,row+1,tableMine)
        gameTable = this.updateZone(gameTable,line-1,row+1,tableMine)
        gameTable = this.updateZone(gameTable,line-1,row-1,tableMine)
        return gameTable;
    }

    gameStatus(line,row){
        const gameTable = this.state.gameTable.slice();
        const tableMine = this.state.tableMine.slice();
        let id
        for(let i = 0; i < line ; i++){
            for(let j = 0; j < row ; j++) {
                id = i * line + j
                if(!(gameTable[id] !== null && gameTable[id] !=="P") && tableMine[i][j] !== 9) {
                    return false
                }
            }
        }
        return true
    }

    rightClick(i){
        const gameTable = this.state.gameTable.slice();

        if(gameTable[i] === null){
            gameTable[i] = "P"
            this.setState({
                gameTable:gameTable
            })
        } else if (gameTable[i] === "P"){
            gameTable[i] = null
            this.setState({
                gameTable:gameTable
            })
        }

    }

    handleClick(i) {

        if (this.state.gameState === "") {
            const gameTable = this.state.gameTable.slice();
            const tableMine = this.state.tableMine.slice();
            const line = Math.floor(i / 10)
            const row = i % 10
            console.log(gameTable)
            if (tableMine[line][row] === 0) {
                this.setState({
                    gameTable: this.updateZone(gameTable,line, row,tableMine),
                },() => console.log("ok"))


            } else if(gameTable[i] !== "P"){
                console.log(tableMine[line][row])
                gameTable[i] = tableMine[line][row]
                this.setState({
                    gameTable: gameTable,
                },() => console.log("ok"))
            }
            console.log(this.gameStatus(10,10))
            if(this.gameStatus(10,10)){
                this.setState({
                    gameState: "GG",
                });
            }

            if(gameTable[i] === 9){
                this.setState({
                    gameState: "BOOM",
                });
            }
        }
    }

    render() {
        return (
            <div className="game" key="GAME" onContextMenu={(e)=> e.preventDefault()}>
                <div className="game-board" key={"Game Board"}>
                    <Board
                        squares={this.state.gameTable}
                        onClick={i => this.handleClick(i)}
                        onContextMenu={i=> this.rightClick(i)}
                    />
                </div>

                <div key={"Game state"}>
                    <p key={"game message"}>{this.state.gameState}</p>
                </div>
            </div>
        );
    }

}
// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));



