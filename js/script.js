// --- SELETORES GERAIS DO DOM ---
const responseField = document.getElementById('responseField');
const responseInput = document.getElementById('response'); // A textarea onde o utilizador escreve
const buttonVerify = document.getElementById('buttonVerify');
const obj = document.getElementById('obj');             // O objeto original
const transObj = document.getElementById('transObj');   // O fantasma alvo
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

// Seletor para o contador de tentativas (seleciona o <h2> dentro da div #trys)
const tentativasDisplay = document.querySelector('#trys h2');

// --- SELETORES DO POP-UP (MODAL) ---
const modalOverlay = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');
let modalCallback = null; // Função para executar após clicar em 'Continuar'

// --- VARIÁVEIS DE ESTADO DO JOGO ---
let faseAtual = 1;
let numeroTentativas = 0;

// --- DICIONÁRIO DE FASES ---
// Basta adicionar aqui novos níveis para expandir o jogo
const niveis = {
    1: {
        alvoCSS: "translate(150%, 100%)",
        respostaCorreta: "translate(150%, 100%)"
    },
    2: {
        alvoCSS: "scale(2, 0.5)",
        respostaCorreta: "scale(2, 0.5)"
    },
    3: {
        alvoCSS: "translate(100%, 0px) rotate(45deg)",
        respostaCorreta: "translate(100%, 0px) rotate(45deg)"
    }
};


// --- FUNÇÕES DO MODAL ---
function showModal(title, message, callback) {
    if (!modalOverlay) return;
    
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    modalCallback = callback;
    
    // Mostra o modal
    modalOverlay.style.display = 'flex';
    modalOverlay.classList.remove('hidden');
}

if (modalBtn) {
    modalBtn.addEventListener('click', () => {
        // Esconde o modal
        modalOverlay.style.display = 'none';
        modalOverlay.classList.add('hidden');
        
        // Executa a próxima ação (ex: mudar de fase)
        if (modalCallback) {
            modalCallback();
        }
    });
}

// Inicialmente esconde o modal quando o jogo carrega
if(modalOverlay) {
    modalOverlay.style.display = 'none';
}


// --- LÓGICA DE INTERFACE (Expansão da Caixa de Texto) ---
responseField.addEventListener("click", function (event){
    event.stopPropagation();
    responseField.style.width = "400px";
    responseField.style.height = "400px";
});

document.addEventListener("click", function(){
    if(responseField.style.width === "400px" && responseField.style.height === "400px"){
        responseField.style.width = "200px";
        responseField.style.height = "70px";
    }
});


// --- FUNÇÃO PARA ATUALIZAR TENTATIVAS ---
function atualizarTentativas() {
    if (tentativasDisplay) {
        tentativasDisplay.innerText = `Tentativas: ${numeroTentativas}`;
    }
}


// --- GERENCIADOR DE FASES ---
function carregarFase(numeroFase) {
    if (!niveis[numeroFase]) return; // Previne tentar carregar uma fase inexistente
    
    faseAtual = numeroFase;
    const config = niveis[faseAtual];
    
    // Devolve o jogador para a origem
    if (obj) obj.style.transform = "none";
    
    // Limpa a caixa de texto
    if (responseInput) responseInput.value = "";
    
    // Reinicia o contador de tentativas para a nova fase
    numeroTentativas = 0;
    atualizarTentativas();
    
    // Aplica o alvo (Fantasma) via JS
    if (transObj) transObj.style.transform = config.alvoCSS;
    
    // Atualiza o título no menu
    const navTitle = document.querySelector('#navBar h1');
    if(navTitle) navTitle.innerText = `Move-on - Fase ${faseAtual}`;
}

// Controla os cliques no menu "Fases" (Dropdown)
if (dropdownLinks) {
    dropdownLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            carregarFase(index + 1);
        });
    });
}


// --- LÓGICA PRINCIPAL DO JOGO ---
if (buttonVerify) {
    buttonVerify.addEventListener("click", () => {
        // Incrementa e atualiza o ecrã com o número de tentativas
        numeroTentativas++;
        atualizarTentativas();

        // Pega a resposta, limpando espaços acidentais no começo/fim (.trim())
        const respostaJogador = responseInput.value.trim();
        const config = niveis[faseAtual];
        
        if(respostaJogador === config.respostaCorreta){
            // Acertou: Move a peça original
            obj.style.transform = respostaJogador;
            
            // Aguarda 600ms para a animação CSS acontecer e depois mostra o Modal
            setTimeout(() => {
                showModal("EXCELENTE!", `Acertou em ${numeroTentativas} tentativa(s)! A preparar a próxima fase...`, () => {
                    // O que acontece quando clica em 'Continuar':
                    if(niveis[faseAtual + 1]) {
                        carregarFase(faseAtual + 1);
                    } else {
                        showModal("PARABÉNS!", "Concluiu todas as transformações geométricas com sucesso!", () => {});
                    }
                });
            }, 600);
            
        } else {
            // Errou: Aplica o movimento errado para o jogador ver o erro
            obj.style.transform = respostaJogador;
            
            setTimeout(() => {
                showModal("OPS...", "Transformação incorreta. Veja para onde o objeto foi e tente novamente!", () => {
                    // O que acontece quando clica em 'Continuar':
                    obj.style.transform = "none"; // Devolve o objeto à origem
                });
            }, 600);
        }
    });
}

// Inicia o jogo na Fase 1
carregarFase(1);