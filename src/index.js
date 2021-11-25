import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderRows(coordonne){
        const rows = [];
        for (let i = 0; i < 10; i++){
            rows.push(this.renderSquare(i+coordonne*10))
        }
        return (
            <div className="board-row">
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
            <div>
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

        for (let i = 0 ; i < 2 ; i++){
            let randomLine = Math.round(Math.random() * (9))
            let randomRaw = Math.round(Math.random() * (9))
            do {
                randomLine = Math.round(Math.random() * (9))
                randomRaw = Math.round(Math.random() * (9))
            } while(tableMine[randomLine][randomRaw] === 9)
            tableMine[randomLine][randomRaw] = 9;
        }
        console.log("---------------------Mines------------------")
        console.log(tableMine)


        tableMine = this.generateWarning(tableMine,line,row)
        return tableMine

    }

    generateWarning(tableMine,line,row){
        for(let i = 0 ; i < line ; i++){
            for(let j = 0; j < row ; j++){
                if(tableMine[i][j] === 9){

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
                    } else if (j !== row-1){
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
        console.log("---------------------Mines + Chiffres------------------")
        console.log(tableMine)
        return tableMine
    }

    handleClick(i) {
        if(this.state.gameState === ""){
            const gameTable = this.state.gameTable.slice();
            const tableMine = this.state.tableMine.slice();
            const line = Math.floor(i / 10)
            const row = i % 10
            if(tableMine[line][row] === 0 ){
                gameTable[i] = tableMine[line][row]
                this.setState({
                    gameTable: gameTable,
                })
                // TODO zone vide

            } else {
                gameTable[i] = tableMine[line][row]
                this.setState({
                    gameTable: gameTable,
                })
            }

            /**
            if(mine[i] === 9){
                this.setState({
                    gameState: "BOOM",
                });
            }*/

            /**this.setState({
                squares: squares,
            });*/
        }
    }


    /**
    discoverZoneGauche(squares,i,longueur,largeur){

        const mine = this.state.mine.slice();

        // Gere les 3 cases a gauche de la mine
        squares[i] = mine[i];
        this.setState({squares: squares});
        if (i !== 0 && i%longueur !==0) {
            squares[i - 1] = mine[i - 1];
            this.setState({squares: squares});
            if (mine[i - 1] === 0) {
                this.discoverZoneGauche(squares, i - 1, 10, 10)
                //this.discoverZoneHaut(squares, i - 1, 10);
                //this.discoverZoneBas(squares,i -1,10,10);
            }

            /**
            if (Math.floor(i / longueur) !== 0) {
                squares[i - 1 - longueur] = mine[i - 1 - longueur];
                this.setState({squares: squares});
                if (mine[i - 1 - longueur] === 0) {
                    this.discoverZoneGauche(squares, i - 1 - longueur, 10, 10);
                }
            }
            if (Math.floor(i / longueur) !== largeur - 1) {
                squares[i - 1 + longueur] = mine[i - 1 + longueur];
                this.setState({squares: squares});
                if (mine[i - 1 + longueur] === 0) {
                    this.discoverZoneGauche(squares, i - 1 + longueur, 10, 10);
                }
            }
        }
    }
// Gere les 3 cases a droite de la mine
    discoverZoneDroite(squares,i,longueur,largeur) {

        const mine = this.state.mine.slice();
        squares[i] = mine[i];
        this.setState({squares: squares});
        if(i !== mine.length - 1 && i%longueur !== longueur-1) {
            squares[i + 1] = mine[i + 1];
            this.setState({squares: squares});
            if (mine[i + 1] === 0) {
                this.discoverZoneDroite(squares,i + 1, 10, 10)
                //this.discoverZoneHaut(squares, i + 1, 10);
                //this.discoverZoneBas(squares,i + 1,10,10);
            }
            /**
            if (Math.floor(i / longueur) !== 0) {
                squares[i + 1 - longueur] = mine[i + 1 - longueur];
                this.setState({squares: squares});
                if (mine[i + 1 - longueur] === 0) {
                    this.discoverZoneDroite(squares,i + 1 - longueur, 10, 10);
                }

                if (Math.floor(i / longueur) !== largeur - 1) {
                    squares[i + 1 + longueur] = mine[i + 1 + longueur];
                    this.setState({squares: squares});
                    if (mine[i + 1 + longueur] === 0) {
                        this.discoverZoneDroite(squares,i + 1 + longueur, 10, 10);
                    }
                }
            }
        }
    }

    discoverZoneHaut(squares,i,longueur) {
        const mine = this.state.mine.slice();
        squares[i] = mine[i];
        this.setState({squares: squares});
        // Gere la case au dessus de la mine
        if (Math.floor(i / longueur) !== 0) {
            squares[i - longueur] = mine[i - longueur];
            this.setState({squares: squares});
            if (mine [i - longueur] === 0) {
                this.discoverZoneGauche(squares, i - longueur, 10, 10);
                this.discoverZoneDroite(squares, i - longueur, 10, 10);
                this.discoverZoneHaut(squares, i - longueur, 10);
            }
        }
    }

    discoverZoneBas(squares,i,longueur,largeur) {
        const mine = this.state.mine.slice();
        squares[i] = mine[i];
        this.setState({squares: squares});
        if (Math.floor(i/longueur) !== largeur){
            squares[ i + longueur ] = mine[ i + longueur ];
            this.setState({squares: squares});
            if(mine[i+longueur] === 0){
                this.discoverZoneGauche(squares, i + longueur, 10, 10);
                this.discoverZoneDroite(squares, i + longueur, 10, 10);
                this.discoverZoneBas(squares,i + longueur,10,10);
            }
        }
    }
            // Gere la case en dessous de la mine
*/

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.gameTable}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div>
                    <p>{this.state.gameState}</p>
                </div>
            </div>
        );
    }
}
// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));



