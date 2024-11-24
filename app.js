const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio')
const playBtn = document.getElementById('play-btn')

// Configuration steps
let diff = document.getElementById('config-difficulty')
let theme = document.getElementById('config-theme')
let backg = document.getElementById('config-backg')
let char = document.getElementById('config-char')

let title = document.querySelector('h1')
let config = document.getElementById('config')
let configTitle = document.getElementById('config-title')
let game = document.getElementById('game')

const playerSpeed = 35
let beyonceSpeed = 2

let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

/**
 * This function shows the initially hidden game
 */
function showGame() {
    game.style.display = 'block'

    // Hiding the configuration section
    config.style.display = 'none'
    configTitle.style.display = 'none'
    playBtn.style.display = 'none'
    playBtn.disabled = true
}

/**
 * 'Difficulty' configuration
 */
function goTheme(difficulty) {
    // Hiding the difficulty configuration window
    diff.style.display = 'none'

    // Showing the theme configuration
    theme.style.display = 'flex'
    theme.style.flexDirection = 'column'

    // Applying the difficulty
    if (difficulty == 'hard') { beyonceSpeed = 3 }
}

/**
 * 'Theme' configuration
 */
function goBackground(myTheme) {
    // Hiding the theme configuration window
    theme.style.display = 'none'

    // Showing the background configuration
    backg.style.display = 'flex'
    backg.style.flexDirection = 'column'

    // Applying the theme
    if (myTheme == 'dark') {
        title.style.color = 'white'
        configTitle.style.color = 'white'
        config.style.border = '5px solid white'
        config.style.backgroundColor = '#b5b3b2'

        document.body.style.backgroundColor = '#3d3d3d'
    }
}

/**
 * 'Background' configuration
 */
function goCharacter(background) {
    // Hiding the background configuration window
    backg.style.display = 'none'

    // Showing the character configuration
    char.style.display = 'flex'
    char.style.flexDirection = 'column'

    // Applying the background
    switch(background) {
        case 'grass':
            gameArea.style.backgroundImage = 'url(graphics/grass_back.webp)'
            break
        case 'dirt':
            gameArea.style.backgroundImage = 'url(graphics/dirt_back.webp)'
            break
        case 'lava':
            gameArea.style.backgroundImage = 'url(graphics/lava_back.webp)'
            break
        case 'water':
            gameArea.style.backgroundImage = 'url(graphics/water_back.webp)'
            break
    }
}

/**
 * 'Character' configuration;
 * Enabling the play button
 */
function enablePlay(character) {
    // Applying the character
    switch (character) {
        case 'steve':
            player.style.backgroundImage = 'url(graphics/_steve.png)'
            break
        case 'alex':
            player.style.backgroundImage = 'url(graphics/_alex.jpg)'
            break
        case 'creeper':
            player.style.backgroundImage = 'url(graphics/_creeper.png)'
            break
        case 'pig':
            player.style.backgroundImage = 'url(graphics/_pig.png)'
            break
    }

    // Enabling the play button
    playBtn.disabled = false;
}

/**
 * This function detects if Beyoncé has caught you
 */
function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 50 && deltaY <= 50) {
        if(confirm('Beyoncé has caught you! Quick, thank her to save your life')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
        } else {
            alert('You lost :(')
            isPlaying = false
            audio.pause()
        }
    }
}

function gameLoop () {
    moveBeyonce()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision()
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 25) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition()
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

window.addEventListener('keydown', movePlayer)
playBtn.addEventListener('click', () => {
    audio.play()
    gameLoop()
})