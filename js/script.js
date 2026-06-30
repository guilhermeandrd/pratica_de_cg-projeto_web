const responseField = document.getElementById('responseField');
const responseInput = document.getElementById('response');
const buttonVerify = document.getElementById('buttonVerify');
const obj = document.getElementById('obj');             
const transObj = document.getElementById('transObj');   
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

const tentativasDisplay = document.querySelector('#trys h2');

const modalOverlay = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');
let modalCallback = null; 

let faseAtual = 1;
let numeroTentativas = 0;

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


function showModal(title, message, callback) {
    if (!modalOverlay) return;
    
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    modalCallback = callback;
    
    modalOverlay.style.display = 'flex';
    modalOverlay.classList.remove('hidden');
}

if (modalBtn) {
    modalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        modalOverlay.classList.add('hidden');
        
        if (modalCallback) {
            modalCallback();
        }
    });
}

if(modalOverlay) {
    modalOverlay.style.display = 'none';
}


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


function atualizarTentativas() {
    if (tentativasDisplay) {
        tentativasDisplay.innerText = `Tentativas: ${numeroTentativas}`;
    }
}


function carregarFase(numeroFase) {
    if (!niveis[numeroFase]) return;
    
    faseAtual = numeroFase;
    const config = niveis[faseAtual];
    
    if (obj) obj.style.transform = "none";
    
    if (responseInput) responseInput.value = "";
    
    numeroTentativas = 0;
    atualizarTentativas();
    
    if (transObj) transObj.style.transform = config.alvoCSS;
    
    const navTitle = document.querySelector('#navBar h1');
    if(navTitle) navTitle.innerText = `Move-on - Fase ${faseAtual}`;
}

if (dropdownLinks) {
    dropdownLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            carregarFase(index + 1);
        });
    });
}


if (buttonVerify) {
    buttonVerify.addEventListener("click", () => {
        numeroTentativas++;
        atualizarTentativas();

        const respostaJogador = responseInput.value.trim();
        const config = niveis[faseAtual];
        
        if(respostaJogador === config.respostaCorreta){
            obj.style.transform = respostaJogador;
            
            setTimeout(() => {
                showModal("EXCELENTE!", `Acertou em ${numeroTentativas} tentativa(s)! A preparar a próxima fase...`, () => {
                    if(niveis[faseAtual + 1]) {
                        carregarFase(faseAtual + 1);
                    } else {
                        showModal("PARABÉNS!", "Concluiu todas as transformações geométricas com sucesso!", () => {});
                    }
                });
            }, 600);
            
        } else {
            obj.style.transform = respostaJogador;
            
            setTimeout(() => {
                showModal("OPS...", "Transformação incorreta. Veja para onde o objeto foi e tente novamente!", () => {
                    obj.style.transform = "none";
                });
            }, 600);
        }
    });
}

carregarFase(1);