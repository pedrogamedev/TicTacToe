
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
        btn.disabled = false;
    }
    btn.addEventListener('click', ()=>
    {
        alert("helo world");
        game.startGame();
        btn.disabled = true;
    })

    return { enableStartBtn}
}


//GameMaster


function createGameMaster()
{
    //
    let table = createGameTable();

    // Setando variaveis
    let curPlayer = 1;
    let player1Wins = 0;
    let player2Wins = 0;

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
        player == 1 ? player1Wins++ : player2Wins;
        if(player1Wins == 5) { endGame(1) }
        else if (player2Wins == 5) { endGame(2) }
    }

    const startGame = () =>
    {
        table.startTable();
        table.startRound();
    }
    const endGame = (player) =>
    {
        alert("Congratulations player "+player+" for winning!");
        player1Wins = 0;
        player2Wins = 0;

        startBtn.enableStartBtn();
    }
    return {startRound, endRound, startGame, endGame};
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

    return { startTable, startTable, checkCells}
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
            game.changePlayer();
        }
    })
}


//Criando objetos 
let game = createGameMaster();
let startBtn = createStartBtn();