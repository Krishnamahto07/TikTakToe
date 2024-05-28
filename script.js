let playerInfo = document.querySelector('.info');
let box = document.querySelectorAll('.child-box');
let newGamebtn = document.querySelector('.btn')

let gameGrid;
let currentPlayer;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const initGame = () =>{
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];

    box.forEach((b,i) =>{
        b.innerText = "";
        b.style.pointerEvents = 'all'
    })
    playerInfo.innerText = `Current Player - ${currentPlayer}`;
    newGamebtn.classList.remove('active');

    for(let i=0;i<box.length;i++){
        if(box[i].classList.contains('win'))
            box[i].classList.remove('win');
        if(box[i].classList.contains('tied'))
            box[i].classList.remove('tied');
    }
}

initGame();


const swapPlayer = () =>{
    currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
    playerInfo.innerText = `Current Player - ${currentPlayer}`
}


const isGameOver = () =>{
    let ans = ""

    winningPositions.forEach((position) =>{
        if( ( gameGrid[position[0]] !== "" ||
            gameGrid[position[1]] !== "" ||
            gameGrid[position[2]] !== ""
        ) && 
        (gameGrid[position[0]] === gameGrid[position[1]] 
        && gameGrid[position[1]] == gameGrid[position[2]]))
        {
            if(gameGrid[position[0]] ==="X")
                ans = "X"
            else ans = "O";

            
            box[position[0]].classList.add("win");
            box[position[1]].classList.add("win");
            box[position[2]].classList.add("win");

            box.forEach((b)=>{
                b.style.pointerEvents = "none";
            })
        }
        
    })

    // if there is Winner 

    if(ans !== ""){
        playerInfo.innerText = "Winner is "+ans;
        newGamebtn.classList.add('active');
        return;
    }

    // if game Tied
    let count = 0;
    for(let i = 0;i<gameGrid.length;i++){
        if(gameGrid[i] !== ""){
            count+=1;
        }
    }

    if(count === 9){
        playerInfo.innerText = "Game Tied"
        newGamebtn.classList.add('active')
        box.forEach((b)=>{
            b.classList.add("tied")
        })
        return;
    }  
}
const clickHandler = (i) =>{
    if(box[i].innerText === ""){
        box[i].innerText = currentPlayer;
        gameGrid[i] = currentPlayer;
        swapPlayer();
        box[i].style.pointerEvents = 'none';
        isGameOver();
    }
    
}


box.forEach((b,index)=>{
    b.addEventListener('click',()=>{
        clickHandler(index);
    })
})
newGamebtn.addEventListener('click',initGame)