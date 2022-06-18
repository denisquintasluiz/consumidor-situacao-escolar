"use strict";
//selecionando o botao
const btnEnvio = document.querySelector("#btn-enviar");
//selecionado o campo de entrada
const inputCodigoEscolar = document.querySelector("#btn-codigoescolar");
//selecionando o botao panilha
const btnPanilha = document.querySelector("#panilha-container button");

//adicionando evento ao botao que faz a criação da panilha
btnPanilha.addEventListener("click", (e)=>{
    //função que converte a tabela em panilha excel
    TableToExcel.convert(document.querySelector("div table"))
})

//adicionando o evento ao botao enviar
btnEnvio.addEventListener("click", async (e) =>{
    e.preventDefault();
    //pegando o valor do input
    const inputValue = inputCodigoEscolar.value;
    if(inputValue != ""){
        
        //configurando a URL
        const api_key = "m@lefycoSnnBs9050";
        let uRL = `https://gestor-situacao-escolar-alunos.herokuapp.com/${api_key}/webservice/fiscalizacao/alunos/${inputValue}`;

        //enviando a requisição para o servidor
        let resultado = await fetch(uRL, {mode: "cors"});
        //covertento a resposta do servidor em objeto json()
        let json = await resultado.json();
        
       //mostrando a resposta do servidor na console
        console.log(json);

         //verificando se houve o response do servidor
        if(json.result != null || json.result != undefined){
            //fazendo o consumo do json
            showInfor({
                nome: json.result.nome,
                apelido: json.result.apelido,
                turma: json.result.turma,
                curso: json.result.curso,
                polouniversitario: json.result.polouniversitario,  
                numerocadeiraematraso: json.result.numerocadeiraematraso,
                maiornotapauta: json.result.maiornotapauta,
                menornotapauta: json.result.menornotapauta
            });
        }
    }else{
        alert("Preencha o campo com o código escolar do aluno")
    }
    
})

/*Implementado a funcão que mostra o resultado */
function showInfor(json){
    document.querySelector("#table-container tr #nome").innerHTML = `${json.nome}`;
    document.querySelector("#table-container tr #apelido").innerHTML = `${json.apelido}`;
    document.querySelector("#table-container tr #turma").innerHTML = `${json.turma}`;
    document.querySelector("#table-container tr #curso").innerHTML = `${json.curso}`;

    document.querySelector("#table-container tr #polouniversitario").innerHTML = `${json.polouniversitario}`;
    document.querySelector("#table-container tr #numerocadeiraematraso").innerHTML = `${json.numerocadeiraematraso}`;
    document.querySelector("#table-container tr #maiornotapauta").innerHTML = `${json.maiornotapauta}`;
    document.querySelector("#table-container tr #menornotapauta").innerHTML = `${json.menornotapauta}`;
      
    let oculto = document.querySelector(".hiden")
      if(oculto.getAttribute("class") == "hiden"){
          oculto.classList.remove("hiden");
      }
    

}



