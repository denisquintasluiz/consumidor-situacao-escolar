"use strict";
//selecionando o botao
const btnEnvio = document.querySelector("#btn-enviar");
//selecionado o campo de entrada
const inputCodigoEscolar = document.querySelector("#btn-codigoescolar");

//adicionando o evento ao botao
btnEnvio.addEventListener("click", async (e) =>{
    e.preventDefault();
    //pegando o valor do input
    const inputValue = inputCodigoEscolar.value;
    if(inputValue != ""){
        
        //configurando a URL
        let uRL = `https://situacao-escolar-ustp.herokuapp.com/webservice/fiscalizacao/alunos/${inputValue}`;

        //enviando a requisição para o servidor
        let resultado = await fetch(uRL, {mode: "cors"});
        //filtrando o resultado em um json mais limpo
        let json = await resultado.json();
        
        //verificando se houve o response do servidor
        //alert("O Cep informado não existe!");
        console.log(json);
        
        if(json.result != null || json.result != undefined){
            showInfor({
                nome: json.result.nome,
                apelido: json.result.apelido,
                turma: json.result.turma,
                curso: json.result.curso,
                polouniversitario: json.result.polouniversitario,  //polounivesitario
                numerocadeiraematraso: json.result.numerocadeiraematraso,
                maiornotapauta: json.result.maiornotapauta,
                menornotapauta: json.result.menornotapauta
            });
        }else {
            alert("O codigo escolar informado não é válido!");
        }
        
    }
    
})

/*Implementado a funcão que mostra o resultado */

function showInfor(json){
    document.querySelector("#itens-container #nome").innerHTML = `${json.nome}`;
    document.querySelector("#itens-container #apelido").innerHTML = `${json.apelido}`;
    document.querySelector("#itens-container #turma").innerHTML = `${json.turma}`;
    document.querySelector("#itens-container #curso").innerHTML = `${json.curso}`;

    document.querySelector("#itens-container #polouniversitario").innerHTML = `${json.polouniversitario}`;
    document.querySelector("#itens-container #numerocadeiraematraso").innerHTML = `${json.numerocadeiraematraso}`;
    document.querySelector("#itens-container #maiornotapauta").innerHTML = `${json.maiornotapauta}`;
    document.querySelector("#itens-container #menornotapauta").innerHTML = `${json.menornotapauta}`;

    document.querySelector(".hiden").classList.remove("hiden");

}



