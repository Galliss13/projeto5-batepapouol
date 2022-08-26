const mensagem = {from: "", to: "", text:"", time:"", type:"" }
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