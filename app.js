let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();//cria um numero aleatorio
let tentativas = 1;//inicializa a variavel tentativa com 1

function exibirTextoNaTela(tag, texto){//cria uma funcao para que seja exibido o texto na tela
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {//adiciona voz ao nosso texto
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//cria uma função para exibir as mensagens principais do game
function exibirMensasgemInicial(){
    exibirTextoNaTela('h1', 'JOGO DO NÚMERO SECRETO');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensasgemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'ACERTOU!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite){//se a quantidade de elementos da lista chegar ao maximo a lista reseta.
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//limpa o campo sempre que o usuario faz uma tentativa
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//da vida ao botao novo jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensasgemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}