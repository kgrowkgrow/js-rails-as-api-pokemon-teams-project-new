const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", event => {

    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then (json => {
        populateTrainers(json)

    })
}) 

// we need: 1. make a single trainer card
//              need: all pokemon of that trainer
// 2. populate page with all trainer cards

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

        li.appendChild(button)
        ul.appendChild(li)
        // debugger
    })

    const main = document.querySelector("main")
    console.log(div)

    div.append(p, button, ul)
    main.appendChild(div)
    

}