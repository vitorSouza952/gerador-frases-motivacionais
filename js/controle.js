const frase = document.querySelector("#frase");
const botaoGerar = document.querySelector("#botao-gerar");
const caixaModal = document.querySelector("#caixa-modal");
const modal = document.querySelector("#modal");
const msgModal = document.querySelector("#msg-modal");
const botaoFecharModal = document.querySelector("#botao-fechar-modal");
const anoAtual = document.querySelector("#ano-atual");

const frases = [
  "Só há felicidade se não exigirmos nada do amanhã e aceitarmos do hoje, com gratidão, o que nos trouxer. A hora mágica chega sempre. - Hermann Hesse",
  "Quando seu coração está pleno de gratidão, qualquer porta aparentemente fechada pode ser uma abertura para uma bênção maior. - Osho",
  "Sucesso é um esporte coletivo. Demonstre gratidão a todos os que colaboram com suas vitórias. - Carlos Hilsdorf",
];

const alternarModal = (msg) => {
  [caixaModal, modal].forEach((el) => el.classList.toggle("ativo"));
  if (msg) msgModal.innerText = msg;
  else setTimeout(() => (msgModal.innerText = ""), 300);
};

document.addEventListener("DOMContentLoaded", () => {
  const dataAtual = new Date();
  anoAtual.innerText = dataAtual.getFullYear();
});

document.addEventListener("click", (e) => {
  const elAlvo = e.target;
  if (elAlvo === caixaModal) alternarModal(null);
});

document.addEventListener("keydown", (e) => {
  const teclaPressionada = e.key;

  if (teclaPressionada === "Escape" && caixaModal.classList.contains("ativo"))
    alternarModal(null);
});

frase.addEventListener("click", (e) => {
  const elAlvo = e.target;
  const textoElAlvo = elAlvo.innerText;

  if (textoElAlvo !== "Frase vai aqui...") {
    const faixa = document.createRange();
    const selecao = window.getSelection();
    faixa.selectNodeContents(elAlvo);
    selecao.removeAllRanges();
    selecao.addRange(faixa);

    navigator.clipboard
      .writeText(textoElAlvo)
      .then(() => alternarModal("Frase copiada para a área de transferência!"))
      .catch((err) => console.error("Erro ao copiar frase: ", err));
  } else {
    alternarModal("Erro: Gere uma frase para então copiá-la!");
  }
});

botaoGerar.addEventListener("click", () => {
  const numAleatorio = Math.floor(Math.random() * frases.length);
  const fraseGerada = frases[numAleatorio];
  frase.innerText = fraseGerada;
});

botaoFecharModal.addEventListener("click", () => alternarModal(null));
