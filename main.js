
// (métodos chutar, buscarEstado e buscarDadosDoJogo) (MANTIDOS E FUNCIONANDO)


//O jogo deve iniciar com 6 vidas (OOK)
// O jogo deve iniciar com o estado aguardando chute. (OOK)
// Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado. (OOK)
// Caso a letra chutada esteja errada mas já foi chutada anteriormente a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado. (OOK)
// Toda chamada ao método chutar deve registrar a letra em letrasChutadas  (OOK)
// Se a letra chutada não estiver contida na palavra, deve subtrair uma vida (OOK)
// Se a letra chutada estiver contida na palavra, deve ser substituida na "palavra" em sua respectiva posição. Ex.: A palavra secreta é "bala" e o jogador chutou a letra "b", então a palavra que é retornada no método buscarDadosDoJogo, deve ser ["b", "", "", "_" ].  (OOK)
// Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para perdeu. (OOK)
// Caso a quantidade de vidas seja maior que zero e o jogador acerte a última letra, o estado do jogo deve mudar para ganhou. (OOK)
import secretWords from './api/words.json' assert{type: 'json'}

(function Forca(){

// JSON THAT CONTAINS ALL WORDS INFO


// GETTING ALL ELEMNTS NEEDED FROM DOCUMENT
const categoryEl = document.querySelector('.category') // where the category its placed
const wordEl = document.querySelector('.word-to-guess') // where the word to guess its placed
const tipEl = document.querySelector('.extra-tipe') // whre the extra tip its placed

const btnTip = document.querySelector('.btn--extra-tip') // btn that normaly its to make extraTip shows 

const keyBoard = document.querySelectorAll('.keyboard-letter') // getting all keyBoards letters

const hangManContainer = document.querySelector('.hangman') // the parent of the hangman

const body = document.querySelector('body') // document BODY

const letrasChutadas = []
//-----------------------------------------------------------------------------


//  WHERE ALL INFO ABOUT THE SECRETWORD WILL BE AFTER RUN initializingGame()
let secretWord = ''
let secretCategory = ''
let secretExtraTip = ''
let maskedSecretWord = []
//-----------------------------------------------------------------------------


// lifes remaining, it decreasses with the user error, if reaches 0 the gameover message will be displayed
let remainingLifes = 6

let gameState = "Aguardando chute" // initial state that was asked to create. it changes in buscarEstado() function. Can be 'ganhou' or 'perdeu'

// function asked to create that has the words already choosen, remainingLifes and the maskedSecretWord that with the correct guess 'hows the letter in the right position
function buscarDadosDoJogo(){
  return {
    letrasChutadas: letrasChutadas,
    vidas: remainingLifes,
    palavra: maskedSecretWord,
  }
}


// this is to ignore all word especial characters when comparing the inputed letter with the secretWord
function cleaningWords(wordToClean){
  wordToClean = wordToClean.replace(/[áàãâaÀÁÂÃ]/g,'A')
  .replace(/[éeÉêÊ]/g, 'E')
  .replace(/[íiÍ]/g,'I')
  .replace(/[óoôõÓÔÕ]/g, 'O')
  .replace(/[úuÚ]/g,'U')
  .replace(/[çÇ]/g,'C')

  return wordToClean

}

// as this game does not work with any cash and history this just reloads the page to reset the game (when lose or win, it will be setted to automaticaly reloads after 15s or right away if the user clicks on the 'reset btn')
function resetGame(){


  document.location.reload()


}


// this function was made to generate the secretword data, this only requires a json file as arg.
function generetingSecretWord(json){
  const randomNumber = Math.trunc(Math.random() * secretWords.length)

 
  const  data = secretWords[randomNumber]
  secretWord = data.word
  secretCategory = data.category
  secretExtraTip = data.tip
  

}

// this is to mask the secretWord. in order to always have the right number of '_'  this takes an empty arr and pushes one '_'  for every letter in the secretWord
// this takes 2 args, word to mask and arr to push. at the end it will return the joined arrToPushAndJoin 
function maskingSecretWord(wordToMask = secretWord, arrToPushAndJoin = maskedSecretWord){

  for(const i in wordToMask){
    maskedSecretWord.push('_')
  }

    return maskedSecretWord.join('')
}

// to initialize the game. Takes 03 args, the category, maskedWord, and tip (they all needs to be an html element that will recieve textContent)
// this calls for generetingSecretWord at the beginning and passes its side effects values as textContent to the args passed into the parent function
function initializingGame(category = categoryEl, maskedWord = wordEl, tip = tipEl){
  
  
  generetingSecretWord()
  

  category.textContent = secretCategory
  maskedWord.textContent = maskingSecretWord()
  tip.textContent = secretExtraTip

  

  
}

initializingGame()

// function to show the hangman's parts step by step. in the html the order that the parts got to appear its setted as classes that has 'hidden-' and some number, this takes these numbers and takes out the class thats responsable to keep it hidden. (the count its backwords)
// this takes 2 args, the lifes (to know wich part needs to be shown) and the parent container of the hangmans parts.
function showingHangmanParts(lifes, containerHangMan = hangManContainer){


for(const child of containerHangMan.children){
  child.classList.remove(`hidden-${lifes}`)
}


}


// function asked to create that checks if the user won or lost. the difference between win and lose its only at gameState, setting the backGround to green if won or red if lost, and the emoji that appears 🥳 or 😭
// this removes all keyboard eventListener to prevent the user to keeps playing. Change the textContent inside the tipButton to "reiniciar" and gives it a eventListener that calls resetGame right away.
// if the user does not click the reset btn the game will show a counter that starts in 15 and decreases seccond by seccond, when reaches 0 it calls resetGame
function buscarEstado(){

  gameState = remainingLifes > 0 ? 'ganhou' : 'perdeu'

  body.style.background =  gameState === 'ganhou' ? 'green' : 'red'

  keyBoard.forEach(key =>{
  
    key.removeEventListener('click',click)
    
  })

  btnTip.textContent = "REINICIAR"
  
  wordEl.textContent = secretWord.toUpperCase()

  let seccondsLeft = 15
  tipEl.textContent = `Você ${gameState} o Jogo ${remainingLifes > 0 ? '🥳🎉🥳' : '😭😭😭'} Clique em reiniciar ou aguarde ${seccondsLeft}`

  setInterval(() => {
    seccondsLeft -=1
    tipEl.textContent = `Você ${gameState} o Jogo ${remainingLifes > 0 ? '🥳🎉🥳' : '😭😭😭'} Clique em reiniciar ou aguarde ${seccondsLeft}`
  }, 1000);

  tipEl.classList.remove('hidden')
  

  btnTip.addEventListener('click', resetGame)
  
  setTimeout(resetGame, 15000)

}


// function asked to creat that checks if the inputed letter (letra) has only 1 char and if it matches or not to some letter inside secretWord
// it recieves a letter (letra) to check; 
// a keyOfKeyboard (to change its color to green or red, depending if its right or wrong); 
// a wordToCheck thats the secretWord it self; 
// a maskedWordToReplace thats responsable to recieve the letter if it matches to some in wordToCheck  and keep the others that were not found yet as '_'; 
// an elToChangeValue thats an html element. it is the one thats beeing displayed to the user as the word to guess;
// a guessedRight that starts as false. it is responsable to check if at least 1 letter was found, if true then its value changes and the remainingLifes will not be decreased.
function chutar(letra, keyOfKeyboard, wordToCheck = secretWord, maskedWordToReplace = maskedSecretWord, elToChangeValue = wordEl, guessedRight = false){

  
  if(letra.length != 1) return alert('por favor insira 1 unica letra.') // it returns if the input its higher or lower than 1char


  const wordToCheckCleaned = cleaningWords(wordToCheck).toUpperCase()  // this cleans the word to check to not have any especial chars mistake and set it to uppercase
  letra = cleaningWords(letra).toUpperCase() // the same as before but on the typed letter

  
  // the comparison its made here by checking if the typed letter its equal to each one of the letters present in the secret word
  for(const i in wordToCheckCleaned){
    if(letra === wordToCheckCleaned[i]){

     maskedWordToReplace[i] = secretWord[i].toUpperCase() // used the untouched secretWord to keep especials chars if there was any 
     guessedRight = true
     keyOfKeyboard.style.background = 'green' // sets the background of the pressed key to green to show that its already been clicked
     if(!maskedSecretWord.includes('_')) return buscarEstado() // if the maskedWord does not has any '_' it means that the word was guessed, so it calls buscarEstado() to finish and win the game

    }
  }

  elToChangeValue.textContent = maskedWordToReplace.join('') // just displaying the word with the guessed letters in their place.
  
  // enters if the state of guessedRight was not changed to true before.
  if(!guessedRight){
    
    showingHangmanParts(remainingLifes) // to show the hangman part needed
    remainingLifes-- // it decreases the remainingLifes by 1
    keyOfKeyboard.style.background = 'red' //set the background of the inputedLetter to red so the user knows that already pressed that letter
    if(remainingLifes === 0) return buscarEstado() // if it is 0 it means that the user has no more lifes and so it calls buscatEstado() to finish and lose the game
    
  }
  

  guessedRight = false // to return guessedRight back to false
  letrasChutadas.push(letra) // arr asked to create that contains all the letters that were inputed.
  buscarDadosDoJogo() // function asked to create that holds some values. 
  
}

//function to show an extra tip (it costs a life)
btnTip.addEventListener('click',e =>{
  
  if(tipEl.classList.contains('hidden')){
    tipEl.classList.remove('hidden') //takes the hidden class away from the extra tip
    showingHangmanParts(remainingLifes) // to show the next hangman part
    remainingLifes-- 
    if(remainingLifes === 0) return buscarEstado()
  }
})

// called as function to then remove the eventListener to the key pressed
const click = function(e){
  
  chutar(e.target.textContent, e.path[0]) // it pass 2 args to chutar, the textContent of the key pressed and the path to latter change the backGround to green or red

  e.path[0].removeEventListener('click', click) // to remove its own eventListener and prevent double click on the same key
}


keyBoard.forEach(key =>{
  
  key.addEventListener('click',click)
  
  
})


})()



