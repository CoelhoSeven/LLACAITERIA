const numeroWhatsApp = "5527988451984";

// Verificar horário de atendimento (abre às 11h)
function verificarHorario() {
  const agora = new Date();
  const hora = agora.getHours();
  if (hora < 11) {
    alert('Nosso atendimento começa às 11h. Por favor, volte mais tarde.');
    return false;
  }
  return true;
}

function comprar(produto) {
  if (!verificarHorario()) return;

  // Copos redirecionam para complementos.html
  if (produto.startsWith('Copo')) {
    window.location.href = 'complementos.html';
    return;
  }
  // Açaí Puro abre o modal
  if (produto.includes('Açaí Puro')) {
    abrirModal(produto);
    return;
  }
  // Qualquer outro produto vai para o WhatsApp
  const mensagem = `Olá! Gostaria de fazer um pedido: ${produto}.`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

function abrirModal(produto) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("produtoSelecionado").value = produto;
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
  limparCampos();
}

function limparCampos() {
  document.getElementById("produtoSelecionado").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("referencia").value = "";
  document.getElementById("tipoResidencia").value = "nao";
  mostrarCamposAdicionais();
  document.getElementById("apto").value = "";
  document.getElementById("bloco").value = "";
  document.getElementById("quadra").value = "";
  document.getElementById("lote").value = "";
  document.getElementById("pagamento").value = "";
  document.getElementById("trocoSimNao").value = "nao";
  document.getElementById("valorTroco").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  toggleTrocoCampos(false);
  document.getElementById("trocoContainer").style.display = "none";
}

function mostrarCamposAdicionais() {
  const tipo = document.getElementById("tipoResidencia").value;
  const dados = document.getElementById("dadosAdicionais");
  dados.style.display = tipo === "sim" ? "block" : "none";
  if (tipo !== "sim") {
    document.getElementById("apto").value = "";
    document.getElementById("bloco").value = "";
    document.getElementById("quadra").value = "";
    document.getElementById("lote").value = "";
  }
}

function verificarPagamento() {
  const pagamento = document.getElementById("pagamento").value.toLowerCase();
  if (pagamento.includes("dinheiro")) {
    document.getElementById("trocoContainer").style.display = "block";
  } else {
    document.getElementById("trocoContainer").style.display = "none";
    toggleTrocoCampos(false);
  }
}

function toggleTrocoCampos(show) {
  const valorContainer = document.getElementById("valorTrocoContainer");
  if (show) {
    valorContainer.style.display = "block";
  } else {
    valorContainer.style.display = "none";
    document.getElementById("valorTroco").value = "";
  }
}

function verificarTroco() {
  const troco = document.getElementById("trocoSimNao").value;
  toggleTrocoCampos(troco === "sim");
}

function finalizarPedido() {
  if (!verificarHorario()) return;

  const produto = document.getElementById("produtoSelecionado").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const referencia = document.getElementById("referencia").value.trim();
  const tipoResidencia = document.getElementById("tipoResidencia").value;
  const apto = document.getElementById("apto").value.trim();
  const bloco = document.getElementById("bloco").value.trim();
  const quadra = document.getElementById("quadra").value.trim();
  const lote = document.getElementById("lote").value.trim();
  const pagamento = document.getElementById("pagamento").value.trim();
  const trocoSimNao = document.getElementById("trocoSimNao").value;
  const valorTroco = document.getElementById("valorTroco").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!endereco || !pagamento || !telefone) {
    alert('Por favor, preencha os campos obrigatórios!');
    return;
  }
  if (pagamento.toLowerCase().includes("dinheiro") && trocoSimNao === "sim" && !valorTroco) {
    alert('Por favor, informe o valor para troco.');
    return;
  }

  let mensagem = `Olá! Gostaria de fazer um pedido:\n\n`;
  mensagem += `Produto: ${produto}\n`;
  mensagem += `Endereço: ${endereco}\n`;
  if (referencia) mensagem += `Ponto de referência: ${referencia}\n`;

  if (tipoResidencia === "sim") {
    mensagem += `Apartamento/Condomínio:\n` +
      (apto ? `- Apto: ${apto}\n` : '') +
      (bloco ? `- Bloco: ${bloco}\n` : '') +
      (quadra ? `- Quadra: ${quadra}\n` : '') +
      (lote ? `- Lote: ${lote}\n` : '');
  } else {
    mensagem += `Apartamento/Condomínio: Não\n`;
  }

  mensagem += `Forma de Pagamento: ${pagamento}\n`;
  if (pagamento.toLowerCase().includes("dinheiro")) {
    mensagem += `Precisa de troco? ${trocoSimNao === "sim" ? "Sim" : "Não"}\n`;
    if (trocoSimNao === "sim") {
      mensagem += `Valor para troco: R$ ${valorTroco}\n`;
    }
  }
  mensagem += `Telefone: ${telefone}\n`;
  if (email) mensagem += `Email: ${email}\n`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
  fecharModal();
}

window.onclick = function(event) {
  if (event.target === document.getElementById("modal")) {
    fecharModal();
  }
};
