



const palavraSecreta = 'abacaxi';
const jogoForca = new Forca(palavraSecreta);

let estadosEstaoCorretos = validarEtapa(6, '_______', '', 'aguardando chute', jogoForca);

['a', 'b', 'c', 'x', 'i'].forEach((letra) => jogoForca.chutar(letra));

estadosEstaoCorretos = estadosEstaoCorretos && validarEtapa(6, 'abacaxi', 'abcxi', 'ganhou', jogoForca);
const mensagemFinal =  estadosEstaoCorretos == true ? "Regras validadas com sucesso" :
"Parece que algo está errado, verique suas regras";
console.log(mensagemFinal);





const caminhoFeliz = function(secretWord, chutar){

  secretWord.forEach(letra => chutar(letra))
}