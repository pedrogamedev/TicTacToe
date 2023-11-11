
/*  Codex:

    GameMaster: responsavel por criar os objetos do jogo e
    cuida do estado do jogo
    
    GameTable: Cuida da posicao dos objetos no jogo da velha
    e a sua checagem
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

    return { enableStartBtn}
}


//GameMaster


function createGameMaster()
{
    //
    let table = createGameTable();
    let playerControl = createPlayerControl();

    // Setando variaveis
    let curPlayer = 1;

    // Comando para mudar o player a cada Jogada
    const changePlayer = () =>
    {
        curPlayer == 1 ? 2 : 1;
    }
    
    const startRound = () =>
    {
        table.restartTable();
    }
    const endRound = (player) =>
    {
        let temp = playerControl.updateWins(player);

        if(temp)
        {
            endGame(player);
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
        playerControl.resetWins();
        startBtn.enableStartBtn();
    }
    return {startRound, endRound, startGame, endGame, changePlayer};
}

function createPlayerControl()
{
    //player 1 and 2 number of wins



    let oneWins = 0;
    let twoWins = 0;

    const playerText = document.getElementById('currentPlayer');

    const resetWins = () =>
    {
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

    const updateText = (player) =>
    {
        
    }
    


    return { oneWins, twoWins, resetWins, updateWins}
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
            table[i][j] = [createCellBtn(btn)];
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
            curBtn;
        }
    }

    const checkCells = () =>
    {
        for(i = 0;i<3; i++)
        {
            if(table[i][0].player == table[i][1].player == table[i][2])
            {
                game.endRound(table[i][0].player);
                return;
            }
        }
        for(i = 0;i<3; i++)
        {
            if(table[0][j].player == table[1][j].player == table[2][j])
            {
                game.endRound(table[0][i].player);
                return;
            }
        }
        if(table[0][0].player == table[1][1].player == table[2][2].player ||
        table[0][2].player == table[1][1].player == table[2][0].player)
        {
            game.endRound(table[1][1].player);
            return;
        }
    }

    return { startTable, restartTable, checkCells}
}


//CellBtn


function createCellBtn (dom)
{
    const domElement = dom;
    let activated = false;
    player = 0;


    domElement.addEventListener('click', ()=>
    {
        if(!activated)
        {
            alert("hello i work");
            activated = true;
            player = game.curPlayer;
            domElement.classList.add("markedBtn");
            game.changePlayer();
        }
    })
}


//Criando objetos 
let game = createGameMaster();
let startBtn = createStartBtn();