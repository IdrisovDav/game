const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $result_header = document.querySelector('#result-header')
const $time_header = document.querySelector('#time-header')
const $result = document.querySelector('#result')
const $time = document.querySelector('#time')
const $game_time = document.querySelector('#game-time')
let score = 0
const $appResult = document.querySelector('.showListUser')

const $signUpBtn = document.querySelector('#signUpBtn') 
const $signUp = document.querySelector('#signUp')
const $formGroup = document.querySelector('.formGroup')
const $bodyGame = document.querySelector('.bodyGame')
const $exit = document.querySelector('#exit')
let userName = ''
let userInformation = {}
let userInformationList = []



$start.addEventListener('click',startGame)

function startGame(){
    $game_time.setAttribute('disabled','true')
    $time.textContent = $game_time.value
    score=0
    $start.classList.add('hide')
    $game.style.backgroundColor = 'white'
    createBox()
    timer()
    $result_header.classList.add('hide')
    $time_header.classList.remove('hide')
    $exit.classList.add('hide')
}

$game_time.addEventListener('input', setTime)

function setTime(){
    $time.textContent = $game_time.value
    $result_header.classList.add('hide')
    $time_header.classList.remove('hide')
}

function endGame(){
    $game.innerHTML=''
    $start.classList.remove('hide')
    $game.style.backgroundColor = '#ccc'
    $result_header.classList.remove('hide')
    $time_header.classList.add('hide')
    $result.textContent = score
    $game_time.removeAttribute('disabled')
    $exit.classList.remove('hide')
    userListActuale()
    showListActuale()
    
}

function userListActuale(){
    userInformation.name = userName
    userInformation.score = score
    userInformation.date = new Date().toLocaleString()
    userInformation.time = $game_time.value
    userInformationList.push(userInformation)
    let listJson = JSON.stringify(userInformationList)
    localStorage.setItem('list',listJson)
}

function userListActualeTest(){
    userInformation.name = 'dd'
    userInformation.score = 9
    userInformation.date = new Date().toLocaleString()
    userInformation.time = 5
    userInformationList.push(userInformation)
    let listJson = JSON.stringify(userInformationList)
    localStorage.setItem('list',listJson)
}

function showListActuale(){
    sortingUsers()
    $appResult.innerHTML = ''
    userInformationList.forEach(function(item){
        $appResult.insertAdjacentHTML('beforeend',`<div class="user"><h2>${item.name}</h2><h2>${item.score}</h2><h2>${item.date}</h2><h2>${item.time}</h2></div>`)
    })
}

function timer(){
    let $time = document.querySelector('#time')
    let interval = setInterval(function(){
        $time.textContent = (Number($time.textContent)-0.1).toFixed(1)
        if($time.textContent <= 0){
            clearInterval(interval)
            endGame()
        }
    },100)

}

$game.addEventListener('click', clickBox)
function clickBox(event){
    if(event.target.dataset.box){
        createBox()
        score++
    }
}

function createBox(){
    $game.innerHTML=''
    let box = document.createElement('div')
    let sizeBox = getRandom(30,100)
    let left = getRandom(0,300-sizeBox)
    let top = getRandom(0,300-sizeBox)
    box.style.width = box.style.height = sizeBox + 'px'
    box.style.backgroundColor = `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`
    box.style.position = 'absolute'
    box.style.left = left + 'px'
    box.style.top = top + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box',true)

    $game.insertAdjacentElement('afterbegin',box)

}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


$signUpBtn.addEventListener('click', function(){
    userInformationList = JSON.parse(localStorage.getItem('list'))
    showListActuale()
    if($signUp.value){
        console.log('YEs')
        $formGroup.classList.add('hide')
        $bodyGame.classList.remove('hide')
        userName = $signUp.value
    }else{
        console.log('NO')
        alert('Напишите свое имя!!!')
    }
})
$exit.addEventListener('click',function(){
    $formGroup.classList.remove('hide')
    $bodyGame.classList.add('hide')
    $exit.classList.add('hide')
})


function sortingUsers(arr){
    for (let i=0;i<arr.length;i++){
        for (let j = i;j <arr.length;j++){
            if(arr[j].score>arr[j+1].score){
                let swap = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = swap
            }
        }
    }
}