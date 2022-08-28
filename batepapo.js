const mensagem = {from: "", to: "", text:"", time:"", type:"" }
let nickname = {name: prompt("Digite seu nome:")}

function entrarSala(nome) {
    const envioNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome)
    envioNome.then (addName)
    envioNome.catch (repairName)
    function addName(acerto) {
        console.log(acerto)
        mensagem.from = nome
    }
    function repairName(erro) {
        console.log("Status code: " + erro.response.status);
        if (erro.response.status === 400) {
            alert("Nome já utilizado.")
            nickname = {name: prompt("Digite seu nome:")}
            entrarSala(nickname)
        }
    }
}

entrarSala(nickname)

//MANTER CONEXÃO AO SERVIDOR
function manterConexao(nickname) {
    const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickname)
    status.then(statusOK)
    status.catch(statusNOTOK)
    function statusOK(ok) {
        console.log(ok + "Deu certo");
    }
    function statusNOTOK(notok) {
        console.log("Status code: " + notok.response.status);
    }
}

setInterval(manterConexao, 1000000)

//RENDERIZAR MENSAGEM CONTINUAMENTE

function renderizarMensagens() {
    const mensagensPromessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    mensagensPromessa.then(recebidoOK)
    mensagensPromessa.catch(NOTrecebido)
    function recebidoOK(correto) {
        const localMensagens = document.querySelector(".areaMensagens")
        localMensagens.innerHTML = ""
        console.log(correto.data);
        for (let i = 0; i < correto.data.length; i++) {
            if (correto.data[i].type === 'status') {
                localMensagens.innerHTML = localMensagens.innerHTML + `<div class="mensagem status">
                <p>
                    <span class="time">(${correto.data[i].time})&nbsp</span>
                    <span class="from">${correto.data[i].from}&nbsp</span>
                    <span>${correto.data[i].text}</span>
                </p>
                </div>`
            } else if (correto.data[i].type === 'message') {
                localMensagens.innerHTML = localMensagens.innerHTML + `<div class="mensagem publico">
                <p>
                    <span class="time">(${correto.data[i].time})&nbsp</span>
                    <span class="from">${correto.data[i].from}&nbsp</span>
                    para
                    <span class="to">&nbsp${correto.data[i].to}:</span>
                    <span>&nbsp${correto.data[i].text}</span>
                </p>
                </div>`
            } else if (correto.data[i].type === 'private_message') {
                localMensagens.innerHTML = localMensagens.innerHTML + `<div class="mensagem reservado">
                <p>
                    <span class="time">(${correto.data[i].time})&nbsp</span>
                    <span class="from">${correto.data[i].from}&nbsp</span>
                    para
                    <span class="to">&nbsp${correto.data[i].to}:</span>
                    <span>&nbsp${correto.data[i].text}</span>
                </p>
                </div>`
            }
        }
        
    }
    function NOTrecebido(falha) {
        console.log("Status code: " + falha.response.status);
    }
}

setInterval(renderizarMensagens, 3000)



// sidebar
function sidebar() {
    const divsidebar = document.querySelector(".sidebar")
    const divoutsidebar = document.querySelector(".outsidebar")
    divsidebar.classList.remove("hidden")
    divoutsidebar.classList.remove("hidden")
}

function sairSidebar() {
    const divoutsidebar = document.querySelector(".outsidebar")
    const divsidebar = document.querySelector(".sidebar")
    if (divoutsidebar.classList.contains("hidden") === false) {
        divoutsidebar.classList.add("hidden")
        divsidebar.classList.add("hidden")
    }
}

function contatoSelecionado(selecionado) {
    let checks = document.querySelectorAll(".contato > .check")

    for (let i = 0; i < checks.length; i++) {
        checks[i].classList.add("contato-notchosen")
    }
    selecionado.children[1].classList.remove("contato-notchosen")
}

function visibilidadeSelecionada (selecionado) {
    let checks = document.querySelectorAll(".visibilidade > .check")

    for (let i = 0; i < checks.length; i++) {
        checks[i].classList.add("visibilidade-notchosen")
    }
    selecionado.children[1].classList.remove("visibilidade-notchosen")
}