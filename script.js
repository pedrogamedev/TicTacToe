
/*  
    Neste projeto eu usei um conceito modular, onde somente o createGameMaster
    cuida do game, com excecao do botao que eh necessario para comecar o game
    
    Codex:

    GameMaster: responsavel por criar os objetos do jogo e
    cuida do estado do jogo
    
    GameTable: Cuida da posicao dos objetos no jogo da velha
    e a sua checagem

    StartBtn: botao usado para comecar o game

    Player control: cuida das vitorias dos players, o visual,
    e o texto de player wins
*/

/*--- Factory Functions ---*/

function createStartBtn()
{
    let btn = document.getElementById("startBtn");

    const enableStartBtn = () =>
    {
        btn.disabled = true;
        btn.innerHTML = "start!";
    }
    btn.addEventListener('click', ()=>
    {
        alert("helo world");
        btn.disabled = true;
        btn.innerHTML = "...";
        game.startGame();
    })

    return {enableStartBtn}
}


//GameMaster


function createGameMaster()
{
    //
    let table = createGameTable();
    let playerControl = createPlayerControl();

    // Comando para mudar o player a cada Jogada
    
    const startRound = () =>
    {
        table.restartTable();
    }
    const updateRound = () =>
    {
        playerControl.changePlayer();
        playerControl.updateText();

        let player = table.checkCells();
        
        if(player != null)
        {
            endRound(player);
        }
    }
    const endRound = (player) =>
    {
        playerWon = playerControl.updateWins(player);

        table.restartTable();
        if(playerWon)
        {
            endGame(player)
        }
    }

    const startGame = () =>
    {
        table.startTable();
        startRound();
    }
    const endGame = (player) =>
    {
        alert("Congratulations player "+player+" for winning!");
        playerControl.resetStats();
        startBtn.enableStartBtn();
    }
    return {startRound, updateRound, startGame, endGame, playerControl};
}

// esse daq ta modular
function createPlayerControl()
{
    //player 1 and 2 number of wins

    let currentPlayer = 1;
    let oneWins = 0;
    let twoWins = 0;

    const playerText = document.getElementById('currentPlayer');

    const changePlayer = () =>
    {
        currentPlayer = currentPlayer == 1 ? 2 : 1;
    }

    const CurrentPlayer = () =>
    {
        return currentPlayer;
    }
    const resetStats = () =>
    {
        currentPlayer = 1;
        oneWins = 0;
        twoWins = 0;
    }

    const updateWins = (player) =>
    {
        player == 1 ? oneWins++ : twoWins++;
        if(oneWins >= 5 || twoWins >= 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    const updateText = () =>
    {
        playerText.innerHTML = "Player " + currentPlayer;
    }
    
    return {oneWins, twoWins, resetStats, updateWins,updateText, changePlayer, CurrentPlayer}
}

//GameTable

function createGameTable()
{
    let table = [];
    let curBtn = 1;

    //inicializacao de matriz que vai servir p checagem do game
    //aqui tambem sao inicializados os botoes

    for(let i = 0; i<3; i++)
    {
        table[i] = [];
        for(let j = 0; j<3; j++)
        {
            btn = document.getElementById('cellBtn'+curBtn);
            btn.disabled = true;
            table[i][j] = createCellBtn(btn);
            curBtn++;
        }
    }

    const startTable = () =>
    {
        curBtn = 1;
        for(i = 0; i<9; i++)
        {
            btn = document.getElementById('cellBtn' + curBtn);
            btn.disabled = false;
            curBtn++;
        }
    }

    const restartTable = () =>
    {
        curBtn = 1;
        for(i = 0; i<9; i++)
        {
            btn = document.getElementById('cellBtn' + curBtn);
            btn.activated = false;
            curBtn++;
        }
    }


    // refazer esse codigo
    const checkCells = () =>
    {
        for(i = 0;i<3; i++)
        {
            if(table[i][0] != 0 && table[i][0].CurrentPlayer() == table[i][1].CurrentPlayer() == table[i][2].CurrentPlayer())
            {
                return table[i][0].CurrentPlayer();
            }
        }
        for(i = 0;i<3; i++)
        {
            if(table[0][i] != 0 && table[0][i].CurrentPlayer() == table[1][i].CurrentPlayer() == table[2][i].CurrentPlayer())
            {
                return table[0][i].CurrentPlayer();
            }
        }
        if(table[i][i] != 0 && (table[0][0].CurrentPlayer() == table[1][1].CurrentPlayer() == table[2][2].CurrentPlayer() ||
        table[0][2].CurrentPlayer() == table[1][1].CurrentPlayer() == table[2][0].CurrentPlayer()))
        {
            return table[1][1].CurrentPlayer();
        }
        return null;
    }

    return {startTable, restartTable, checkCells}
}


//CellBtn


function createCellBtn (dom)
{
    const domElement = dom;
    let activated = false;
    let player = 0;


    domElement.addEventListener('click', ()=>
    {
        if(!activated)
        {
            player = game.playerControl.CurrentPlayer();
            domElement.classList.add("activated", "markedBtn"+player);
            game.updateRound();
            activated = true;
        }
    })

    const CurrentPlayer = () => { return player}

    return {CurrentPlayer}
}

//Criando objetos 
let game = createGameMaster();
let startBtn = createStartBtn();