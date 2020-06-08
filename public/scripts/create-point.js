
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {
            for( const state of states){
                ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
            }
    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("[name=cidade]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json())
    .then( cities => {
           
            for( const city of cities){
                
                citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
    })

}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's

const itensToCollect = document.querySelectorAll(".itens-grid li")

for( const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=itens]")

let selectedItens = [];



function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javaScript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    //verificar se os itens foram selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex( function(item){
        const itemFound = item == itemId //isso sera true ou false
        return itemFound 
    })

    //se ja estar selecionado tirar da seleção
    if( alreadySelected >= 0){
        //tirar da seleção
        const filteredItens = selectedItens.filter(function(item){
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItens = filteredItens
    }
    //se não estiver selecionado, adicionar á seleção
    else{
        selectedItens.push(itemId)
    }

    collectedItems.value = selectedItens;
    //atualizar os capos escondidos, com os itens selecionados
}