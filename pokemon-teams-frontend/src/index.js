const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")


document.addEventListener("DOMContentLoaded", event => {

    fetchAllTrainers()
    
}) 

function fetchAllTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then (json => {
        populateTrainers(json)

    })
}


function populateTrainers(trainers) {
    trainers.forEach(trainer => makeTrainerCard(trainer))
}


function makeTrainerCard(trainer) {
   
   

    const div = document.createElement("div")
    div.dataset.id = trainer.id
    div.className = "card"

    const button = document.createElement("button")
    button.dataset.trainerId = trainer.id
    button.innerText = "Add Pokemon"
    button.addEventListener("click", event => {
        
        let patchObj = patchObjMaker(trainer.id)
        fetch(TRAINERS_URL + "/" + trainer.id, patchObj)
        .then(resp => resp.json())
        .then(json => {
            
            if (json.message) {
                alert(json.message)
            } else {
                main.innerHTML = ""
                fetchAllTrainers()
            }
        })
    })

    const p = document.createElement("p")
    p.innerText = `${trainer.name}`


    const ul = document.createElement("ul")

    trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.textContent = `${pokemon.nickname} (${pokemon.species})`


        const releaseButton = document.createElement("button")
        releaseButton.className = "release"
        releaseButton.textContent = "release"
        releaseButton.dataset.pokemonId = pokemon.id

        releaseButton.addEventListener("click", event => {
            fetch(POKEMONS_URL + '/' + pokemon.id, {method: 'DELETE'})
            .then(() => {
                main.innerHTML = ""
                fetchAllTrainers()
            })
        })

        li.appendChild(button)
        li.appendChild(releaseButton)
        ul.appendChild(li)
       
    })

    
    

    div.append(p, button, ul)
    main.appendChild(div)
}

function patchObjMaker(id) {
    return {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // body: JSON.stringify({
        //     id: id
        // }) 

        
    }
}

