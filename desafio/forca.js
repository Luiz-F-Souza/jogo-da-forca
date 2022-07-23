
// 1. O jogo deve iniciar com 6 vidas (OK)
// 2. O jogo deve iniciar com o estado `aguardando chute`. (OK)
// 3. Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado. (OK)
// 4. Caso a letra chutada esteja errada mas já foi chutada anteriormente a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado. (OK)
// 5. Toda chamada ao método chutar deve registrar a letra em letrasChutadas (OK)
// 6. Se a letra chutada não estiver contida na palavra, deve subtrair uma vida (OK)
// 7. Se a letra chutada estiver contida na palavra, deve ser substituida na "palavra" em sua respectiva posição. (OK)
// Ex.: A palavra secreta é "bala" e o jogador chutou a letra "b", então a palavra que é retornada no método buscarDadosDoJogo, deve ser ["b", "_", "_", "_" ]. (OK)
// 8. Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para `perdeu`. (OK)
// 9. Caso a quantidade de vidas seja maior que zero e o jogador acerte a última letra, o estado do jogo deve mudar para `ganhou`. (OK)



class Forca {


  constructor(palavraSecreta){
  
    
    this.palavraSecreta = palavraSecreta
    this.palavra = []
    this.palavraMascaradaMontada = false
    this.vidas = 6
    this.letrasChutadas = []
    this.estadoDoJogo = 'aguardando chute'
  }

  mascarandoPalavra(){
    if(!this.palavraMascaradaMontada){


      for(const i of this.palavraSecreta){
        this.palavra.push('_')
       }

       this.palavraMascaradaMontada = true

    }
  }
 


  chutar(letra) { 
    

    
    let {palavraSecreta, vidas, letrasChutadas, palavra, statusDoChute} = this
    
    

    if(letra.length != 1) return console.log('Jogada inválida. Por favor, digite 01 letra') 

   
    if(letrasChutadas.includes(letra)){
      return console.log("letra já jogada! por favor digite outra")
    }else{
      letrasChutadas.push(letra)
      this.letrasChutadas = letrasChutadas
    }

    
    
    let certoOuErrado = false
    for(const i in palavraSecreta){
      
      
      if(letra === palavraSecreta[i]){
        
        this.palavra[i] = letra
        certoOuErrado = true
        
      }

    }

   

    !certoOuErrado ? this.vidas = vidas -1 : ""
    if (!this.palavra.includes('_')) return this.estadoDoJogo = "ganhou"  
    if (this.vidas === 0) return this.estadoDoJogo = 'perdeu' 
    
  }



  buscarEstado() {
    

   
    return this.estadoDoJogo } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"



  buscarDadosDoJogo() {

    const {palavra, vidas, letrasChutadas} = this

    
      return {
          letrasChutadas, // Deve conter todas as letras chutadas
          vidas, // Quantidade de vidas restantes
          palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;


