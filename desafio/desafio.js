
const readline = require('readline-sync');
const Forca = require('./forca');



const jogo = new Forca('abacaxi');

jogo.mascarandoPalavra()

while (!["perdeu", "ganhou"].includes(jogo.buscarEstado())) {
    const chute = readline.question("Aguardando chute: \n");
    
    jogo.chutar(chute);
    console.log(jogo.buscarDadosDoJogo());
}

console.log("você " + jogo.buscarEstado());


// 1  cria uma new forca com a palavra desejada
// 2 verifica se há 'perdeu' ou 'ganhou' em jogo.buscarEstado()
// 3 pergunta qual o chute
// 4 fornece o chute digitado a jogo.chutar
// 5 mostra os dados contidos em jogo.buscar dados do jogo
// 6 pega o return de jogo.buscarEstado() e da como frase se ganhou ou perdeu

