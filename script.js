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
                    gameboardFiles[i].onclick = (e) => playTurn(e);
                }
            }

        let j = 0; 

        function playTurn(e){
                // Disable filled file
            e.target.removeEventListener('click', playTurn);

                // Put X or O in file
            if(firstPlayer.turn){
                e.target.textContent = 'X';
                firstPlayer.turn = false;
                secondPlayer.turn = true;

            }
            else{
                e.target.textContent = 'O';
                secondPlayer.turn = false;
                firstPlayer.turn = true;

            }
                // Check for win if 5 or more moves were made
            j++;
            if(j>4 && j<=9){
                checkWin(j);
            }

        }
                     
            //  Check for win 
        
        function checkWin(turn){
            let boardArray = gameboardFiles.map(e=>e.innerHTML);
            let draw = 0;
                    // Horizontal lines
            for(let n=0; n<7; n+=3){
                if( (boardArray[n] === boardArray[n+1]) &&  (boardArray[n] === boardArray[n+2]) ){
                    if(boardArray[n] === ''){continue;};

                    checkWinner(n);
                }
                else{
                    if(turn == 9){checkDrawCount();}
                    else{continue;};
                }
            }
                    // Vertical lines
            for(let n=0; n<3; n++){
                if( (boardArray[n] === boardArray[n+3])  &&  (boardArray[n] === boardArray[n+6]) ){
                    if(boardArray[n] === ''){continue;};

                    checkWinner(n);
                }  
                else{
                    if(turn == 9){checkDrawCount();}
                    else{continue;};
                }

            }
                    // Diagonal lines
            if( ((boardArray[0] === boardArray[4]) && (boardArray[0] === boardArray[8])) 
                || (boardArray[2] === boardArray[4]) && (boardArray[2] === boardArray[6])){
                    if(boardArray[4] != ''){checkWinner(4);};
                }
            else{
                if(turn == 9){checkDrawCount();}
            }

            function checkDrawCount(){
                draw++; 
                if(draw === 3){
                    finishDraw();
                    draw = 0;
                }
            }


                // Finish game and start new round if draw
        
            function finishDraw(){
                displayDrawGame();
                clearGrid();
                activateGameboard();
                playRound();
            }

                // Check who won           
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
                if (this.winner.score == wins){
                    displayGameWon(this.text);
                }
                else{                    
                    displayWinnerMessage(this.text);

                }

                    // Clear grid and enable disabled files
                clearGrid();
                activateGameboard();
                playRound();
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

            function displayGameWon(name){

                const winGame = document.getElementById('winGame');
                const winGameText = document.getElementById('winGameText');

                winGame.style.display = 'block';
                winGameText.innerHTML = `The winner is: ${name}! <br> Congratulations!`;

                    // Set button functions
                const rematchBtn = document.getElementById('rematchBtn');
                const newGameBtn = document.getElementById('newGameBtn');

                rematchBtn.onclick = () => rematch();
                newGameBtn.onclick = () => newGame();

                function rematch(){
                    restartScore();
                    playRound();
                }

                function newGame(){
                    restartScore();
                    openForm();
                }

                function restartScore(){
                    firstPlayer.score = 0;
                    secondPlayer.score = 0;
                    setScoreDisplay();
                    winGame.style.display = 'none';
                }


            }

            function displayWinnerMessage(name){
                let textDisplay = `${name} won this game!`;
                displayMessage(textDisplay);
            }

            function displayDrawGame(){
                let textDisplay = `It's a draw!`;
                displayMessage(textDisplay);
            }


            function displayMessage(textDisplay){
                const winSingleMatch = document.getElementById('winSingleMatch');
                winSingleMatch.innerHTML = textDisplay;
                winSingleMatch.style.display = 'block';

                // Remove 'Display winner message' after 2 seconds
                function removeDisplay(){
                    winSingleMatch.style.display = 'none';
                }

                setTimeout(function(){removeDisplay();}, 2000);
            }
        }
    }
}






