// Adicionando DOM elements

// Factory Functions

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
            table[i][j] = [createBtn(document.querySelector('#cellBtn' + curBtn))];
            curBtn++;
        }
    }

}

function createBtn (dom)
{
    const domElement = dom;
    let activated = false;


    domElement.addEventListener('click', ()=>
    {
        if(!activated)
        {
            activated = true;
        }
    })
}


function createGameMaster()
{
    let curPlayer = 1;
    let player1Wins = 0;
    let player2Wins = 0;

    const changePlayer = () =>
    {
        curPlayer == 1 ? 2 : 1;
    }

    const player1Won = () => player1Wins++;
    const player2Won = () => player2Wins++;


}

//Criando objetos 
let game = createGameMaster();