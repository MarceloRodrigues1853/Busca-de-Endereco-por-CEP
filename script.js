// Função assíncrona para buscar o endereço com base no CEP fornecido
async function buscarEndereco(cep) {
  // Limpa mensagens de erro anteriores
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";

  try {
    // Faz uma requisição assíncrona para a API do ViaCEP para obter os detalhes do endereço
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    // Converte a resposta da requisição para o formato JSON
    var consultaCEPConvertida = await consultaCEP.json();

    // Verifica se há erro na resposta da consulta
    if (consultaCEPConvertida.hasOwnProperty("erro")) {
      // Se houver erro, lança uma exceção com uma mensagem personalizada
      throw new Error("CEP não encontrado ou inválido!");
    }

    // Preenche os campos de cidade, logradouro e estado com os valores obtidos da consulta
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;

    // Registra os detalhes do endereço no console para fins de depuração
    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    // Em caso de erro, exibe uma mensagem de erro no elemento HTML 'erro'
    mensagemErro.innerHTML = `<p>${erro.message}</p>`;
    console.error(erro); // Registra o erro no console para fins de depuração
  }
}

// Obtém o elemento HTML com o ID 'cep' e adiciona um ouvinte de evento para 'focusout'
var cepInput = document.getElementById("cep");
cepInput.addEventListener("focusout", () => buscarEndereco(cepInput.value));
