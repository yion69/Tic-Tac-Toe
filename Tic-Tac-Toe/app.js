const button = document.querySelectorAll('.box');
const clear = document.querySelector('.switch #clear');
const messageBox = document.querySelector('.message');
var playerTurn = true;
let count = 0;

button.forEach((element)=>{
    element.addEventListener("click",function(e){
        const alreadyHasSpan = element.querySelector("span") !== null;
        if(!alreadyHasSpan){

            if(playerTurn) {
                var span = document.createElement('span');
                element.appendChild(span);
                span.innerHTML = '&#10005;';
                span.classList.add('span')
                playerTurn = false;
                count += 1;
            }
            else {
                var span = document.createElement('span');
                element.appendChild(span);
                span.innerHTML = '&#9711;';
                span.classList.add('span')
                playerTurn = true;
                count += 1;
            }

            if(count == 9){
                message();
                draw();
                count=1;
            }
            winChecker();
        }
    })
})

clear.addEventListener("click",function(e){
    for(var i=0; i<button.length;i++){
        playerTurn = true;
        button[i].innerText = '';
        count = 1;
    }
})

const winChecker = () => {
    let winningPattern = [
        [0, 1, 2],
        [0, 3, 6],
        [2, 5, 8],
        [6, 7, 8],
        [3, 4, 5],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for(let i of winningPattern) {
        let [element1,element2,element3] = [
            button[i[0]].innerText,
            button[i[1]].innerText,
            button[i[2]].innerText,
        ];
        if(element1!=''&&element2!=''&&element3!=''){
            if(element1==element2 && element2==element3){
                win(element1);
                message();
            }
        }
    }
}
const draw = () => {
    winText.innerHTML = "&#10005; &#9711; <br> Draws";
}
const message = () => {
    messageBox.style.display = 'block';
}

const btn = document.querySelector('.cancel');
btn.addEventListener('click',function(e){
    messageBox.style.display = 'none';
    reset();
})  

const winText = document.querySelector('.text');
const win = (letter) => {
    if(letter == "✕"){
        winText.innerHTML = "&#10005; <br><br> 'X' Wins";
    } 
    else if(letter == "◯"){
        winText.innerHTML = "&#9711; <br><br> 'O' Wins";
    }
    count = 1;
}

const reset =  () => {
    playerTurn = true;
    for(var i=0; i<button.length;i++){
        button[i].innerText = '';
    }
}

const time = () => {
    var getMilli = performance.now() - startTime;
    var second = Math.floor((getMilli%(1000*60))/1000);
    var minute = Math.floor((getMilli/(1000*60)));

    return `${minute.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`;
}
let startTime = performance.now();
const getTime = document.querySelector('.switch');
const containerClear = document.querySelector('.resetTime');        
const paragraph = document.createElement('p');
paragraph.textContent = '00:00';
getTime.insertBefore(paragraph,containerClear);

const interval = setInterval(() => {
    paragraph.textContent = time();
},1);

containerClear.addEventListener('click',() =>{
    timeResetFunction();
})
const timeResetFunction = () => {
    startTime = performance.now();
    paragraph.textcontent = '00:00';
}
