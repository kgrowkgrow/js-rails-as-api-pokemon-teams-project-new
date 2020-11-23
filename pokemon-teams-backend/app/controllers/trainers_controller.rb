class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers,
        include: :pokemons
    end

    def update
        
        trainer = Trainer.find_by_id(params[:id])

        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            trainer.pokemons.create(nickname: name, species: species)
            render json: trainer,
            include: :pokemons
        else
            render json: {message: "Your team is full. Consider releasing your pokemon first..."}
        end
    end


end
