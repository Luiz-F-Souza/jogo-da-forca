const validarEtapa = (vidasEsperadas, palavraEsperada, letrasChutadasEsperadas, estadoEsperado, jogoForca) => {

    jogoForca.mascarandoPalavra() // add pq meu código depende deste método sendo chamado.

    const { vidas, palavra: arrPalavra, letrasChutadas: arrLetrasChutadas } = jogoForca.buscarDadosDoJogo();
    const palavra = arrPalavra.join('');
    const letrasChutadas = arrLetrasChutadas.join('');
    const estado = jogoForca.buscarEstado();

    
    return vidas === vidasEsperadas
        && palavra === palavraEsperada
        && letrasChutadas === letrasChutadasEsperadas
        && estado === estadoEsperado;
}

module.exports = validarEtapa;