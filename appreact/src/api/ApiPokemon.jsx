import React, { useState, useEffect } from "react";

function ApiPokemon() {
  function Card(props) {
    return (
      <div className="card">
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            Soon we will have our new pajamas with pokemon designs, look at the six new designs that we will have on our pajamas.
          </p>
          <a href="#" className="btn btn-primary">
          coming soon
          </a>
        </div>
      </div>
    );
  }

  function NewProducts() {
    const [Data, setData] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const pokemons = ["piplup", "pikachu", "lucario", "eevee", "charizard", "gengar"];

    useEffect(() => {
      if (Loaded === false) {
        pokemons.forEach((pokemon) => {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((response) => response.json())
            .then((pokemonData) => {
              setData((arrayPokemon) => [
                ...arrayPokemon,
                <Card key={pokemonData.name} title={pokemonData.name} img={pokemonData.sprites.front_default} />,
              ]);
            });
        });

        setLoaded(true);
      }
    }, [Loaded]);

    return (
      <div className="newProducts">
        <div className="container d-flex justify-content-around">
          <div className="col-3">
            {Data.length === 0 ? "Cargando" : Data}
          </div>
        </div>
      </div>
    );
  }

  return <NewProducts />;
}

export default ApiPokemon;
