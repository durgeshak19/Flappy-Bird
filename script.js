document.addEventListener('DOMContentLoaded',()=>{
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 300
    let birdBottom = 300
    let gravity = 3
    let isGameOver = false
    let gap = 400
    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft +'px'
    }
    let gameTimerId = setInterval(startGame,20)
    
    function control(e) {
        if(e.keyCode === 38){
            jump()
        }
    }
    function jump() {
        if(birdBottom <480)
        {
            let i=0
            while(i<10)
            {
                i++
                birdBottom += 5
                bird.style.bottom = birdBottom +'px'
            }
        }   
        console.log(birdBottom)
    }

    document.addEventListener('keyup',control) 

    function generateObstacle() {
        let obstacleLeft = 1300
        let randomHeight = Math.random()*320

        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
 
        if(!isGameOver){
            obstacle.classList.add('obstacle')
            obstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + 'px'
        
        // obstacle.style.top = "260px"
        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft +'px'
            if(obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
        }
        /////////////////////////    
            if( obstacleLeft > 200 && obstacleLeft<280 
                && birdLeft == 320 ||
                birdBottom < obstacleBottom + 150||
                birdBottom == 0){
                    gameOver()
                    clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle,20)
        if(!isGameOver) setTimeout(generateObstacle,3000)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup',control)
    }
})