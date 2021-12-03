import React from 'react';
import './index.css';

/**
 * Square() permet de generer un bouton qui correspond à une case
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick} onContextMenu={props.rightClick}>
            {props.value}
        </button>
    );
}

/**
 *  Cette classe gere l'affichage de la grille
 */

class Board extends React.Component {

    /**
     *  renderSquare permet de preparer les données  passer en argument pour la realisation d'un carré
     *  Soit : son style sa valeur et les fonctions appelées sur le click gauche et droit
     */


    renderSquare(i) {
        let rows = this.props.rows
        let className
        let value = this.props.squares[i]
        if(value === 0){
            value = null
            className ="squareNull"
        } else if (value === null){
            if((rows%2 === 0)) {
                if (Math.floor(i/rows) % 2 === 0) {
                    if (i % 2 === 0) {
                        className = "squareNotDiscovered2"
                    } else {
                        className = "squareNotDiscovered"
                    }
                } else {
                    if (i % 2 !== 0) {
                        className = "squareNotDiscovered2"
                    } else {
                        className = "squareNotDiscovered"
                    }
                }
            } else {
                if (i % 2 === 0) {
                    className = "squareNotDiscovered2"
                } else {
                    className = "squareNotDiscovered"
                }
            }

        } else if (value === 9){
            value="💣"
            className = "squareMine"
        } else if (value === "P") {
            value = "⚑"
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

    /**
     * renderRows permet de generer les colonnes de notre table
     * coordonne est l'id de la ligne de chaque carré generé
     *
     * i + coordonne*10 correspond donc à l'id de chaque carré
     * (exemple i = 7 , coordonne = 2 (il s'agit d'une grille 10 * 10))
     * la case a la collone 8 et à la ligne 2 = 27
     *  la premiere case = 0
     *
     * @param coordonne
     * @returns {JSX.Element}
     */

    renderRows(coordonne){
        let rowsLength = this.props.rows
        const rows = [];
        for (let i = 0; i < rowsLength; i++){
            rows.push(this.renderSquare(i+coordonne*rowsLength))
        }
        return (
            <div className="board_line" key={"lien : "+coordonne}>
                {rows}
            </div>
        )
    }

    /**
     * render permet de gerer l'affichage de notre grille
     * @returns {JSX.Element}
     */

    render() {
        let linesLength = this.props.lines // Nombre de ligne voulu
        const lines = [];
        for (let i = 0; i < linesLength; i++){
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


    /**
     * Il s'agit du constructeur lié  la gestion du jeu
     *
     * gameTable contient les valeurs à afficher sur la grille
     * tableMine contient la grille generée avec les mines
     * gameState contient le texte qui correspond  l'etat du jeu (gagné ou perdu)
     *
     * @param props
     */

    constructor(props) {
        super(props);
        const lines = this.props.lines
        const rows = this.props.rows
        const minePercentage = this.props.mines

        this.tableMine = this.generateMines(lines,rows,minePercentage)
        this.round = 0
        this.state = {
            gameTable: Array(lines * rows).fill(null),
            gameState: "",
            flagMax: Math.floor((lines * rows * minePercentage)/100)
        }
        this.props.flags(this.state.flagMax)
    }

    /**
     * generateMine() permet de generer aleatoirement les mines
     * elle sont stockées dans tableMine :
     * elle fait appel à la fonction generateWarning avant de renvoyer la grille de jeu finale
     *
     * @param line
     * @param row
     * @param minePercentage
     * @returns {any[]}
     */

    generateMines(line,row,minePercentage){
        let tableMine = Array(line)
        let lineRow
        let mine = Math.floor((line * row * minePercentage)/100)
        for(let i = 0;i<line;i++){
            lineRow = []
            for(let j = 0;j<row;j++){

                lineRow[j] = 0
            }
            tableMine[i] = lineRow
        }
        let randomLine
        let randomRow
        for (let i = 0 ; i < mine ; i++){
            do {
                randomLine = Math.round(Math.random() * (line-1))
                randomRow = Math.round(Math.random() * (row-1))
            } while(tableMine[randomLine][randomRow] === 9)
            tableMine[randomLine][randomRow] = 9;
        }
        tableMine = this.generateWarning(tableMine,line,row)
        return tableMine
    }

    /**
     * generateWaring() recupere la grille de jeu avec les mines generées.
     * elle rajoute +1 dans toutes les cases adjacentes.
     * elle renvoie la grille de jeu finale
     *
     * @param tableMine
     * @param line
     * @param row
     * @returns {*}
     */

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

    /**
     * updateZone() est appelée lorsqu'on clique gauche sur une case vide
     * elle dévoille toutes les cases adjacente et fait appel à elle meme de maniere recursive pour chaque case adjacente valant 0 (soit vide)
     *
     * @param gameTable
     * @param line
     * @param row
     * @param tableMine
     * @returns {*}
     */

    updateZone(gameTable,line,row,tableMine){

        let id = line * this.props.rows + row
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

    /**
     * gameStatus() verifie si seul les cases non affichées / drapeau valent 9
     * si oui on renvoie vrai
     * si non on renvoie faux
     * @param line
     * @param row
     * @returns {boolean}
     */

    gameStatus(line,row){
        const gameTable = this.state.gameTable.slice();
        const tableMine = this.tableMine.slice();
        let id
        for(let i = 0; i < line ; i++){
            for(let j = 0; j < row ; j++) {
                id = i * row + j
                if((gameTable[id] === null || gameTable[id] ==="P") && tableMine[i][j] !== 9) {
                    return false
                }
            }
        }
        return true
    }

    /**
     * rightClick() permet d'afficher un drapeau sur la case i
     * on ne peut pas clicker sur un drapeau
     * pour l'enlever on doit faire un click dorit dessus
     * @param i
     */

    rightClick(i){
        const gameTable = this.state.gameTable.slice();
        let flags
        if(gameTable[i] === null && this.state.flagMax > 0){
            gameTable[i] = "P"
            this.setState({
                gameTable:gameTable,
                flagMax: this.state.flagMax - 1
            },this.setPropsFlag)

        } else if (gameTable[i] === "P"){
            gameTable[i] = null
            this.setState({
                gameTable:gameTable,
                flagMax: this.state.flagMax + 1
            },this.setPropsFlag)
        }
        this.setPropsFlag()

    }
    setPropsFlag(){
        this.props.flags(this.state.flagMax)
    }

    /**
     * handleClick permet de devoiler la case cliquée
     * si elle vaut 0 on fait appel à la fonction updateZone pour devoiller la zone vide
     * si une mine est devoillée on met fin à la partie
     * à chaque click on verifie si l'ensemble des cases non minées sont dévoillées
     * @param i
     */

    handleClick(i) {
        const rows = this.props.rows
        const lines = this.props.lines
        const gameTable = this.state.gameTable.slice();
        const line = Math.floor(i / rows)
        const row = i % rows
        /**
        if(this.round === 0){
            this.tableMine = this.generateMines(lines,rows,this.props.mines)
            this.round = this.round +1
        }*/
        const tableMine = this.tableMine.slice();


        if (this.state.gameState === "") {

            if (tableMine[line][row] === 0) {
                this.setState({
                    gameTable: this.updateZone(gameTable,line, row,tableMine),
                })

            } else if(gameTable[i] !== "P"){
                gameTable[i] = tableMine[line][row]
                this.setState({
                    gameTable: gameTable,
                })
            }

            if(this.gameStatus(lines,rows)){
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

    /**
     * permet de generer une table
     * @returns {JSX.Element}
     */

    render() {
        return (
            <div className="game" key="GAME" onContextMenu={(e)=> e.preventDefault()}>
                <div className="game-board" key={"Game Board"}>
                    <Board
                        lines = {this.props.lines}
                        rows = {this.props.rows}
                        squares = {this.state.gameTable}
                        onClick = {i => this.handleClick(i)}
                        onContextMenu = {i=> this.rightClick(i)}
                    />
                </div>
                <p className="gameState">{this.state.gameState}</p>
            </div>

        );
    }
}
// ========================================
export default Game;



