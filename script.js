//--Display 'Add game form' on loading page--//
const addGameForm = document.getElementById('addGameForm')

window.onload = () => openForm();
function openForm(){
    addGameForm.removeAttribute('style');
}

//--Get form data and set the game--//
const submitInput = addGameForm.querySelector('button[type="submit"]');

function getData(e){
    e.preventDefault();

    let formData = new FormData(addGameForm);

        //   Get data from form
    const player1Name = formData.get('player1');
    const player2Name = formData.get('player2');
    const wins = formData.get('wins');

        //   Make player objects
    function Player(name){
        this.name = name;
        this.score = 0; 
        this.turn = false;
    }   

    const firstPlayer = new Player(player1Name || 'Player 1');
        firstPlayer.turn = true;
    const secondPlayer = new Player(player2Name || 'Player 2');

        //   Set player names display
    document.getElementById('player1NameDisplay').textContent = player1Name || 'Player 1';
    document.getElementById('player2NameDisplay').textContent = player2Name || 'Player 2';

        //   Reset and close form
    addGameForm.reset();
    addGameForm.style.display = 'none';    

        //   Start the game 
    game(firstPlayer, secondPlayer, wins);
}


//  Get data on submit button 
submitInput.addEventListener('click', getData, false);


//-----------GAME-----------//

function game(firstPlayer, secondPlayer, wins){

            // Play round 
    playRound();

    
    function playRound(){

            //  Make array from divs where player will put X or O
        let gameboard = document.getElementById('gameboard');
        let gameboardFiles = [...document.querySelectorAll('.gameboard')];

            //  Gameboard divs on click - add X or O  &  change player
        activateGameboard();

        function activateGameboard(){
                for(let i=0; i<9; i++){
                    gameboardFiles[i].addEventListener('click', playTurn, false);
                }
            }

        function playTurn(e){
                // Disable filled file
            e.target.removeEventListener('click', playTurn);

                // Put X or O in file
            if(firstPlayer.turn){
                e.target.textContent = 'X';
                firstPlayer.turn = false;
                secondPlayer.turn = true;

                checkWin();
            }
            else{
                e.target.textContent = 'O';
                secondPlayer.turn = false;
                firstPlayer.turn = true;

                checkWin();
            }
        }
            //  Check for win 
        
        function checkWin(){
            let boardArray = gameboardFiles.map(e=>e.innerHTML);

            for(let n=0; n<7; n+=3){
                if( (boardArray[n] === boardArray[n+1]) &&  (boardArray[n] === boardArray[n+2]) ){
                    if(boardArray[n] === ''){continue;};

                    checkWinner(n);
                }
            }

            for(let n=0; n<3; n++){
                if( (boardArray[n] === boardArray[n+3])  &&  (boardArray[n] === boardArray[n+6]) ){
                    if(boardArray[n] === ''){continue;};

                    checkWinner(n);
                }  
            }

            if( ((boardArray[0] === boardArray[4]) && (boardArray[0] === boardArray[8])) 
                || (boardArray[2] === boardArray[4]) && (boardArray[2] === boardArray[6])){
                    if(boardArray[4] != ''){checkWinner(4);};
                }

                // Check for a draw
            let j = 0;
            for(let i=0; i<9; i++){

                if(boardArray[i] === ''){
                    break;
                }
                else{
                    j++;
                    console.log(j)
                }

                if(j == 9){
                    displayDrawGame();
                    clearGrid();
                    activateGameboard();
                }
            }
            
            function checkWinner(n){
                if(boardArray[n] === 'X'){
                    this.winner = firstPlayer;  
                    this.text = firstPlayer.name;
                }
                else{
                    this.winner = secondPlayer; 
                    this.text = secondPlayer.name;
                }

                this.winner.score+=1;


                    //  Set player result display 
                setScoreDisplay();

                    // Display winning message
                if (this.winner.score === wins){
                    displayGameWon(this.winner, this.text);
                }
                else{
                    displayWinnerMessage(this.winner, this.text);
                }

                    // Clear grid and enable disabled files
                clearGrid();
                activateGameboard();
            }

            function setScoreDisplay(){
                document.getElementById('player1ResultDisplay').textContent = firstPlayer.score;
                document.getElementById('player2ResultDisplay').textContent = secondPlayer.score;
            }

            function clearGrid(){
                for(let i=0; i<9; i++){
                    gameboardFiles[i].textContent = '';
                }
            }

            function displayDrawGame(){
                console.log("it's a draw")
            }

            function displayGameWon(winnerObj, name){
                console.log(winnerObj, name, 'game won')
            }

            function displayWinnerMessage(winnerObj, name){
                console.log(winnerObj, name, 'whis game won')
            }

            return;
        }
        return;
    }
    return;
}





//new game & rematch buttons

