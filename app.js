let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset");
let newBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#message");
let turnO=true;//player X,player O

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,6],
    [6,7,8]
];

const resetGame=()=>{
    turnO=true;
    clicks=0;
    enableBtns();
    msgContainer.classList.add("hide");
}

const disableBtns=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
 
const enableBtns=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

let clicks=0;

boxes.forEach((box)=>{
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        clicks++;
        let isWinner=checkWinner();
        if(clicks==9 && !isWinner){
            draw();
        }

        checkWinner();
    });  
});

const draw=()=>{
    msg.innerText=`Oh!, It is a draw, try again`;
    msgContainer.classList.remove("hide");
    disableBtns();

}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
}
const checkWinner=()=>{
    for(let patterns of winPatterns){
        let pos1val=boxes[patterns[0]].innerText;
        let pos2val=boxes[patterns[1]].innerText;
        let pos3val=boxes[patterns[2]].innerText;

        if(pos1val!=0||pos2val!=0||pos3val!=0){
            if(pos1val==pos2val&&pos2val==pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);