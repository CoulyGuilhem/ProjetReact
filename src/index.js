import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
        const table = [];
        for (let i = 0; i < 10; i++){
            table.push(this.renderRows(i))
        }
        return (
            <div>
                {table}

            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(100).fill(null),
            mine: this.generateMines(),
            gameState: ""
        };
    }

    generateMines(){
        const data = Array(100).fill(0)
        for (let i = 0 ; i < 30 ; i++){
            let random = Math.round(Math.random() * (99 - 0))
            do {
                random = Math.round(Math.random() * (99 - 0))
            } while(data[random] === 9)
            data[random] = 9
        }
        console.log(data)
        //this.generateWarning(data)
        return data;
    }

    generateWarning(data,longueur,largeur){
        for(let i =0;i<data.length;i++){

            if (data[i] === 9) {

                if (i !== 0) {
                    data[i - 1] = data[i] + 1;
                    if( Math.floor(i/longueur) !== 0){
                        data[ i - 1 - longueur] += 1;
                    } else if (Math.floor(i/longueur) !== largeur){
                        data[ i - 1 + longueur ] +=1
                    }

                } else if(i !== data.length -1 ){
                    data[ i + 1 ] += 1;
                    if(Math.floor(i/longueur) !== 0){
                        data[ i + 1 - longueur] += 1;
                    } else if (Math.floor(i/longueur) !==largeur){
                        data[ i + 1 + longueur ] +=1
                    }

                } else if (Math.floor(i/longueur) !== 0){
                    data[ i - longueur ] += 1;

                } else if (Math.floor(i/longueur) !== largeur){
                    data[ i + longueur ] +=1
                }
            }
            console.log(data)
        }
        this.setState({
            mine: data,
        });
    }

    handleClick(i) {
        if(this.state.gameState === ""){
            const squares = this.state.squares.slice();
            const mine = this.state.mine.slice();
            squares[i] = mine[i];
            if(mine[i] === 9){
                this.setState({
                    gameState: "BOOM",
                });
            }
            this.setState({
                squares: squares,
            });
        }
    }


    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
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



