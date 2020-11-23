class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy
        render json: {message: "Great success"}
    end
    
end
