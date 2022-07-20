
// (métodos chutar, buscarEstado e buscarDadosDoJogo)


//O jogo deve iniciar com 6 vidas
// O jogo deve iniciar com o estado aguardando chute.
// Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado.
// Caso a letra chutada esteja errada mas já foi chutada anteriormente a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado.
// Toda chamada ao método chutar deve registrar a letra em letrasChutadas
// Se a letra chutada não estiver contida na palavra, deve subtrair uma vida
// Se a letra chutada estiver contida na palavra, deve ser substituida na "palavra" em sua respectiva posição. Ex.: A palavra secreta é "bala" e o jogador chutou a letra "b", então a palavra que é retornada no método buscarDadosDoJogo, deve ser ["b", "", "", "_" ].
// Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para perdeu.
// Caso a quantidade de vidas seja maior que zero e o jogador acerte a última letra, o estado do jogo deve mudar para ganhou.


// JSON THAT CONTAINS ALL WORDS INFO
import secretWords from '../api/words.json' assert{type: 'json'}


//GETTING ALL ELEMNTS NEEDED FROM DOCUMENT
const categoryEl = document.querySelector('.category')
const wordEl = document.querySelector('.word-to-guess')
const tipEl = document.querySelector('.extra-tipe')

const btnTip = document.querySelector('.btn--extra-tip')

const keyBoard = document.querySelectorAll('.keyboard-letter')

const hangManContainer = document.querySelector('.hangman')

const fullGameContainer = document.querySelector('.container--the-game')


// random secretWord All INFOS
let secretWord = ''
let secretCategory = ''
let secretExtraTip = ''
let maskedSecretWord = []


let remainingLifes = 6


// this is to ignore all word especial characters
function cleaningWords(wordToClean){
  wordToClean = wordToClean.replace(/[áàãâaÀÁÂÃ]/g,'A')
  .replace(/[éeÉ]/g, 'E')
  .replace(/[íiÍ]/g,'I')
  .replace(/[óoôõÓÔÕ]/g, 'O')
  .replace(/[úuÚ]/g,'U')
  .replace(/[çÇ]/g,'C')

  return wordToClean

}

function generetingSecretWord(json){
  const randomNumber = Math.trunc(Math.random() * secretWords.length)

 
  const  data = secretWords[randomNumber]
  secretWord = data.word
  secretCategory = data.category
  secretExtraTip = data.tip

}

function maskingSecretWord(wordToMask = secretWord, arrToPushAndJoin = maskedSecretWord){

  for(const i in wordToMask){
    maskedSecretWord.push('_')
  }

    return maskedSecretWord.join('')
}

function initialiingGame(category = categoryEl, maskedWord = wordEl, tip = tipEl){
  
  
  generetingSecretWord()
  

  category.textContent = secretCategory
  maskedWord.textContent = maskingSecretWord()
  tip.textContent = secretExtraTip

  
}

initialiingGame()

function showingHangmanParts(lifes, containerHangMan = hangManContainer){


for(const child of containerHangMan.children){
  child.classList.remove(`hidden-${lifes}`)
}


}



function gameOver(){

  keyBoard.forEach(key =>{
  
    key.removeEventListener('click',click)
    
  })

  btnTip.textContent = "REINICIAR"

  
  wordEl.textContent = secretWord.toUpperCase()

  let seccondsLeft = 15
  tipEl.textContent = `Você perdeu o Jogo 😭 Clique em reiniciar ou aguarde ${seccondsLeft}`

  setInterval(() => {
    seccondsLeft -=1
    tipEl.textContent = `Você perdeu o Jogo 😭 Clique em reiniciar ou aguarde ${seccondsLeft}`
  }, 1000);

  tipEl.classList.remove('hidden')
  

  btnTip.addEventListener('click', resetGame)
  
  setTimeout(resetGame, 15000)
}

function winTheGame(){
  
  keyBoard.forEach(key =>{
  
    key.removeEventListener('click',click)
    
    
  })


  btnTip.textContent = "REINICIAR"

  
  
  wordEl.textContent = secretWord.toUpperCase()

  let seccondsLeft = 15
  tipEl.textContent = `Você GANHOOU o Jogo 🎉🎉🎉🎉🎉 Clique em reiniciar ou aguarde ${seccondsLeft}`

  setInterval(() => {
    seccondsLeft -=1
    tipEl.textContent = `Você GANHOOU o Jogo 🎉🎉🎉🎉🎉 Clique em reiniciar ou aguarde ${seccondsLeft}`
  }, 1000);

  tipEl.classList.remove('hidden')
  

  btnTip.addEventListener('click', resetGame)
  
  setTimeout(resetGame, 15000)
}



function checkingGuess(inputedLetter, keyOfKeyboard, wordToCheck = secretWord, maskedWordToReplace = maskedSecretWord, elToChangeValue = wordEl, guessedRight = false){

  
  if(inputedLetter.length != 1) return console.log('por favor insira 1 unica letra. COLOCAR AVISO REAL DPS')

  const wordToCheckCleaned = cleaningWords(wordToCheck).toUpperCase()
  inputedLetter = cleaningWords(inputedLetter).toUpperCase()

  
  for(const i in wordToCheckCleaned){
    if(inputedLetter === wordToCheckCleaned[i]){

     maskedWordToReplace[i] = secretWord[i].toUpperCase() //to keep the especial chars if there was any
     guessedRight = true
     if(!maskedSecretWord.includes('_')) return winTheGame()

    }
  }

  elToChangeValue.textContent = maskedWordToReplace.join('')
  
  if(!guessedRight){
    
    showingHangmanParts(remainingLifes)
    remainingLifes--
    keyOfKeyboard.style.background = 'red'
    if(remainingLifes === 0) return gameOver()
    
  }
  

  guessedRight = false


  
}

function resetGame(){


    document.location.reload()

  
}


//colocar que custa 1 vida pra usar
btnTip.addEventListener('click',e =>{
  tipEl.classList.remove('hidden')
  btnTip.removeEventListener
})

const click = function(e){
  
  checkingGuess(e.target.textContent, e.path[0])

  e.path[0].removeEventListener('click', click)
}


keyBoard.forEach(key =>{
  
  key.addEventListener('click',click)
  
  
})





