let startBtn = document.querySelector('.start-btn')
let rps = []
let bot = Math.floor( Math.random()*3 )
let container = document.querySelector('#container')

function renderGame() {
    container.attributes[2].nodeValue = "visibility: visible;"
    startBtn.remove()
    reStart()
}

function reStart() {
    let restart = document.createElement('button')
    restart.innerHTML = "REFRESH"
    document.querySelector('.game').appendChild(restart)
    restart.setAttribute('class', 'start-btn')
    restart.setAttribute('onclick', 'location.reload()')
}


function selectedCard(yourChoice) {
    // console.log(yourChoice.alt)
    let userChoice, botChoice
    userChoice = yourChoice.alt // name of userChoice
    botChoice = cardChoice()
    // console.log(userChoice , botChoice);
    let result = winner(userChoice, botChoice) // points [1,0]
    console.log(result);
    let message = finalMsg(result) // message for the user
    console.log(message);
    rpsUiChange(userChoice, botChoice, message)
}

function cardChoice() {
    rps = ["Rock", "Paper", "Scissor"]
    for (let i = bot; i <= rps.length; i++){
        return rps[i]
    }
}

function winner(userChoice, botChoice) {
    let rpsStorage = {
        'Rock' : {'Scissor' : 1, 'Paper' : 0, 'Rock' : 0.5 },
        'Paper' : {'Scissor' : 0, 'Paper' : 0.5, 'Rock' : 1 },
        'Scissor' : {'Scissor' : 0.5, 'Paper' : 1, 'Rock' : 0 }
    }
    let yourScore = rpsStorage[userChoice] [botChoice]
    let botScore = rpsStorage[botChoice] [userChoice]

    return [yourScore, botScore]
}

function finalMsg([yourScore, botScore]) {
    if (yourScore === 0) {
        return {'message' : "You Lost 😵‍💫😵‍💫😵‍💫", 'color' : "red"}
    } else if (yourScore === 0.5) {
        return {'message' : "Tie 🤝🤝🤝", 'color' : "grey"}
    } else {
        return {'message' : "You Won 🥳🥳🥳", 'color' : "green"}
    }
}

function rpsUiChange (userImgChoice, botImgChoice, finalMsgs) {
    let images = {
        'Rock' : document.getElementById('rock').src,
        'Paper' : document.getElementById('paper').src,
        'Scissor' : document.getElementById('scissor').src
    }
    console.log(finalMsgs);
    // remove all the images
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    let userDiv = document.createElement('div')
    let botDiv = document.createElement('div')
    let msgDiv = document.createElement('div')

    userDiv.innerHTML = "<img src='" + images[userImgChoice] + "'>"
    msgDiv.innerHTML = "<h1 style='color:" +finalMsgs['color'] + ";'>" + finalMsgs['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + images[botImgChoice] + "'>"

    document.getElementById('cards').appendChild(userDiv)
    document.getElementById('cards').appendChild(msgDiv)
    document.getElementById('cards').appendChild(botDiv)
}